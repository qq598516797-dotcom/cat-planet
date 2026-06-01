export interface ProjectedBreedMarker {
  breedId: string
  x: number
  y: number
  visible: boolean
  depth: number
  screenScale: number
}

type ProjectionListener = (projections: ProjectedBreedMarker[]) => void

const listeners = new Set<ProjectionListener>()
let latestProjections: ProjectedBreedMarker[] = []

export const publishMarkerProjections = (projections: ProjectedBreedMarker[]) => {
  latestProjections = projections
  listeners.forEach((listener) => listener(projections))
}

export const subscribeMarkerProjections = (listener: ProjectionListener) => {
  listeners.add(listener)
  if (latestProjections.length > 0) {
    listener(latestProjections)
  }

  return () => {
    listeners.delete(listener)
  }
}

export const getLatestMarkerProjections = () => latestProjections
