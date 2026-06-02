import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { getVisibleMarkerBreeds } from '../../breeds/data/breeds'
import { publishMarkerProjections } from '../data/markerProjectionBus'
import { latLonToVector3 } from '../math/geo'
import { useCatPlanetStore } from '../store/useCatPlanetStore'

const PROJECTION_FPS = 24
const MARKER_RADIUS = 1.09
const EDGE_VISIBILITY_BIAS = 0.02
const EDGE_FADE_START = 0.42

export function MarkerProjectionBridge() {
  const { camera, size } = useThree()
  const activeRegion = useCatPlanetStore((state) => state.activeRegion)
  const searchQuery = useCatPlanetStore((state) => state.searchQuery)
  const coatFilter = useCatPlanetStore((state) => state.coatFilter)
  const atlasKindFilter = useCatPlanetStore((state) => state.atlasKindFilter)
  const lastProjectionAt = useRef(0)
  const lastSignature = useRef('')
  const scratchProjected = useRef(new THREE.Vector3())
  const scratchCameraNormal = useRef(new THREE.Vector3())

  const markerPositions = useMemo(
    () =>
      getVisibleMarkerBreeds(activeRegion, searchQuery, coatFilter, atlasKindFilter).map((breed) => ({
        breedId: breed.id,
        world: latLonToVector3(breed.lat, breed.lon, MARKER_RADIUS),
      })),
    [activeRegion, searchQuery, coatFilter, atlasKindFilter],
  )

  useEffect(
    () => () => {
      publishMarkerProjections([])
    },
    [],
  )

  useFrame((state) => {
    const now = state.clock.elapsedTime
    if (now - lastProjectionAt.current < 1 / PROJECTION_FPS) return
    lastProjectionAt.current = now

    scratchCameraNormal.current.copy(camera.position).normalize()
    const cameraDistance = Math.max(1, camera.position.length())
    const screenScale = THREE.MathUtils.clamp(cameraDistance / 4.25, 0.95, 1.22)

    const projections = markerPositions.map(({ breedId, world }) => {
      const projected = scratchProjected.current.copy(world).project(camera)
      const normal = world.clone().normalize()
      const facing = normal.dot(scratchCameraNormal.current)
      const edgeFactor = THREE.MathUtils.clamp((facing - EDGE_VISIBILITY_BIAS) / EDGE_FADE_START, 0, 1)
      const isFrontFacing = facing > EDGE_VISIBILITY_BIAS
      const visible =
        isFrontFacing
        && projected.z > -1
        && projected.z < 1
        && projected.x > -1.18
        && projected.x < 1.18
        && projected.y > -1.18
        && projected.y < 1.18

      return {
        breedId,
        x: (projected.x * 0.5 + 0.5) * size.width,
        y: (-projected.y * 0.5 + 0.5) * size.height,
        visible,
        edgeFactor,
        depth: projected.z,
        screenScale,
      }
    })

    const signature = projections
      .map((projection) =>
        `${projection.breedId}:${projection.visible ? 1 : 0}:${Math.round(projection.x)}:${Math.round(projection.y)}:${Math.round(projection.screenScale * 100)}`,
      )
      .join('|')

    if (signature === lastSignature.current) return
    lastSignature.current = signature
    publishMarkerProjections(projections)
  })

  return null
}
