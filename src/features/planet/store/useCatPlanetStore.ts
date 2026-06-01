import { create } from 'zustand'
import type { CoatLength, Region } from '../../breeds/data/breeds'
import type { CameraFlightTarget } from '../data/regionTargets'

export type Language = 'zh' | 'en'
export type CoatFilter = 'all' | CoatLength

interface TooltipPosition {
  x: number
  y: number
  visible: boolean
}

interface FlightCommand extends CameraFlightTarget {
  key: number
  breedId?: string
}

interface CatPlanetState {
  uiVisible: boolean
  selectedBreedId: string | null
  hoveredBreedId: string | null
  activeRegion: Region
  searchQuery: string
  language: Language
  coatFilter: CoatFilter
  cameraFlightTarget: FlightCommand | null
  tooltipPosition: TooltipPosition
  setUiVisible: (visible: boolean) => void
  toggleUiVisible: () => void
  setHoveredBreedId: (id: string | null) => void
  selectBreed: (id: string | null) => void
  setActiveRegion: (region: Region) => void
  setSearchQuery: (query: string) => void
  setLanguage: (language: Language) => void
  setCoatFilter: (coatFilter: CoatFilter) => void
  flyTo: (target: CameraFlightTarget, breedId?: string) => void
  setTooltipPosition: (position: TooltipPosition) => void
  clearSelection: () => void
}

let flightKey = 0

export const useCatPlanetStore = create<CatPlanetState>((set) => ({
  uiVisible: true,
  selectedBreedId: null,
  hoveredBreedId: null,
  activeRegion: 'Global',
  searchQuery: '',
  language: 'zh',
  coatFilter: 'all',
  cameraFlightTarget: null,
  tooltipPosition: { x: 0, y: 0, visible: false },
  setUiVisible: (visible) => set({ uiVisible: visible }),
  toggleUiVisible: () => set((state) => ({ uiVisible: !state.uiVisible })),
  setHoveredBreedId: (id) => set({ hoveredBreedId: id }),
  selectBreed: (id) => set({ selectedBreedId: id }),
  setActiveRegion: (region) => set({ activeRegion: region }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setLanguage: (language) => set({ language }),
  setCoatFilter: (coatFilter) => set({ coatFilter }),
  flyTo: (target, breedId) =>
    set({
      cameraFlightTarget: {
        ...target,
        key: ++flightKey,
        breedId,
      },
      selectedBreedId: breedId ?? null,
    }),
  setTooltipPosition: (position) => set({ tooltipPosition: position }),
  clearSelection: () =>
    set({
      selectedBreedId: null,
      hoveredBreedId: null,
      tooltipPosition: { x: 0, y: 0, visible: false },
    }),
}))
