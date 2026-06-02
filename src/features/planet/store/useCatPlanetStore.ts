import { create } from 'zustand'
import type {
  AtlasKindFilter,
  CoatLength,
  PersonalityZoneId,
  Region,
} from '../../breeds/data/breeds'
import type { CameraFlightTarget } from '../data/regionTargets'

export type Language = 'zh' | 'en'
export type CoatFilter = 'all' | CoatLength
export type ActiveExperience =
  | 'atlas'
  | 'route'
  | 'quiz'
  | 'compare'
  | 'constellation'
  | 'personalityMap'
  | 'passport'
export type ShareCardMode = 'guardian' | 'favorites'
export type ShareCardSide = 'front' | 'back'
export type CompanionMood = 'idle' | 'happy' | 'curious' | 'sleepy'
export type HomeMood = 'idle' | 'happy' | 'hungry' | 'clean' | 'playful' | 'sleepy'
export type HomeAction = 'feed' | 'groom' | 'clean' | 'play' | 'rest'
export type HomeInteractionMode = 'idle' | 'feeding' | 'grooming' | 'cleaning' | 'playing' | 'resting'
export type HomeWishType =
  | 'careAction'
  | 'exploreRegion'
  | 'findPersonality'
  | 'openStory'
  | 'favoriteBreed'
  | 'compareBreed'
export type HomeWishCompletionKind = 'care' | 'explore' | 'story' | 'favorite' | 'compare'
export type HomeDecorId =
  | 'soft-rug'
  | 'food-bowl'
  | 'toy-ball'
  | 'teaser-wand'
  | 'window-bed'
  | 'planet-globe'

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

interface HomeCareState {
  hunger: number
  clean: number
  energy: number
  affection: number
}

export interface HomeStatsState {
  fullness: number
  cleanliness: number
  energy: number
  mood: number
  affection: number
}

export interface HomeWishReward {
  xp: number
  affection: number
  stardust: number
}

export interface HomeDailyWish {
  id: string
  dateKey: string
  type: HomeWishType
  targetAction?: HomeAction
  targetRegion?: Exclude<Region, 'Global'>
  targetPersonalityZoneId?: PersonalityZoneId
  completed: boolean
  completedAt?: string
  reward: HomeWishReward
}

export interface HomeWishCompletionSource {
  kind: HomeWishCompletionKind
  action?: HomeAction
  region?: Region
  personalityZoneIds?: PersonalityZoneId[]
  breedId?: string
}

export interface HomeDiaryEntry {
  id: string
  createdAt: string
  breedId?: string
  wishId?: string
  action?: HomeAction
  textZh: string
  textEn: string
}

interface CatPlanetState {
  uiVisible: boolean
  selectedBreedId: string | null
  hoveredBreedId: string | null
  activeRegion: Region
  searchQuery: string
  language: Language
  coatFilter: CoatFilter
  atlasKindFilter: AtlasKindFilter
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
  exploredBreedIds: string[]
  passportStampIds: string[]
  passportStickerIds: string[]
  companionBreedId: string | null
  companionMood: CompanionMood
  companionCollapsed: boolean
  homeCatBreedId: string | null
  homeMood: HomeMood
  homeCare: HomeCareState
  homeStats: HomeStatsState
  homeLevel: number
  homeXp: number
  homeStardust: number
  homeDailyWish: HomeDailyWish
  homeWishHistory: string[]
  homeDiaryEntries: HomeDiaryEntry[]
  homeUnlockedDecorIds: HomeDecorId[]
  homeEquippedDecorIds: HomeDecorId[]
  homeLastVisitAt: string | null
  homeInteractionMode: HomeInteractionMode
  homeLastAction: HomeAction | null
  compareDropHintSeen: boolean
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
  setAtlasKindFilter: (atlasKindFilter: AtlasKindFilter) => void
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
  recordBreedExploration: (id: string, stampId: string | null) => void
  setCompanionBreed: (id: string | null) => void
  setCompanionMood: (mood: CompanionMood) => void
  setCompanionCollapsed: (collapsed: boolean) => void
  setHomeCatBreed: (id: string | null) => void
  clearHomeCatBreed: () => void
  performHomeAction: (action: HomeAction) => void
  checkInHome: () => void
  generateDailyWish: (date?: Date) => void
  completeDailyWish: (source: HomeWishCompletionSource) => void
  unlockHomeDecor: (decorId: HomeDecorId) => void
  equipHomeDecor: (decorId: HomeDecorId) => void
  appendHomeDiary: (entry: Omit<HomeDiaryEntry, 'id' | 'createdAt'>) => void
  setCompareDropHintSeen: (seen: boolean) => void
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
const exploredStorageKey = 'cat-planet.exploredBreedIds'
const passportStampStorageKey = 'cat-planet.passportStampIds'
const passportStickerStorageKey = 'cat-planet.passportStickerIds'
const companionBreedStorageKey = 'cat-planet.companionBreedId'
const companionMoodStorageKey = 'cat-planet.companionMood'
const companionCollapsedStorageKey = 'cat-planet.companionCollapsed'
const homeCatBreedStorageKey = 'cat-planet.homeCatBreedId'
const homeMoodStorageKey = 'cat-planet.homeMood'
const homeCareStorageKey = 'cat-planet.homeCare'
const homeStatsStorageKey = 'cat-planet.homeStats'
const homeLevelStorageKey = 'cat-planet.homeLevel'
const homeXpStorageKey = 'cat-planet.homeXp'
const homeStardustStorageKey = 'cat-planet.homeStardust'
const homeDailyWishStorageKey = 'cat-planet.homeDailyWish'
const homeWishHistoryStorageKey = 'cat-planet.homeWishHistory'
const homeDiaryStorageKey = 'cat-planet.homeDiaryEntries'
const homeUnlockedDecorStorageKey = 'cat-planet.homeUnlockedDecorIds'
const homeEquippedDecorStorageKey = 'cat-planet.homeEquippedDecorIds'
const homeLastVisitStorageKey = 'cat-planet.homeLastVisitAt'
const homeInteractionModeStorageKey = 'cat-planet.homeInteractionMode'
const homeLastActionStorageKey = 'cat-planet.homeLastAction'
const compareDropHintStorageKey = 'cat-planet.compareDropHintSeen'

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
  try {
    const raw = window.localStorage.getItem(key)
    if (raw === null) return fallback
    return raw === 'true'
  } catch {
    return fallback
  }
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
  try {
    const raw = window.localStorage.getItem(shareCardModeStorageKey)
    return raw === 'favorites' ? 'favorites' : 'guardian'
  } catch {
    return 'guardian'
  }
}

const readStoredShareCardSide = (): ShareCardSide => {
  if (typeof window === 'undefined') return 'front'
  try {
    const raw = window.localStorage.getItem(shareCardSideStorageKey)
    return raw === 'back' ? 'back' : 'front'
  } catch {
    return 'front'
  }
}

const readStoredString = (key: string) => {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(key)
    return raw && raw.length > 0 ? raw : null
  } catch {
    return null
  }
}

const readStoredCompanionMood = (): CompanionMood => {
  const raw = readStoredString(companionMoodStorageKey)
  return raw === 'happy' || raw === 'curious' || raw === 'sleepy' || raw === 'idle'
    ? raw
    : 'idle'
}

const readStoredHomeMood = (): HomeMood => {
  const raw = readStoredString(homeMoodStorageKey)
  return raw === 'happy'
    || raw === 'hungry'
    || raw === 'clean'
    || raw === 'playful'
    || raw === 'sleepy'
    || raw === 'idle'
    ? raw
    : 'idle'
}

const defaultHomeCare: HomeCareState = {
  hunger: 62,
  clean: 70,
  energy: 66,
  affection: 58,
}

const defaultHomeStats: HomeStatsState = {
  fullness: 62,
  cleanliness: 70,
  energy: 66,
  mood: 64,
  affection: 58,
}

const clampCareValue = (value: number) => Math.max(0, Math.min(100, Math.round(value)))
const clampHomeLevel = (value: number) => Math.max(1, Math.min(10, Math.round(value)))
const clampPositiveInt = (value: number) => Math.max(0, Math.round(Number.isFinite(value) ? value : 0))

const todayKey = (date = new Date()) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

const storageNumber = (key: string, fallback: number) => {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = window.localStorage.getItem(key)
    if (raw === null) return fallback
    const parsed = Number(raw)
    return Number.isFinite(parsed) ? parsed : fallback
  } catch {
    return fallback
  }
}

const readStoredHomeCare = (): HomeCareState => {
  if (typeof window === 'undefined') return defaultHomeCare
  try {
    const raw = window.localStorage.getItem(homeCareStorageKey)
    if (!raw) return defaultHomeCare
    const parsed = JSON.parse(raw) as Partial<HomeCareState>
    return {
      hunger: clampCareValue(Number(parsed.hunger ?? defaultHomeCare.hunger)),
      clean: clampCareValue(Number(parsed.clean ?? defaultHomeCare.clean)),
      energy: clampCareValue(Number(parsed.energy ?? defaultHomeCare.energy)),
      affection: clampCareValue(Number(parsed.affection ?? defaultHomeCare.affection)),
    }
  } catch {
    return defaultHomeCare
  }
}

const homeCareFromStats = (stats: HomeStatsState): HomeCareState => ({
  hunger: stats.fullness,
  clean: stats.cleanliness,
  energy: stats.energy,
  affection: stats.affection,
})

const homeStatsFromCare = (care: HomeCareState): HomeStatsState => ({
  fullness: care.hunger,
  cleanliness: care.clean,
  energy: care.energy,
  mood: Math.round((care.hunger + care.clean + care.energy + care.affection) / 4),
  affection: care.affection,
})

const readStoredHomeStats = (): HomeStatsState => {
  if (typeof window === 'undefined') return defaultHomeStats
  try {
    const raw = window.localStorage.getItem(homeStatsStorageKey)
    if (!raw) return homeStatsFromCare(readStoredHomeCare())
    const parsed = JSON.parse(raw) as Partial<HomeStatsState>
    return {
      fullness: clampCareValue(Number(parsed.fullness ?? defaultHomeStats.fullness)),
      cleanliness: clampCareValue(Number(parsed.cleanliness ?? defaultHomeStats.cleanliness)),
      energy: clampCareValue(Number(parsed.energy ?? defaultHomeStats.energy)),
      mood: clampCareValue(Number(parsed.mood ?? defaultHomeStats.mood)),
      affection: clampCareValue(Number(parsed.affection ?? defaultHomeStats.affection)),
    }
  } catch {
    return homeStatsFromCare(readStoredHomeCare())
  }
}

const readStoredHomeAction = (): HomeAction | null => {
  const raw = readStoredString(homeLastActionStorageKey)
  return raw === 'feed' || raw === 'groom' || raw === 'clean' || raw === 'play' || raw === 'rest' ? raw : null
}

const readStoredHomeInteractionMode = (): HomeInteractionMode => {
  const raw = readStoredString(homeInteractionModeStorageKey)
  return raw === 'feeding'
    || raw === 'grooming'
    || raw === 'cleaning'
    || raw === 'playing'
    || raw === 'resting'
    || raw === 'idle'
    ? raw
    : 'idle'
}

const validDecorIds: HomeDecorId[] = [
  'soft-rug',
  'food-bowl',
  'toy-ball',
  'teaser-wand',
  'window-bed',
  'planet-globe',
]

const readStoredDecorIds = (key: string, fallback: HomeDecorId[]) => {
  const ids = readStoredList(key).filter((id): id is HomeDecorId =>
    validDecorIds.includes(id as HomeDecorId))
  return ids.length > 0 ? ids : fallback
}

const readStoredHomeDiary = (): HomeDiaryEntry[] => {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(homeDiaryStorageKey)
    const parsed = raw ? JSON.parse(raw) : []
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter((entry): entry is HomeDiaryEntry =>
        entry
        && typeof entry.id === 'string'
        && typeof entry.createdAt === 'string'
        && typeof entry.textZh === 'string'
        && typeof entry.textEn === 'string')
      .slice(0, 12)
  } catch {
    return []
  }
}

const readStoredHomeWish = (): HomeDailyWish | null => {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(homeDailyWishStorageKey)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<HomeDailyWish>
    if (
      !parsed
      || typeof parsed.id !== 'string'
      || typeof parsed.dateKey !== 'string'
      || !parsed.type
      || typeof parsed.completed !== 'boolean'
    ) return null
    return {
      id: parsed.id,
      dateKey: parsed.dateKey,
      type: parsed.type,
      targetAction: parsed.targetAction,
      targetRegion: parsed.targetRegion,
      targetPersonalityZoneId: parsed.targetPersonalityZoneId,
      completed: parsed.completed,
      completedAt: parsed.completedAt,
      reward: {
        xp: clampPositiveInt(parsed.reward?.xp ?? 32),
        affection: clampPositiveInt(parsed.reward?.affection ?? 6),
        stardust: clampPositiveInt(parsed.reward?.stardust ?? 8),
      },
    }
  } catch {
    return null
  }
}

const writeStoredList = (key: string, value: string[]) => {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage can be unavailable in private modes; keep the app usable.
  }
}

const writeStoredBoolean = (key: string, value: boolean) => {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(key, String(value))
  } catch {
    // Ignore persistence failures.
  }
}

const writeStoredGuardianMatch = (value: StoredGuardianMatch) => {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(guardianStorageKey, JSON.stringify(value))
  } catch {
    // Ignore persistence failures.
  }
}

const writeStoredShareCardMode = (value: ShareCardMode) => {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(shareCardModeStorageKey, value)
  } catch {
    // Ignore persistence failures.
  }
}

const writeStoredShareCardSide = (value: ShareCardSide) => {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(shareCardSideStorageKey, value)
  } catch {
    // Ignore persistence failures.
  }
}

const writeStoredString = (key: string, value: string | null) => {
  if (typeof window === 'undefined') return
  try {
    if (value) {
      window.localStorage.setItem(key, value)
    } else {
      window.localStorage.removeItem(key)
    }
  } catch {
    // Ignore persistence failures.
  }
}

const writeStoredHomeCare = (value: HomeCareState) => {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(homeCareStorageKey, JSON.stringify(value))
  } catch {
    // Ignore persistence failures.
  }
}

const writeStoredHomeStats = (value: HomeStatsState) => {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(homeStatsStorageKey, JSON.stringify(value))
  } catch {
    // Ignore persistence failures.
  }
  writeStoredHomeCare(homeCareFromStats(value))
}

const writeStoredNumber = (key: string, value: number) => {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(key, String(value))
  } catch {
    // Ignore persistence failures.
  }
}

const writeStoredHomeWish = (value: HomeDailyWish) => {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(homeDailyWishStorageKey, JSON.stringify(value))
  } catch {
    // Ignore persistence failures.
  }
}

const writeStoredHomeDiary = (value: HomeDiaryEntry[]) => {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(homeDiaryStorageKey, JSON.stringify(value.slice(0, 12)))
  } catch {
    // Ignore persistence failures.
  }
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

const wishRegions: Array<Exclude<Region, 'Global'>> = [
  'Asia',
  'Europe',
  'North America',
  'Middle East',
  'Africa/Oceania',
]

const wishPersonalityZones: PersonalityZoneId[] = [
  'affectionate',
  'active',
  'calm',
  'beginner',
  'grooming',
  'lowShedding',
]

const wishActionCycle: HomeAction[] = ['feed', 'groom', 'play', 'clean']

const basicWishPool: HomeWishType[] = [
  'careAction',
  'exploreRegion',
  'findPersonality',
  'openStory',
  'favoriteBreed',
  'compareBreed',
]

const explorationWeightedWishPool: HomeWishType[] = [
  'careAction',
  'exploreRegion',
  'exploreRegion',
  'findPersonality',
  'openStory',
  'favoriteBreed',
  'compareBreed',
]

export const homeLevelTitles = {
  zh: [
    '初来猫舱',
    '熟悉你的气味',
    '会主动蹭你',
    '解锁窗边小窝',
    '星球旅行背包',
    '会等你讲故事',
    '喜欢你的收藏柜',
    '会邀请新朋友',
    '猫舱小管家',
    '专属星球伙伴',
  ],
  en: [
    'New in the cabin',
    'Knows your scent',
    'Comes closer first',
    'Window nook unlocked',
    'Planet travel pack',
    'Waits for stories',
    'Loves your favorites',
    'Invites new friends',
    'Cabin caretaker',
    'Personal planet cat',
  ],
} satisfies Record<Language, string[]>

export const homeDecorCatalog: Array<{
  id: HomeDecorId
  unlockLevel: number
  labelZh: string
  labelEn: string
  descriptionZh: string
  descriptionEn: string
}> = [
  {
    id: 'soft-rug',
    unlockLevel: 1,
    labelZh: '软软地毯',
    labelEn: 'Soft rug',
    descriptionZh: '让猫舱看起来更像真正的小家。',
    descriptionEn: 'Makes the cabin feel more like a small home.',
  },
  {
    id: 'food-bowl',
    unlockLevel: 1,
    labelZh: '小鱼食盆',
    labelEn: 'Fish bowl',
    descriptionZh: '投喂动画会从这里开始。',
    descriptionEn: 'Feeding starts from this bowl.',
  },
  {
    id: 'toy-ball',
    unlockLevel: 2,
    labelZh: '星星玩具球',
    labelEn: 'Star toy ball',
    descriptionZh: '陪玩时会滚过猫舱。',
    descriptionEn: 'Rolls through the cabin during play.',
  },
  {
    id: 'teaser-wand',
    unlockLevel: 3,
    labelZh: '逗猫棒',
    labelEn: 'Teaser wand',
    descriptionZh: '让陪玩动作更活泼。',
    descriptionEn: 'Makes play actions livelier.',
  },
  {
    id: 'window-bed',
    unlockLevel: 4,
    labelZh: '窗边小窝',
    labelEn: 'Window nook',
    descriptionZh: '休息时猫咪会去窗边看星球。',
    descriptionEn: 'The cat rests near the planet window.',
  },
  {
    id: 'planet-globe',
    unlockLevel: 5,
    labelZh: '猫咪星球仪',
    labelEn: 'Cat planet globe',
    descriptionZh: '更容易出现探索类今日愿望。',
    descriptionEn: 'Makes exploration wishes appear more often.',
  },
] 

homeLevelTitles.zh = [
  '初来猫舱',
  '熟悉你的气味',
  '会主动蹭你',
  '解锁窗边小窝',
  '星球旅行背包',
  '会等你讲故事',
  '喜欢你的收藏柜',
  '会邀请新朋友',
  '猫舱小管家',
  '专属星球伙伴',
]

Object.assign(homeDecorCatalog[0], {
  labelZh: '软软地毯',
  descriptionZh: '让猫舱看起来更像真正的小家。',
})
Object.assign(homeDecorCatalog[1], {
  labelZh: '小鱼食盆',
  descriptionZh: '投喂动画会从这里开始。',
})
Object.assign(homeDecorCatalog[2], {
  labelZh: '星星玩具球',
  descriptionZh: '陪玩时会滚过猫舱。',
})
Object.assign(homeDecorCatalog[3], {
  labelZh: '逗猫棒',
  descriptionZh: '让陪玩动作更活泼。',
})
Object.assign(homeDecorCatalog[4], {
  labelZh: '窗边小窝',
  descriptionZh: '休息时猫咪会去窗边看星球。',
})
Object.assign(homeDecorCatalog[5], {
  labelZh: '猫咪星球仪',
  descriptionZh: '更容易出现探索类今日愿望。',
})

const decorUnlockLevels: Record<HomeDecorId, number> = {
  'soft-rug': 1,
  'food-bowl': 1,
  'toy-ball': 2,
  'teaser-wand': 3,
  'window-bed': 4,
  'planet-globe': 5,
}

const getDailyBreedId = () => {
  const now = new Date()
  const seed = Number(`${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}`)
  return dailyBreedIds[seed % dailyBreedIds.length]
}

const homeXpForLevel = (level: number) => 80 + (level - 1) * 38

const calculateHomeLevel = (currentLevel: number, currentXp: number) => {
  let level = clampHomeLevel(currentLevel)
  let xp = clampPositiveInt(currentXp)
  while (level < 10 && xp >= homeXpForLevel(level)) {
    xp -= homeXpForLevel(level)
    level += 1
  }
  return { level, xp }
}

const decorIdsForLevel = (level: number) =>
  validDecorIds.filter((decorId) => decorUnlockLevels[decorId] <= level)

export const homeXpTargetForLevel = homeXpForLevel

const createDiaryEntry = (
  entry: Omit<HomeDiaryEntry, 'id' | 'createdAt'>,
  createdAt = new Date(),
): HomeDiaryEntry => ({
  ...entry,
  id: `${createdAt.getTime()}-${Math.random().toString(36).slice(2, 7)}`,
  createdAt: createdAt.toISOString(),
})

const appendDiary = (entries: HomeDiaryEntry[], entry: Omit<HomeDiaryEntry, 'id' | 'createdAt'>) =>
  [createDiaryEntry(entry), ...entries].slice(0, 12)

const createDailyWish = (
  date = new Date(),
  equippedDecorIds: HomeDecorId[] = [],
  homeCatBreedId: string | null = null,
): HomeDailyWish => {
  const dateKey = todayKey(date)
  const seed = Array.from(`${dateKey}-${homeCatBreedId ?? 'cat-planet'}`)
    .reduce((sum, char) => sum + char.charCodeAt(0), 0)
  const wishPool = equippedDecorIds.includes('planet-globe') ? explorationWeightedWishPool : basicWishPool
  const type = wishPool[seed % wishPool.length]
  const reward: HomeWishReward = {
    xp: 34 + (seed % 4) * 6,
    affection: 5 + (seed % 3),
    stardust: 8 + (seed % 5),
  }

  const wish: HomeDailyWish = {
    id: `${dateKey}-${type}`,
    dateKey,
    type,
    completed: false,
    reward,
  }

  if (type === 'careAction') {
    wish.targetAction = wishActionCycle[seed % wishActionCycle.length]
    wish.id = `${wish.id}-${wish.targetAction}`
  }
  if (type === 'exploreRegion') {
    wish.targetRegion = wishRegions[seed % wishRegions.length]
    wish.id = `${wish.id}-${wish.targetRegion}`
  }
  if (type === 'findPersonality') {
    wish.targetPersonalityZoneId = wishPersonalityZones[seed % wishPersonalityZones.length]
    wish.id = `${wish.id}-${wish.targetPersonalityZoneId}`
  }

  return wish
}

const wishMatchesSource = (wish: HomeDailyWish, source: HomeWishCompletionSource) => {
  if (wish.completed) return false
  if (wish.type === 'careAction') {
    return source.kind === 'care' && source.action === wish.targetAction
  }
  if (wish.type === 'exploreRegion') {
    return source.kind === 'explore' && source.region === wish.targetRegion
  }
  if (wish.type === 'findPersonality') {
    const zoneId = wish.targetPersonalityZoneId
    if (!zoneId) return false
    return source.kind === 'explore'
      && Boolean(source.personalityZoneIds?.includes(zoneId))
  }
  if (wish.type === 'openStory') return source.kind === 'story'
  if (wish.type === 'favoriteBreed') return source.kind === 'favorite'
  if (wish.type === 'compareBreed') return source.kind === 'compare'
  return false
}

const daysBetween = (fromIso: string | null, to = new Date()) => {
  if (!fromIso) return 0
  const from = new Date(fromIso)
  if (Number.isNaN(from.getTime())) return 0
  const diff = to.getTime() - from.getTime()
  return Math.max(0, Math.floor(diff / 86_400_000))
}

const gentlyDecayHomeStats = (stats: HomeStatsState, daysAway: number) => {
  if (daysAway <= 0) return stats
  const decay = Math.min(18, daysAway * 4)
  return {
    fullness: clampCareValue(stats.fullness - decay),
    cleanliness: clampCareValue(stats.cleanliness - Math.min(14, daysAway * 3)),
    energy: clampCareValue(Math.max(48, stats.energy - Math.min(10, daysAway * 2))),
    mood: clampCareValue(Math.max(42, stats.mood - Math.min(12, daysAway * 3))),
    affection: stats.affection,
  }
}

type HomeRewardState = Pick<
  CatPlanetState,
  | 'homeDailyWish'
  | 'homeLevel'
  | 'homeXp'
  | 'homeStardust'
  | 'homeStats'
  | 'homeWishHistory'
  | 'homeDiaryEntries'
  | 'homeUnlockedDecorIds'
>

type HomeRewardPatch = Pick<
  CatPlanetState,
  | 'homeDailyWish'
  | 'homeWishHistory'
  | 'homeDiaryEntries'
  | 'homeStats'
  | 'homeCare'
  | 'homeLevel'
  | 'homeXp'
  | 'homeStardust'
  | 'homeUnlockedDecorIds'
  | 'homeMood'
  | 'companionMood'
>

const completeWishIfMatched = (
  state: HomeRewardState,
  source: HomeWishCompletionSource,
  diaryEntry: Omit<HomeDiaryEntry, 'id' | 'createdAt'>,
  statBoost: Partial<HomeStatsState> = {},
  homeMood: HomeMood = 'happy',
  companionMood: CompanionMood = 'happy',
): HomeRewardPatch | null => {
  if (!wishMatchesSource(state.homeDailyWish, source)) return null

  const completedWish: HomeDailyWish = {
    ...state.homeDailyWish,
    completed: true,
    completedAt: new Date().toISOString(),
  }
  const xpState = calculateHomeLevel(state.homeLevel, state.homeXp + state.homeDailyWish.reward.xp)
  const homeStats: HomeStatsState = {
    fullness: clampCareValue(state.homeStats.fullness + (statBoost.fullness ?? 0)),
    cleanliness: clampCareValue(state.homeStats.cleanliness + (statBoost.cleanliness ?? 0)),
    energy: clampCareValue(state.homeStats.energy + (statBoost.energy ?? 0)),
    mood: clampCareValue(state.homeStats.mood + (statBoost.mood ?? 8)),
    affection: clampCareValue(
      state.homeStats.affection + state.homeDailyWish.reward.affection + (statBoost.affection ?? 0),
    ),
  }
  const homeUnlockedDecorIds = [
    ...new Set([...state.homeUnlockedDecorIds, ...decorIdsForLevel(xpState.level)]),
  ] as HomeDecorId[]
  const homeWishHistory = [state.homeDailyWish.id, ...state.homeWishHistory].slice(0, 30)
  const homeDiaryEntries = appendDiary(state.homeDiaryEntries, {
    ...diaryEntry,
    wishId: state.homeDailyWish.id,
  })
  const homeStardust = state.homeStardust + state.homeDailyWish.reward.stardust

  writeStoredHomeWish(completedWish)
  writeStoredList(homeWishHistoryStorageKey, homeWishHistory)
  writeStoredHomeDiary(homeDiaryEntries)
  writeStoredHomeStats(homeStats)
  writeStoredNumber(homeLevelStorageKey, xpState.level)
  writeStoredNumber(homeXpStorageKey, xpState.xp)
  writeStoredNumber(homeStardustStorageKey, homeStardust)
  writeStoredList(homeUnlockedDecorStorageKey, homeUnlockedDecorIds)
  writeStoredString(homeMoodStorageKey, homeMood)
  writeStoredString(companionMoodStorageKey, companionMood)

  return {
    homeDailyWish: completedWish,
    homeWishHistory,
    homeDiaryEntries,
    homeStats,
    homeCare: homeCareFromStats(homeStats),
    homeLevel: xpState.level,
    homeXp: xpState.xp,
    homeStardust,
    homeUnlockedDecorIds,
    homeMood,
    companionMood,
  }
}

const storedGuardianMatch = readStoredGuardianMatch()
const storedHomeStats = readStoredHomeStats()
const storedHomeLevel = clampHomeLevel(storageNumber(homeLevelStorageKey, 1))
const storedHomeXp = clampPositiveInt(storageNumber(homeXpStorageKey, 0))
const storedHomeDailyWish = readStoredHomeWish()
const storedHomeUnlockedDecorIds = readStoredDecorIds(homeUnlockedDecorStorageKey, ['soft-rug', 'food-bowl'])
const storedHomeEquippedDecorIds = readStoredDecorIds(homeEquippedDecorStorageKey, storedHomeUnlockedDecorIds.slice(0, 3))
const storedHomeCatBreedId = readStoredString(homeCatBreedStorageKey) ?? getDailyBreedId()
const storedCompanionBreedId = readStoredString(companionBreedStorageKey) ?? storedHomeCatBreedId
const initialHomeWish = storedHomeDailyWish?.dateKey === todayKey()
  ? storedHomeDailyWish
  : createDailyWish(new Date(), storedHomeEquippedDecorIds, storedHomeCatBreedId)

export const useCatPlanetStore = create<CatPlanetState>((set) => ({
  uiVisible: true,
  selectedBreedId: null,
  hoveredBreedId: null,
  activeRegion: 'Global',
  searchQuery: '',
  language: 'zh',
  coatFilter: 'all',
  atlasKindFilter: 'all',
  activeExperience: 'passport',
  compareBreedIds: [],
  favoriteBreedIds: readStoredList(favoriteStorageKey),
  dailyBreedId: getDailyBreedId(),
  soundEnabled: readStoredBoolean(soundStorageKey, false),
  guardianBirthday: storedGuardianMatch?.birthday ?? null,
  guardianZodiacId: storedGuardianMatch?.zodiacId ?? null,
  guardianBreedIds: storedGuardianMatch?.breedIds ?? [],
  shareCardMode: readStoredShareCardMode(),
  shareCardSide: readStoredShareCardSide(),
  exploredBreedIds: readStoredList(exploredStorageKey),
  passportStampIds: readStoredList(passportStampStorageKey),
  passportStickerIds: readStoredList(passportStickerStorageKey),
  companionBreedId: storedCompanionBreedId,
  companionMood: readStoredCompanionMood(),
  companionCollapsed: readStoredBoolean(companionCollapsedStorageKey, false),
  homeCatBreedId: storedHomeCatBreedId,
  homeMood: readStoredHomeMood(),
  homeCare: homeCareFromStats(storedHomeStats),
  homeStats: storedHomeStats,
  homeLevel: storedHomeLevel,
  homeXp: storedHomeXp,
  homeStardust: clampPositiveInt(storageNumber(homeStardustStorageKey, 0)),
  homeDailyWish: initialHomeWish,
  homeWishHistory: readStoredList(homeWishHistoryStorageKey),
  homeDiaryEntries: readStoredHomeDiary(),
  homeUnlockedDecorIds: storedHomeUnlockedDecorIds,
  homeEquippedDecorIds: storedHomeEquippedDecorIds,
  homeLastVisitAt: readStoredString(homeLastVisitStorageKey),
  homeInteractionMode: readStoredHomeInteractionMode(),
  homeLastAction: readStoredHomeAction(),
  compareDropHintSeen: readStoredBoolean(compareDropHintStorageKey, false),
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
  setAtlasKindFilter: (atlasKindFilter) => set({ atlasKindFilter }),
  setActiveExperience: (activeExperience) => set({ activeExperience }),
  toggleFavoriteBreed: (id) =>
    set((state) => {
      const wasFavorite = state.favoriteBreedIds.includes(id)
      const favoriteBreedIds = wasFavorite
        ? state.favoriteBreedIds.filter((breedId) => breedId !== id)
        : [...state.favoriteBreedIds, id]
      writeStoredList(favoriteStorageKey, favoriteBreedIds)
      const rewardPatch = !wasFavorite
        ? completeWishIfMatched(
            state,
            { kind: 'favorite', breedId: id },
            {
              breedId: id,
              textZh: '今天你把一只喜欢的猫咪收进了星球收藏墙，小家伙伴也记住了这个坐标。',
              textEn: 'Today you saved a favorite cat coordinate, and your home cat kept it as a little memory.',
            },
            { mood: 8 },
            'happy',
            'happy',
          )
        : null
      return {
        favoriteBreedIds,
        ...(rewardPatch ?? {}),
      }
    }),
  toggleCompareBreed: (id) =>
    set((state) => {
      const exists = state.compareBreedIds.includes(id)
      const compareBreedIds = exists
        ? state.compareBreedIds.filter((breedId) => breedId !== id)
        : state.compareBreedIds.length >= 3
          ? state.compareBreedIds
          : [...state.compareBreedIds, id]
      const wishCompleted = !exists
        && compareBreedIds.includes(id)
        && wishMatchesSource(state.homeDailyWish, { kind: 'compare', breedId: id })
      const rewardPatch = wishCompleted
        ? completeWishIfMatched(
            state,
            { kind: 'compare', breedId: id },
            {
              breedId: id,
              textZh: '今天你帮它找到了一个可以对比的新朋友，猫舱里的小球也滚了一圈。',
              textEn: 'Today you found a new comparison friend, and the little ball rolled across the cabin.',
            },
            { mood: 7 },
            'playful',
            'curious',
          )
        : null
      return {
        compareBreedIds,
        activeExperience: 'compare',
        ...(rewardPatch ?? {}),
      }
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
  recordBreedExploration: (id, stampId) =>
    set((state) => {
      const exploredBreedIds = state.exploredBreedIds.includes(id)
        ? state.exploredBreedIds
        : [id, ...state.exploredBreedIds]
      const passportStickerIds = state.passportStickerIds.includes(id)
        ? state.passportStickerIds
        : [id, ...state.passportStickerIds]
      const passportStampIds = stampId && !state.passportStampIds.includes(stampId)
        ? [stampId, ...state.passportStampIds]
        : state.passportStampIds
      const companionBreedId = state.companionBreedId ?? id
      const homeCatBreedId = state.homeCatBreedId ?? id
      const rewardPatch = completeWishIfMatched(
        state,
        {
          kind: 'explore',
          breedId: id,
          region: stampId === 'stamp-asia'
            ? 'Asia'
            : stampId === 'stamp-europe'
              ? 'Europe'
              : stampId === 'stamp-north-america'
                ? 'North America'
                : stampId === 'stamp-middle-east'
                  ? 'Middle East'
                  : stampId === 'stamp-africa-oceania'
                    ? 'Africa/Oceania'
                    : undefined,
        },
        {
          breedId: id,
          textZh: '今天你带我认识了一只新的星球猫咪，它的坐标被放进了猫舱日记。',
          textEn: 'Today you introduced me to a new planet cat, and its coordinate went into the cabin diary.',
        },
        { mood: 8, affection: 2 },
        'happy',
        'curious',
      )

      writeStoredList(exploredStorageKey, exploredBreedIds)
      writeStoredList(passportStickerStorageKey, passportStickerIds)
      writeStoredList(passportStampStorageKey, passportStampIds)
      writeStoredString(companionBreedStorageKey, companionBreedId)
      writeStoredString(homeCatBreedStorageKey, homeCatBreedId)
      writeStoredString(companionMoodStorageKey, 'happy')
      writeStoredString(homeMoodStorageKey, 'happy')

      return {
        exploredBreedIds,
        passportStickerIds,
        passportStampIds,
        companionBreedId,
        homeCatBreedId,
        companionMood: 'happy',
        homeMood: 'happy',
        ...(rewardPatch ?? {}),
      }
    }),
  setCompanionBreed: (companionBreedId) => {
    writeStoredString(companionBreedStorageKey, companionBreedId)
    writeStoredString(homeCatBreedStorageKey, companionBreedId)
    writeStoredString(companionMoodStorageKey, companionBreedId ? 'happy' : 'idle')
    writeStoredString(homeMoodStorageKey, companionBreedId ? 'happy' : 'idle')
    set({
      companionBreedId,
      homeCatBreedId: companionBreedId,
      companionMood: companionBreedId ? 'happy' : 'idle',
      homeMood: companionBreedId ? 'happy' : 'idle',
    })
  },
  setCompanionMood: (companionMood) => {
    writeStoredString(companionMoodStorageKey, companionMood)
    set({ companionMood })
  },
  setCompanionCollapsed: (companionCollapsed) => {
    writeStoredBoolean(companionCollapsedStorageKey, companionCollapsed)
    set({ companionCollapsed })
  },
  setHomeCatBreed: (homeCatBreedId) => {
    const homeMood: HomeMood = homeCatBreedId ? 'happy' : 'idle'
    writeStoredString(homeCatBreedStorageKey, homeCatBreedId)
    writeStoredString(companionBreedStorageKey, homeCatBreedId)
    writeStoredString(homeMoodStorageKey, homeMood)
    writeStoredString(companionMoodStorageKey, homeCatBreedId ? 'happy' : 'idle')
    set((state) => {
      const homeDiaryEntries = homeCatBreedId
        ? appendDiary(state.homeDiaryEntries, {
            breedId: homeCatBreedId,
            textZh: '新的小家伙伴入住了猫舱，今天的小房间开始有了专属气味。',
            textEn: 'A new home cat moved into the cabin, and the room started to feel like theirs.',
          })
        : state.homeDiaryEntries
      if (homeCatBreedId) writeStoredHomeDiary(homeDiaryEntries)
      return {
      homeCatBreedId,
      companionBreedId: homeCatBreedId,
      homeMood,
      companionMood: homeCatBreedId ? 'happy' : 'idle',
      homeDiaryEntries,
    }
    })
  },
  clearHomeCatBreed: () => {
    writeStoredString(homeCatBreedStorageKey, null)
    writeStoredString(companionBreedStorageKey, null)
    writeStoredString(homeMoodStorageKey, 'idle')
    writeStoredString(companionMoodStorageKey, 'idle')
    set({
      homeCatBreedId: null,
      companionBreedId: null,
      homeMood: 'idle',
      companionMood: 'idle',
      homeInteractionMode: 'idle',
      homeLastAction: null,
    })
  },
  performHomeAction: (homeLastAction) =>
    set((state) => {
      const actionDelta: Record<HomeAction, Partial<HomeStatsState>> = {
        feed: { fullness: 22, energy: 4, mood: 8, affection: 4 },
        groom: { cleanliness: 16, mood: 8, affection: 8, energy: -3 },
        clean: { cleanliness: 24, mood: 6, affection: 3, energy: -4 },
        play: { energy: -14, mood: 18, affection: 12, fullness: -5 },
        rest: { energy: 18, mood: 6, fullness: -3 },
      }
      const actionMood: Record<HomeAction, HomeMood> = {
        feed: 'happy',
        groom: 'clean',
        clean: 'clean',
        play: 'playful',
        rest: 'sleepy',
      }
      const interactionMode: Record<HomeAction, HomeInteractionMode> = {
        feed: 'feeding',
        groom: 'grooming',
        clean: 'cleaning',
        play: 'playing',
        rest: 'resting',
      }
      const delta = actionDelta[homeLastAction]
      const baseStats = {
        fullness: clampCareValue(state.homeStats.fullness + (delta.fullness ?? -1)),
        cleanliness: clampCareValue(state.homeStats.cleanliness + (delta.cleanliness ?? -1)),
        energy: clampCareValue(state.homeStats.energy + (delta.energy ?? -1)),
        mood: clampCareValue(state.homeStats.mood + (delta.mood ?? 0)),
        affection: clampCareValue(state.homeStats.affection + (delta.affection ?? 0)),
      }
      const homeMood = actionMood[homeLastAction]
      const rewardPatch = completeWishIfMatched(
        { ...state, homeStats: baseStats },
        { kind: 'care', action: homeLastAction },
        {
          action: homeLastAction,
          textZh: '今天的小愿望完成了，猫咪把这次照顾记成了一颗暖暖的星尘。',
          textEn: 'Today the little wish was completed, and your cat saved this care moment as warm stardust.',
        },
        { mood: 4 },
        homeMood,
        homeMood === 'playful' ? 'curious' : 'happy',
      )
      const homeStats = rewardPatch?.homeStats ?? baseStats
      const homeCare = homeCareFromStats(homeStats)
      writeStoredHomeStats(homeStats)
      writeStoredString(homeMoodStorageKey, homeMood)
      writeStoredString(homeLastActionStorageKey, homeLastAction)
      writeStoredString(homeInteractionModeStorageKey, interactionMode[homeLastAction])
      writeStoredString(companionMoodStorageKey, homeMood === 'playful' ? 'curious' : 'happy')
      return {
        ...(rewardPatch ?? {}),
        homeStats,
        homeCare,
        homeMood,
        homeLastAction,
        homeInteractionMode: interactionMode[homeLastAction],
        companionMood: homeMood === 'playful' ? 'curious' : 'happy',
      }
    }),
  checkInHome: () =>
    set((state) => {
      const now = new Date()
      const daysAway = daysBetween(state.homeLastVisitAt, now)
      const homeStats = gentlyDecayHomeStats(state.homeStats, daysAway)
      const dateKey = todayKey(now)
      const homeDailyWish = state.homeDailyWish.dateKey === dateKey
        ? state.homeDailyWish
        : createDailyWish(now, state.homeEquippedDecorIds, state.homeCatBreedId)
      const homeDiaryEntries = daysAway >= 2
        ? appendDiary(state.homeDiaryEntries, {
            textZh: '我睡了很久，刚好等你回来。今天可以从一个小愿望开始。',
            textEn: 'I slept for a long while and happened to be waiting when you came back. We can start with one small wish today.',
          })
        : state.homeDiaryEntries
      const lastVisit = now.toISOString()
      writeStoredHomeStats(homeStats)
      writeStoredHomeWish(homeDailyWish)
      writeStoredHomeDiary(homeDiaryEntries)
      writeStoredString(homeLastVisitStorageKey, lastVisit)
      return {
        homeStats,
        homeCare: homeCareFromStats(homeStats),
        homeDailyWish,
        homeDiaryEntries,
        homeLastVisitAt: lastVisit,
      }
    }),
  generateDailyWish: (date = new Date()) =>
    set((state) => {
      const homeDailyWish = createDailyWish(date, state.homeEquippedDecorIds, state.homeCatBreedId)
      writeStoredHomeWish(homeDailyWish)
      return { homeDailyWish }
    }),
  completeDailyWish: (source) =>
    set((state) => {
      const rewardPatch = completeWishIfMatched(
        state,
        source,
        {
          breedId: source.breedId,
          textZh: '今天的小愿望完成了，猫舱多了一段新的星球回忆。',
          textEn: 'Today the little wish was completed, and the cabin gained a new planet memory.',
        },
        { mood: 8 },
        source.kind === 'compare' ? 'playful' : 'happy',
        source.kind === 'compare' ? 'curious' : 'happy',
      )
      return rewardPatch ?? {}
    }),
  unlockHomeDecor: (decorId) =>
    set((state) => {
      if (state.homeUnlockedDecorIds.includes(decorId)) return {}
      const homeUnlockedDecorIds = [...state.homeUnlockedDecorIds, decorId]
      writeStoredList(homeUnlockedDecorStorageKey, homeUnlockedDecorIds)
      return { homeUnlockedDecorIds }
    }),
  equipHomeDecor: (decorId) =>
    set((state) => {
      if (!state.homeUnlockedDecorIds.includes(decorId)) return {}
      const homeEquippedDecorIds = state.homeEquippedDecorIds.includes(decorId)
        ? state.homeEquippedDecorIds.filter((id) => id !== decorId)
        : [...state.homeEquippedDecorIds, decorId].slice(-4)
      writeStoredList(homeEquippedDecorStorageKey, homeEquippedDecorIds)
      return { homeEquippedDecorIds }
    }),
  appendHomeDiary: (entry) =>
    set((state) => {
      const homeDiaryEntries = appendDiary(state.homeDiaryEntries, entry)
      writeStoredHomeDiary(homeDiaryEntries)
      return { homeDiaryEntries }
    }),
  setCompareDropHintSeen: (compareDropHintSeen) => {
    writeStoredBoolean(compareDropHintStorageKey, compareDropHintSeen)
    set({ compareDropHintSeen })
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
