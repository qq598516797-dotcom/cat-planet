import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import {
  AdditiveBlending,
  BackSide,
  CanvasTexture,
  Color,
  EquirectangularReflectionMapping,
  type Mesh,
} from 'three'
import { feature, mesh } from 'topojson-client'
import countriesAtlas from 'world-atlas/countries-110m.json'

type GeoPosition = [number, number]
type GeoLine = GeoPosition[]
type GeoPolygon = GeoLine[]
type GeoMultiPolygon = GeoPolygon[]

type GeoGeometry =
  | { type: 'Polygon'; coordinates: GeoPolygon }
  | { type: 'MultiPolygon'; coordinates: GeoMultiPolygon }
  | { type: 'LineString'; coordinates: GeoLine }
  | { type: 'MultiLineString'; coordinates: GeoLine[] }

interface GeoFeature {
  type: 'Feature'
  geometry: GeoGeometry
}

interface GeoFeatureCollection {
  type: 'FeatureCollection'
  features: GeoFeature[]
}

const countriesTopology = countriesAtlas as unknown as {
  objects: { countries: never }
}

const project = ([lon, lat]: GeoPosition, width: number, height: number) => ({
  x: ((lon + 180) / 360) * width,
  y: ((90 - lat) / 180) * height,
})

const drawRing = (
  ctx: CanvasRenderingContext2D,
  ring: GeoLine,
  width: number,
  height: number,
) => {
  if (ring.length === 0) return

  ring.forEach((point, index) => {
    const { x, y } = project(point, width, height)
    if (index === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  })
}

const drawPolygon = (
  ctx: CanvasRenderingContext2D,
  polygon: GeoPolygon,
  width: number,
  height: number,
) => {
  polygon.forEach((ring) => drawRing(ctx, ring, width, height))
}

const drawGeometry = (
  ctx: CanvasRenderingContext2D,
  geometry: GeoGeometry,
  width: number,
  height: number,
) => {
  if (geometry.type === 'Polygon') {
    drawPolygon(ctx, geometry.coordinates, width, height)
  }

  if (geometry.type === 'MultiPolygon') {
    geometry.coordinates.forEach((polygon) => drawPolygon(ctx, polygon, width, height))
  }

  if (geometry.type === 'LineString') {
    drawRing(ctx, geometry.coordinates, width, height)
  }

  if (geometry.type === 'MultiLineString') {
    geometry.coordinates.forEach((line) => drawRing(ctx, line, width, height))
  }
}

const drawGraticule = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
) => {
  ctx.save()
  ctx.strokeStyle = 'rgba(68, 128, 184, 0.22)'
  ctx.lineWidth = 1

  for (let lon = -180; lon <= 180; lon += 15) {
    const x = ((lon + 180) / 360) * width
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, height)
    ctx.stroke()
  }

  for (let lat = -75; lat <= 75; lat += 15) {
    const y = ((90 - lat) / 180) * height
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
    ctx.stroke()
  }

  ctx.strokeStyle = 'rgba(255, 111, 159, 0.4)'
  ctx.lineWidth = 1.25
  ctx.beginPath()
  ctx.moveTo(0, height / 2)
  ctx.lineTo(width, height / 2)
  ctx.stroke()
  ctx.restore()
}

const createEarthTexture = () => {
  const canvas = document.createElement('canvas')
  canvas.width = 2048
  canvas.height = 1024
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('Could not create earth texture context')
  }

  const ocean = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
  ocean.addColorStop(0, '#d7f4ff')
  ocean.addColorStop(0.46, '#92d2ff')
  ocean.addColorStop(1, '#ffd8e5')
  ctx.fillStyle = ocean
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  drawGraticule(ctx, canvas.width, canvas.height)

  const landCollection = feature(
    countriesTopology as never,
    countriesTopology.objects.countries,
  ) as unknown as GeoFeatureCollection

  ctx.save()
  ctx.beginPath()
  landCollection.features.forEach((item) =>
    drawGeometry(ctx, item.geometry, canvas.width, canvas.height),
  )
  const landGradient = ctx.createLinearGradient(0, 120, canvas.width, canvas.height)
  landGradient.addColorStop(0, '#ffd06f')
  landGradient.addColorStop(0.52, '#ff91b4')
  landGradient.addColorStop(1, '#ffc46f')
  ctx.fillStyle = landGradient
  ctx.fill()

  ctx.lineWidth = 2.2
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)'
  ctx.stroke()
  ctx.restore()

  const borders = mesh(
    countriesTopology as never,
    countriesTopology.objects.countries,
    (a, b) => a !== b,
  ) as unknown as GeoGeometry

  ctx.save()
  ctx.beginPath()
  drawGeometry(ctx, borders, canvas.width, canvas.height)
  ctx.lineWidth = 0.85
  ctx.strokeStyle = 'rgba(95, 89, 122, 0.42)'
  ctx.stroke()
  ctx.restore()

  ctx.save()
  ctx.globalAlpha = 0.2
  ctx.fillStyle = '#fffaf4'
  for (let i = 0; i < 75; i += 1) {
    const x = (i * 379) % canvas.width
    const y = 70 + ((i * 191) % (canvas.height - 140))
    const rx = 46 + ((i * 17) % 80)
    const ry = 7 + ((i * 11) % 18)
    ctx.beginPath()
    ctx.ellipse(x, y, rx, ry, (i % 7) * 0.18, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.restore()

  const texture = new CanvasTexture(canvas)
  texture.colorSpace = 'srgb'
  texture.mapping = EquirectangularReflectionMapping
  texture.needsUpdate = true

  return texture
}

const createCloudTexture = () => {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 512
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('Could not create cloud texture context')
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.26)'
  for (let i = 0; i < 95; i += 1) {
    const x = (i * 149) % canvas.width
    const y = 30 + ((i * 83) % (canvas.height - 60))
    const rx = 32 + ((i * 31) % 86)
    const ry = 5 + ((i * 13) % 18)
    ctx.beginPath()
    ctx.ellipse(x, y, rx, ry, (i % 9) * 0.2, 0, Math.PI * 2)
    ctx.fill()
  }

  const texture = new CanvasTexture(canvas)
  texture.colorSpace = 'srgb'
  texture.mapping = EquirectangularReflectionMapping
  texture.needsUpdate = true

  return texture
}

export function Globe() {
  const earthTexture = useMemo(() => createEarthTexture(), [])
  const cloudTexture = useMemo(() => createCloudTexture(), [])
  const cloudRef = useRef<Mesh>(null)

  useFrame((_, delta) => {
    if (cloudRef.current) {
      cloudRef.current.rotation.y += delta * 0.018
    }
  })

  return (
    <group>
      <mesh name="cat-planet-earth" rotation={[0, -0.32, 0]}>
        <sphereGeometry args={[1, 96, 96]} />
        <meshStandardMaterial
          map={earthTexture}
          color={new Color('#ffffff')}
          roughness={0.86}
          metalness={0.02}
        />
      </mesh>

      <mesh ref={cloudRef} scale={1.012} rotation={[0, -0.1, 0]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          map={cloudTexture}
          transparent
          opacity={0.36}
          depthWrite={false}
        />
      </mesh>

      <mesh scale={1.032}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color="#ff8db0"
          transparent
          opacity={0.14}
          depthWrite={false}
        />
      </mesh>

      <mesh scale={1.09}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color="#ffb3c8"
          transparent
          opacity={0.12}
          side={BackSide}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}
