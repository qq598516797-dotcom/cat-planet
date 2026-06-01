import { Html } from '@react-three/drei'
import { useMemo, useState } from 'react'
import type { CSSProperties } from 'react'
import * as THREE from 'three'
import {
  getVisibleBreeds,
  type BreedOrigin,
} from '../../breeds/data/breeds'
import { regionTargets } from '../data/regionTargets'
import { latLonToVector3 } from '../math/geo'
import { useCatPlanetStore } from '../store/useCatPlanetStore'

interface ClusterItem {
  breed: BreedOrigin
  offsetX: number
  offsetY: number
  leaderLength: number
  leaderAngle: number
}

interface MarkerCluster {
  key: string
  anchor: THREE.Vector3
  representativeBreed: BreedOrigin
  breeds: BreedOrigin[]
  items: ClusterItem[]
  stageSize: number
}

const shortCodeFor = (name: string) =>
  name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 3)
    .toUpperCase()

const clusterKeyFor = (breed: BreedOrigin, forceSingles: boolean) =>
  forceSingles
    ? `breed:${breed.id}`
    : breed.countries[0] ?? `${breed.lat.toFixed(3)}:${breed.lon.toFixed(3)}`

const spreadOffsetFor = (index: number, count: number) => {
  if (count <= 1) {
    return { x: 0, y: 0 }
  }

  const ringCapacities = count > 20 ? [10, 14, 18, 22] : [8, 12, 16]
  let ring = 0
  let consumed = 0

  while (
    ring < ringCapacities.length - 1
    && index >= consumed + ringCapacities[ring]
  ) {
    consumed += ringCapacities[ring]
    ring += 1
  }

  const indexInRing = index - consumed
  const remaining = count - consumed
  const itemsInRing = Math.min(ringCapacities[ring], remaining)
  const radius = 58 + ring * 46 + Math.min(count, 18) * 0.65
  const angleOffset = count > 8 ? -Math.PI / 2 : -Math.PI / 2.35
  const angle = angleOffset + (indexInRing / itemsInRing) * Math.PI * 2 + ring * 0.24

  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
  }
}

const buildMarkerClusters = (visibleBreeds: BreedOrigin[]): MarkerCluster[] => {
  const forceSingles = visibleBreeds.length <= 3
  const groupedBreeds = new Map<string, BreedOrigin[]>()

  visibleBreeds.forEach((breed) => {
    const key = clusterKeyFor(breed, forceSingles)
    const cluster = groupedBreeds.get(key) ?? []
    cluster.push(breed)
    groupedBreeds.set(key, cluster)
  })

  return [...groupedBreeds.entries()].map(([key, clusterBreeds]) => {
    const sortedBreeds = [...clusterBreeds].sort((a, b) => a.ticaName.localeCompare(b.ticaName))
    const representativeBreed = sortedBreeds.find((breed) => breed.photo.verifiedBreedPhoto) ?? sortedBreeds[0]
    const anchorLat = sortedBreeds.reduce((total, breed) => total + breed.lat, 0) / sortedBreeds.length
    const anchorLon = sortedBreeds.reduce((total, breed) => total + breed.lon, 0) / sortedBreeds.length
    const items = sortedBreeds.map((breed, index) => {
      const offset = spreadOffsetFor(index, sortedBreeds.length)

      return {
        breed,
        offsetX: offset.x,
        offsetY: offset.y,
        leaderLength: Math.hypot(offset.x, offset.y),
        leaderAngle: Math.atan2(offset.y, offset.x),
      }
    })
    const maxOffset = Math.max(0, ...items.map((item) => item.leaderLength))

    return {
      key,
      anchor: latLonToVector3(anchorLat, anchorLon, 1.086),
      representativeBreed,
      breeds: sortedBreeds,
      items,
      stageSize: Math.max(66, maxOffset * 2 + 76),
    }
  })
}

function MarkerPhoto({
  breed,
  className = '',
}: {
  breed: BreedOrigin
  className?: string
}) {
  const hasVerifiedPhoto = Boolean(breed.photo.verifiedBreedPhoto)
  const shortCode = breed.breedIconProfile?.shortCode ?? shortCodeFor(breed.ticaName)

  return (
    <>
      <span className="photo-marker-ear left" />
      <span className="photo-marker-ear right" />
      {hasVerifiedPhoto ? (
        <img
          className={className}
          src={breed.photo.src}
          alt=""
          loading="lazy"
          decoding="async"
          draggable={false}
          style={{
            objectFit: breed.photo.fit ?? 'cover',
            objectPosition: breed.photo.objectPosition ?? '50% 38%',
          }}
        />
      ) : (
        <span className="photo-marker-initials">{shortCode}</span>
      )}
      <span className="photo-marker-code">{shortCode}</span>
    </>
  )
}

function BreedMarkerButton({
  item,
  selected,
  onHover,
  onSelect,
}: {
  item: ClusterItem
  selected: boolean
  onHover: (breed: BreedOrigin, event: { clientX: number; clientY: number }) => void
  onSelect: (breed: BreedOrigin, event: { clientX: number; clientY: number }) => void
}) {
  const { breed } = item
  const hasVerifiedPhoto = Boolean(breed.photo.verifiedBreedPhoto)
  const markerClassName = [
    'photo-marker',
    'photo-marker-item',
    selected ? 'is-selected' : '',
    hasVerifiedPhoto ? 'has-photo' : 'is-initials',
  ].filter(Boolean).join(' ')

  return (
    <>
      {item.leaderLength > 4 && (
        <span
          className="photo-marker-leader"
          style={{
            '--leader-length': `${item.leaderLength}px`,
            '--leader-angle': `${item.leaderAngle}rad`,
          } as CSSProperties}
        />
      )}
      <button
        type="button"
        className={markerClassName}
        aria-label={`${breed.localized.zh.name} / ${breed.ticaName}`}
        title={`${breed.localized.zh.name} / ${breed.ticaName}`}
        style={{
          '--marker-offset-x': `${item.offsetX}px`,
          '--marker-offset-y': `${item.offsetY}px`,
        } as CSSProperties}
        onPointerEnter={(event) => onHover(breed, event)}
        onClick={(event) => {
          event.stopPropagation()
          onSelect(breed, event)
        }}
      >
        <MarkerPhoto breed={breed} />
      </button>
    </>
  )
}

function PhotoCluster({
  cluster,
  expanded,
  selectedBreedId,
  onHoverCluster,
  onLeaveCluster,
  onLockCluster,
}: {
  cluster: MarkerCluster
  expanded: boolean
  selectedBreedId: string | null
  onHoverCluster: (key: string) => void
  onLeaveCluster: (key: string) => void
  onLockCluster: (key: string) => void
}) {
  const selectBreed = useCatPlanetStore((state) => state.selectBreed)
  const setHoveredBreedId = useCatPlanetStore((state) => state.setHoveredBreedId)
  const setTooltipPosition = useCatPlanetStore((state) => state.setTooltipPosition)
  const flyTo = useCatPlanetStore((state) => state.flyTo)
  const representative = cluster.representativeBreed
  const directBreed = cluster.breeds.length === 1 ? cluster.breeds[0] : null
  const hasVerifiedPhoto = Boolean(representative.photo.verifiedBreedPhoto)
  const isSelectedCluster = cluster.breeds.some((breed) => breed.id === selectedBreedId)
  const clusterClassName = [
    'photo-cluster-stage',
    expanded ? 'is-expanded' : '',
    isSelectedCluster ? 'has-selected' : '',
  ].filter(Boolean).join(' ')

  const showTooltip = (breed: BreedOrigin, event: { clientX: number; clientY: number }) => {
    setHoveredBreedId(breed.id)
    setTooltipPosition({
      x: event.clientX,
      y: event.clientY,
      visible: true,
    })
  }

  const selectAndFlyToBreed = (breed: BreedOrigin, event: { clientX: number; clientY: number }) => {
    selectBreed(breed.id)
    showTooltip(breed, event)
    flyTo(
      {
        ...regionTargets[breed.region],
        label: breed.ticaName,
        lat: breed.lat,
        lon: breed.lon,
        distance: 2.35,
      },
      breed.id,
    )
  }

  return (
    <Html
      position={cluster.anchor}
      zIndexRange={[1, 0]}
      occlude
      style={{ pointerEvents: 'none' }}
    >
      <div className="photo-cluster-shell">
        <div
          className={clusterClassName}
          style={{ '--cluster-stage-size': `${expanded ? cluster.stageSize : 68}px` } as CSSProperties}
          onPointerLeave={() => onLeaveCluster(cluster.key)}
        >
          <button
            type="button"
            className={[
              'photo-marker',
              'photo-cluster-button',
              expanded ? 'is-cluster-expanded' : '',
              hasVerifiedPhoto ? 'has-photo' : 'is-initials',
            ].filter(Boolean).join(' ')}
            aria-label={`${representative.originLabel} ${cluster.breeds.length} breeds`}
            title={cluster.breeds.length > 1 ? `${representative.originLabel} · ${cluster.breeds.length}` : representative.ticaName}
            style={{
              '--marker-offset-x': '0px',
              '--marker-offset-y': '0px',
            } as CSSProperties}
            onPointerEnter={(event) => {
              document.body.style.cursor = 'pointer'
              onHoverCluster(cluster.key)
              showTooltip(representative, event)
            }}
            onClick={(event) => {
              event.stopPropagation()
              if (directBreed) {
                selectAndFlyToBreed(directBreed, event)
                return
              }
              onLockCluster(cluster.key)
              showTooltip(representative, event)
            }}
          >
            <MarkerPhoto breed={representative} />
            {cluster.breeds.length > 1 && (
              <span className="photo-cluster-count">+{cluster.breeds.length}</span>
            )}
          </button>

          {expanded && cluster.breeds.length > 1 && (
            <div className="photo-cluster-expanded" aria-hidden={false}>
              {cluster.items.map((item) => (
                <BreedMarkerButton
                  key={item.breed.id}
                  item={item}
                  selected={item.breed.id === selectedBreedId}
                  onHover={showTooltip}
                  onSelect={selectAndFlyToBreed}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Html>
  )
}

export function BreedMarkers() {
  const activeRegion = useCatPlanetStore((state) => state.activeRegion)
  const searchQuery = useCatPlanetStore((state) => state.searchQuery)
  const coatFilter = useCatPlanetStore((state) => state.coatFilter)
  const selectedBreedId = useCatPlanetStore((state) => state.selectedBreedId)
  const setHoveredBreedId = useCatPlanetStore((state) => state.setHoveredBreedId)
  const setTooltipPosition = useCatPlanetStore((state) => state.setTooltipPosition)
  const [hoveredClusterKey, setHoveredClusterKey] = useState<string | null>(null)
  const [lockedClusterKey, setLockedClusterKey] = useState<string | null>(null)

  const visibleBreeds = useMemo(
    () => getVisibleBreeds(activeRegion, searchQuery, coatFilter),
    [activeRegion, searchQuery, coatFilter],
  )

  const clusters = useMemo(
    () => buildMarkerClusters(visibleBreeds),
    [visibleBreeds],
  )

  const selectedClusterKey = useMemo(
    () => clusters.find((cluster) => cluster.breeds.some((breed) => breed.id === selectedBreedId))?.key ?? null,
    [clusters, selectedBreedId],
  )

  const collapseCluster = (clusterKey: string) => {
    if (lockedClusterKey === clusterKey || selectedClusterKey === clusterKey) return
    setHoveredClusterKey((current) => (current === clusterKey ? null : current))
    setHoveredBreedId(null)
    setTooltipPosition({ x: 0, y: 0, visible: false })
    document.body.style.cursor = 'auto'
  }

  return (
    <group>
      {clusters.map((cluster) => (
        <PhotoCluster
          key={cluster.key}
          cluster={cluster}
          expanded={
            cluster.key === hoveredClusterKey
            || cluster.key === lockedClusterKey
            || cluster.key === selectedClusterKey
          }
          selectedBreedId={selectedBreedId}
          onHoverCluster={(clusterKey) => {
            setHoveredClusterKey(clusterKey)
          }}
          onLeaveCluster={collapseCluster}
          onLockCluster={(clusterKey) => {
            setLockedClusterKey((current) => (current === clusterKey ? null : clusterKey))
          }}
        />
      ))}
    </group>
  )
}
