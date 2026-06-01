import { create } from 'zustand'
import type { CoatLength, Region } from '../../breeds/data/breeds'
import type { CameraFlightTarget } from '../data/regionTargets'

export type Language = 'zh' | 'en'
export type CoatFilter = 'all' | CoatLength
export type ActiveExperience =
  | 'atlas'
  | 'route'
  | 'quiz'
  | 'compare'
  | 'constellation'
  | 'passport'
export type ShareCardMode = 'guardian' | 'favorites'
export type ShareCardSide = 'front' | 'back'

export interface GuardianBirthday {
  month: number
  day: number
}

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
  activeExperience: ActiveExperience
  compareBreedIds: string[]
  favoriteBreedIds: string[]
  dailyBreedId: string
  soundEnabled: boolean
  guardianBirthday: GuardianBirthday | null
  guardianZodiacId: string | null
  guardianBreedIds: string[]
  shareCardMode: ShareCardMode
  shareCardSide: ShareCardSide
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
  setActiveExperience: (experience: ActiveExperience) => void
  toggleFavoriteBreed: (id: string) => void
  toggleCompareBreed: (id: string) => void
  clearCompare: () => void
  setSoundEnabled: (enabled: boolean) => void
  setGuardianMatch: (
    birthday: GuardianBirthday,
    zodiacId: string,
    breedIds: string[],
  ) => void
  setShareCardMode: (mode: ShareCardMode) => void
  setShareCardSide: (side: ShareCardSide) => void
  flyTo: (target: CameraFlightTarget, breedId?: string) => void
  setTooltipPosition: (position: TooltipPosition) => void
  clearSelection: () => void
}

let flightKey = 0

const favoriteStorageKey = 'cat-planet.favoriteBreedIds'
const soundStorageKey = 'cat-planet.soundEnabled'
const guardianStorageKey = 'cat-planet.guardianMatch'
const shareCardModeStorageKey = 'cat-planet.shareCardMode'
const shareCardSideStorageKey = 'cat-planet.shareCardSide'

interface StoredGuardianMatch {
  birthday: GuardianBirthday
  zodiacId: string
  breedIds: string[]
}

const readStoredList = (key: string) => {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(key)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : []
  } catch {
    return []
  }
}

const readStoredBoolean = (key: string, fallback: boolean) => {
  if (typeof window === 'undefined') return fallback
  const raw = window.localStorage.getItem(key)
  if (raw === null) return fallback
  return raw === 'true'
}

const readStoredGuardianMatch = (): StoredGuardianMatch | null => {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(guardianStorageKey)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<StoredGuardianMatch>
    const birthday = parsed.birthday
    if (
      !birthday
      || typeof birthday.month !== 'number'
      || typeof birthday.day !== 'number'
      || typeof parsed.zodiacId !== 'string'
      || !Array.isArray(parsed.breedIds)
    ) return null

    return {
      birthday,
      zodiacId: parsed.zodiacId,
      breedIds: parsed.breedIds.filter((item): item is string => typeof item === 'string'),
    }
  } catch {
    return null
  }
}

const readStoredShareCardMode = (): ShareCardMode => {
  if (typeof window === 'undefined') return 'guardian'
  const raw = window.localStorage.getItem(shareCardModeStorageKey)
  return raw === 'favorites' ? 'favorites' : 'guardian'
}

const readStoredShareCardSide = (): ShareCardSide => {
  if (typeof window === 'undefined') return 'front'
  const raw = window.localStorage.getItem(shareCardSideStorageKey)
  return raw === 'back' ? 'back' : 'front'
}

const writeStoredList = (key: string, value: string[]) => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(key, JSON.stringify(value))
}

const writeStoredBoolean = (key: string, value: boolean) => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(key, String(value))
}

const writeStoredGuardianMatch = (value: StoredGuardianMatch) => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(guardianStorageKey, JSON.stringify(value))
}

const writeStoredShareCardMode = (value: ShareCardMode) => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(shareCardModeStorageKey, value)
}

const writeStoredShareCardSide = (value: ShareCardSide) => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(shareCardSideStorageKey, value)
}

const dailyBreedIds = [
  'turkish-angora',
  'maine-coon',
  'siamese',
  'persian',
  'ragdoll',
  'bengal',
  'sphynx',
  'british-shorthair',
]

const getDailyBreedId = () => {
  const now = new Date()
  const seed = Number(`${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}`)
  return dailyBreedIds[seed % dailyBreedIds.length]
}

const storedGuardianMatch = readStoredGuardianMatch()

export const useCatPlanetStore = create<CatPlanetState>((set) => ({
  uiVisible: true,
  selectedBreedId: null,
  hoveredBreedId: null,
  activeRegion: 'Global',
  searchQuery: '',
  language: 'zh',
  coatFilter: 'all',
  activeExperience: 'atlas',
  compareBreedIds: [],
  favoriteBreedIds: readStoredList(favoriteStorageKey),
  dailyBreedId: getDailyBreedId(),
  soundEnabled: readStoredBoolean(soundStorageKey, false),
  guardianBirthday: storedGuardianMatch?.birthday ?? null,
  guardianZodiacId: storedGuardianMatch?.zodiacId ?? null,
  guardianBreedIds: storedGuardianMatch?.breedIds ?? [],
  shareCardMode: readStoredShareCardMode(),
  shareCardSide: readStoredShareCardSide(),
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
  setActiveExperience: (activeExperience) => set({ activeExperience }),
  toggleFavoriteBreed: (id) =>
    set((state) => {
      const favoriteBreedIds = state.favoriteBreedIds.includes(id)
        ? state.favoriteBreedIds.filter((breedId) => breedId !== id)
        : [...state.favoriteBreedIds, id]
      writeStoredList(favoriteStorageKey, favoriteBreedIds)
      return { favoriteBreedIds }
    }),
  toggleCompareBreed: (id) =>
    set((state) => {
      const exists = state.compareBreedIds.includes(id)
      const compareBreedIds = exists
        ? state.compareBreedIds.filter((breedId) => breedId !== id)
        : state.compareBreedIds.length >= 3
          ? state.compareBreedIds
          : [...state.compareBreedIds, id]
      return { compareBreedIds, activeExperience: 'compare' }
    }),
  clearCompare: () => set({ compareBreedIds: [] }),
  setSoundEnabled: (soundEnabled) => {
    writeStoredBoolean(soundStorageKey, soundEnabled)
    set({ soundEnabled })
  },
  setGuardianMatch: (guardianBirthday, guardianZodiacId, guardianBreedIds) => {
    writeStoredGuardianMatch({
      birthday: guardianBirthday,
      zodiacId: guardianZodiacId,
      breedIds: guardianBreedIds,
    })
    set({
      guardianBirthday,
      guardianZodiacId,
      guardianBreedIds,
      shareCardMode: 'guardian',
      shareCardSide: 'front',
    })
  },
  setShareCardMode: (shareCardMode) => {
    writeStoredShareCardMode(shareCardMode)
    set({ shareCardMode })
  },
  setShareCardSide: (shareCardSide) => {
    writeStoredShareCardSide(shareCardSide)
    set({ shareCardSide })
  },
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
      activeExperience: 'atlas',
      tooltipPosition: { x: 0, y: 0, visible: false },
    }),
}))
