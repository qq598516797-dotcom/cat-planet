import { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { gsap } from 'gsap'
import {
  getBreedById,
  getVisibleMarkerBreeds,
  passportRegionForBreed,
  type BreedOrigin,
} from '../../breeds/data/breeds'
import {
  getLatestMarkerProjections,
  subscribeMarkerProjections,
  type ProjectedBreedMarker,
} from '../data/markerProjectionBus'
import { regionTargets } from '../data/regionTargets'
import { useCatPlanetStore } from '../store/useCatPlanetStore'

interface OverlayMarker {
  breed: BreedOrigin
  projection: ProjectedBreedMarker
}

interface ClusterItem {
  breed: BreedOrigin
  x: number
  y: number
  delay: number
  hidden?: boolean
}

interface ScreenMarkerCluster {
  key: string
  x: number
  y: number
  count: number
  screenScale: number
  edgeFactor: number
  expandable: boolean
  hiddenCount: number
  representative: BreedOrigin
  breeds: BreedOrigin[]
  items: ClusterItem[]
}

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const isCoarsePointer = () =>
  window.matchMedia('(pointer: coarse)').matches

const preloadedMarkerSources = new Set<string>()
const markerImageCache: HTMLImageElement[] = []

const markerSourceFor = (breed: BreedOrigin) => breed.photo.markerSrc ?? breed.photo.src
const markerPositionFor = (breed: BreedOrigin) =>
  breed.photo.markerObjectPosition ?? breed.photo.objectPosition ?? '50% 38%'

const MAX_EXPANDED_ITEMS = 12

const preloadMarkerSource = (src: string) => {
  if (preloadedMarkerSources.has(src)) return
  preloadedMarkerSources.add(src)

  const image = new Image()
  image.decoding = 'async'
  image.loading = 'eager'
  image.src = src
  markerImageCache.push(image)

  if (typeof image.decode === 'function') {
    void image.decode().catch(() => undefined)
  }
}

const shortCodeFor = (name: string) =>
  name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 3)
    .toUpperCase()

const distanceBetween = (a: OverlayMarker, b: OverlayMarker) =>
  Math.hypot(a.projection.x - b.projection.x, a.projection.y - b.projection.y)

const createUnionFind = (count: number) => {
  const parent = Array.from({ length: count }, (_, index) => index)

  const find = (index: number): number => {
    if (parent[index] !== index) {
      parent[index] = find(parent[index])
    }
    return parent[index]
  }

  return {
    find,
    union: (a: number, b: number) => {
      const rootA = find(a)
      const rootB = find(b)
      if (rootA !== rootB) parent[rootB] = rootA
    },
  }
}

const spreadOffsetFor = (
  index: number,
  count: number,
  anchor: { x: number; y: number },
  viewport: { width: number; height: number },
  uiVisible: boolean,
) => {
  if (count <= 1) return { x: 0, y: 0 }

  const ringCapacities = count <= 8 ? [8] : count <= 24 ? [8, 16] : [8, 14, 20, 26]
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
  const radius = count <= 8 ? 58 : 62 + ring * 50 + Math.min(count, 34) * 0.28
  const desktop = viewport.width >= 1024 && uiVisible
  const bounds = {
    left: desktop ? 382 : 48,
    right: desktop ? viewport.width - 420 : viewport.width - 48,
    top: 64,
    bottom: viewport.height - 92,
  }
  const nearLeft = anchor.x < bounds.left + 92
  const nearRight = anchor.x > bounds.right - 92
  const nearTop = anchor.y < bounds.top + 76
  const nearBottom = anchor.y > bounds.bottom - 76
  const centerAngle = Math.atan2(viewport.height / 2 - anchor.y, viewport.width / 2 - anchor.x)
  const useFan = nearLeft || nearRight || nearTop || nearBottom
  const angleRange = useFan ? Math.PI * 1.12 : Math.PI * 2
  const angleStart = useFan ? centerAngle - angleRange / 2 : count > 10 ? -Math.PI / 2 : -Math.PI / 2.35
  const angle = angleStart + (itemsInRing === 1 ? 0 : indexInRing / Math.max(1, itemsInRing - 1)) * angleRange + ring * 0.18
  const raw = {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
  }

  return {
    x: Math.min(Math.max(anchor.x + raw.x, bounds.left), bounds.right) - anchor.x,
    y: Math.min(Math.max(anchor.y + raw.y, bounds.top), bounds.bottom) - anchor.y,
  }
}

const buildClusters = (
  projections: ProjectedBreedMarker[],
  visibleBreeds: BreedOrigin[],
  selectedBreedId: string | null,
  viewport: { width: number; height: number },
  uiVisible: boolean,
): ScreenMarkerCluster[] => {
  const breedById = new Map(visibleBreeds.map((breed) => [breed.id, breed]))
  const markers = projections
    .map((projection) => {
      const breed = breedById.get(projection.breedId)
      if (!breed || !projection.visible) return null
      return { breed, projection }
    })
    .filter((marker): marker is OverlayMarker => Boolean(marker))

  if (markers.length === 0) return []

  const collisionDistance = viewport.width < 640 ? 58 : 54
  const unionFind = createUnionFind(markers.length)

  for (let a = 0; a < markers.length; a += 1) {
    for (let b = a + 1; b < markers.length; b += 1) {
      if (distanceBetween(markers[a], markers[b]) < collisionDistance) {
        unionFind.union(a, b)
      }
    }
  }

  const groupedMarkers = new Map<number, OverlayMarker[]>()
  markers.forEach((marker, index) => {
    const root = unionFind.find(index)
    const group = groupedMarkers.get(root) ?? []
    group.push(marker)
    groupedMarkers.set(root, group)
  })

  return [...groupedMarkers.values()]
    .map((group) => {
      const sortedBreeds = group
        .map((marker) => marker.breed)
        .sort((a, b) => a.ticaName.localeCompare(b.ticaName))
      const selectedBreed = sortedBreeds.find((breed) => breed.id === selectedBreedId)
      const representative =
        selectedBreed
        ?? sortedBreeds.find((breed) => breed.photo.verifiedBreedPhoto)
        ?? sortedBreeds[0]
      const x =
        group.reduce((total, marker) => total + marker.projection.x, 0) / group.length
      const y =
        group.reduce((total, marker) => total + marker.projection.y, 0) / group.length
      const screenScale =
        group.reduce((total, marker) => total + marker.projection.screenScale, 0) / group.length
      const edgeFactor =
        group.reduce((total, marker) => total + marker.projection.edgeFactor, 0) / group.length
      const expandable = edgeFactor > 0.58
      const key = sortedBreeds.map((breed) => breed.id).join('|')
      const visibleExpandedBreeds = sortedBreeds.slice(0, MAX_EXPANDED_ITEMS)
      const hiddenCount = Math.max(0, sortedBreeds.length - visibleExpandedBreeds.length)
      const items = visibleExpandedBreeds.map((breed, index) => {
        const offset = spreadOffsetFor(index, visibleExpandedBreeds.length, { x, y }, viewport, uiVisible)
        return {
          breed,
          x: offset.x,
          y: offset.y,
          delay: Math.min(index * 13, 220),
        }
      })

      return {
        key,
        x,
        y,
        count: sortedBreeds.length,
        screenScale,
        edgeFactor,
        expandable,
        hiddenCount,
        representative,
        breeds: sortedBreeds,
        items,
      }
    })
    .sort((a, b) => a.count - b.count)
}

const clusterLayoutSignature = (clusters: ScreenMarkerCluster[]) =>
  clusters
    .map((cluster) => `${cluster.key}:${cluster.count}`)
    .join('~')

function useViewportSize() {
  const [viewport, setViewport] = useState(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
  }))

  useEffect(() => {
    const onResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return viewport
}

function MarkerImage({ breed }: { breed: BreedOrigin }) {
  const hasVerifiedPhoto = Boolean(breed.photo.verifiedBreedPhoto)
  const shortCode = breed.breedIconProfile?.shortCode ?? shortCodeFor(breed.ticaName)

  return (
    <>
      <span className="screen-marker-ear left" />
      <span className="screen-marker-ear right" />
      {hasVerifiedPhoto ? (
        <img
          src={markerSourceFor(breed)}
          alt=""
          loading="lazy"
          decoding="async"
          draggable={false}
          style={{
            objectFit: breed.photo.fit ?? 'cover',
            objectPosition: markerPositionFor(breed),
          }}
        />
      ) : (
        <span className="screen-marker-initials">{shortCode}</span>
      )}
      <span className="screen-marker-code">{shortCode}</span>
    </>
  )
}

function MarkerVisual({
  breed,
  count,
}: {
  breed: BreedOrigin
  count?: number
}) {
  return (
    <span className="screen-marker-visual">
      <MarkerImage breed={breed} />
      {typeof count === 'number' && count > 1 && (
        <span className="screen-marker-count">+{count}</span>
      )}
    </span>
  )
}

function MarkerClusterNode({
  cluster,
  expanded,
  closing,
  renderExpanded,
  selected,
  selectedBreedId,
  interactionMode,
  onClose,
  onOpen,
  onToggleLock,
  onShowTooltip,
  onSelectBreed,
}: {
  cluster: ScreenMarkerCluster
  expanded: boolean
  closing: boolean
  renderExpanded: boolean
  selected: boolean
  selectedBreedId: string | null
  interactionMode: 'atlas' | 'compare' | 'disabled'
  onClose: (cluster: ScreenMarkerCluster) => void
  onOpen: (clusterKey: string) => void
  onToggleLock: (clusterKey: string) => void
  onShowTooltip: (
    breed: BreedOrigin,
    event: { clientX: number; clientY: number },
    fallback?: { x: number; y: number },
  ) => void
  onSelectBreed: (
    breed: BreedOrigin,
    event: { clientX: number; clientY: number },
  ) => void
}) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const rootSettersRef = useRef<{
    opacity: ReturnType<typeof gsap.quickSetter>
    scale: ReturnType<typeof gsap.quickSetter>
  } | null>(null)
  const quickXRef = useRef<gsap.QuickToFunc | null>(null)
  const quickYRef = useRef<gsap.QuickToFunc | null>(null)
  const itemRefs = useRef(new Map<string, HTMLButtonElement>())
  const directBreed = cluster.count === 1 ? cluster.breeds[0] : null
  const allowAtlasInteraction = interactionMode === 'atlas'
  const allowCompareDrag = interactionMode === 'compare'

  const setItemRef = (breedId: string) => (node: HTMLButtonElement | null) => {
    if (node) {
      itemRefs.current.set(breedId, node)
    } else {
      itemRefs.current.delete(breedId)
    }
  }

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reduceMotion = prefersReducedMotion()
    gsap.set(root, {
      x: cluster.x,
      y: cluster.y,
      scale: (0.72 + cluster.edgeFactor * 0.28) * cluster.screenScale,
      opacity: 0.28 + cluster.edgeFactor * 0.72,
    })
    rootSettersRef.current = {
      opacity: gsap.quickSetter(root, 'opacity'),
      scale: gsap.quickSetter(root, 'scale'),
    }
    quickXRef.current = gsap.quickTo(root, 'x', {
      duration: reduceMotion ? 0.01 : 0.18,
      ease: 'power2.out',
    })
    quickYRef.current = gsap.quickTo(root, 'y', {
      duration: reduceMotion ? 0.01 : 0.18,
      ease: 'power2.out',
    })

    return () => {
      gsap.killTweensOf(root)
      rootSettersRef.current = null
      quickXRef.current = null
      quickYRef.current = null
    }
  }, [cluster.edgeFactor, cluster.screenScale, cluster.x, cluster.y])

  useEffect(() => {
    quickXRef.current?.(cluster.x)
    quickYRef.current?.(cluster.y)
    rootSettersRef.current?.opacity(0.28 + cluster.edgeFactor * 0.72)
    rootSettersRef.current?.scale((0.72 + cluster.edgeFactor * 0.28) * cluster.screenScale)
  }, [cluster.edgeFactor, cluster.screenScale, cluster.x, cluster.y])

  useEffect(() => {
    if (!renderExpanded) return

    const reduceMotion = prefersReducedMotion()
    const items = cluster.items
      .map((item) => itemRefs.current.get(item.breed.id))
      .filter((item): item is HTMLButtonElement => Boolean(item))

    if (items.length === 0) return

    const context = gsap.context(() => {
      gsap.killTweensOf(items)

      if (expanded) {
        const markerVisual = rootRef.current?.querySelector('.screen-marker-button .screen-marker-visual')
        if (markerVisual) {
          gsap.to(markerVisual, {
            scale: 0.9,
            autoAlpha: 0.82,
            duration: reduceMotion ? 0.01 : 0.2,
            ease: 'power2.out',
            overwrite: 'auto',
          })
        }
        gsap.set(items, {
          x: 0,
          y: 0,
          xPercent: -50,
          yPercent: -50,
          scale: 0.48,
          autoAlpha: 0,
          filter: 'blur(3px) saturate(0.96)',
        })
        gsap.set(
          items
            .map((item) => item.querySelector('.screen-marker-visual'))
            .filter((visual): visual is Element => Boolean(visual)),
          {
            scale: 0.86,
          },
        )
        gsap.to(items, {
          x: (index) => cluster.items[index]?.x ?? 0,
          y: (index) => cluster.items[index]?.y ?? 0,
          scale: 1,
          autoAlpha: 1,
          filter: 'blur(0px) saturate(1)',
          duration: reduceMotion ? 0.01 : 0.46,
          ease: 'back.out(1.35)',
          stagger: reduceMotion
            ? 0
            : {
                each: 0.014,
                from: 'center',
              },
          overwrite: true,
        })
      } else if (closing) {
        const markerVisual = rootRef.current?.querySelector('.screen-marker-button .screen-marker-visual')
        if (markerVisual) {
          gsap.to(markerVisual, {
            scale: 1,
            autoAlpha: 1,
            duration: reduceMotion ? 0.01 : 0.18,
            ease: 'power2.out',
            overwrite: 'auto',
          })
        }
        gsap.to(items, {
          x: 0,
          y: 0,
          scale: 0.56,
          autoAlpha: 0,
          filter: 'blur(4px) saturate(0.94)',
          duration: reduceMotion ? 0.01 : 0.2,
          ease: 'power2.in',
          stagger: reduceMotion
            ? 0
            : {
                each: 0.006,
                from: 'edges',
              },
          overwrite: true,
        })
      }
    }, rootRef)

    return () => context.revert()
  }, [closing, cluster.items, expanded, renderExpanded])

  const animateItemHover = (
    target: HTMLElement,
    active: boolean,
    isSelected: boolean,
  ) => {
    const visual = target.querySelector<HTMLElement>('.screen-marker-visual')
    if (!visual) return

    gsap.to(visual, {
      scale: active ? 1.18 : isSelected ? 1.28 : 1,
      filter: active || isSelected
        ? 'saturate(1.16) brightness(1.06)'
        : 'saturate(1) brightness(1)',
      duration: prefersReducedMotion() ? 0.01 : 0.2,
      ease: active ? 'back.out(1.8)' : 'power2.out',
      overwrite: 'auto',
    })
  }

  const animateCenterHover = (target: HTMLElement, active: boolean) => {
    const visual = target.querySelector<HTMLElement>('.screen-marker-visual')
    if (!visual) return

    const activeScale = cluster.count > 1 ? 1.12 : 1.14
    gsap.to(visual, {
      scale: active ? activeScale : expanded ? 0.9 : 1,
      filter: active
        ? 'saturate(1.15) brightness(1.06)'
        : 'saturate(1) brightness(1)',
      duration: prefersReducedMotion() ? 0.01 : 0.2,
      ease: active ? 'back.out(1.7)' : 'power2.out',
      overwrite: 'auto',
    })
  }

  return (
    <div
      ref={rootRef}
      className={[
        'screen-marker-cluster',
        expanded ? 'is-expanded' : '',
        closing ? 'is-closing' : '',
        selected ? 'has-selected' : '',
      ].filter(Boolean).join(' ')}
      style={{
        zIndex: expanded || selected ? 16 : 4 + Math.min(cluster.count, 8),
      } as CSSProperties}
      onPointerEnter={(event) => {
        if (allowAtlasInteraction && event.pointerType !== 'touch' && cluster.expandable) onOpen(cluster.key)
      }}
      onPointerLeave={(event) => {
        if (allowAtlasInteraction && event.pointerType !== 'touch') onClose(cluster)
      }}
    >
      <button
        type="button"
        className={[
          'screen-marker-button',
          cluster.count > 1 ? 'is-cluster' : 'is-single',
          expanded ? 'is-active' : '',
        ].filter(Boolean).join(' ')}
        aria-label={
          cluster.count > 1
            ? `${cluster.representative.originLabel}, ${cluster.count} breeds`
            : `${cluster.representative.localized.zh.name} / ${cluster.representative.ticaName}`
        }
        title={
          cluster.count > 1
            ? `${cluster.representative.originLabel} · ${cluster.count}`
            : cluster.representative.ticaName
        }
        data-drag-breed-id={directBreed?.id}
        disabled={interactionMode === 'disabled'}
        onPointerEnter={(event) => {
          if (allowAtlasInteraction && event.pointerType !== 'touch' && cluster.expandable) onOpen(cluster.key)
          if (allowAtlasInteraction) onShowTooltip(cluster.representative, event, cluster)
          animateCenterHover(event.currentTarget, true)
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === 'touch') return
          animateCenterHover(event.currentTarget, false)
        }}
        onClick={(event) => {
          event.stopPropagation()
          if (allowCompareDrag || interactionMode === 'disabled') return
          if (directBreed) {
            onSelectBreed(directBreed, event)
            return
          }
          if (!cluster.expandable) return
          onToggleLock(cluster.key)
          onShowTooltip(cluster.representative, event, cluster)
        }}
      >
        <MarkerVisual breed={cluster.representative} count={cluster.count} />
        {allowCompareDrag && directBreed && (
          <span className="marker-drag-hint" aria-hidden="true">拖</span>
        )}
      </button>

      {renderExpanded && (
        <div className="screen-marker-expanded" aria-hidden={false}>
          {cluster.items.map((item) => {
            const breed = getBreedById(item.breed.id) ?? item.breed
            const isSelected = breed.id === selectedBreedId
            return (
              <button
                ref={setItemRef(breed.id)}
                key={breed.id}
                type="button"
                className={[
                  'screen-marker-item',
                  isSelected ? 'is-selected' : '',
                ].filter(Boolean).join(' ')}
                aria-label={`${breed.localized.zh.name} / ${breed.ticaName}`}
                title={`${breed.localized.zh.name} / ${breed.ticaName}`}
                data-drag-breed-id={breed.id}
                onPointerEnter={(event) => {
                  if (allowAtlasInteraction) onShowTooltip(breed, event)
                  animateItemHover(event.currentTarget, true, isSelected)
                }}
                onPointerLeave={(event) => {
                  animateItemHover(event.currentTarget, false, isSelected)
                }}
                onClick={(event) => {
                  event.stopPropagation()
                  if (!allowAtlasInteraction) return
                  onSelectBreed(breed, event)
                }}
              >
                <MarkerVisual breed={breed} />
                {allowCompareDrag && (
                  <span className="marker-drag-hint" aria-hidden="true">拖</span>
                )}
              </button>
            )
          })}
          {cluster.hiddenCount > 0 && (
            <span className="screen-marker-more">
              +{cluster.hiddenCount}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export function MarkerOverlay() {
  const lineLayerRef = useRef<SVGSVGElement | null>(null)
  const latestProjectionsRef = useRef<ProjectedBreedMarker[]>(getLatestMarkerProjections())
  const layoutSignatureRef = useRef('')
  const closeTimerRef = useRef<number | null>(null)
  const lockedClusterKeyRef = useRef<string | null>(null)
  const selectedClusterKeyRef = useRef<string | null>(null)
  const uiVisible = useCatPlanetStore((state) => state.uiVisible)
  const activeRegion = useCatPlanetStore((state) => state.activeRegion)
  const searchQuery = useCatPlanetStore((state) => state.searchQuery)
  const coatFilter = useCatPlanetStore((state) => state.coatFilter)
  const atlasKindFilter = useCatPlanetStore((state) => state.atlasKindFilter)
  const selectedBreedId = useCatPlanetStore((state) => state.selectedBreedId)
  const activeExperience = useCatPlanetStore((state) => state.activeExperience)
  const selectBreed = useCatPlanetStore((state) => state.selectBreed)
  const recordBreedExploration = useCatPlanetStore((state) => state.recordBreedExploration)
  const setHoveredBreedId = useCatPlanetStore((state) => state.setHoveredBreedId)
  const setTooltipPosition = useCatPlanetStore((state) => state.setTooltipPosition)
  const flyTo = useCatPlanetStore((state) => state.flyTo)
  const viewport = useViewportSize()
  const [hoveredClusterKey, setHoveredClusterKey] = useState<string | null>(null)
  const [lockedClusterKey, setLockedClusterKey] = useState<string | null>(null)
  const [closingClusterKey, setClosingClusterKey] = useState<string | null>(null)
  const [clusters, setClusters] = useState<ScreenMarkerCluster[]>([])

  const visibleBreeds = useMemo(
    () => getVisibleMarkerBreeds(activeRegion, searchQuery, coatFilter, atlasKindFilter),
    [activeRegion, searchQuery, coatFilter, atlasKindFilter],
  )
  const interactionMode =
    activeExperience === 'atlas'
      ? 'atlas'
      : activeExperience === 'compare'
        ? 'compare'
        : 'disabled'

  useEffect(() => {
    const updateClusters = (projections: ProjectedBreedMarker[]) => {
      latestProjectionsRef.current = projections
      const nextClusters = buildClusters(
        projections,
        visibleBreeds,
        selectedBreedId,
        viewport,
        uiVisible,
      )
      const nextSignature = clusterLayoutSignature(nextClusters)

      if (nextSignature === layoutSignatureRef.current) {
        setClusters((currentClusters) =>
          currentClusters.map((cluster) => {
            const nextCluster = nextClusters.find(
              (candidate) => candidate.key === cluster.key,
            )
            return nextCluster ?? cluster
          }),
        )
        return
      }

      layoutSignatureRef.current = nextSignature
      setClusters(nextClusters)
    }

    updateClusters(latestProjectionsRef.current)
    return subscribeMarkerProjections(updateClusters)
  }, [selectedBreedId, uiVisible, viewport, visibleBreeds])

  const selectedClusterKey = useMemo(
    () =>
      clusters.find((cluster) =>
        cluster.breeds.some((breed) => breed.id === selectedBreedId),
      )?.key ?? null,
    [clusters, selectedBreedId],
  )

  useEffect(() => {
    lockedClusterKeyRef.current = lockedClusterKey
  }, [lockedClusterKey])

  useEffect(() => {
    selectedClusterKeyRef.current = selectedClusterKey
  }, [selectedClusterKey])

  useEffect(() => {
    const ids = new Set<string>()
    clusters.forEach((cluster) => {
      ids.add(markerSourceFor(cluster.representative))
      cluster.breeds.forEach((breed) => ids.add(markerSourceFor(breed)))
    })

    const preload = () => {
      ids.forEach(preloadMarkerSource)
    }

    const timeout = globalThis.setTimeout(preload, 120)
    return () => globalThis.clearTimeout(timeout)
  }, [clusters])

  const showTooltip = (
    breed: BreedOrigin,
    event: { clientX: number; clientY: number },
    fallback?: { x: number; y: number },
  ) => {
    if (interactionMode !== 'atlas') return
    setHoveredBreedId(breed.id)
    setTooltipPosition({
      x: event.clientX || fallback?.x || 0,
      y: event.clientY || fallback?.y || 0,
      visible: true,
    })
  }

  const cancelScheduledClose = () => {
    if (closeTimerRef.current === null) return
    window.clearTimeout(closeTimerRef.current)
    closeTimerRef.current = null
  }

  const selectAndFlyToBreed = (
    breed: BreedOrigin,
    event: { clientX: number; clientY: number },
  ) => {
    if (interactionMode !== 'atlas') return
    selectBreed(breed.id)
    recordBreedExploration(breed.id, passportRegionForBreed(breed))
    showTooltip(breed, event)
    if (breed.atlasKind === 'coatPattern') {
      flyTo(
        {
          ...regionTargets.Global,
          label: breed.ticaName,
          lat: regionTargets.Global.lat,
          lon: regionTargets.Global.lon,
          distance: 3.55,
        },
        breed.id,
      )
      return
    }

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

  const closeCluster = (cluster: ScreenMarkerCluster) => {
    if (isCoarsePointer()) return
    if (
      lockedClusterKeyRef.current === cluster.key
      || selectedClusterKeyRef.current === cluster.key
    ) return
    cancelScheduledClose()
    closeTimerRef.current = window.setTimeout(() => {
      if (
        lockedClusterKeyRef.current === cluster.key
        || selectedClusterKeyRef.current === cluster.key
      ) return
      setHoveredClusterKey((current) => (current === cluster.key ? null : current))
      setClosingClusterKey(cluster.key)
      setHoveredBreedId(null)
      setTooltipPosition({ x: 0, y: 0, visible: false })
      window.setTimeout(() => {
        setClosingClusterKey((current) => (current === cluster.key ? null : current))
      }, 220)
      closeTimerRef.current = null
    }, prefersReducedMotion() ? 10 : 140)
  }

  useEffect(() => () => cancelScheduledClose(), [])

  const activeClusters = clusters.filter((cluster) => {
    const expanded =
      cluster.key === hoveredClusterKey
      || cluster.key === lockedClusterKey
      || cluster.key === selectedClusterKey
    return expanded || cluster.key === closingClusterKey
  })

  useEffect(() => {
    if (!lineLayerRef.current) return

    const reduceMotion = prefersReducedMotion()
    const lines = lineLayerRef.current.querySelectorAll<SVGLineElement>('line.is-expanded')
    if (lines.length === 0) return

    gsap.fromTo(
      lines,
      {
        autoAlpha: 0,
        strokeDasharray: '1 72',
        strokeDashoffset: 28,
      },
      {
        autoAlpha: 1,
        strokeDasharray: '72 0',
        strokeDashoffset: 0,
        duration: reduceMotion ? 0.01 : 0.32,
        ease: 'power2.out',
        stagger: reduceMotion ? 0 : 0.006,
        overwrite: true,
      },
    )
  }, [activeClusters])

  return (
    <div
      className="marker-overlay"
      aria-label="Cat breed map markers"
      data-experience={activeExperience}
      data-interaction-mode={interactionMode}
    >
      <svg ref={lineLayerRef} className="marker-line-layer" aria-hidden="true">
        {activeClusters.flatMap((cluster) => {
          const expanded =
            cluster.key === hoveredClusterKey
            || cluster.key === lockedClusterKey
            || cluster.key === selectedClusterKey
          if (!cluster.expandable) return []
          return cluster.items.map((item) => (
            <line
              key={`${cluster.key}-${item.breed.id}`}
              className={expanded ? 'is-expanded' : 'is-closing'}
              x1={cluster.x}
              y1={cluster.y}
              x2={cluster.x + item.x}
              y2={cluster.y + item.y}
            />
          ))
        })}
      </svg>

      {clusters.map((cluster) => {
        const expanded =
          interactionMode === 'atlas'
          &&
          cluster.expandable
          && (
            cluster.key === hoveredClusterKey
            || cluster.key === lockedClusterKey
            || cluster.key === selectedClusterKey
          )
        const closing = cluster.key === closingClusterKey && !expanded
        const renderExpanded = (expanded || closing) && cluster.count > 1
        const selected = cluster.breeds.some((breed) => breed.id === selectedBreedId)

        return (
          <MarkerClusterNode
            key={cluster.key}
            cluster={cluster}
            expanded={expanded}
            closing={closing}
            renderExpanded={renderExpanded}
            selected={selected}
            selectedBreedId={selectedBreedId}
            interactionMode={interactionMode}
            onClose={closeCluster}
            onOpen={(clusterKey) => {
              cancelScheduledClose()
              setHoveredClusterKey(clusterKey)
              setClosingClusterKey(null)
            }}
            onToggleLock={(clusterKey) => {
              cancelScheduledClose()
              lockedClusterKeyRef.current = clusterKey
              setHoveredClusterKey(clusterKey)
              setLockedClusterKey((current) =>
                current === clusterKey ? current : clusterKey,
              )
            }}
            onShowTooltip={showTooltip}
            onSelectBreed={selectAndFlyToBreed}
          />
        )
      })}
    </div>
  )
}
