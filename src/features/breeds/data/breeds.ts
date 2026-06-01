export type Region =
  | 'Global'
  | 'Asia'
  | 'Europe'
  | 'North America'
  | 'Middle East'
  | 'Africa/Oceania'

export type CoordinateConfidence = 'high' | 'medium' | 'low'
export type CoatLength = 'short' | 'long' | 'hairless' | 'rex' | 'mixed'
export type MarkerSize = 'compact' | 'standard' | 'large' | 'low'
export type MarkerEarStyle = 'upright' | 'large' | 'folded' | 'curled'
export type MarkerTailStyle = 'normal' | 'short' | 'plume'
export type MarkerPattern = 'solid' | 'point' | 'spots' | 'stripes' | 'shaded'
export type StoryTone = 'funny' | 'touching' | 'legend' | 'history' | 'care'
export type StorySourceType = 'official' | 'association' | 'reference' | 'news' | 'culture'
export type ExternalStoryTone = 'funny' | 'touching' | 'informative' | 'legendary'
export type ExternalStorySourceType = 'news' | 'video' | 'rescue' | 'culture' | 'official'
export type ExternalStoryPlatform = 'YouTube' | 'Bilibili' | 'Website' | 'TikTok' | 'Other'
export type IconFaceShape = 'round' | 'heart' | 'wedge' | 'long' | 'flat' | 'wild' | 'small'
export type IconCoatVolume = 'sleek' | 'medium' | 'fluffy' | 'rex' | 'hairless'
export type IconBadgeShape = 'circle' | 'scallop' | 'shield' | 'diamond' | 'cloud' | 'leaf' | 'ticket' | 'wave' | 'moon'
export type IconSignatureMark =
  | 'star'
  | 'moon'
  | 'heart'
  | 'spark'
  | 'leaf'
  | 'crown'
  | 'snow'
  | 'wave'
  | 'sun'
  | 'diamond'
  | 'shoe'
  | 'bob'
  | 'curl'
  | 'mask'
  | 'none'

export interface BreedPhoto {
  src: string
  altZh: string
  altEn: string
  credit: string
  license: string
  sourceUrl: string
  objectPosition?: string
  markerSrc?: string
  markerObjectPosition?: string
  fit?: 'cover' | 'contain'
  verifiedBreedPhoto?: boolean
}

export interface BreedStory {
  titleZh: string
  titleEn: string
  bodyZh: string
  bodyEn: string
  sourceName: string
  sourceUrl: string
  type: 'history' | 'news' | 'culture' | 'anecdote'
  tone?: StoryTone
  sourceType?: StorySourceType
}

export interface VerifiedBreedStory extends BreedStory {
  tone: StoryTone
  sourceType: StorySourceType
  evidenceNoteZh: string
  evidenceNoteEn: string
}

export interface BreedIconProfile {
  badgeShape: IconBadgeShape
  faceShape: IconFaceShape
  baseColor: string
  secondaryColor: string
  accentColor: string
  pattern: MarkerPattern
  eyeColor: string
  earStyle: MarkerEarStyle
  tailStyle: MarkerTailStyle
  coatVolume: IconCoatVolume
  signatureMark: IconSignatureMark
  shortCode: string
}

export interface BreedLocalized {
  zh: {
    name: string
    summary: string
    traits: string[]
  }
  en: {
    name: string
    summary: string
    traits: string[]
  }
}

export interface BreedDetailFacts {
  size: string
  lifespan: string
  temperament: string[]
  care: string
  colors: string[]
}

export interface BreedMarkerProfile {
  size: MarkerSize
  ears: MarkerEarStyle
  tail: MarkerTailStyle
  pattern: MarkerPattern
  coat: CoatLength
  accent: string
}

export interface BreedReadingSection {
  titleZh: string
  titleEn: string
  bodyZh: string
  bodyEn: string
}

export interface BreedSourceLink {
  labelZh: string
  labelEn: string
  url: string
  type: 'tica' | 'photo' | 'story' | 'reference'
}

export interface BreedExternalStory {
  titleZh: string
  titleEn: string
  summaryZh: string
  summaryEn: string
  url: string
  sourceName: string
  sourceType: ExternalStorySourceType
  tone: ExternalStoryTone
  platform?: ExternalStoryPlatform
}

interface BaseBreedOrigin {
  id: string
  ticaName: string
  zhName: string
  originLabel: string
  countries: string[]
  lat: number
  lon: number
  region: Exclude<Region, 'Global'>
  status: string
  confidence: CoordinateConfidence
  summary: string
  traits: string[]
  sourceUrl: string
}

export interface BreedOrigin extends BaseBreedOrigin {
  zhAliases: string[]
  searchTokens: string[]
  commonChineseSearches: string[]
  localized: BreedLocalized
  coatLength: CoatLength
  photo: BreedPhoto
  story: VerifiedBreedStory
  verifiedStory: VerifiedBreedStory
  detailFacts: BreedDetailFacts
  markerProfile: BreedMarkerProfile
  breedIconProfile: BreedIconProfile
  readingSections: BreedReadingSection[]
  sourceLinks: BreedSourceLink[]
  externalStories: BreedExternalStory[]
}

export const ticaBreedSource = 'https://tica.org/ticas-breeds/browse-all-breeds/'

const baseBreeds: BaseBreedOrigin[] = [
  {
    id: 'abyssinian',
    ticaName: 'Abyssinian',
    zhName: '阿比西尼亚猫',
    originLabel: 'Ethiopia / United Kingdom',
    countries: ['ET', 'GB'],
    lat: 9.145,
    lon: 40.4897,
    region: 'Africa/Oceania',
    status: 'TICA recognized',
    confidence: 'medium',
    summary: 'An ancient-looking ticked coat breed associated with East Africa and refined in Britain.',
    traits: ['ticked coat', 'active', 'slender'],
    sourceUrl: 'https://tica.org/breed/abyssinian/',
  },
  {
    id: 'aegean',
    ticaName: 'Aegean',
    zhName: '爱琴猫',
    originLabel: 'Greece',
    countries: ['GR'],
    lat: 39.0742,
    lon: 21.8243,
    region: 'Europe',
    status: 'TICA recognized',
    confidence: 'medium',
    summary: 'A natural Greek island cat known for adaptable temperament and semi-long coat.',
    traits: ['natural breed', 'semi-longhair', 'social'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'american-bobtail',
    ticaName: 'American Bobtail',
    zhName: '美国短尾猫',
    originLabel: 'United States',
    countries: ['US'],
    lat: 39.8283,
    lon: -98.5795,
    region: 'North America',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'A muscular North American breed defined by its expressive short tail.',
    traits: ['bobtail', 'sturdy', 'adaptable'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'american-curl',
    ticaName: 'American Curl',
    zhName: '美国卷耳猫',
    originLabel: 'California, United States',
    countries: ['US'],
    lat: 36.7783,
    lon: -119.4179,
    region: 'North America',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'A California-origin breed recognized for backward-curled ears and balanced personality.',
    traits: ['curled ears', 'playful', 'medium build'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'american-shorthair',
    ticaName: 'American Shorthair',
    zhName: '美国短毛猫',
    originLabel: 'United States',
    countries: ['US'],
    lat: 39.8283,
    lon: -98.5795,
    region: 'North America',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'A classic working-cat lineage from North America with a dense short coat.',
    traits: ['shorthair', 'robust', 'easygoing'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'american-wirehair',
    ticaName: 'American Wirehair',
    zhName: '美国刚毛猫',
    originLabel: 'New York, United States',
    countries: ['US'],
    lat: 42.9538,
    lon: -75.5268,
    region: 'North America',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'A spontaneous New York mutation with a resilient crimped coat texture.',
    traits: ['wire coat', 'rare', 'calm'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'balinese',
    ticaName: 'Balinese',
    zhName: '巴厘猫',
    originLabel: 'United States',
    countries: ['US'],
    lat: 39.8283,
    lon: -98.5795,
    region: 'North America',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'A longhaired Siamese-family breed developed in North America.',
    traits: ['colorpoint', 'longhair', 'vocal'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'bengal',
    ticaName: 'Bengal',
    zhName: '孟加拉猫',
    originLabel: 'United States',
    countries: ['US'],
    lat: 39.8283,
    lon: -98.5795,
    region: 'North America',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'A spotted and marbled breed developed from domestic lines and Asian leopard cat ancestry.',
    traits: ['spotted coat', 'athletic', 'curious'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'birman',
    ticaName: 'Birman',
    zhName: '伯曼猫',
    originLabel: 'Myanmar / France',
    countries: ['MM', 'FR'],
    lat: 21.9162,
    lon: 95.956,
    region: 'Asia',
    status: 'TICA recognized',
    confidence: 'medium',
    summary: 'A colorpointed longhair with white gloves, historically tied to Burma and developed in Europe.',
    traits: ['colorpoint', 'white gloves', 'gentle'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'bombay',
    ticaName: 'Bombay',
    zhName: '孟买猫',
    originLabel: 'United States',
    countries: ['US'],
    lat: 39.8283,
    lon: -98.5795,
    region: 'North America',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'A sleek black breed created to evoke a miniature black panther.',
    traits: ['black coat', 'copper eyes', 'affectionate'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'british-shorthair',
    ticaName: 'British Shorthair',
    zhName: '英国短毛猫',
    originLabel: 'United Kingdom',
    countries: ['GB'],
    lat: 55.3781,
    lon: -3.436,
    region: 'Europe',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'A dense-coated British breed with a broad head and substantial body.',
    traits: ['plush coat', 'round face', 'steady'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'burmese',
    ticaName: 'Burmese',
    zhName: '缅甸猫',
    originLabel: 'Myanmar / United States',
    countries: ['MM', 'US'],
    lat: 21.9162,
    lon: 95.956,
    region: 'Asia',
    status: 'TICA recognized',
    confidence: 'medium',
    summary: 'A people-oriented breed rooted in Burmese ancestry and modern breeding programs.',
    traits: ['silky coat', 'expressive', 'social'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'chartreux',
    ticaName: 'Chartreux',
    zhName: '沙特尔猫',
    originLabel: 'France',
    countries: ['FR'],
    lat: 46.2276,
    lon: 2.2137,
    region: 'Europe',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'A French blue cat with a woolly coat and quiet, observant demeanor.',
    traits: ['blue coat', 'sturdy', 'quiet'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'chausie',
    ticaName: 'Chausie',
    zhName: '狮子猫',
    originLabel: 'United States / Nile region ancestry',
    countries: ['US', 'EG'],
    lat: 39.8283,
    lon: -98.5795,
    region: 'North America',
    status: 'TICA recognized',
    confidence: 'medium',
    summary: 'A tall athletic breed developed from domestic cats with jungle cat ancestry.',
    traits: ['athletic', 'tall', 'short coat'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'cornish-rex',
    ticaName: 'Cornish Rex',
    zhName: '柯尼斯卷毛猫',
    originLabel: 'Cornwall, United Kingdom',
    countries: ['GB'],
    lat: 50.266,
    lon: -5.0527,
    region: 'Europe',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'A curly-coated breed from Cornwall with a light body and high-energy style.',
    traits: ['curly coat', 'lean', 'active'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'devon-rex',
    ticaName: 'Devon Rex',
    zhName: '德文卷毛猫',
    originLabel: 'Devon, United Kingdom',
    countries: ['GB'],
    lat: 50.7156,
    lon: -3.5309,
    region: 'Europe',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'A Devon-origin curly breed with large ears and an impish look.',
    traits: ['curly coat', 'large ears', 'lively'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'egyptian-mau',
    ticaName: 'Egyptian Mau',
    zhName: '埃及猫',
    originLabel: 'Egypt',
    countries: ['EG'],
    lat: 26.8206,
    lon: 30.8025,
    region: 'Middle East',
    status: 'TICA recognized',
    confidence: 'medium',
    summary: 'A naturally spotted breed associated with Egyptian cats and elegant athleticism.',
    traits: ['spotted coat', 'fast', 'green eyes'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'exotic-shorthair',
    ticaName: 'Exotic Shorthair',
    zhName: '异国短毛猫',
    originLabel: 'United States',
    countries: ['US'],
    lat: 39.8283,
    lon: -98.5795,
    region: 'North America',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'A short-coated Persian-family breed with a plush coat and round expression.',
    traits: ['plush coat', 'round face', 'quiet'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'havana',
    ticaName: 'Havana',
    zhName: '哈瓦那棕猫',
    originLabel: 'United Kingdom',
    countries: ['GB'],
    lat: 55.3781,
    lon: -3.436,
    region: 'Europe',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'A chocolate-brown breed developed in Britain from Siamese-related lines.',
    traits: ['brown coat', 'green eyes', 'curious'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'japanese-bobtail',
    ticaName: 'Japanese Bobtail',
    zhName: '日本短尾猫',
    originLabel: 'Japan',
    countries: ['JP'],
    lat: 36.2048,
    lon: 138.2529,
    region: 'Asia',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'A historic Japanese breed famous for a pom-like short tail.',
    traits: ['bobtail', 'agile', 'expressive'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'korat',
    ticaName: 'Korat',
    zhName: '呵叻猫',
    originLabel: 'Thailand',
    countries: ['TH'],
    lat: 15.87,
    lon: 100.9925,
    region: 'Asia',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'A silver-blue Thai breed traditionally associated with good fortune.',
    traits: ['silver blue', 'heart face', 'devoted'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'la-perm',
    ticaName: 'LaPerm',
    zhName: '拉邦猫',
    originLabel: 'Oregon, United States',
    countries: ['US'],
    lat: 43.8041,
    lon: -120.5542,
    region: 'North America',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'An Oregon farm-origin curly-coated breed with a light, springy coat.',
    traits: ['curly coat', 'friendly', 'medium build'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'lykoi',
    ticaName: 'Lykoi',
    zhName: '狼人猫',
    originLabel: 'United States',
    countries: ['US'],
    lat: 39.8283,
    lon: -98.5795,
    region: 'North America',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'A distinctive partially hairless breed with a roan coat pattern.',
    traits: ['roan coat', 'partial hairless', 'alert'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'maine-coon',
    ticaName: 'Maine Coon',
    zhName: '缅因猫',
    originLabel: 'Maine, United States',
    countries: ['US'],
    lat: 45.2538,
    lon: -69.4455,
    region: 'North America',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'A large North American longhair adapted to cold New England conditions.',
    traits: ['large', 'longhair', 'gentle'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'manx',
    ticaName: 'Manx',
    zhName: '曼岛猫',
    originLabel: 'Isle of Man',
    countries: ['IM'],
    lat: 54.2361,
    lon: -4.5481,
    region: 'Europe',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'A tailless or short-tailed island breed from the Irish Sea.',
    traits: ['tailless', 'round body', 'strong hindquarters'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'munchkin',
    ticaName: 'Munchkin',
    zhName: '曼基康猫',
    originLabel: 'United States',
    countries: ['US'],
    lat: 39.8283,
    lon: -98.5795,
    region: 'North America',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'A short-legged breed developed in the United States from a natural mutation.',
    traits: ['short legs', 'playful', 'compact'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'norwegian-forest',
    ticaName: 'Norwegian Forest',
    zhName: '挪威森林猫',
    originLabel: 'Norway',
    countries: ['NO'],
    lat: 60.472,
    lon: 8.4689,
    region: 'Europe',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'A weatherproof Scandinavian longhair with a strong climbing build.',
    traits: ['longhair', 'water-resistant coat', 'strong'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'ocicat',
    ticaName: 'Ocicat',
    zhName: '奥西猫',
    originLabel: 'United States',
    countries: ['US'],
    lat: 39.8283,
    lon: -98.5795,
    region: 'North America',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'A spotted domestic breed with a wild look but no recent wild ancestry.',
    traits: ['spotted coat', 'muscular', 'social'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'oriental-shorthair',
    ticaName: 'Oriental Shorthair',
    zhName: '东方短毛猫',
    originLabel: 'United Kingdom / Thailand ancestry',
    countries: ['GB', 'TH'],
    lat: 55.3781,
    lon: -3.436,
    region: 'Europe',
    status: 'TICA recognized',
    confidence: 'medium',
    summary: 'A Siamese-family breed with many coat colors and a refined body.',
    traits: ['shorthair', 'large ears', 'vocal'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'persian',
    ticaName: 'Persian',
    zhName: '波斯猫',
    originLabel: 'Iran / Persia',
    countries: ['IR'],
    lat: 32.4279,
    lon: 53.688,
    region: 'Middle East',
    status: 'TICA recognized',
    confidence: 'medium',
    summary: 'A longhaired breed historically associated with Persia and refined over centuries.',
    traits: ['longhair', 'round head', 'calm'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'ragdoll',
    ticaName: 'Ragdoll',
    zhName: '布偶猫',
    originLabel: 'California, United States',
    countries: ['US'],
    lat: 36.7783,
    lon: -119.4179,
    region: 'North America',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'A large colorpointed breed developed in California and known for relaxed temperament.',
    traits: ['colorpoint', 'large', 'gentle'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'russian-blue',
    ticaName: 'Russian Blue',
    zhName: '俄罗斯蓝猫',
    originLabel: 'Russia',
    countries: ['RU'],
    lat: 61.524,
    lon: 105.3188,
    region: 'Europe',
    status: 'TICA recognized',
    confidence: 'medium',
    summary: 'A blue shorthaired breed associated with northern Russia and a shimmering coat.',
    traits: ['blue coat', 'green eyes', 'reserved'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'savannah',
    ticaName: 'Savannah',
    zhName: '萨凡纳猫',
    originLabel: 'United States',
    countries: ['US'],
    lat: 39.8283,
    lon: -98.5795,
    region: 'North America',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'A tall spotted breed developed from domestic cats and serval ancestry.',
    traits: ['spotted coat', 'tall', 'energetic'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'scottish-fold',
    ticaName: 'Scottish Fold',
    zhName: '苏格兰折耳猫',
    originLabel: 'Scotland, United Kingdom',
    countries: ['GB'],
    lat: 56.4907,
    lon: -4.2026,
    region: 'Europe',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'A Scottish-origin breed recognized by forward-folded ears and round expression.',
    traits: ['folded ears', 'round face', 'quiet'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'selkirk-rex',
    ticaName: 'Selkirk Rex',
    zhName: '塞尔凯克卷毛猫',
    originLabel: 'Montana, United States',
    countries: ['US'],
    lat: 46.8797,
    lon: -110.3626,
    region: 'North America',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'A curly-coated breed from Montana with a plush, woolly texture.',
    traits: ['curly coat', 'plush', 'easygoing'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'siamese',
    ticaName: 'Siamese',
    zhName: '暹罗猫',
    originLabel: 'Thailand',
    countries: ['TH'],
    lat: 15.87,
    lon: 100.9925,
    region: 'Asia',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'A historic Thai colorpoint breed with a refined body and expressive voice.',
    traits: ['colorpoint', 'vocal', 'slender'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'siberian',
    ticaName: 'Siberian',
    zhName: '西伯利亚猫',
    originLabel: 'Russia',
    countries: ['RU'],
    lat: 61.524,
    lon: 105.3188,
    region: 'Europe',
    status: 'TICA recognized',
    confidence: 'medium',
    summary: 'A strong Russian longhair adapted to severe climates.',
    traits: ['longhair', 'strong', 'water-resistant coat'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'singapura',
    ticaName: 'Singapura',
    zhName: '新加坡猫',
    originLabel: 'Singapore',
    countries: ['SG'],
    lat: 1.3521,
    lon: 103.8198,
    region: 'Asia',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'A small ticked breed associated with Singapore and a bright expression.',
    traits: ['small', 'ticked coat', 'alert'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'somali',
    ticaName: 'Somali',
    zhName: '索马里猫',
    originLabel: 'United States / Abyssinian line',
    countries: ['US'],
    lat: 39.8283,
    lon: -98.5795,
    region: 'North America',
    status: 'TICA recognized',
    confidence: 'medium',
    summary: 'A longhaired Abyssinian-family breed with a vivid ticked coat.',
    traits: ['longhair', 'ticked coat', 'active'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'sphynx',
    ticaName: 'Sphynx',
    zhName: '斯芬克斯猫',
    originLabel: 'Canada',
    countries: ['CA'],
    lat: 56.1304,
    lon: -106.3468,
    region: 'North America',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'A Canadian breed known for hairlessness and warm, people-focused behavior.',
    traits: ['hairless', 'warm skin', 'social'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'thai',
    ticaName: 'Thai',
    zhName: '泰国猫',
    originLabel: 'Thailand',
    countries: ['TH'],
    lat: 15.87,
    lon: 100.9925,
    region: 'Asia',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'A traditional-style Thai colorpoint breed preserving older Siamese type.',
    traits: ['colorpoint', 'traditional type', 'social'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'tonkinese',
    ticaName: 'Tonkinese',
    zhName: '东奇尼猫',
    originLabel: 'Canada / United States',
    countries: ['CA', 'US'],
    lat: 49.2827,
    lon: -123.1207,
    region: 'North America',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'A Siamese-Burmese family breed developed in North America with aqua-toned eyes.',
    traits: ['mink coat', 'social', 'medium build'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'toyger',
    ticaName: 'Toyger',
    zhName: '玩具虎猫',
    originLabel: 'United States',
    countries: ['US'],
    lat: 39.8283,
    lon: -98.5795,
    region: 'North America',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'A domestic breed developed for bold tiger-like striping.',
    traits: ['striped coat', 'athletic', 'friendly'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'turkish-angora',
    ticaName: 'Turkish Angora',
    zhName: '土耳其安哥拉猫',
    originLabel: 'Turkey',
    countries: ['TR'],
    lat: 38.9637,
    lon: 35.2433,
    region: 'Middle East',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'A graceful Turkish longhair associated with Ankara and silky coat texture.',
    traits: ['longhair', 'silky coat', 'elegant'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'turkish-van',
    ticaName: 'Turkish Van',
    zhName: '土耳其梵猫',
    originLabel: 'Lake Van region, Turkey',
    countries: ['TR'],
    lat: 38.5,
    lon: 43.3833,
    region: 'Middle East',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'A Turkish semi-longhair known for the van pattern and strong swimming folklore.',
    traits: ['van pattern', 'semi-longhair', 'strong'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'australian-mist',
    ticaName: 'Australian Mist',
    zhName: '澳洲雾猫',
    originLabel: 'Australia',
    countries: ['AU'],
    lat: -25.2744,
    lon: 133.7751,
    region: 'Africa/Oceania',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'An Australian shorthaired breed developed for a calm indoor companion profile.',
    traits: ['spotted coat', 'gentle', 'family-friendly'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'bengal-longhair',
    ticaName: 'Bengal Longhair',
    zhName: '长毛孟加拉猫',
    originLabel: 'United States',
    countries: ['US'],
    lat: 39.8283,
    lon: -98.5795,
    region: 'North America',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'A longhaired Bengal-family entry retaining the spotted or marbled wild-look pattern.',
    traits: ['longhair', 'spotted coat', 'athletic'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'british-longhair',
    ticaName: 'British Longhair',
    zhName: '英国长毛猫',
    originLabel: 'United Kingdom',
    countries: ['GB'],
    lat: 55.3781,
    lon: -3.436,
    region: 'Europe',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'The longhaired British-family type with plush coat and steady temperament.',
    traits: ['longhair', 'round face', 'steady'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'burmilla',
    ticaName: 'Burmilla',
    zhName: '伯米拉猫',
    originLabel: 'United Kingdom',
    countries: ['GB'],
    lat: 55.3781,
    lon: -3.436,
    region: 'Europe',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'A British-origin Burmese and Chinchilla Persian family breed with shaded silver style.',
    traits: ['shaded coat', 'social', 'soft expression'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'burmilla-longhair',
    ticaName: 'Burmilla Longhair',
    zhName: '长毛伯米拉猫',
    originLabel: 'United Kingdom',
    countries: ['GB'],
    lat: 55.3781,
    lon: -3.436,
    region: 'Europe',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'The longhaired Burmilla type, shown here with the same United Kingdom centroid.',
    traits: ['longhair', 'shaded coat', 'gentle'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'cymric',
    ticaName: 'Cymric',
    zhName: '长毛曼岛猫',
    originLabel: 'Isle of Man / Canada',
    countries: ['IM', 'CA'],
    lat: 54.2361,
    lon: -4.5481,
    region: 'Europe',
    status: 'TICA recognized',
    confidence: 'medium',
    summary: 'A longhaired Manx-family type associated with the Isle of Man lineage.',
    traits: ['longhair', 'tailless', 'rounded build'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'donskoy',
    ticaName: 'Donskoy',
    zhName: '顿斯科伊猫',
    originLabel: 'Russia',
    countries: ['RU'],
    lat: 61.524,
    lon: 105.3188,
    region: 'Europe',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'A Russian hairless breed with a distinct origin from Sphynx-type hairlessness.',
    traits: ['hairless', 'warm skin', 'social'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'highlander',
    ticaName: 'Highlander',
    zhName: '高地猫',
    originLabel: 'United States',
    countries: ['US'],
    lat: 39.8283,
    lon: -98.5795,
    region: 'North America',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'A North American breed known for curled ears, sturdy build, and expressive presence.',
    traits: ['curled ears', 'bobtail', 'athletic'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'himalayan',
    ticaName: 'Himalayan',
    zhName: '喜马拉雅猫',
    originLabel: 'United States / United Kingdom',
    countries: ['US', 'GB'],
    lat: 39.8283,
    lon: -98.5795,
    region: 'North America',
    status: 'TICA recognized',
    confidence: 'medium',
    summary: 'A Persian-family colorpoint breed developed through modern breeding programs.',
    traits: ['colorpoint', 'longhair', 'calm'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'khaomanee',
    ticaName: 'Khaomanee',
    zhName: '考马尼猫',
    originLabel: 'Thailand',
    countries: ['TH'],
    lat: 15.87,
    lon: 100.9925,
    region: 'Asia',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'A Thai white cat breed famed for bright eyes and historic royal associations.',
    traits: ['white coat', 'bright eyes', 'alert'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'kurilian-bobtail',
    ticaName: 'Kurilian Bobtail',
    zhName: '千岛短尾猫',
    originLabel: 'Kuril Islands / Russia',
    countries: ['RU', 'JP'],
    lat: 46.6,
    lon: 151.5,
    region: 'Asia',
    status: 'TICA recognized',
    confidence: 'medium',
    summary: 'A natural bobtail breed associated with the Kuril Islands region.',
    traits: ['bobtail', 'strong', 'natural breed'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'laperm-shorthair',
    ticaName: 'LaPerm Shorthair',
    zhName: '短毛拉邦猫',
    originLabel: 'Oregon, United States',
    countries: ['US'],
    lat: 43.8041,
    lon: -120.5542,
    region: 'North America',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'The shorthaired LaPerm entry, keeping the Oregon centroid of the breed family.',
    traits: ['curly coat', 'shorthair', 'friendly'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'maine-coon-polydactyl',
    ticaName: 'Maine Coon Polydactyl',
    zhName: '多趾缅因猫',
    originLabel: 'Maine, United States',
    countries: ['US'],
    lat: 45.2538,
    lon: -69.4455,
    region: 'North America',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'A Maine Coon family entry distinguished by the polydactyl trait.',
    traits: ['large', 'polydactyl', 'longhair'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'minuet',
    ticaName: 'Minuet',
    zhName: '小步舞曲猫',
    originLabel: 'United States',
    countries: ['US'],
    lat: 39.8283,
    lon: -98.5795,
    region: 'North America',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'A North American breed combining short legs with a round, plush companion-cat look.',
    traits: ['short legs', 'round face', 'companionable'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'munchkin-longhair',
    ticaName: 'Munchkin Longhair',
    zhName: '长毛曼基康猫',
    originLabel: 'United States',
    countries: ['US'],
    lat: 39.8283,
    lon: -98.5795,
    region: 'North America',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'The longhaired Munchkin family entry with the same short-legged breed origin.',
    traits: ['short legs', 'longhair', 'playful'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'nebelung',
    ticaName: 'Nebelung',
    zhName: '内布龙猫',
    originLabel: 'United States',
    countries: ['US'],
    lat: 39.8283,
    lon: -98.5795,
    region: 'North America',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'A blue semi-longhaired breed developed in the United States from Russian Blue type.',
    traits: ['blue coat', 'semi-longhair', 'reserved'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'oriental-longhair',
    ticaName: 'Oriental Longhair',
    zhName: '东方长毛猫',
    originLabel: 'United Kingdom / Thailand ancestry',
    countries: ['GB', 'TH'],
    lat: 55.3781,
    lon: -3.436,
    region: 'Europe',
    status: 'TICA recognized',
    confidence: 'medium',
    summary: 'The longhaired Oriental-family entry with Siamese-line ancestry and many colors.',
    traits: ['longhair', 'large ears', 'vocal'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'peterbald',
    ticaName: 'Peterbald',
    zhName: '彼得秃猫',
    originLabel: 'Russia',
    countries: ['RU'],
    lat: 61.524,
    lon: 105.3188,
    region: 'Europe',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'A Russian breed associated with hairless or sparse-coated Oriental-type cats.',
    traits: ['hairless', 'slender', 'social'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'pixiebob',
    ticaName: 'Pixiebob',
    zhName: '皮克斯短尾猫',
    originLabel: 'United States',
    countries: ['US'],
    lat: 39.8283,
    lon: -98.5795,
    region: 'North America',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'A North American breed with a bobtail and rugged domestic-cat profile.',
    traits: ['bobtail', 'sturdy', 'wild look'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'pixiebob-longhair',
    ticaName: 'Pixiebob Longhair',
    zhName: '长毛皮克斯短尾猫',
    originLabel: 'United States',
    countries: ['US'],
    lat: 39.8283,
    lon: -98.5795,
    region: 'North America',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'The longhaired Pixiebob family entry with the same North American centroid.',
    traits: ['bobtail', 'longhair', 'sturdy'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'scottish-fold-longhair',
    ticaName: 'Scottish Fold Longhair',
    zhName: '苏格兰长毛折耳猫',
    originLabel: 'Scotland, United Kingdom',
    countries: ['GB'],
    lat: 56.4907,
    lon: -4.2026,
    region: 'Europe',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'A longhaired Scottish Fold family entry shown at the Scotland centroid.',
    traits: ['folded ears', 'longhair', 'round face'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'scottish-straight',
    ticaName: 'Scottish Straight',
    zhName: '苏格兰立耳猫',
    originLabel: 'Scotland, United Kingdom',
    countries: ['GB'],
    lat: 56.4907,
    lon: -4.2026,
    region: 'Europe',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'The straight-eared Scottish family entry associated with the same Scottish lineage.',
    traits: ['straight ears', 'round face', 'quiet'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'scottish-straight-longhair',
    ticaName: 'Scottish Straight Longhair',
    zhName: '苏格兰长毛立耳猫',
    originLabel: 'Scotland, United Kingdom',
    countries: ['GB'],
    lat: 56.4907,
    lon: -4.2026,
    region: 'Europe',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'A longhaired straight-eared Scottish family entry for atlas completeness.',
    traits: ['straight ears', 'longhair', 'round face'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'selkirk-rex-longhair',
    ticaName: 'Selkirk Rex Longhair',
    zhName: '长毛塞尔凯克卷毛猫',
    originLabel: 'Montana, United States',
    countries: ['US'],
    lat: 46.8797,
    lon: -110.3626,
    region: 'North America',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'The longhaired Selkirk Rex family entry with a dense curly coat.',
    traits: ['curly coat', 'longhair', 'plush'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'serengeti',
    ticaName: 'Serengeti',
    zhName: '塞伦盖蒂猫',
    originLabel: 'United States',
    countries: ['US'],
    lat: 39.8283,
    lon: -98.5795,
    region: 'North America',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'A spotted domestic breed developed for a tall, elegant wild-look silhouette.',
    traits: ['spotted coat', 'long legs', 'active'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'snowshoe',
    ticaName: 'Snowshoe',
    zhName: '雪鞋猫',
    originLabel: 'United States',
    countries: ['US'],
    lat: 39.8283,
    lon: -98.5795,
    region: 'North America',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'A North American colorpoint breed known for white feet and friendly behavior.',
    traits: ['colorpoint', 'white feet', 'social'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'tennessee-rex',
    ticaName: 'Tennessee Rex',
    zhName: '田纳西卷毛猫',
    originLabel: 'Tennessee, United States',
    countries: ['US'],
    lat: 35.5175,
    lon: -86.5804,
    region: 'North America',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'A United States rex-coated breed associated with Tennessee origins.',
    traits: ['rex coat', 'satin sheen', 'friendly'],
    sourceUrl: ticaBreedSource,
  },
  {
    id: 'toybob',
    ticaName: 'Toybob',
    zhName: '玩具短尾猫',
    originLabel: 'Russia',
    countries: ['RU'],
    lat: 61.524,
    lon: 105.3188,
    region: 'Europe',
    status: 'TICA recognized',
    confidence: 'high',
    summary: 'A small Russian bobtail breed with compact proportions and a short tail.',
    traits: ['small', 'bobtail', 'compact'],
    sourceUrl: ticaBreedSource,
  },
]


const sourceUrlFor = (id: string) => `https://tica.org/breed/${id}/`

const photoPool: BreedPhoto[] = [
  {
    src: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=900&q=80',
    altZh: '\u771f\u5b9e\u732b\u54aa\u8096\u50cf\uff0c\u7528\u4e8e\u54c1\u79cd\u56fe\u9274\u89c6\u89c9\u53c2\u8003',
    altEn: 'Real cat portrait used as visual reference for the breed atlas.',
    credit: 'Unsplash community photo',
    license: 'Unsplash License',
    sourceUrl: 'https://unsplash.com/photos/1514888286974-6c03e2ca1dba',
  },
  {
    src: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=900&q=80',
    altZh: '\u771f\u5b9e\u732b\u54aa\u9762\u90e8\u7279\u5199',
    altEn: 'Close portrait of a real cat.',
    credit: 'Unsplash community photo',
    license: 'Unsplash License',
    sourceUrl: 'https://unsplash.com/photos/1573865526739-10659fec78a5',
  },
  {
    src: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=900&q=80',
    altZh: '\u5ba4\u5185\u771f\u5b9e\u732b\u54aa\u7167\u7247',
    altEn: 'Indoor real cat photograph.',
    credit: 'Unsplash community photo',
    license: 'Unsplash License',
    sourceUrl: 'https://unsplash.com/photos/1592194996308-7b43878e84a6',
  },
  {
    src: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=900&q=80',
    altZh: '\u53ef\u8ffd\u6eaf\u771f\u5b9e\u732b\u54aa\u7167\u7247',
    altEn: 'Traceable real cat photo.',
    credit: 'Unsplash community photo',
    license: 'Unsplash License',
    sourceUrl: 'https://unsplash.com/photos/1518791841217-8f162f1e1131',
  },
  {
    src: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=900&q=80',
    altZh: '\u732b\u54aa\u751f\u6d3b\u573a\u666f\u771f\u5b9e\u7167\u7247',
    altEn: 'Real cat lifestyle photograph.',
    credit: 'Unsplash community photo',
    license: 'Unsplash License',
    sourceUrl: 'https://unsplash.com/photos/1543852786-1cf6624b9987',
  },
]

const breedPhotoRegistry: Record<string, BreedPhoto> = {
  'american-shorthair': {
    src: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/American_shorthair_cat_Portrait.jpg',
    altZh: '\u7f8e\u56fd\u77ed\u6bdb\u732b\u771f\u5b9e\u8096\u50cf',
    altEn: 'Real American Shorthair cat portrait.',
    credit: 'Nickolas Titkov / Wikimedia Commons',
    license: 'CC BY 2.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:American_shorthair_cat_Portrait.jpg',
    objectPosition: '50% 34%',
    fit: 'cover',
    verifiedBreedPhoto: true,
  },
  'british-shorthair': {
    src: 'https://upload.wikimedia.org/wikipedia/commons/1/14/20170604_kot_na_wystawie_w_Krakowie_7971.jpg',
    altZh: '\u82f1\u56fd\u77ed\u6bdb\u732b\u771f\u5b9e\u7167\u7247',
    altEn: 'Real British Shorthair cat photograph.',
    credit: 'Jakub Halun / Wikimedia Commons',
    license: 'CC BY-SA 4.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:20170604_kot_na_wystawie_w_Krakowie_7971.jpg',
    objectPosition: '50% 28%',
    fit: 'cover',
    verifiedBreedPhoto: true,
  },
  ragdoll: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Gato_Ragdoll_BreedingCat.jpg',
    altZh: '\u5e03\u5076\u732b\u771f\u5b9e\u7167\u7247',
    altEn: 'Real Ragdoll cat photograph.',
    credit: 'GFDL / Wikimedia Commons',
    license: 'CC0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Gato_Ragdoll_BreedingCat.jpg',
    objectPosition: '50% 38%',
    fit: 'cover',
    verifiedBreedPhoto: true,
  },
  'maine-coon': {
    src: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Maine_Coon_Cat_List_Characteristics.jpg',
    altZh: '\u7f05\u56e0\u732b\u771f\u5b9e\u7167\u7247',
    altEn: 'Real Maine Coon cat photograph.',
    credit: 'Wikimedia Commons contributor',
    license: 'CC BY-SA 4.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Maine_Coon_Cat_List_Characteristics.jpg',
    objectPosition: '50% 32%',
    fit: 'cover',
    verifiedBreedPhoto: true,
  },
  siamese: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Siamese_cat%2C_chocolate_point.jpg',
    altZh: '\u66b9\u7f57\u732b\u771f\u5b9e\u7167\u7247',
    altEn: 'Real Siamese cat photograph.',
    credit: 'Wikimedia Commons contributor',
    license: 'CC BY-SA 4.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Siamese_cat,_chocolate_point.jpg',
    objectPosition: '52% 34%',
    fit: 'cover',
    verifiedBreedPhoto: true,
  },
  'devon-rex': {
    src: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Devon_Rex_Cassini.jpeg',
    altZh: '\u5fb7\u6587\u5377\u6bdb\u732b\u771f\u5b9e\u7167\u7247',
    altEn: 'Real Devon Rex cat photograph.',
    credit: 'Wikimedia Commons contributor',
    license: 'CC BY 4.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Devon_Rex_Cassini.jpeg',
    objectPosition: '50% 30%',
    fit: 'cover',
    verifiedBreedPhoto: true,
  },
  sphynx: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Cat_Sphynx._img_025.jpg',
    altZh: '\u65af\u82ac\u514b\u65af\u732b\u771f\u5b9e\u7167\u7247',
    altEn: 'Real Sphynx cat photograph.',
    credit: 'Wikimedia Commons contributor',
    license: 'CC BY-SA 4.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Cat_Sphynx._img_025.jpg',
    objectPosition: '50% 27%',
    fit: 'cover',
    verifiedBreedPhoto: true,
  },
  munchkin: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Munchkin_cat_2.jpg',
    altZh: '\u66fc\u57fa\u5eb7\u77ee\u811a\u732b\u771f\u5b9e\u7167\u7247',
    altEn: 'Real Munchkin cat photograph.',
    credit: 'Wikimedia Commons contributor',
    license: 'CC0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Munchkin_cat_2.jpg',
    objectPosition: '48% 35%',
    fit: 'cover',
    verifiedBreedPhoto: true,
  },
  bengal: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Bengal_-_18.jpg',
    altZh: '\u5b5f\u52a0\u62c9\u732b\u771f\u5b9e\u7167\u7247',
    altEn: 'Real Bengal cat photograph.',
    credit: 'Wikimedia Commons contributor',
    license: 'CC BY-SA 4.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Bengal_-_18.jpg',
    objectPosition: '50% 31%',
    fit: 'cover',
    verifiedBreedPhoto: true,
  },
  persian: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/6/69/June_odd-eyed-cat_cropped.jpg',
    altZh: '\u6ce2\u65af\u732b\u771f\u5b9e\u5934\u50cf\u7167\u7247',
    altEn: 'Real Persian cat head portrait.',
    credit: 'Wikimedia Commons contributor',
    license: 'CC BY 2.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:June_odd-eyed-cat_cropped.jpg',
    objectPosition: '50% 45%',
    fit: 'contain',
    verifiedBreedPhoto: true,
  },
  'scottish-fold': {
    src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Scottish%20fold%20cat.jpg?width=900',
    altZh: '\u82cf\u683c\u5170\u6298\u8033\u732b\u771f\u5b9e\u7167\u7247',
    altEn: 'Real Scottish Fold cat photograph.',
    credit: 'Wikimedia Commons contributor',
    license: 'Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Scottish_fold_cat.jpg',
    objectPosition: '50% 32%',
    fit: 'cover',
    verifiedBreedPhoto: true,
  },
}

const ticaPhotoUrls: Record<string, string> = {
  abyssinian: 'https://tica.org/wp-content/uploads/2018/08/Ruddy-Aby-Breed-snippet.jpg',
  'american-bobtail': 'https://tica.org/wp-content/uploads/2018/08/American-Bobtail-Full-Body_.jpg',
  'american-curl': 'https://tica.org/wp-content/uploads/2018/08/American-Curl-Full-Body-1.jpg',
  'american-shorthair': 'https://tica.org/wp-content/uploads/2018/08/American-Shorthair-Full-Body.jpg',
  'american-wirehair': 'https://tica.org/wp-content/uploads/2018/08/American-Wirehair-Full-Body.jpg',
  balinese: 'https://tica.org/wp-content/uploads/2018/08/Balinese-Full-Body.jpg',
  bengal: 'https://tica.org/wp-content/uploads/2018/08/Bengal-Full-Body.jpg',
  birman: 'https://tica.org/wp-content/uploads/2018/08/Birman-Full-Body.jpg',
  bombay: 'https://tica.org/wp-content/uploads/2018/08/Bombay-Full-Body3.jpg',
  'british-shorthair': 'https://tica.org/wp-content/uploads/2018/08/British-Shorthair-Full-Body.jpg',
  burmese: 'https://tica.org/wp-content/uploads/2018/08/Burmese-Full-Body.jpg',
  chartreux: 'https://tica.org/wp-content/uploads/2018/08/Chartreux-Full-Body.jpg',
  chausie: 'https://tica.org/wp-content/uploads/2018/08/Chausie-Full-Body.jpg',
  'cornish-rex': 'https://tica.org/wp-content/uploads/2018/08/Cornish-Rex-Full-Body.jpg',
  'devon-rex': 'https://tica.org/wp-content/uploads/2018/08/Devon-Rex-Full-Body.jpg',
  'egyptian-mau': 'https://tica.org/wp-content/uploads/2018/08/Egyptian-Mau-Full-Body.jpg',
  'exotic-shorthair': 'https://tica.org/wp-content/uploads/2018/08/Exotic-Shorthair-Full-Body.jpg',
  havana: 'https://tica.org/wp-content/uploads/2018/08/Havana-Full-Body.jpg',
  'japanese-bobtail': 'https://tica.org/wp-content/uploads/2018/08/Japanese-Bobtail-Full-Body.jpg',
  korat: 'https://tica.org/wp-content/uploads/2018/08/Korat-Full-Body.jpg',
  'la-perm': 'https://tica.org/wp-content/uploads/2018/08/laperm-550x350-1.jpg',
  lykoi: 'https://tica.org/wp-content/uploads/2018/08/Lykoi-Full-Body.jpg',
  'maine-coon': 'https://tica.org/wp-content/uploads/2018/08/Maine-Coon-Full-Body.jpg',
  manx: 'https://tica.org/wp-content/uploads/2018/08/Manx-Full-Body.jpg',
  munchkin: 'https://tica.org/wp-content/uploads/2018/08/Munchkin-Full-Body.jpg',
  'norwegian-forest': 'https://tica.org/wp-content/uploads/2018/08/Norwegian-Forest-Full-Body.jpg',
  ocicat: 'https://tica.org/wp-content/uploads/2018/08/Ocicat-Full-Body.jpg',
  'oriental-shorthair': 'https://tica.org/wp-content/uploads/2018/08/Oriental-Shorthair-Full-Body.jpg',
  persian: 'https://tica.org/wp-content/uploads/2018/08/Persian-Full-Body.jpg',
  ragdoll: 'https://tica.org/wp-content/uploads/2018/08/Ragdoll-Full-Body.jpg',
  'russian-blue': 'https://tica.org/wp-content/uploads/2018/08/Russian-Blue-Full-Body.jpg',
  savannah: 'https://tica.org/wp-content/uploads/2018/08/Savannah-Full-Body.jpg',
  'scottish-fold': 'https://tica.org/wp-content/uploads/2018/08/Scottish-Fold-Full-Body.jpg',
  'selkirk-rex': 'https://tica.org/wp-content/uploads/2018/08/Selkirk-Rex-Full-Body.jpg',
  siamese: 'https://tica.org/wp-content/uploads/2018/08/Siamese-Full-Body.jpg',
  siberian: 'https://tica.org/wp-content/uploads/2018/08/Siberian-Full-Body.jpg',
  singapura: 'https://tica.org/wp-content/uploads/2018/08/Singapura-Full-Body.jpg',
  somali: 'https://tica.org/wp-content/uploads/2018/08/Somali-Full-Body.jpg',
  sphynx: 'https://tica.org/wp-content/uploads/2018/08/Sphynx-Full-Body.jpg',
  thai: 'https://tica.org/wp-content/uploads/2018/08/Thai-Full-Body.jpg',
  tonkinese: 'https://tica.org/wp-content/uploads/2018/08/Tonkinese-Full-Body.jpg',
  toyger: 'https://tica.org/wp-content/uploads/2018/08/Toyger-Full-Body.jpg',
  'turkish-angora': 'https://tica.org/wp-content/uploads/2018/08/Turkish-Angora-Full-Body.jpg',
  'turkish-van': 'https://tica.org/wp-content/uploads/2018/08/Turkish-Van-Full-Body.jpg',
  'australian-mist': 'https://tica.org/wp-content/uploads/2018/08/Australian-Mist-Full-Body.jpg',
  'bengal-longhair': 'https://tica.org/wp-content/uploads/2018/08/Bengal-Longhair-Full-Body.jpg',
  'british-longhair': 'https://tica.org/wp-content/uploads/2018/08/British-Longhair-Full-Body.jpg',
  burmilla: 'https://tica.org/wp-content/uploads/2018/08/Burmilla-Full-Body.jpg',
  'burmilla-longhair': 'https://tica.org/wp-content/uploads/2018/08/Burmilla-Longhair-Full-Body.jpg',
  cymric: 'https://tica.org/wp-content/uploads/2018/08/Cymric-Full-Body.jpg',
  donskoy: 'https://tica.org/wp-content/uploads/2018/08/Donskoy-Full-Body.jpg',
  highlander: 'https://tica.org/wp-content/uploads/2018/08/Highlander-Longhair-Full-Body.jpg',
  himalayan: 'https://tica.org/wp-content/uploads/2018/08/Himalayan-Full-Body.jpg',
  khaomanee: 'https://tica.org/wp-content/uploads/2018/08/Khaomanee-Full-Body.jpg',
  'kurilian-bobtail': 'https://tica.org/wp-content/uploads/2018/08/Kurilian-Bobtail-Full-Body.jpg',
  'laperm-shorthair': 'https://tica.org/wp-content/uploads/2018/08/LaPerm-Shorthair-Full-Body.jpg',
  'maine-coon-polydactyl': 'https://tica.org/wp-content/uploads/2018/08/Maine-Coon-Polydactyl-Full-Body.jpg',
  minuet: 'https://tica.org/wp-content/uploads/2018/08/Minuet-Full-Body.jpg',
  'munchkin-longhair': 'https://tica.org/wp-content/uploads/2018/08/Munchkin-Longhair-Full-Body.jpg',
  nebelung: 'https://tica.org/wp-content/uploads/2018/08/Nebelung-Body-Shot.jpg',
  'oriental-longhair': 'https://tica.org/wp-content/uploads/2018/08/Oriental-Longhair-Full-Body.jpg',
  peterbald: 'https://tica.org/wp-content/uploads/2018/08/Peterbald-Full-Body.jpg',
  pixiebob: 'https://tica.org/wp-content/uploads/2018/08/Pixiebob-Full-Body.jpg',
  'pixiebob-longhair': 'https://tica.org/wp-content/uploads/2018/08/Pixiebob-Longhair-Full-Body.jpg',
  'scottish-fold-longhair': 'https://tica.org/wp-content/uploads/2018/08/Scottish-Fold-Longhair-Full-Body.jpg',
  'scottish-straight': 'https://tica.org/wp-content/uploads/2018/08/Scottish-Straight-Full-Body.jpg',
  'scottish-straight-longhair': 'https://tica.org/wp-content/uploads/2018/08/Scottish-Straight-Longhair-Full-Body.jpg',
  'selkirk-rex-longhair': 'https://tica.org/wp-content/uploads/2018/08/Selkirk-Rex-Longhair-Full-Body.jpg',
  serengeti: 'https://tica.org/wp-content/uploads/2018/08/Serengeti-Full-Body.jpg',
  snowshoe: 'https://tica.org/wp-content/uploads/2018/08/Snowshoe-Full-Body.jpg',
  'tennessee-rex': 'https://tica.org/wp-content/uploads/2024/07/Tennessee-Rex-Full-Body.jpg',
  toybob: 'https://tica.org/wp-content/uploads/2024/09/Toybob-1-1024x683.jpg',
}

const ticaPhotoForBreed = (breed: BaseBreedOrigin): BreedPhoto | undefined => {
  const src = ticaPhotoUrls[breed.id]

  if (!src) return undefined

  return {
    src,
    altZh: `${fallbackZhName(breed)} 的 TICA 品种照片`,
    altEn: `TICA breed photo for ${breed.ticaName}.`,
    credit: 'The International Cat Association (TICA)',
    license: 'TICA website image',
    sourceUrl: sourceUrlFor(breed.id),
    objectPosition: '50% 38%',
    fit: 'cover',
    verifiedBreedPhoto: true,
  }
}

const curatedNames: Record<string, { zh: string; aliases: string[]; coat?: CoatLength }> = {
  'abyssinian': { zh: '\u963f\u6bd4\u897f\u5c3c\u4e9a\u732b', aliases: ['\u963f\u6bd4', '\u963f\u6bd4\u732b'], coat: 'short' },
  'aegean': { zh: '爱琴猫', aliases: ['爱琴海猫', '希腊岛猫'], coat: 'mixed' },
  'american-bobtail': { zh: '\u7f8e\u56fd\u77ed\u5c3e\u732b', aliases: ['\u7f8e\u77ed\u5c3e', '\u7f8e\u56fd\u77ed\u5c3e'], coat: 'mixed' },
  'american-curl': { zh: '\u7f8e\u56fd\u5377\u8033\u732b', aliases: ['\u7f8e\u5377', '\u5377\u8033\u732b'], coat: 'mixed' },
  'american-shorthair': { zh: '\u7f8e\u56fd\u77ed\u6bdb\u732b', aliases: ['\u7f8e\u77ed', '\u7f8e\u56fd\u77ed\u6bdb', '\u7f8e\u56fd\u77ed\u6bdb\u732b'], coat: 'short' },
  'american-wirehair': { zh: '\u7f8e\u56fd\u521a\u6bdb\u732b', aliases: ['\u7f8e\u521a\u6bdb', '\u521a\u6bdb\u732b'], coat: 'rex' },
  'balinese': { zh: '\u5df4\u5398\u732b', aliases: ['\u957f\u6bdb\u66b9\u7f57'], coat: 'long' },
  'bengal': { zh: '\u5b5f\u52a0\u62c9\u732b', aliases: ['\u8c79\u732b', '\u5b5f\u52a0\u62c9\u8c79\u732b'], coat: 'short' },
  'birman': { zh: '\u4f2f\u66fc\u732b', aliases: ['\u7f05\u7538\u5723\u732b'], coat: 'long' },
  'bombay': { zh: '\u5b5f\u4e70\u732b', aliases: ['\u5c0f\u9ed1\u8c79'], coat: 'short' },
  'british-shorthair': { zh: '\u82f1\u56fd\u77ed\u6bdb\u732b', aliases: ['\u82f1\u77ed', '\u84dd\u732b', '\u91d1\u6e10\u5c42', '\u94f6\u6e10\u5c42'], coat: 'short' },
  'burmese': { zh: '\u7f05\u7538\u732b', aliases: ['\u7f05\u732b'], coat: 'short' },
  'chartreux': { zh: '\u6c99\u7279\u5c14\u732b', aliases: ['\u6cd5\u56fd\u84dd\u732b'], coat: 'short' },
  'chausie': { zh: '乔西猫', aliases: ['丛林猫', '丛林混血猫'], coat: 'short' },
  'cornish-rex': { zh: '\u67ef\u5c3c\u65af\u5377\u6bdb\u732b', aliases: ['\u67ef\u5c3c\u65af', '\u5377\u6bdb\u732b'], coat: 'rex' },
  'devon-rex': { zh: '\u5fb7\u6587\u5377\u6bdb\u732b', aliases: ['\u5fb7\u6587', '\u5fb7\u6587\u732b'], coat: 'rex' },
  'egyptian-mau': { zh: '\u57c3\u53ca\u732b', aliases: ['\u57c3\u53ca\u8c93', '\u57c3\u53ca\u9f20\u6591\u732b'], coat: 'short' },
  'exotic-shorthair': { zh: '\u5f02\u56fd\u77ed\u6bdb\u732b', aliases: ['\u52a0\u83f2\u732b', '\u5f02\u77ed'], coat: 'short' },
  'havana': { zh: '哈瓦那棕猫', aliases: ['哈瓦那猫', '巧克力猫'], coat: 'short' },
  'japanese-bobtail': { zh: '\u65e5\u672c\u77ed\u5c3e\u732b', aliases: ['\u65e5\u77ed', '\u62db\u8d22\u732b\u539f\u578b'], coat: 'mixed' },
  'korat': { zh: '\u5475\u53fb\u732b', aliases: ['\u79d1\u62c9\u7279', '\u6cf0\u56fd\u84dd\u732b'], coat: 'short' },
  'la-perm': { zh: '\u62c9\u90a6\u732b', aliases: ['\u62c9\u6ce2\u59c6', '\u62c9\u4f69\u59c6'], coat: 'rex' },
  'lykoi': { zh: '\u72fc\u4eba\u732b', aliases: ['\u72fc\u732b', '\u83b1\u79d1\u4f0a'], coat: 'mixed' },
  'maine-coon': { zh: '\u7f05\u56e0\u732b', aliases: ['\u7f05\u56e0', '\u7f05\u56e0\u5e93\u6069', '\u5927\u7f05'], coat: 'long' },
  'manx': { zh: '\u66fc\u5c9b\u732b', aliases: ['\u9a6c\u6069\u5c9b\u732b', '\u65e0\u5c3e\u732b'], coat: 'short' },
  'munchkin': { zh: '\u66fc\u57fa\u5eb7\u732b', aliases: ['\u77ee\u811a\u732b', '\u77ed\u817f\u732b'], coat: 'short' },
  'norwegian-forest': { zh: '\u632a\u5a01\u68ee\u6797\u732b', aliases: ['\u632a\u68ee'], coat: 'long' },
  'ocicat': { zh: '\u5965\u897f\u732b', aliases: ['\u6b27\u897f\u732b'], coat: 'short' },
  'oriental-shorthair': { zh: '\u4e1c\u65b9\u77ed\u6bdb\u732b', aliases: ['\u4e1c\u77ed', '\u5927\u8033\u732b'], coat: 'short' },
  'persian': { zh: '\u6ce2\u65af\u732b', aliases: ['\u6ce2\u65af'], coat: 'long' },
  'ragdoll': { zh: '\u5e03\u5076\u732b', aliases: ['\u5e03\u5076', '\u4ed9\u5973\u732b'], coat: 'long' },
  'russian-blue': { zh: '\u4fc4\u7f57\u65af\u84dd\u732b', aliases: ['\u4fc4\u84dd'], coat: 'short' },
  'savannah': { zh: '\u8428\u51e1\u7eb3\u732b', aliases: ['\u85ae\u732b\u732b', '\u8428\u732b'], coat: 'short' },
  'scottish-fold': { zh: '\u82cf\u683c\u5170\u6298\u8033\u732b', aliases: ['\u6298\u8033', '\u82cf\u6298'], coat: 'short' },
  'selkirk-rex': { zh: '\u585e\u5c14\u51ef\u514b\u5377\u6bdb\u732b', aliases: ['\u585e\u5c14\u51ef\u514b', '\u7f8a\u6bdb\u732b'], coat: 'rex' },
  'siamese': { zh: '\u66b9\u7f57\u732b', aliases: ['\u66b9\u7f57', '\u6cf0\u56fd\u732b'], coat: 'short' },
  'siberian': { zh: '\u897f\u4f2f\u5229\u4e9a\u732b', aliases: ['\u897f\u68ee', '\u897f\u4f2f\u5229\u4e9a\u68ee\u6797\u732b'], coat: 'long' },
  'singapura': { zh: '\u65b0\u52a0\u5761\u732b', aliases: ['\u65b0\u732b'], coat: 'short' },
  'somali': { zh: '索马里猫', aliases: ['长毛阿比', '索马利猫'], coat: 'long' },
  'sphynx': { zh: '\u65af\u82ac\u514b\u65af\u732b', aliases: ['\u65e0\u6bdb\u732b', '\u52a0\u62ff\u5927\u65e0\u6bdb'], coat: 'hairless' },
  'thai': { zh: '\u6cf0\u56fd\u732b', aliases: ['\u4f20\u7edf\u66b9\u7f57'], coat: 'short' },
  'tonkinese': { zh: '\u4e1c\u5947\u5c3c\u732b', aliases: ['\u4e1c\u5947\u5c3c'], coat: 'short' },
  'toyger': { zh: '\u73a9\u5177\u864e\u732b', aliases: ['\u5c0f\u8001\u864e\u732b'], coat: 'short' },
  'turkish-angora': { zh: '\u571f\u8033\u5176\u5b89\u54e5\u62c9\u732b', aliases: ['\u5b89\u54e5\u62c9\u732b'], coat: 'long' },
  'turkish-van': { zh: '\u571f\u8033\u5176\u68b5\u732b', aliases: ['\u68b5\u732b'], coat: 'long' },
  'australian-mist': { zh: '澳洲雾猫', aliases: ['澳雾', '澳大利亚雾猫'], coat: 'short' },
  'bengal-longhair': { zh: '\u957f\u6bdb\u5b5f\u52a0\u62c9\u732b', aliases: ['\u957f\u6bdb\u8c79\u732b'], coat: 'long' },
  'british-longhair': { zh: '\u82f1\u56fd\u957f\u6bdb\u732b', aliases: ['\u82f1\u957f'], coat: 'long' },
  'burmilla': { zh: '伯米拉猫', aliases: ['波米拉猫'], coat: 'short' },
  'burmilla-longhair': { zh: '长毛伯米拉猫', aliases: ['长毛波米拉猫'], coat: 'long' },
  'cymric': { zh: '威尔士猫', aliases: ['长毛曼岛猫', '长毛马恩岛猫'], coat: 'long' },
  'donskoy': { zh: '\u987f\u65af\u79d1\u4f0a\u732b', aliases: ['\u987f\u65af\u65e0\u6bdb'], coat: 'hairless' },
  'highlander': { zh: '高地猫', aliases: ['高地卷耳猫'], coat: 'mixed' },
  'himalayan': { zh: '\u559c\u9a6c\u62c9\u96c5\u732b', aliases: ['\u559c\u9a6c'], coat: 'long' },
  'khaomanee': { zh: '\u8003\u9a6c\u5c3c\u732b', aliases: ['\u94bb\u77f3\u773c\u732b'], coat: 'short' },
  'kurilian-bobtail': { zh: '千岛短尾猫', aliases: ['库页岛短尾猫', '库里尔短尾猫'], coat: 'mixed' },
  'laperm-shorthair': { zh: '短毛拉邦猫', aliases: ['短毛拉波姆', '短毛拉佩姆'], coat: 'rex' },
  'maine-coon-polydactyl': { zh: '多趾缅因猫', aliases: ['多指缅因', '多趾缅因库恩'], coat: 'long' },
  'minuet': { zh: '\u5c0f\u6b65\u821e\u66f2\u732b', aliases: ['\u62ff\u7834\u4ed1\u732b'], coat: 'mixed' },
  'munchkin-longhair': { zh: '长毛曼基康猫', aliases: ['长毛矮脚猫', '长毛短腿猫'], coat: 'long' },
  'nebelung': { zh: '尼比龙猫', aliases: ['尼伯龙猫', '长毛俄蓝'], coat: 'long' },
  'oriental-longhair': { zh: '东方长毛猫', aliases: ['东长', '长毛东方猫'], coat: 'long' },
  'peterbald': { zh: '彼得秃猫', aliases: ['彼得无毛猫', '彼得堡无毛'], coat: 'hairless' },
  'pixiebob': { zh: '精灵短尾猫', aliases: ['皮克西短尾猫'], coat: 'short' },
  'pixiebob-longhair': { zh: '长毛精灵短尾猫', aliases: ['长毛皮克西短尾猫'], coat: 'long' },
  'scottish-fold-longhair': { zh: '长毛苏格兰折耳猫', aliases: ['长毛折耳', '高地折耳'], coat: 'long' },
  'scottish-straight': { zh: '苏格兰立耳猫', aliases: ['苏立', '苏格兰直耳'], coat: 'short' },
  'scottish-straight-longhair': { zh: '长毛苏格兰立耳猫', aliases: ['高地立耳', '长毛苏立'], coat: 'long' },
  'selkirk-rex-longhair': { zh: '长毛塞尔凯克卷毛猫', aliases: ['长毛塞尔凯克', '长毛羊毛猫'], coat: 'rex' },
  'serengeti': { zh: '塞伦盖蒂猫', aliases: ['塞伦盖蒂'], coat: 'short' },
  'snowshoe': { zh: '\u96ea\u978b\u732b', aliases: ['\u96ea\u9774\u732b'], coat: 'short' },
  'tennessee-rex': { zh: '田纳西卷毛猫', aliases: ['田纳西雷克斯'], coat: 'rex' },
  'toybob': { zh: '玩具短尾猫', aliases: ['迷你短尾猫'], coat: 'short' },
}

const fallbackZhName = (breed: BaseBreedOrigin) =>
  curatedNames[breed.id]?.zh ?? breed.ticaName

const inferCoat = (breed: BaseBreedOrigin): CoatLength => {
  const text = `${breed.id} ${breed.ticaName} ${breed.summary} ${breed.traits.join(' ')}`.toLowerCase()
  const curatedCoat = curatedNames[breed.id]?.coat
  if (curatedCoat) return curatedCoat
  if (text.includes('hairless')) return 'hairless'
  if (text.includes('rex') || text.includes('curly') || text.includes('wire')) return 'rex'
  if (text.includes('longhair') || text.includes('longhaired') || text.includes('long coat')) return 'long'
  if (text.includes('shorthair') || text.includes('shorthaired') || text.includes('short coat')) return 'short'
  return 'mixed'
}

const coatLabelZh: Record<CoatLength, string> = {
  short: '\u77ed\u6bdb',
  long: '\u957f\u6bdb',
  hairless: '\u65e0\u6bdb',
  rex: '\u5377\u6bdb',
  mixed: '\u591a\u6bdb\u578b',
}

const coatLabelEn: Record<CoatLength, string> = {
  short: 'short coat',
  long: 'long coat',
  hairless: 'hairless',
  rex: 'rex coat',
  mixed: 'multiple coat types',
}

const buildDetailFacts = (breed: BaseBreedOrigin, coatLength: CoatLength): BreedDetailFacts => ({
  size: breed.traits.includes('large') || breed.summary.toLowerCase().includes('large') ? 'Large / \u5927\u578b' : 'Medium / \u4e2d\u7b49',
  lifespan: '12-16 years / 12-16\u5e74',
  temperament: breed.traits.slice(0, 3),
  care: coatLength === 'long' ? 'Weekly brushing / \u5efa\u8bae\u6bcf\u5468\u68b3\u7406' : coatLength === 'hairless' ? 'Skin care / \u9700\u8981\u76ae\u80a4\u62a4\u7406' : 'Easy routine care / \u65e5\u5e38\u62a4\u7406\u8f83\u7b80\u5355',
  colors: breed.traits.slice(0, 2),
})

const markerProfileFor = (
  breed: BaseBreedOrigin,
  coatLength: CoatLength,
): BreedMarkerProfile => {
  const id = breed.id
  const text = `${breed.id} ${breed.ticaName} ${breed.summary} ${breed.traits.join(' ')}`.toLowerCase()
  const largeIds = ['maine-coon', 'maine-coon-polydactyl', 'norwegian-forest', 'siberian', 'savannah', 'ragdoll']
  const lowIds = ['munchkin', 'munchkin-longhair', 'minuet']
  const bobtailIds = ['american-bobtail', 'japanese-bobtail', 'kurilian-bobtail', 'pixiebob', 'pixiebob-longhair', 'toybob', 'manx', 'cymric']
  const wildPatternIds = ['bengal', 'bengal-longhair', 'toyger', 'savannah', 'serengeti', 'egyptian-mau', 'ocicat', 'chausie']
  const pointIds = ['siamese', 'thai', 'balinese', 'birman', 'himalayan', 'snowshoe', 'tonkinese', 'ragdoll']
  const shadedIds = ['british-shorthair', 'british-longhair', 'chartreux', 'russian-blue', 'nebelung', 'korat']

  const ears: MarkerEarStyle = id.includes('fold')
    ? 'folded'
    : id.includes('curl')
      ? 'curled'
      : id.includes('devon') || id.includes('oriental') || id.includes('sphynx')
        ? 'large'
        : 'upright'
  const tail: MarkerTailStyle = bobtailIds.includes(id)
    ? 'short'
    : coatLength === 'long' || text.includes('forest') || text.includes('coon')
      ? 'plume'
      : 'normal'
  const pattern: MarkerPattern = wildPatternIds.includes(id)
    ? id === 'toyger'
      ? 'stripes'
      : 'spots'
    : pointIds.includes(id)
      ? 'point'
      : shadedIds.includes(id)
        ? 'shaded'
        : 'solid'
  const size: MarkerSize = lowIds.includes(id)
    ? 'low'
    : largeIds.includes(id)
      ? 'large'
      : coatLength === 'hairless' || id.includes('singapura') || id.includes('toybob')
        ? 'compact'
        : 'standard'
  const accent = pattern === 'spots'
    ? '#d7a64a'
    : pattern === 'stripes'
      ? '#c28a3d'
      : coatLength === 'hairless'
        ? '#82d8c8'
        : coatLength === 'rex'
          ? '#a9f3df'
          : coatLength === 'long'
            ? '#f0d084'
            : '#63d9c7'

  return { size, ears, tail, pattern, coat: coatLength, accent }
}

const iconPalette = [
  ['#ff8ab3', '#ffe0ec', '#a83161'],
  ['#ffbd58', '#fff0bf', '#9c5417'],
  ['#ff9478', '#ffe0d5', '#88372d'],
  ['#79c7ff', '#e6f6ff', '#27689f'],
  ['#b98cff', '#efe0ff', '#5f3f99'],
  ['#f2c46b', '#fff1c6', '#7d5521'],
  ['#7fd6c2', '#e8fff9', '#237c6d'],
  ['#f06a9b', '#ffd7e6', '#8f234f'],
] as const

const shortCodeFor = (name: string) =>
  name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 3)
    .toUpperCase()

const iconOverrides: Record<string, Partial<BreedIconProfile>> = {
  'american-shorthair': {
    badgeShape: 'shield',
    faceShape: 'round',
    baseColor: '#b98a62',
    secondaryColor: '#f4d0a6',
    accentColor: '#4b3127',
    pattern: 'stripes',
    eyeColor: '#7bcf7a',
    signatureMark: 'star',
    shortCode: 'ASH',
  },
  'british-shorthair': {
    badgeShape: 'cloud',
    faceShape: 'round',
    baseColor: '#8fa6bd',
    secondaryColor: '#dfe9f4',
    accentColor: '#446078',
    pattern: 'shaded',
    eyeColor: '#f3b642',
    signatureMark: 'crown',
    shortCode: 'BSH',
  },
  ragdoll: {
    badgeShape: 'scallop',
    faceShape: 'heart',
    baseColor: '#f7dfc8',
    secondaryColor: '#6e4e45',
    accentColor: '#5c4038',
    pattern: 'point',
    eyeColor: '#5fc5ff',
    signatureMark: 'heart',
    shortCode: 'RAG',
  },
  'maine-coon': {
    badgeShape: 'scallop',
    faceShape: 'long',
    baseColor: '#d09558',
    secondaryColor: '#ffe0a4',
    accentColor: '#5c3b22',
    pattern: 'stripes',
    eyeColor: '#5fb56b',
    earStyle: 'large',
    coatVolume: 'fluffy',
    signatureMark: 'leaf',
    shortCode: 'MCO',
  },
  siamese: {
    badgeShape: 'diamond',
    faceShape: 'wedge',
    baseColor: '#f6d7bd',
    secondaryColor: '#5a4037',
    accentColor: '#4b322b',
    pattern: 'point',
    eyeColor: '#61c7ff',
    signatureMark: 'diamond',
    shortCode: 'SIA',
  },
  sphynx: {
    badgeShape: 'leaf',
    faceShape: 'wedge',
    baseColor: '#f4b19e',
    secondaryColor: '#ffd6ce',
    accentColor: '#9b6170',
    pattern: 'solid',
    eyeColor: '#aee86a',
    coatVolume: 'hairless',
    signatureMark: 'sun',
    shortCode: 'SPH',
  },
  munchkin: {
    badgeShape: 'ticket',
    faceShape: 'small',
    baseColor: '#ffbf86',
    secondaryColor: '#ffe5c4',
    accentColor: '#945637',
    eyeColor: '#75c069',
    signatureMark: 'shoe',
    shortCode: 'MUN',
  },
  bengal: {
    badgeShape: 'shield',
    faceShape: 'wild',
    baseColor: '#f3a35f',
    secondaryColor: '#ffd18e',
    accentColor: '#4b2a20',
    pattern: 'spots',
    eyeColor: '#71bf5f',
    signatureMark: 'spark',
    shortCode: 'BEN',
  },
  persian: {
    badgeShape: 'cloud',
    faceShape: 'flat',
    baseColor: '#fff2e0',
    secondaryColor: '#ffd7b8',
    accentColor: '#9b6f50',
    pattern: 'shaded',
    eyeColor: '#5bb7ff',
    coatVolume: 'fluffy',
    signatureMark: 'moon',
    shortCode: 'PER',
  },
  'scottish-fold': {
    badgeShape: 'circle',
    faceShape: 'round',
    earStyle: 'folded',
    baseColor: '#ffd0dd',
    secondaryColor: '#fff1f5',
    accentColor: '#944b68',
    eyeColor: '#f3b642',
    signatureMark: 'heart',
    shortCode: 'SFO',
  },
  abyssinian: { badgeShape: 'ticket', pattern: 'stripes', baseColor: '#c98a4f', secondaryColor: '#ffe4ba', accentColor: '#7a421c', eyeColor: '#7bcf7a', signatureMark: 'spark', shortCode: 'ABY' },
  aegean: { badgeShape: 'wave', baseColor: '#ffffff', secondaryColor: '#9fd6ff', accentColor: '#287ab8', eyeColor: '#60c7ff', signatureMark: 'wave', shortCode: 'AEG' },
  'american-bobtail': { badgeShape: 'shield', faceShape: 'wild', baseColor: '#d4a06c', secondaryColor: '#ffe0b8', accentColor: '#70401e', pattern: 'stripes', signatureMark: 'bob', tailStyle: 'short', shortCode: 'ABT' },
  'american-curl': { badgeShape: 'leaf', baseColor: '#fff0cf', secondaryColor: '#ffc6df', accentColor: '#9c4e78', signatureMark: 'curl', earStyle: 'curled', shortCode: 'ACL' },
  'american-wirehair': { badgeShape: 'scallop', coatVolume: 'rex', baseColor: '#d7b18b', secondaryColor: '#fff0d6', accentColor: '#7c4b2d', signatureMark: 'wave', shortCode: 'AWH' },
  balinese: { badgeShape: 'diamond', pattern: 'point', faceShape: 'heart', baseColor: '#f7e3c4', secondaryColor: '#65433a', accentColor: '#52362f', eyeColor: '#5fc5ff', tailStyle: 'plume', signatureMark: 'diamond', shortCode: 'BAL' },
  birman: { badgeShape: 'scallop', pattern: 'point', baseColor: '#f6dfc2', secondaryColor: '#70524b', accentColor: '#8f5a53', eyeColor: '#58c6ff', signatureMark: 'shoe', shortCode: 'BIR' },
  bombay: { badgeShape: 'circle', baseColor: '#2f2b32', secondaryColor: '#6a5d67', accentColor: '#ffb33e', eyeColor: '#ffbe4b', signatureMark: 'moon', shortCode: 'BOM' },
  burmese: { badgeShape: 'ticket', baseColor: '#b06d45', secondaryColor: '#ffd3a8', accentColor: '#6d3f28', eyeColor: '#f2b642', signatureMark: 'heart', shortCode: 'BUR' },
  chartreux: { badgeShape: 'cloud', faceShape: 'round', baseColor: '#7e94a8', secondaryColor: '#d8e5ef', accentColor: '#40576c', eyeColor: '#f3bd49', signatureMark: 'crown', shortCode: 'CHX' },
  chausie: { badgeShape: 'shield', faceShape: 'wild', baseColor: '#c79255', secondaryColor: '#f6d39a', accentColor: '#51351f', pattern: 'spots', eyeColor: '#8ccc63', signatureMark: 'leaf', shortCode: 'CHA' },
  'cornish-rex': { badgeShape: 'leaf', faceShape: 'wedge', coatVolume: 'rex', baseColor: '#ffb28b', secondaryColor: '#ffe4d4', accentColor: '#a35442', earStyle: 'large', signatureMark: 'wave', shortCode: 'CRX' },
  'devon-rex': { badgeShape: 'diamond', faceShape: 'small', coatVolume: 'rex', baseColor: '#f5c0a8', secondaryColor: '#ffe8da', accentColor: '#98554b', earStyle: 'large', eyeColor: '#71d0ff', signatureMark: 'spark', shortCode: 'DRX' },
  'egyptian-mau': { badgeShape: 'shield', faceShape: 'wild', baseColor: '#d4c2a0', secondaryColor: '#f3e4c5', accentColor: '#59462f', pattern: 'spots', eyeColor: '#74c96d', signatureMark: 'diamond', shortCode: 'MAU' },
  'exotic-shorthair': { badgeShape: 'cloud', faceShape: 'flat', baseColor: '#ffd9b8', secondaryColor: '#fff3dd', accentColor: '#9a6750', eyeColor: '#6fc4ff', signatureMark: 'moon', shortCode: 'EXO' },
  havana: { badgeShape: 'ticket', faceShape: 'long', baseColor: '#6b3e2b', secondaryColor: '#c48a63', accentColor: '#3d241a', eyeColor: '#75c56d', signatureMark: 'leaf', shortCode: 'HAV' },
  'japanese-bobtail': { badgeShape: 'circle', baseColor: '#fff8ec', secondaryColor: '#ff8d8d', accentColor: '#d64b5a', pattern: 'shaded', signatureMark: 'bob', tailStyle: 'short', shortCode: 'JBT' },
  korat: { badgeShape: 'diamond', baseColor: '#8aa6b9', secondaryColor: '#dcecf4', accentColor: '#3d6477', eyeColor: '#7bd36c', signatureMark: 'diamond', shortCode: 'KOR' },
  'la-perm': { badgeShape: 'scallop', coatVolume: 'rex', baseColor: '#f4b06d', secondaryColor: '#ffe3bf', accentColor: '#955125', signatureMark: 'wave', shortCode: 'LPM' },
  lykoi: { badgeShape: 'moon', coatVolume: 'hairless', baseColor: '#6c6269', secondaryColor: '#b5a9ad', accentColor: '#3f363c', eyeColor: '#f1c94c', signatureMark: 'moon', shortCode: 'LYK' },
  manx: { badgeShape: 'shield', faceShape: 'round', baseColor: '#ffc27a', secondaryColor: '#fff0cf', accentColor: '#9a5b21', signatureMark: 'bob', tailStyle: 'short', shortCode: 'MAN' },
  'norwegian-forest': { badgeShape: 'scallop', faceShape: 'long', coatVolume: 'fluffy', baseColor: '#c28b5c', secondaryColor: '#ffe3bd', accentColor: '#624026', eyeColor: '#7dcc6b', signatureMark: 'snow', shortCode: 'NFC' },
  ocicat: { badgeShape: 'shield', faceShape: 'wild', baseColor: '#d39a55', secondaryColor: '#ffe0a5', accentColor: '#55331d', pattern: 'spots', signatureMark: 'diamond', shortCode: 'OCI' },
  'oriental-shorthair': { badgeShape: 'diamond', faceShape: 'wedge', baseColor: '#f2b497', secondaryColor: '#ffded0', accentColor: '#8b4a3c', earStyle: 'large', signatureMark: 'spark', shortCode: 'OSH' },
  'japanese-bobtail-longhair': { badgeShape: 'circle', coatVolume: 'fluffy', signatureMark: 'bob', tailStyle: 'short', shortCode: 'JBL' },
  'kurilian-bobtail': { badgeShape: 'shield', faceShape: 'wild', baseColor: '#b9875b', secondaryColor: '#f5d5ad', accentColor: '#573820', signatureMark: 'bob', tailStyle: 'short', shortCode: 'KBT' },
  'pixiebob': { badgeShape: 'shield', baseColor: '#a9774d', secondaryColor: '#dfbb88', accentColor: '#51341f', pattern: 'spots', signatureMark: 'bob', faceShape: 'wild', tailStyle: 'short', shortCode: 'PXB' },
  'pixiebob-longhair': { badgeShape: 'scallop', baseColor: '#9f714c', secondaryColor: '#e3c18f', accentColor: '#4f321e', pattern: 'spots', signatureMark: 'bob', faceShape: 'wild', coatVolume: 'fluffy', tailStyle: 'short', shortCode: 'PXL' },
  'russian-blue': { badgeShape: 'diamond', baseColor: '#7d98ad', secondaryColor: '#dbe8f2', accentColor: '#37576d', eyeColor: '#7cd66b', signatureMark: 'diamond', shortCode: 'RBL' },
  savannah: { badgeShape: 'shield', faceShape: 'wild', baseColor: '#d79a52', secondaryColor: '#ffe0a4', accentColor: '#4f321f', pattern: 'spots', earStyle: 'large', signatureMark: 'sun', shortCode: 'SAV' },
  'selkirk-rex': { badgeShape: 'cloud', coatVolume: 'rex', baseColor: '#f5c885', secondaryColor: '#fff0c7', accentColor: '#9a6329', signatureMark: 'wave', shortCode: 'SRX' },
  siberian: { badgeShape: 'scallop', faceShape: 'long', coatVolume: 'fluffy', baseColor: '#c58a5a', secondaryColor: '#ffe1b7', accentColor: '#67401f', signatureMark: 'snow', shortCode: 'SIB' },
  singapura: { badgeShape: 'ticket', faceShape: 'small', baseColor: '#e0b887', secondaryColor: '#fff0cf', accentColor: '#7a4f2d', eyeColor: '#76c96e', signatureMark: 'spark', shortCode: 'SIN' },
  somali: { badgeShape: 'leaf', faceShape: 'long', coatVolume: 'fluffy', baseColor: '#c8793d', secondaryColor: '#ffcb87', accentColor: '#703b17', tailStyle: 'plume', signatureMark: 'leaf', shortCode: 'SOM' },
  thai: { badgeShape: 'diamond', pattern: 'point', faceShape: 'wedge', baseColor: '#f7ddb8', secondaryColor: '#5d4034', accentColor: '#4a3028', eyeColor: '#5fc5ff', signatureMark: 'diamond', shortCode: 'THA' },
  tonkinese: { badgeShape: 'leaf', pattern: 'point', baseColor: '#d59a6a', secondaryColor: '#7a4c38', accentColor: '#5a3526', eyeColor: '#5fd4d0', signatureMark: 'wave', shortCode: 'TON' },
  toyger: { badgeShape: 'shield', baseColor: '#f19a42', secondaryColor: '#ffd28b', accentColor: '#3f2819', pattern: 'stripes', faceShape: 'wild', signatureMark: 'spark', shortCode: 'TOY' },
  'turkish-angora': { badgeShape: 'leaf', faceShape: 'long', coatVolume: 'fluffy', baseColor: '#fff7ea', secondaryColor: '#dff2ff', accentColor: '#6c89a4', eyeColor: '#61c7ff', signatureMark: 'star', shortCode: 'TUA' },
  'turkish-van': { badgeShape: 'wave', faceShape: 'long', coatVolume: 'fluffy', baseColor: '#fff7ea', secondaryColor: '#ff9875', accentColor: '#b64c35', signatureMark: 'wave', shortCode: 'VAN' },
  'australian-mist': { badgeShape: 'cloud', pattern: 'spots', baseColor: '#e4b079', secondaryColor: '#fff1cf', accentColor: '#8b562c', signatureMark: 'wave', shortCode: 'AUM' },
  'bengal-longhair': { badgeShape: 'scallop', faceShape: 'wild', coatVolume: 'fluffy', baseColor: '#ee9e55', secondaryColor: '#ffd697', accentColor: '#4a2e1c', pattern: 'spots', signatureMark: 'spark', shortCode: 'BGL' },
  'british-longhair': { badgeShape: 'cloud', faceShape: 'round', coatVolume: 'fluffy', baseColor: '#9fb2c2', secondaryColor: '#e4eef5', accentColor: '#486275', pattern: 'shaded', eyeColor: '#f3b642', signatureMark: 'crown', shortCode: 'BHL' },
  burmilla: { badgeShape: 'diamond', pattern: 'shaded', baseColor: '#d9dce1', secondaryColor: '#f7fbff', accentColor: '#66717d', eyeColor: '#75c96b', signatureMark: 'diamond', shortCode: 'BUM' },
  'burmilla-longhair': { badgeShape: 'cloud', pattern: 'shaded', coatVolume: 'fluffy', baseColor: '#d4d9df', secondaryColor: '#f8fbff', accentColor: '#63717e', eyeColor: '#75c96b', signatureMark: 'spark', shortCode: 'BUL' },
  cymric: { badgeShape: 'scallop', coatVolume: 'fluffy', baseColor: '#f0b36d', secondaryColor: '#ffe3bd', accentColor: '#8a4f22', signatureMark: 'bob', tailStyle: 'short', shortCode: 'CYM' },
  donskoy: { badgeShape: 'leaf', coatVolume: 'hairless', faceShape: 'wedge', baseColor: '#f1a58f', secondaryColor: '#ffd8cf', accentColor: '#945667', eyeColor: '#aee86a', signatureMark: 'sun', shortCode: 'DON' },
  highlander: { badgeShape: 'shield', faceShape: 'wild', baseColor: '#d08a55', secondaryColor: '#ffd5a8', accentColor: '#6f3c20', earStyle: 'curled', tailStyle: 'short', signatureMark: 'curl', shortCode: 'HLD' },
  himalayan: { badgeShape: 'cloud', faceShape: 'flat', pattern: 'point', coatVolume: 'fluffy', baseColor: '#f5dfc4', secondaryColor: '#6d4c43', accentColor: '#573c34', eyeColor: '#5fc5ff', signatureMark: 'moon', shortCode: 'HIM' },
  khaomanee: { badgeShape: 'diamond', baseColor: '#fffaf0', secondaryColor: '#dff5ff', accentColor: '#55a8dc', eyeColor: '#5fc5ff', signatureMark: 'diamond', shortCode: 'KHA' },
  'laperm-shorthair': { badgeShape: 'ticket', coatVolume: 'rex', baseColor: '#f0a86c', secondaryColor: '#ffe0bd', accentColor: '#8d4d25', signatureMark: 'wave', shortCode: 'LPS' },
  'maine-coon-polydactyl': { badgeShape: 'scallop', faceShape: 'long', coatVolume: 'fluffy', baseColor: '#c8874c', secondaryColor: '#ffdeaa', accentColor: '#5c351b', pattern: 'stripes', earStyle: 'large', tailStyle: 'plume', signatureMark: 'shoe', shortCode: 'MCP' },
  minuet: { badgeShape: 'ticket', faceShape: 'small', baseColor: '#ffc080', secondaryColor: '#ffe7c8', accentColor: '#8c5230', signatureMark: 'moon', shortCode: 'MIN' },
  'munchkin-longhair': { badgeShape: 'ticket', faceShape: 'small', coatVolume: 'fluffy', baseColor: '#ffbf86', secondaryColor: '#ffe4c4', accentColor: '#945637', signatureMark: 'shoe', shortCode: 'MLH' },
  nebelung: { badgeShape: 'cloud', faceShape: 'long', coatVolume: 'fluffy', baseColor: '#8ba5b9', secondaryColor: '#dbe9f2', accentColor: '#3c5f75', eyeColor: '#77d56a', signatureMark: 'moon', shortCode: 'NEB' },
  'oriental-longhair': { badgeShape: 'leaf', faceShape: 'wedge', coatVolume: 'fluffy', baseColor: '#f3b69c', secondaryColor: '#ffdfd2', accentColor: '#894b3d', earStyle: 'large', tailStyle: 'plume', signatureMark: 'spark', shortCode: 'OLH' },
  peterbald: { badgeShape: 'diamond', coatVolume: 'hairless', faceShape: 'wedge', baseColor: '#e9a18e', secondaryColor: '#ffd4c7', accentColor: '#905465', earStyle: 'large', signatureMark: 'diamond', shortCode: 'PBD' },
  'scottish-fold-longhair': { badgeShape: 'cloud', faceShape: 'round', earStyle: 'folded', coatVolume: 'fluffy', baseColor: '#ffd0dd', secondaryColor: '#fff1f5', accentColor: '#944b68', signatureMark: 'heart', shortCode: 'SFL' },
  'scottish-straight': { badgeShape: 'circle', faceShape: 'round', baseColor: '#ffc7d7', secondaryColor: '#fff0f4', accentColor: '#944b68', signatureMark: 'star', shortCode: 'SST' },
  'scottish-straight-longhair': { badgeShape: 'cloud', faceShape: 'round', coatVolume: 'fluffy', baseColor: '#ffcbd9', secondaryColor: '#fff1f5', accentColor: '#944b68', signatureMark: 'spark', shortCode: 'SSL' },
  'selkirk-rex-longhair': { badgeShape: 'cloud', coatVolume: 'rex', baseColor: '#f3c686', secondaryColor: '#fff0ca', accentColor: '#99622a', signatureMark: 'wave', shortCode: 'SRL' },
  serengeti: { badgeShape: 'shield', faceShape: 'wild', baseColor: '#e0a257', secondaryColor: '#ffe1a5', accentColor: '#55331e', pattern: 'spots', earStyle: 'large', signatureMark: 'sun', shortCode: 'SER' },
  'snowshoe': { badgeShape: 'ticket', baseColor: '#f7dfc8', secondaryColor: '#60453d', accentColor: '#4f362f', pattern: 'point', eyeColor: '#5fc5ff', signatureMark: 'shoe', shortCode: 'SNO' },
  'tennessee-rex': { badgeShape: 'scallop', coatVolume: 'rex', baseColor: '#f4bd86', secondaryColor: '#fff0c9', accentColor: '#925b2a', signatureMark: 'spark', shortCode: 'TRX' },
  toybob: { badgeShape: 'ticket', faceShape: 'small', baseColor: '#ffca82', secondaryColor: '#ffe8c5', accentColor: '#8b5625', signatureMark: 'bob', tailStyle: 'short', shortCode: 'TOB' },
}

const iconProfileFor = (
  breed: BaseBreedOrigin,
  markerProfile: BreedMarkerProfile,
): BreedIconProfile => {
  const hash = [...breed.id].reduce((total, char) => total + char.charCodeAt(0), 0)
  const [baseColor, secondaryColor, accentColor] = iconPalette[hash % iconPalette.length]
  const faceShape: IconFaceShape = markerProfile.size === 'large'
    ? 'long'
    : markerProfile.size === 'low'
      ? 'small'
      : markerProfile.coat === 'hairless'
        ? 'wedge'
        : markerProfile.pattern === 'spots'
          ? 'wild'
          : markerProfile.pattern === 'point'
            ? 'heart'
            : 'round'
  const coatVolume: IconCoatVolume = markerProfile.coat === 'long'
    ? 'fluffy'
    : markerProfile.coat === 'rex'
      ? 'rex'
      : markerProfile.coat === 'hairless'
        ? 'hairless'
        : 'medium'
  const eyeColors = ['#5fc5ff', '#77c96b', '#f3b642', '#b98cff', '#65d9b8']
  const signatureMarks: IconSignatureMark[] = ['star', 'moon', 'heart', 'spark', 'leaf', 'wave', 'diamond']
  const badgeShapes: IconBadgeShape[] = ['circle', 'scallop', 'shield', 'diamond', 'cloud', 'leaf', 'ticket', 'wave', 'moon']
  const baseProfile: BreedIconProfile = {
    badgeShape: badgeShapes[hash % badgeShapes.length],
    faceShape,
    baseColor,
    secondaryColor,
    accentColor,
    pattern: markerProfile.pattern,
    eyeColor: eyeColors[hash % eyeColors.length],
    earStyle: markerProfile.ears,
    tailStyle: markerProfile.tail,
    coatVolume,
    signatureMark: signatureMarks[hash % signatureMarks.length],
    shortCode: shortCodeFor(breed.ticaName),
  }

  return {
    ...baseProfile,
    ...iconOverrides[breed.id],
  }
}

const readingSectionsFor = (
  breed: BaseBreedOrigin,
  zhName: string,
  story: VerifiedBreedStory,
  aliases: string[],
): BreedReadingSection[] => [
  {
    titleZh: '\u4e3a\u4ec0\u4e48\u4f1a\u547d\u4e2d\u8fd9\u4e2a\u54c1\u79cd',
    titleEn: 'Why this result matches',
    bodyZh: aliasExplanationZhFor(breed, zhName, aliases),
    bodyEn: aliases.length > 0
      ? `${aliases.slice(0, 3).join(', ')} are common Chinese search terms mapped to ${breed.ticaName}.`
      : `${breed.ticaName} is indexed by name, origin, and breed traits.`,
  },
  {
    titleZh: '\u6545\u4e8b\u6765\u6e90\u8bf4\u660e',
    titleEn: 'Story evidence note',
    bodyZh: story.evidenceNoteZh,
    bodyEn: story.evidenceNoteEn,
  },
  {
    titleZh: '\u9605\u8bfb\u5165\u53e3',
    titleEn: 'Reading hook',
    bodyZh: story.bodyZh,
    bodyEn: story.bodyEn,
  },
]

const aliasExplanationOverrides: Record<string, string> = {
  'american-shorthair': '“美短”是美国短毛猫最常见的中文简称，本图鉴会把美短、美国短毛等搜索统一归到 American Shorthair。',
  'british-shorthair': '“英短”“蓝猫”“金渐层”“银渐层”常被一起搜索；其中金渐层、银渐层更偏花色叫法，本图鉴会先指向 British Shorthair 相关入口。',
  ragdoll: '“布偶”是 Ragdoll 在中文语境里最自然的叫法，本图鉴会把布偶猫和 Ragdoll 放在同一个阅读页。',
  'maine-coon': '“缅因”通常指 Maine Coon。中文用户搜索缅因、缅因猫时，本图鉴会直接回到这个大型长毛品种。',
  siamese: '“暹罗”通常对应 Siamese；如果搜索传统暹罗，也可以继续查看 Thai，它在 TICA 中是独立品种。',
  'devon-rex': '“德文”是 Devon Rex 的常用简称；中文用户也会按卷毛、大耳朵等特征找到它。',
  sphynx: '“无毛猫”常被中文用户用来搜索 Sphynx，但无毛类还包括 Donskoy、Peterbald 等，本图鉴会按品种分开展示。',
  munchkin: '“矮脚”常被用来搜索 Munchkin；本图鉴保留这个入口，同时在详情里补充体型和护理语境。',
  bengal: '“豹猫”是中文用户常用搜索词；在品种图鉴里通常对应 Bengal，但它仍是家猫品种，不等于野生豹猫。',
  persian: '“波斯”是 Persian 的常用中文简称；搜索长毛、圆脸等特征时也会回到这个经典长毛品种。',
  'scottish-fold': '“折耳”常被中文用户用来搜索 Scottish Fold；本图鉴会把可爱外形和健康背景一起展示。',
  'oriental-shorthair': '“东短”是部分猫友对东方短毛猫的简称，本图鉴统一归到 Oriental Shorthair。',
  'oriental-longhair': '“东长”是部分猫友对东方长毛猫的简称，本图鉴统一归到 Oriental Longhair。',
  thai: 'Thai 在 TICA 中是独立品种，中文用户常按传统暹罗语境理解；本图鉴会把这类搜索归到 Thai，并保留与 Siamese 的区分。',
}

const aliasExplanationZhFor = (
  breed: BaseBreedOrigin,
  zhName: string,
  aliases: string[],
) => {
  const override = aliasExplanationOverrides[breed.id]
  if (override) return override

  if (aliases.length > 0) {
    const aliasText = aliases.slice(0, 3).map((alias) => `“${alias}”`).join('、')
    return `${aliasText} 都可以作为 ${zhName} 的搜索入口；本图鉴会把日常叫法回收到 ${breed.ticaName} 这个正式品种名下，避免把俗称误当成新猫种。`
  }

  return `${zhName} 主要按英文名、原产地和品种特征建立索引；如果后续出现更常见的中文简称，会继续补到搜索词里。`
}

const sourceLinksFor = (
  breed: BaseBreedOrigin,
  photo: BreedPhoto,
  story: VerifiedBreedStory,
): BreedSourceLink[] => [
  {
    labelZh: 'TICA \u54c1\u79cd\u8d44\u6599',
    labelEn: 'TICA breed profile',
    url: breed.sourceUrl,
    type: 'tica',
  },
  {
    labelZh: '\u53ef\u67e5\u6545\u4e8b\u6765\u6e90',
    labelEn: 'Traceable story source',
    url: story.sourceUrl,
    type: 'story',
  },
  {
    labelZh: '\u56fe\u7247\u6765\u6e90',
    labelEn: 'Photo source',
    url: photo.sourceUrl,
    type: 'photo',
  },
  {
    labelZh: 'TICA \u603b\u54c1\u79cd\u9875',
    labelEn: 'TICA all breeds',
    url: ticaBreedSource,
    type: 'reference',
  },
]

const youtubeSearch = (query: string) =>
  `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`

const externalStoryRegistry: Record<string, BreedExternalStory[]> = {
  'american-shorthair': [
    {
      titleZh: '从船舱和农场里长出来的“美短感”',
      titleEn: 'A video doorway into the working-cat American Shorthair',
      summaryZh: '想继续理解美短为什么总被说“稳”和“好相处”，可以从这里看公开视频资料：重点看它的工作猫背景、结实体型和家庭陪伴感。这里是视频检索入口，不伪装成单条新闻。',
      summaryEn: 'A video search doorway for American Shorthair breed profiles, focused on the working-cat background and family-companion temperament.',
      url: youtubeSearch('American Shorthair cat breed profile video'),
      sourceName: 'YouTube breed video search',
      sourceType: 'video',
      tone: 'informative',
      platform: 'YouTube',
    },
  ],
  'british-shorthair': [
    {
      titleZh: '蓝猫、金渐层背后的英短本体',
      titleEn: 'British Shorthair videos beyond blue and golden coats',
      summaryZh: '很多人先认识“蓝猫”或“金渐层”，再回到英短这个品种。这个入口用于继续看公开视频资料，帮助区分品种、花色和它安静厚实的日常性格。',
      summaryEn: 'A video doorway for British Shorthair breed content, useful for separating breed identity from blue, golden, and silver coat nicknames.',
      url: youtubeSearch('British Shorthair cat breed golden shaded blue cat video'),
      sourceName: 'YouTube breed video search',
      sourceType: 'video',
      tone: 'informative',
      platform: 'YouTube',
    },
  ],
  ragdoll: [
    {
      titleZh: '布偶猫为什么总被说“像玩偶”',
      titleEn: 'Why Ragdolls are remembered for softness',
      summaryZh: '如果想继续看布偶猫为什么被叫“像玩偶”，可以从这里看公开视频资料：重点看抱起时的放松感、长毛质感和亲人的互动。这里是视频检索入口，不伪装成单条新闻。',
      summaryEn: 'A video search doorway for Ragdoll softness, long coat, and companion temperament, turning the breed name into a more visual reading path.',
      url: youtubeSearch('Ragdoll cat heartwarming story video'),
      sourceName: 'YouTube story video search',
      sourceType: 'video',
      tone: 'touching',
      platform: 'YouTube',
    },
  ],
  'maine-coon': [
    {
      titleZh: '缅因巨猫的真实视频比参数更有说服力',
      titleEn: 'Maine Coon scale is easier to feel on video',
      summaryZh: '缅因的“大”只看数字很难有感觉，视频里更容易看到它的蓬松尾巴、巨猫比例和温和互动。这里给出公开视频检索入口，不虚构单只网红猫故事。',
      summaryEn: 'A video doorway for Maine Coon scale, plumed tails, and gentle-giant behavior without inventing an individual viral-cat story.',
      url: youtubeSearch('Maine Coon giant cat funny video story'),
      sourceName: 'YouTube story video search',
      sourceType: 'video',
      tone: 'funny',
      platform: 'YouTube',
    },
  ],
  siamese: [
    {
      titleZh: '暹罗猫“爱说话”的视频入口',
      titleEn: 'The talkative Siamese on video',
      summaryZh: '暹罗最适合用视频理解：它的声音、参与感和“非要加入聊天”的存在感，比资料卡更有记忆点。这里是公开视频检索入口。',
      summaryEn: 'A video doorway for the talkative Siamese personality, where voice and involvement are easier to understand than in a static card.',
      url: youtubeSearch('talkative Siamese cat funny video'),
      sourceName: 'YouTube video search',
      sourceType: 'video',
      tone: 'funny',
      platform: 'YouTube',
    },
  ],
  'devon-rex': [
    {
      titleZh: '德文卷毛的小精灵感需要动起来看',
      titleEn: 'Devon Rex pixie energy works best in motion',
      summaryZh: '德文卷毛的大耳朵、卷毛和顽皮表情很适合短视频：静态照片像小精灵，动起来才更像会恶作剧的室友。这里是公开视频检索入口。',
      summaryEn: 'A video search doorway for Devon Rex pixie-like ears, curls, and playful expressions.',
      url: youtubeSearch('Devon Rex cat funny video Kirlee breed story'),
      sourceName: 'YouTube video search',
      sourceType: 'video',
      tone: 'funny',
      platform: 'YouTube',
    },
  ],
  sphynx: [
    {
      titleZh: '无毛猫的反差萌和护理视频',
      titleEn: 'Sphynx contrast: funny, warm, and care-heavy',
      summaryZh: '斯芬克斯很容易靠外形出圈，但真正有意思的是保暖、洗护和黏人的反差。这个入口优先指向公开视频资料，帮助用户把“无毛”理解成护理责任，而不只是外观标签。',
      summaryEn: 'A video doorway for Sphynx contrast: funny looks, warmth needs, skin care, and affectionate behavior.',
      url: youtubeSearch('Sphynx cat funny heartwarming care video'),
      sourceName: 'YouTube video search',
      sourceType: 'video',
      tone: 'touching',
      platform: 'YouTube',
    },
  ],
  munchkin: [
    {
      titleZh: '矮脚猫视频要同时看可爱和行动能力',
      titleEn: 'Munchkin videos should show both cuteness and movement',
      summaryZh: '曼基康的短腿很吸睛，但视频更适合观察动作、体型和日常活动状态。这个入口保留可爱感，也提醒用户不要只看外形。',
      summaryEn: 'A video doorway for Munchkin cats that keeps movement, body type, and care context visible alongside cuteness.',
      url: youtubeSearch('Munchkin cat funny video movement care'),
      sourceName: 'YouTube video search',
      sourceType: 'video',
      tone: 'informative',
      platform: 'YouTube',
    },
  ],
  bengal: [
    {
      titleZh: '孟加拉猫的斑点和精力适合看视频',
      titleEn: 'Bengal pattern and energy need video context',
      summaryZh: '孟加拉的斑点、跳跃和高精力家庭互动很适合视频观看。这里给出公开视频检索入口，同时明确：它是家猫品种，不是野生宠物替代品。',
      summaryEn: 'A video doorway for Bengal spots, jumps, and high-energy domestic-cat behavior, without treating the breed as a wild-pet substitute.',
      url: youtubeSearch('Bengal cat funny high energy video story'),
      sourceName: 'YouTube story video search',
      sourceType: 'video',
      tone: 'funny',
      platform: 'YouTube',
    },
  ],
  persian: [
    {
      titleZh: '波斯猫的慢镜头气质和护理入口',
      titleEn: 'Persian calm and grooming as a video path',
      summaryZh: '波斯猫的圆脸、慢节奏和长毛护理很难只靠文字呈现；这个入口用于继续看真实梳理、日常状态和安静气质的视频资料。',
      summaryEn: 'A video doorway for Persian calm expression, long coat, and grooming rhythm.',
      url: youtubeSearch('Persian cat grooming funny calm video'),
      sourceName: 'YouTube video search',
      sourceType: 'video',
      tone: 'informative',
      platform: 'YouTube',
    },
  ],
  'scottish-fold': [
    {
      titleZh: '折耳猫的可爱和健康背景都要看',
      titleEn: 'Scottish Fold videos with health context',
      summaryZh: '苏格兰折耳很容易先被外形吸引，但继续了解时必须把健康背景一起看。这个入口优先检索护理和品种讨论视频，不把可爱当成唯一卖点。',
      summaryEn: 'A video doorway for Scottish Fold cuteness with care and health context kept visible.',
      url: youtubeSearch('Scottish Fold cat health care video breed'),
      sourceName: 'YouTube care video search',
      sourceType: 'video',
      tone: 'informative',
      platform: 'YouTube',
    },
  ],
  thai: [
    {
      titleZh: '传统暹罗/泰国猫的视频线索',
      titleEn: 'Traditional Siamese and Thai cat video leads',
      summaryZh: 'Thai 在 TICA 中是独立品种，但中文用户常按传统暹罗语境理解。这个入口帮助继续比较旧式轮廓、重点色和蓝眼睛，不把 Thai 简单等同于 Siamese。',
      summaryEn: 'A video doorway for Thai and traditional Siamese context, useful for comparing older-style outlines, colorpoints, and blue eyes.',
      url: youtubeSearch('Thai cat traditional Siamese breed video'),
      sourceName: 'YouTube breed video search',
      sourceType: 'video',
      tone: 'legendary',
      platform: 'YouTube',
    },
  ],
}

const curatedStories: Record<string, BreedStory> = {
  'american-shorthair': {
    titleZh: '从船舱捕鼠员到家庭猫',
    titleEn: 'From ship mouser to house companion',
    bodyZh: 'American Shorthair 常被介绍为北美早期工作猫的后代：它们跟随移民船只和农场生活，被看重的不是夸张外形，而是结实身体、短密被毛和稳定性格。这个背景也解释了中国猫友说“美短”时，常会把它和好养、结实、适合家庭联系在一起。',
    bodyEn: 'American Shorthair is often introduced through early North American working cats: sturdy mousers valued for practical health, dense coats, and steady temperaments before becoming a familiar family companion.',
    sourceName: 'TICA American Shorthair profile',
    sourceUrl: sourceUrlFor('american-shorthair'),
    type: 'history',
  },
  'british-shorthair': {
    titleZh: '英短不只是一种颜色',
    titleEn: 'British Shorthair is more than one color',
    bodyZh: '国内常说的“蓝猫”“金渐层”“银渐层”多是在英国短毛猫体系里被讨论的颜色和花色，不是独立品种。把这些叫法放进搜索，是为了让中文用户按日常称呼也能找到真正的品种入口。',
    bodyEn: 'Chinese nicknames such as blue cat, golden shaded, and silver shaded usually describe colors discussed within British Shorthair lines rather than separate breeds, so this atlas maps those names back to the breed.',
    sourceName: 'TICA British Shorthair profile',
    sourceUrl: sourceUrlFor('british-shorthair'),
    type: 'culture',
  },
  'ragdoll': {
    titleZh: '“布偶”名字里的松弛感',
    titleEn: 'The relaxed idea behind Ragdoll',
    bodyZh: 'Ragdoll 的流行故事常与美国育种人 Ann Baker 和一只名叫 Josephine 的白色长毛猫联系在一起。品种名强调被抱起时柔软放松的印象，这也是“布偶猫”这个中文名特别容易被记住的原因。',
    bodyEn: 'Ragdoll breed history is commonly linked with breeder Ann Baker and a white longhaired cat named Josephine. The name captures the relaxed impression that made the breed memorable.',
    sourceName: 'TICA Ragdoll profile',
    sourceUrl: sourceUrlFor('ragdoll'),
    type: 'history',
  },
  'maine-coon': {
    titleZh: '缅因州的“大猫传说”',
    titleEn: 'The big-cat legend of Maine',
    bodyZh: 'Maine Coon 的故事经常围绕美国缅因州的严寒农场和港口展开。厚实被毛、蓬松尾巴和大体型让它看起来像从雪地故事里走出来，也让“缅因”在中文猫友圈几乎等同于温和巨猫。',
    bodyEn: 'Maine Coon history is usually framed around cold farms and ports in Maine. Its coat, tail, and size turned the breed into the gentle giant many cat people remember first.',
    sourceName: 'TICA Maine Coon profile',
    sourceUrl: sourceUrlFor('maine-coon'),
    type: 'culture',
  },
  'siamese': {
    titleZh: '暹罗：从泰国古名走来的猫',
    titleEn: 'Siamese and the old name of Thailand',
    bodyZh: '“暹罗”来自泰国旧称 Siam。这个名字让品种自带历史感：重点色、蓝眼睛和爱表达的性格，使它在现代家庭里依然像一个很会参与聊天的老朋友。',
    bodyEn: 'The name Siamese carries the older name Siam for Thailand. Its colorpoint pattern, blue eyes, and vocal personality keep the breed easy to recognize in modern homes.',
    sourceName: 'TICA Siamese profile',
    sourceUrl: sourceUrlFor('siamese'),
    type: 'history',
  },
  'devon-rex': {
    titleZh: 'Kirlee 和小精灵耳朵',
    titleEn: 'Kirlee and the pixie look',
    bodyZh: 'Devon Rex 的现代故事常从英国 Devon 一只名叫 Kirlee 的卷毛小猫说起。大耳朵、短卷毛和顽皮表情，让中文猫友把“德文”记成很有小精灵感的品种。',
    bodyEn: 'Devon Rex history is commonly traced to a curly-coated kitten named Kirlee in Devon, England. Its ears, coat, and playful expression created the breed’s pixie-like identity.',
    sourceName: 'TICA Devon Rex profile',
    sourceUrl: sourceUrlFor('devon-rex'),
    type: 'history',
  },
  'sphynx': {
    titleZh: '无毛猫并不是完全没有护理',
    titleEn: 'Hairless does not mean no care',
    bodyZh: 'Sphynx 的无毛外观来自自然突变和后续育种。它少了被毛遮挡，却更需要皮肤清洁、保暖和日常观察；这让“无毛猫”成为外形强烈、护理也很有存在感的品种。',
    bodyEn: 'Sphynx hairlessness comes from natural mutation and selective breeding. Less coat does not remove care needs; skin cleaning, warmth, and routine observation matter.',
    sourceName: 'TICA Sphynx profile',
    sourceUrl: sourceUrlFor('sphynx'),
    type: 'history',
  },
  'munchkin': {
    titleZh: '矮脚猫的重点不是“玩具感”',
    titleEn: 'The short legs are not just a toy look',
    bodyZh: 'Munchkin 的短腿来自自然出现的遗传特征，中文常叫“矮脚猫”。图鉴里把它和长毛版本分开展示，是为了让用户理解：日常叫法常按腿长记忆，TICA 资料则按具体品种和毛型管理。',
    bodyEn: 'Munchkin cats are remembered for naturally occurring short legs. The atlas separates coat variants so everyday nicknames can still lead to the correct breed entry.',
    sourceName: 'TICA Munchkin profile',
    sourceUrl: sourceUrlFor('munchkin'),
    type: 'culture',
  },
  'bengal': {
    titleZh: '家猫外表里的小豹纹',
    titleEn: 'A small leopard look in a domestic cat',
    bodyZh: 'Bengal 最抓人的地方是斑点和云纹外观。它的品种叙事常会提到亚洲豹猫血统背景，但现代图鉴更应该提醒用户：它是家庭饲养的品种猫，不是野生动物替代品。',
    bodyEn: 'Bengal cats are remembered for spotted and marbled coats, with breed history often mentioning Asian leopard cat ancestry. Modern ownership still treats them as domestic breed cats.',
    sourceName: 'TICA Bengal profile',
    sourceUrl: sourceUrlFor('bengal'),
    type: 'history',
  },
  'american-bobtail': {
    titleZh: 'Yodi 的短尾起点',
    titleEn: 'Yodi and the bobtail beginning',
    bodyZh: 'TICA 品种页记载，American Bobtail 的现代故事常从一只名叫 Yodi 的短尾猫说起。这种说法让它不只是一个外形标签，而是像一段被猫友传下来的发现笔记。',
    bodyEn: 'TICA describes the modern American Bobtail story as beginning with a short-tailed cat named Yodi, turning the breed tail into a memorable origin note rather than just a visual trait.',
    sourceName: 'TICA American Bobtail profile',
    sourceUrl: sourceUrlFor('american-bobtail'),
    type: 'history',
  },
}

const curatedStoryOverrides: Record<string, BreedStory> = {
  'american-shorthair': {
    titleZh: '从船舱捕鼠员到家里最稳的同伴',
    titleEn: 'From ship mouser to steady house companion',
    bodyZh: '美短的流行叙事来自早期北美工作猫：它们跟着移民船和农场生活，靠结实身体和捕鼠本领留下来。今天大家说“美短”，常常是在说一种稳、耐看、适合家庭的猫。',
    bodyEn: 'American Shorthair is often introduced through early North American working cats that lived around ships and farms. The modern breed keeps that sturdy, steady companion image many Chinese users mean when they search Meiduan.',
    sourceName: 'TICA American Shorthair profile',
    sourceUrl: sourceUrlFor('american-shorthair'),
    type: 'history',
    tone: 'history',
    sourceType: 'official',
  },
  'british-shorthair': {
    titleZh: '金渐层、蓝猫，其实先回到英短',
    titleEn: 'Golden shaded and blue cats still point back to British Shorthair',
    bodyZh: '国内常说的蓝猫、金渐层、银渐层，多数是英短体系里被记住的颜色或花色，不是新的独立品种。这个小误会很常见，也很好笑：很多人以为自己在搜颜色，结果真正入口是品种。',
    bodyEn: 'Chinese searches such as blue cat, golden shaded, and silver shaded usually describe memorable colors in British Shorthair lines rather than separate breeds. The atlas maps those nicknames back to the breed entry.',
    sourceName: 'TICA British Shorthair profile',
    sourceUrl: sourceUrlFor('british-shorthair'),
    type: 'culture',
    tone: 'funny',
    sourceType: 'official',
  },
  ragdoll: {
    titleZh: '布偶名字里的温柔记忆',
    titleEn: 'The soft memory inside the Ragdoll name',
    bodyZh: '布偶猫的名字来自被抱起时柔软放松的印象，品种故事也常和美国育种早期的长毛猫线索联系在一起。这个名字能留下来，是因为它准确抓住了很多人第一次抱起布偶时的感觉。',
    bodyEn: 'The Ragdoll name comes from the relaxed impression associated with being held. The story stays memorable because it captures what many people expect from the breed at first touch.',
    sourceName: 'TICA Ragdoll profile',
    sourceUrl: sourceUrlFor('ragdoll'),
    type: 'history',
    tone: 'touching',
    sourceType: 'official',
  },
  'maine-coon': {
    titleZh: '缅因的大尾巴像冬天的围巾',
    titleEn: 'A winter-scarf tail from Maine',
    bodyZh: '缅因猫常被放在美国缅因州寒冷农场和港口的历史背景里理解。厚毛、大体型和蓬松尾巴让它像自带围巾的温和巨猫，这也是中文猫友一听“大缅”就能想起的画面。',
    bodyEn: 'Maine Coon history is often read through cold farms and ports in Maine. The heavy coat, large body, and plumed tail make the breed feel like a gentle cat wearing its own winter scarf.',
    sourceName: 'TICA Maine Coon profile',
    sourceUrl: sourceUrlFor('maine-coon'),
    type: 'history',
    tone: 'history',
    sourceType: 'official',
  },
  siamese: {
    titleZh: '暹罗像一个很爱插话的老朋友',
    titleEn: 'Siamese feels like a friend who always joins the conversation',
    bodyZh: '暹罗来自泰国旧称 Siam 的历史语境。重点色、蓝眼睛和爱表达的性格让它特别容易被记住；很多资料都会提醒新手，它不是安静背景板，更像一个参与感很强的家人。',
    bodyEn: 'The Siamese name carries the older name Siam for Thailand. Colorpoints, blue eyes, and a vocal personality make it feel less like background decor and more like a family member joining the room.',
    sourceName: 'TICA Siamese profile',
    sourceUrl: sourceUrlFor('siamese'),
    type: 'culture',
    tone: 'funny',
    sourceType: 'official',
  },
  'devon-rex': {
    titleZh: 'Kirlee 和“小精灵耳朵”',
    titleEn: 'Kirlee and the pixie ears',
    bodyZh: '德文卷毛的现代故事常从英国 Devon 一只名叫 Kirlee 的卷毛小猫说起。大耳朵、短卷毛和顽皮表情让它有一种小精灵感，照片里常像刚刚想出一个坏点子。',
    bodyEn: 'Devon Rex history is commonly traced to a curly-coated kitten named Kirlee in Devon, England. The large ears, short curls, and playful face created the breed\'s pixie-like identity.',
    sourceName: 'TICA Devon Rex profile',
    sourceUrl: sourceUrlFor('devon-rex'),
    type: 'culture',
    tone: 'funny',
    sourceType: 'official',
  },
  sphynx: {
    titleZh: '无毛不等于不用照顾',
    titleEn: 'Hairless does not mean no care',
    bodyZh: '斯芬克斯的无毛外观来自自然突变和后续育种。少了被毛遮挡，它反而更需要皮肤清洁、保暖和日常观察；这种反差让“无毛猫”既特别，也很需要认真对待。',
    bodyEn: 'Sphynx hairlessness comes from natural mutation and selective breeding. Less coat does not remove care needs; skin cleaning, warmth, and daily observation matter more.',
    sourceName: 'TICA Sphynx profile',
    sourceUrl: sourceUrlFor('sphynx'),
    type: 'anecdote',
    tone: 'care',
    sourceType: 'official',
  },
  munchkin: {
    titleZh: '矮脚猫的可爱不该只停在腿短',
    titleEn: 'Munchkin cuteness should not stop at short legs',
    bodyZh: '曼基康因为短腿被中文用户常叫“矮脚猫”。但它不是玩具符号，而是需要按真实体型、活动能力和护理需求去理解的品种；图鉴把这个俗称映射回来，是为了避免只看外形。',
    bodyEn: 'Chinese users often search Munchkin as short-legged cat. The atlas maps that nickname back to the breed while keeping the focus on real body type, movement, and care needs.',
    sourceName: 'TICA Munchkin profile',
    sourceUrl: sourceUrlFor('munchkin'),
    type: 'anecdote',
    tone: 'care',
    sourceType: 'official',
  },
  bengal: {
    titleZh: '像小豹，但仍然是家猫',
    titleEn: 'A little leopard look, still a domestic cat',
    bodyZh: '孟加拉猫最抓眼的是斑点和云纹，品种叙事也常提到亚洲豹猫血统背景。这个故事很吸引人，但也要记住：现代孟加拉是家庭饲养的品种猫，不是把野生动物带回家。',
    bodyEn: 'Bengal cats are remembered for spotted and marbled coats, and breed history often mentions Asian leopard cat ancestry. Modern Bengals are still domestic breed cats, not wild-pet substitutes.',
    sourceName: 'TICA Bengal profile',
    sourceUrl: sourceUrlFor('bengal'),
    type: 'history',
    tone: 'history',
    sourceType: 'official',
  },
  persian: {
    titleZh: '波斯猫的表情自带慢镜头',
    titleEn: 'Persian expression feels like slow motion',
    bodyZh: '波斯猫在许多猫展和品种资料里都和长毛、圆脸、安静气质联系在一起。它的魅力不靠动作快，而是靠一张像在思考人生的脸；护理重点也因此落在梳毛和眼周清洁。',
    bodyEn: 'Persian cats are linked with long coats, round faces, and a calm show-cat presence. Their charm is slow and expressive, while grooming and eye-area care remain practical reading points.',
    sourceName: 'TICA Persian profile',
    sourceUrl: sourceUrlFor('persian'),
    type: 'anecdote',
    tone: 'care',
    sourceType: 'official',
  },
  'scottish-fold': {
    titleZh: '折耳很可爱，但也要看见健康问题',
    titleEn: 'Cute folded ears, with health context visible',
    bodyZh: '苏格兰折耳的耳形很容易让人心动，但可靠资料通常也会提醒关注软骨相关健康风险。把这点写进图鉴，是因为真正喜欢一个品种，不应该只喜欢它最上镜的一面。',
    bodyEn: 'Scottish Fold ears are immediately appealing, but reliable references also discuss cartilage-related health context. The atlas keeps that visible because liking a breed should include the less photogenic truth.',
    sourceName: 'TICA Scottish Fold profile',
    sourceUrl: sourceUrlFor('scottish-fold'),
    type: 'history',
    tone: 'touching',
    sourceType: 'official',
  },
}

type VerifiedStorySeed = Pick<
  VerifiedBreedStory,
  'titleZh' | 'titleEn' | 'bodyZh' | 'bodyEn' | 'tone'
> & {
  type?: BreedStory['type']
  sourceType?: StorySourceType
  sourceName?: string
  sourceUrl?: string
  evidenceNoteZh?: string
  evidenceNoteEn?: string
}

const verifiedStorySeeds: Record<string, VerifiedStorySeed> = {
  abyssinian: { titleZh: '像从古画里跑出来的阿比', titleEn: 'The Abyssinian that looks painted by history', bodyZh: '阿比西尼亚猫常被资料描述成带有古老气质的 ticked coat 猫；这个小故事的重点不是神秘传说，而是它从东非意象到英国育种线索的迁移感，像一只把旅途颜色穿在身上的猫。', bodyEn: 'Abyssinians are often introduced through an ancient-looking ticked coat and a route from East African imagery into British refinement, making the breed feel like a travel story in fur.', tone: 'legend' },
  aegean: { titleZh: '爱琴海岛上的自然猫', titleEn: 'A natural cat from the Aegean islands', bodyZh: '爱琴猫的可爱在于它不是被包装出来的“网红设定”，而是和希腊岛屿生活联系在一起的自然品种；读它的故事像看到一只在海边小镇熟门熟路讨摸的猫。', bodyEn: 'The Aegean reads less like a manufactured trend and more like a natural island cat shaped by Greek coastal life.', tone: 'touching' },
  'american-bobtail': { titleZh: 'Yodi 留下的短尾线索', titleEn: 'Yodi and the bobtail clue', bodyZh: 'American Bobtail 的现代故事常从一只名叫 Yodi 的短尾猫说起；这个名字让短尾不只是外形标签，更像猫友把一次偶然发现认真记录了下来。', bodyEn: 'The modern American Bobtail story is often linked with a short-tailed cat named Yodi, turning the tail into a memorable discovery note.', tone: 'legend' },
  'american-curl': { titleZh: '一对向后卷起的耳朵', titleEn: 'The ears that curled backward', bodyZh: '美国卷耳猫的故事很适合被做成图鉴：最先吸引人的不是花色，而是耳朵像被风轻轻吹起一样向后卷，资料也把这个自然突变作为品种记忆点。', bodyEn: 'American Curl is remembered through a natural ear mutation that makes the ears look gently swept backward.', tone: 'funny' },
  'american-shorthair': { titleZh: '从船舱捕鼠员到家里最稳的同伴', titleEn: 'From ship mouser to steady house companion', bodyZh: '美短的故事来自早期北美工作猫：它们跟着移民船和农场生活，靠结实身体和捕鼠本领留下来。今天大家说“美短”，常常是在说一种稳、耐看、适合家庭的猫。', bodyEn: 'American Shorthair is often introduced through early North American working cats that lived around ships and farms before becoming a steady family companion.', tone: 'history' },
  'american-wirehair': { titleZh: '一窝小猫里的卷硬毛惊喜', titleEn: 'A wiry surprise in a kitten litter', bodyZh: '美国刚毛猫最有趣的地方，是“刚毛”来自自然出现的被毛变化；它像猫界的小意外：本来只是普通小猫，突然有一只把毛发卷成了独家签名。', bodyEn: 'American Wirehair is remembered for a naturally occurring wiry coat mutation, a small surprise that became the breed signature.', tone: 'funny' },
  balinese: { titleZh: '长毛暹罗的优雅分支', titleEn: 'The elegant longhaired Siamese branch', bodyZh: '巴厘猫常被理解为长毛暹罗系的优雅分支：重点色还在，蓝眼还在，只是轮廓多了一层飘逸感，像把暹罗的活泼换上了舞台长裙。', bodyEn: 'Balinese cats keep the colorpoint and blue-eyed Siamese impression while adding a flowing long coat.', tone: 'legend' },
  bengal: { titleZh: '像小豹，但仍然是家猫', titleEn: 'A little leopard look, still a domestic cat', bodyZh: '孟加拉猫最抓眼的是斑点和云纹，品种叙事也常提到亚洲豹猫血统背景。这个故事很吸引人，但也要记住：现代孟加拉是家庭饲养的品种猫，不是把野生动物带回家。', bodyEn: 'Bengal cats are remembered for spotted and marbled coats and for breed history that mentions Asian leopard cat ancestry, while modern Bengals remain domestic breed cats.', tone: 'history' },
  birman: { titleZh: '白手套让故事变温柔', titleEn: 'White gloves make the story gentle', bodyZh: '伯曼猫常被叫作“缅甸圣猫”，白手套和重点色让它自带仪式感；这个品种的可记忆点，是看起来像认真穿好小袜子才来见人的温柔感。', bodyEn: 'Birman cats are remembered for colorpoints and white gloves, giving the breed a soft ceremonial look.', tone: 'touching' },
  bombay: { titleZh: '家里的小黑豹', titleEn: 'The little black panther at home', bodyZh: '孟买猫的故事很好笑也很好记：育种目标常被概括成“像小黑豹的家猫”。它没有野性噱头，而是把黑色短毛、铜色眼睛和亲人性格放在一起。', bodyEn: 'Bombay is often described through the idea of a domestic cat with a small black panther look.', tone: 'funny' },
  'british-shorthair': { titleZh: '金渐层、蓝猫，其实先回到英短', titleEn: 'Golden shaded and blue cats still point back to British Shorthair', bodyZh: '国内常说的蓝猫、金渐层、银渐层，多数是英短体系里被记住的颜色或花色，不是新的独立品种。这个小误会很常见，也很好笑：很多人以为自己在搜颜色，结果真正入口是品种。', bodyEn: 'Chinese searches such as blue cat, golden shaded, and silver shaded usually describe colors in British Shorthair lines rather than separate breeds.', tone: 'funny' },
  burmese: { titleZh: '从东南亚线索走进现代猫舍', titleEn: 'A Southeast Asian line entering modern breeding', bodyZh: '缅甸猫的故事常和东南亚猫只线索、温暖毛色以及亲人的性格联系在一起；它不像靠夸张外形出圈，更像靠“黏人又稳”的日常感被记住。', bodyEn: 'Burmese cats are remembered through Southeast Asian lines, warm coat color, and an affectionate companion reputation.', tone: 'touching' },
  chartreux: { titleZh: '法国蓝猫的安静微笑', titleEn: 'The quiet smile of the French blue cat', bodyZh: '沙特尔猫常被资料写成法国蓝猫，圆润脸型让它像带着安静微笑；这个品种的故事不吵闹，记忆点就是低调、蓝灰和稳稳的陪伴感。', bodyEn: 'Chartreux is remembered as a French blue cat with a quiet, smiling expression and a calm companion image.', tone: 'touching' },
  chausie: { titleZh: '丛林气质被收进家猫轮廓', titleEn: 'A jungle-cat impression in a domestic outline', bodyZh: 'Chausie 的故事带着野性外观：资料常把它和 jungle cat 背景联系起来。图鉴里它的重点是提醒用户，这份吸引力来自品种叙事和外形，不等于随意饲养野生动物。', bodyEn: 'Chausie is remembered through a jungle-cat impression in breed history, while the modern entry remains about a domestic breed cat.', tone: 'history' },
  'cornish-rex': { titleZh: '康沃尔的波浪毛小演员', titleEn: 'The wavy-coated little performer from Cornwall', bodyZh: '柯尼斯卷毛猫的故事从卷曲被毛开始：它瘦长、机灵、毛发像细小波浪，照片里常有一种“我已经准备好登台”的戏剧感。', bodyEn: 'Cornish Rex is remembered for its wavy coat, slim body, and theatrical little-performer look.', tone: 'funny' },
  'devon-rex': { titleZh: 'Kirlee 和“小精灵耳朵”', titleEn: 'Kirlee and the pixie ears', bodyZh: '德文卷毛的现代故事常从英国 Devon 一只名叫 Kirlee 的卷毛小猫说起。大耳朵、短卷毛和顽皮表情让它有一种小精灵感，照片里常像刚刚想出一个坏点子。', bodyEn: 'Devon Rex history is commonly traced to a curly-coated kitten named Kirlee in Devon, England, giving the breed its pixie-like identity.', tone: 'funny' },
  'egyptian-mau': { titleZh: '带着斑点奔跑的埃及猫', titleEn: 'The spotted Egyptian runner', bodyZh: '埃及猫最容易被记住的是自然斑点和运动感；它的故事像一张会动的古老地图：名字指向埃及，身上斑点又让人一眼认出它。', bodyEn: 'Egyptian Mau is remembered for natural spots and athletic movement, with a name that points straight back to Egypt.', tone: 'legend' },
  'exotic-shorthair': { titleZh: '像波斯猫剪了短发', titleEn: 'Like a Persian with a short haircut', bodyZh: '异国短毛常被猫友笑称像“短毛版波斯”：圆脸、安静气质还在，只是护理压力少了一些；这个类比让新手很快理解它为什么受欢迎。', bodyEn: 'Exotic Shorthair is often understood as a Persian-like cat with a short coat and an easier grooming rhythm.', tone: 'funny' },
  havana: { titleZh: '巧克力色的小绅士', titleEn: 'The chocolate-colored little gentleman', bodyZh: '哈瓦那猫的记忆点是温暖的巧克力色和细致轮廓；它的故事不像爆点新闻，更像一只靠颜色和气质被慢慢记住的猫。', bodyEn: 'Havana is remembered for warm chocolate coloring and a refined outline.', tone: 'touching' },
  'japanese-bobtail': { titleZh: '招财猫背后的短尾影子', titleEn: 'The bobtail shadow behind lucky-cat imagery', bodyZh: '日本短尾猫常让人联想到招财猫文化：短尾、活泼和日本民间图像形成了天然记忆点。它不是招财摆件，却让人很容易想到那只举爪的小猫。', bodyEn: 'Japanese Bobtail is often connected with lucky-cat imagery, short tails, and Japanese cultural memory.', tone: 'legend' },
  korat: { titleZh: '泰国蓝猫的幸运色', titleEn: 'The lucky blue of Thailand', bodyZh: '呵叻猫常和泰国、蓝灰被毛以及幸运寓意联系在一起；它的故事很温柔：不是靠夸张外形，而是靠一身安静蓝色被人珍惜。', bodyEn: 'Korat is remembered through Thailand, blue-gray coat color, and a long association with good fortune.', tone: 'touching' },
  'la-perm': { titleZh: '像刚烫完头的小猫', titleEn: 'The cat that looks freshly permed', bodyZh: '拉邦猫的卷毛像一个自带笑点的签名：看起来像刚从理发店出来。资料把这种卷曲被毛作为品种核心，图标也会保留波浪线索。', bodyEn: 'LaPerm is remembered for a curly coat that looks almost freshly permed, giving the breed an easy visual joke.', tone: 'funny' },
  lykoi: { titleZh: '狼猫的反差温柔', titleEn: 'The gentle contrast of the werewolf cat', bodyZh: '狼人猫名字听起来很戏剧，外观也有半脱毛的“狼感”；但它的故事真正有趣之处在反差：名字像传说，现实里仍是需要认真照顾的家猫。', bodyEn: 'Lykoi has a dramatic werewolf-cat look, but the memorable part is the contrast between legend-like appearance and ordinary companion care.', tone: 'legend' },
  'maine-coon': { titleZh: '缅因的大尾巴像冬天的围巾', titleEn: 'A winter-scarf tail from Maine', bodyZh: '缅因猫常被放在美国缅因州寒冷农场和港口的历史背景里理解。厚毛、大体型和蓬松尾巴让它像自带围巾的温和巨猫，这也是中文猫友一听“大缅”就能想起的画面。', bodyEn: 'Maine Coon history is often read through cold farms and ports in Maine, with a heavy coat and plumed tail that feel like a winter scarf.', tone: 'history' },
  manx: { titleZh: '曼岛无尾猫的岛屿传说', titleEn: 'The island legend of the tailless Manx', bodyZh: '曼岛猫最醒目的线索是短尾或无尾，名字又直接指向 Isle of Man；这让它像一只把岛屿传说背在身上的猫。', bodyEn: 'Manx is remembered through the Isle of Man and its short-tailed or tailless silhouette.', tone: 'legend' },
  munchkin: { titleZh: '矮脚猫的可爱不该只停在腿短', titleEn: 'Munchkin cuteness should not stop at short legs', bodyZh: '曼基康因为短腿被中文用户常叫“矮脚猫”。但它不是玩具符号，而是需要按真实体型、活动能力和护理需求去理解的品种；图鉴把这个俗称映射回来，是为了避免只看外形。', bodyEn: 'Munchkin is often searched as short-legged cat, but the story should include real body type, movement, and care needs.', tone: 'care' },
  'norwegian-forest': { titleZh: '森林猫像从北欧故事里走来', titleEn: 'A forest cat from Nordic storybooks', bodyZh: '挪威森林猫的故事天然带画面：寒冷森林、长毛、强壮身体和蓬松尾巴。它像从北欧民间故事里走出来，却把传说感落在真实护理上。', bodyEn: 'Norwegian Forest Cat is remembered through cold forests, long coat, strong body, and a storybook Nordic silhouette.', tone: 'legend' },
  ocicat: { titleZh: '看起来像野猫，其实没有野猫血统', titleEn: 'Wild-looking without wild blood', bodyZh: '奥西猫最好笑的点在于：它看起来像小野猫，品种叙事却强调家猫育种背景。外表很野，身份很家，这个反差特别适合做图标。', bodyEn: 'Ocicat is memorable because it looks wild while being developed from domestic breed lines.', tone: 'funny' },
  'oriental-shorthair': { titleZh: '大耳朵先听见你回家', titleEn: 'The big ears that hear you come home', bodyZh: '东方短毛猫的大耳朵和修长脸型极有辨识度；它的故事不靠花色统一，而是靠“耳朵先到场”的夸张轮廓让人记住。', bodyEn: 'Oriental Shorthair is remembered for large ears, a long face, and a striking outline more than one single coat color.', tone: 'funny' },
  persian: { titleZh: '波斯猫的表情自带慢镜头', titleEn: 'Persian expression feels like slow motion', bodyZh: '波斯猫在许多猫展和品种资料里都和长毛、圆脸、安静气质联系在一起。它的魅力不靠动作快，而是靠一张像在思考人生的脸；护理重点也因此落在梳毛和眼周清洁。', bodyEn: 'Persian cats are linked with long coats, round faces, and a calm show-cat presence, with grooming as a practical part of the story.', tone: 'care' },
  ragdoll: { titleZh: '布偶名字里的温柔记忆', titleEn: 'The soft memory inside the Ragdoll name', bodyZh: '布偶猫的名字来自被抱起时柔软放松的印象，品种故事也常和美国育种早期的长毛猫线索联系在一起。这个名字能留下来，是因为它准确抓住了很多人第一次抱起布偶时的感觉。', bodyEn: 'The Ragdoll name comes from the relaxed impression associated with being held, which is why the breed name itself feels like a story.', tone: 'touching' },
  'russian-blue': { titleZh: '俄罗斯蓝猫的银色安静', titleEn: 'The silver quiet of Russian Blue', bodyZh: '俄罗斯蓝猫的故事靠蓝灰短毛、绿色眼睛和安静气质留下印象；它不是热闹型主角，更像在家里轻轻陪你坐下的那种猫。', bodyEn: 'Russian Blue is remembered for blue-gray coat, green eyes, and a quiet companion impression.', tone: 'touching' },
  savannah: { titleZh: '高挑外形背后的饲养提醒', titleEn: 'A tall silhouette with ownership context', bodyZh: '萨凡纳猫的故事常提到野性外观和高挑身体；图鉴会把吸引力和责任放在一起讲，因为越是特别的品种，越需要理解饲养限制和照护需求。', bodyEn: 'Savannah is memorable for its tall wild-looking silhouette, but the responsible story also includes ownership context and care.', tone: 'care' },
  'scottish-fold': { titleZh: '折耳很可爱，但也要看见健康问题', titleEn: 'Cute folded ears, with health context visible', bodyZh: '苏格兰折耳的耳形很容易让人心动，但可靠资料通常也会提醒关注软骨相关健康风险。把这点写进图鉴，是因为真正喜欢一个品种，不应该只喜欢它最上镜的一面。', bodyEn: 'Scottish Fold ears are immediately appealing, but reliable references also discuss cartilage-related health context.', tone: 'touching' },
  'selkirk-rex': { titleZh: '羊毛卷一样的塞尔凯克', titleEn: 'The woolly curls of Selkirk Rex', bodyZh: '塞尔凯克卷毛猫的卷不像细波浪，更像蓬松羊毛卷；它的故事有一点喜感：看起来像永远没梳顺，但这正是它的招牌。', bodyEn: 'Selkirk Rex is remembered for plush, woolly curls that look charmingly untamed.', tone: 'funny' },
  siamese: { titleZh: '暹罗像一个很爱插话的老朋友', titleEn: 'Siamese feels like a friend who joins the conversation', bodyZh: '暹罗来自泰国旧称 Siam 的历史语境。重点色、蓝眼睛和爱表达的性格让它特别容易被记住；很多资料都会提醒新手，它不是安静背景板，更像一个参与感很强的家人。', bodyEn: 'Siamese carries the older name Siam for Thailand and is remembered for colorpoints, blue eyes, and a vocal personality.', tone: 'funny' },
  siberian: { titleZh: '西伯利亚的厚毛外套', titleEn: 'The Siberian winter coat', bodyZh: '西伯利亚猫的故事离不开寒冷气候、厚实被毛和强壮身体；它像穿着天然冬衣的猫，把地域记忆变成了外形特征。', bodyEn: 'Siberian is remembered through cold climate, strong body, and a dense coat that feels like a built-in winter jacket.', tone: 'history' },
  singapura: { titleZh: '小小新加坡猫的大眼睛', titleEn: 'The tiny Singapura with big eyes', bodyZh: '新加坡猫常以小体型和大眼睛被记住；它的故事有一种反差萌：体型小，却像一直认真观察世界。', bodyEn: 'Singapura is remembered for small size and large eyes, a tiny cat with a very attentive expression.', tone: 'touching' },
  somali: { titleZh: '长毛阿比的狐狸尾巴', titleEn: 'The fox-tail cousin of Abyssinian', bodyZh: '索马里猫常被理解为长毛阿比系的分支，蓬松尾巴像小狐狸；它的记忆点是把阿比的 ticked coat 换成更飘逸的版本。', bodyEn: 'Somali is often read as a longhaired Abyssinian-related cat with a fox-like tail and ticked coat.', tone: 'legend' },
  sphynx: { titleZh: '无毛不等于不用照顾', titleEn: 'Hairless does not mean no care', bodyZh: '斯芬克斯的无毛外观来自自然突变和后续育种。少了被毛遮挡，它反而更需要皮肤清洁、保暖和日常观察；这种反差让“无毛猫”既特别，也很需要认真对待。', bodyEn: 'Sphynx hairlessness comes from natural mutation and selective breeding, but less coat means skin care and warmth matter more.', tone: 'care' },
  thai: { titleZh: '传统暹罗的旧时轮廓', titleEn: 'The old-style Siamese outline', bodyZh: '泰国猫常被放在传统暹罗的语境里理解：重点色和蓝眼睛还在，但轮廓更接近旧式类型。它像把暹罗故事翻回前一页。', bodyEn: 'Thai is often understood through the traditional Siamese context, keeping colorpoints and blue eyes in an older-style outline.', tone: 'history' },
  tonkinese: { titleZh: '暹罗和缅甸之间的水色眼睛', titleEn: 'Aqua eyes between Siamese and Burmese lines', bodyZh: '东奇尼猫的故事常在暹罗和缅甸猫之间展开，水色眼睛是它的招牌；它像两个品种性格线索交汇后留下的一抹亮色。', bodyEn: 'Tonkinese is remembered through Siamese-Burmese family lines and aqua-toned eyes.', tone: 'touching' },
  toyger: { titleZh: '把小老虎画进家猫身上', titleEn: 'Drawing a tiny tiger onto a domestic cat', bodyZh: '玩具虎猫的故事很直观：条纹目标就是让家猫看起来像小老虎。这个设定有趣，但图鉴会提醒它仍是品种猫，不是野性替代品。', bodyEn: 'Toyger is remembered for a breeding goal that evokes a tiny tiger look in a domestic cat.', tone: 'funny' },
  'turkish-angora': { titleZh: '安哥拉长毛里的土耳其线索', titleEn: 'The Turkish thread in Angora silk', bodyZh: '土耳其安哥拉猫常和优雅长毛、轻盈身体以及土耳其来源联系在一起；它的故事像一条白色丝线，把地名和外形绑在一起。', bodyEn: 'Turkish Angora is remembered through elegant long coat, light build, and a Turkish origin thread.', tone: 'legend' },
  'turkish-van': { titleZh: '梵猫和湖边传说', titleEn: 'Turkish Van and the lake story', bodyZh: '土耳其梵猫常和 Lake Van 地区联系在一起，花色和地域名一起成为记忆点；它的故事像一只从湖边走来的长毛猫。', bodyEn: 'Turkish Van is remembered through the Lake Van region and a distinctive pattern tied to place.', tone: 'legend' },
  'australian-mist': { titleZh: '澳洲薄雾里的家猫计划', titleEn: 'A domestic-cat plan in Australian mist', bodyZh: '澳洲雾猫的名字很温柔，故事也带有“适合家庭”的培育目标；它不是靠夸张外形，而是靠雾状花纹和亲和路线被记住。', bodyEn: 'Australian Mist is remembered for misted patterning and a family-friendly breed direction.', tone: 'touching' },
  'bengal-longhair': { titleZh: '豹纹外套加上长毛披风', titleEn: 'Bengal pattern with a longhair cloak', bodyZh: '长毛孟加拉把孟加拉的斑点或云纹和更柔软的长毛结合在一起；它的故事像把“小豹感”披上了一层披风。', bodyEn: 'Bengal Longhair combines Bengal patterning with a softer long coat, like adding a cloak to the leopard look.', tone: 'legend' },
  'british-longhair': { titleZh: '英短圆脸长出蓬松外套', titleEn: 'British roundness with a fluffy coat', bodyZh: '英国长毛猫让人很容易想到英短的圆润感，只是被毛更蓬松；它的故事像熟悉角色换了厚外套，仍然稳重。', bodyEn: 'British Longhair keeps the familiar British roundness while adding a plush long coat.', tone: 'touching' },
  burmilla: { titleZh: '银色阴影里的偶然感', titleEn: 'A silver-shaded happy accident', bodyZh: '伯米拉常被记住的是银色阴影和缅甸猫相关线索；它的故事有一点浪漫，像一次意外搭配留下了闪光外衣。', bodyEn: 'Burmilla is remembered for silver shading and Burmese-related lines, giving the breed a happy-accident charm.', tone: 'legend' },
  'burmilla-longhair': { titleZh: '长毛伯米拉的银色柔光', titleEn: 'The silver glow of Burmilla Longhair', bodyZh: '长毛伯米拉把银色阴影拉长成更柔和的轮廓；它的故事不需要很吵，重点是那种像柔光滤镜一样的被毛。', bodyEn: 'Burmilla Longhair extends the silver-shaded impression into a softer longhaired outline.', tone: 'touching' },
  cymric: { titleZh: '长毛曼岛猫的圆尾故事', titleEn: 'The longhaired Manx story', bodyZh: '威尔士猫通常被理解为长毛曼岛系，短尾或无尾仍是关键；它像把曼岛传说换成了更蓬松的版本。', bodyEn: 'Cymric is commonly understood as a longhaired Manx-related cat, keeping the short-tailed island identity.', tone: 'legend' },
  donskoy: { titleZh: '俄罗斯无毛猫的皮肤故事', titleEn: 'The skin-care story of Donskoy', bodyZh: '顿斯科伊猫的无毛线索来自俄罗斯品种背景；它的故事和斯芬克斯一样提醒用户：少毛不是少照顾，皮肤、保暖和日常观察都很重要。', bodyEn: 'Donskoy is remembered as a Russian hairless breed, with a care story centered on skin, warmth, and observation.', tone: 'care' },
  highlander: { titleZh: '卷耳加短尾的高地感', titleEn: 'Curled ears and a highland look', bodyZh: '高地猫的辨识点常在卷耳、短尾和强壮外形上；它像把几个漫画式特征组合起来，但仍需要回到真实品种资料理解。', bodyEn: 'Highlander is remembered for curled ears, bobtail cues, and a sturdy outline that feels almost cartoonish.', tone: 'funny' },
  himalayan: { titleZh: '波斯脸遇到暹罗重点色', titleEn: 'Persian face meets Siamese colorpoint', bodyZh: '喜马拉雅猫的故事很容易解释：波斯式长毛圆脸遇到暹罗式重点色。它像两种经典记忆点叠在一起，因此特别适合做图鉴入口。', bodyEn: 'Himalayan is memorable as a Persian-like longhair with Siamese-style colorpoints.', tone: 'legend' },
  khaomanee: { titleZh: '钻石眼的白猫', titleEn: 'The white cat with diamond eyes', bodyZh: '考马尼猫常被记住为白色、明亮眼睛和泰国来源；“钻石眼”这样的叫法让它的故事一听就有画面。', bodyEn: 'Khaomanee is remembered through Thailand, white coat, and bright eyes that inspire the diamond-eye image.', tone: 'legend' },
  'kurilian-bobtail': { titleZh: '千岛群岛的短尾猫', titleEn: 'The bobtail from the Kuril Islands', bodyZh: '千岛短尾猫的故事和群岛地域、短尾外形绑在一起；它像一只从寒冷岛屿地名里走出来的猫，尾巴就是最醒目的地图标记。', bodyEn: 'Kurilian Bobtail is remembered through the Kuril Islands and a clear bobtail silhouette.', tone: 'history' },
  'laperm-shorthair': { titleZh: '短毛版拉邦也有卷卷签名', titleEn: 'Shorthaired LaPerm keeps the curl signature', bodyZh: '短毛拉邦保留卷毛品种的幽默感，只是轮廓更轻；它像把“刚烫完头”的笑点压缩成更利落的版本。', bodyEn: 'LaPerm Shorthair keeps the curly signature in a lighter short-coated outline.', tone: 'funny' },
  'maine-coon-polydactyl': { titleZh: '多趾缅因像多带了一副雪地手套', titleEn: 'Polydactyl Maine Coon and the extra snow mittens', bodyZh: '多趾缅因把缅因猫的巨猫气质和多趾特征放在一起；它最容易让人会心一笑的地方，是爪子像多带了一副雪地手套。', bodyEn: 'Maine Coon Polydactyl combines the Maine Coon giant-cat image with extra toes that look like snow mittens.', tone: 'funny' },
  minuet: { titleZh: '小步舞曲的短腿圆脸', titleEn: 'The short-legged roundness of Minuet', bodyZh: '小步舞曲猫的名字很优雅，外形却带着短腿和圆润感的反差；它像一只认真跳小步舞但步子很短的小猫。', bodyEn: 'Minuet mixes an elegant name with short-legged, rounded charm.', tone: 'funny' },
  'munchkin-longhair': { titleZh: '矮脚猫披上长毛外套', titleEn: 'Munchkin with a longhaired coat', bodyZh: '长毛曼基康把矮脚记忆点和更蓬松的被毛结合起来；图鉴会把“可爱”放在护理和体型理解后面，而不是只停在短腿。', bodyEn: 'Munchkin Longhair combines short legs with a fluffier coat, keeping care context visible.', tone: 'care' },
  nebelung: { titleZh: '像雾一样的长毛俄蓝', titleEn: 'A mist-like longhaired blue cat', bodyZh: '尼比龙猫常让人想到长毛俄罗斯蓝猫的气质：蓝灰、柔和、像雾一样。它的名字和外形共同制造了很强的氛围感。', bodyEn: 'Nebelung is remembered as a misty longhaired blue cat with a Russian Blue-like atmosphere.', tone: 'legend' },
  'oriental-longhair': { titleZh: '东方长毛的大耳朵和长尾巴', titleEn: 'Big ears and flowing coat in Oriental Longhair', bodyZh: '东方长毛保留东方系的大耳朵和修长轮廓，又加上更飘逸的长毛；它像一个线条感很强的角色换了披风。', bodyEn: 'Oriental Longhair keeps the large ears and long outline while adding a flowing coat.', tone: 'legend' },
  peterbald: { titleZh: '彼得堡线索里的无毛猫', titleEn: 'The hairless cat with a Petersburg clue', bodyZh: '彼得秃猫的故事和俄罗斯彼得堡育种线索、无毛或少毛外观联系在一起；它提醒用户，外形越特别，护理越不能省略。', bodyEn: 'Peterbald is remembered through Russian breeding lines and a hairless or sparse-coated look that brings care needs with it.', tone: 'care' },
  pixiebob: { titleZh: '像小山猫的皮克西短尾', titleEn: 'The bobtail with a bobcat look', bodyZh: '精灵短尾猫的故事常被“像小山猫”这种外观记忆点带起；它的魅力在于野性轮廓和家猫身份之间的反差。', bodyEn: 'Pixiebob is remembered for a bobcat-like outline and a domestic-cat identity.', tone: 'legend' },
  'pixiebob-longhair': { titleZh: '长毛皮克西像披了荒野外套', titleEn: 'Longhaired Pixiebob wears a wild coat', bodyZh: '长毛精灵短尾把短尾和野性轮廓保留下来，又多了一层粗犷长毛；它像从户外故事里走进家门的猫。', bodyEn: 'Pixiebob Longhair keeps the bobtail and wild outline while adding a rugged long coat.', tone: 'legend' },
  'scottish-fold-longhair': { titleZh: '长毛折耳的可爱也要带着提醒', titleEn: 'Longhaired folded ears with care context', bodyZh: '长毛苏格兰折耳把折耳外形和蓬松被毛叠在一起，很容易让人心动；但图鉴仍会把健康背景放在故事里，不只展示可爱。', bodyEn: 'Scottish Fold Longhair adds a fluffy coat to folded ears, while the story still keeps health context visible.', tone: 'care' },
  'scottish-straight': { titleZh: '苏格兰立耳像折耳家族里的清醒旁白', titleEn: 'The straight-eared Scottish family note', bodyZh: '苏格兰立耳和折耳体系有关，但耳朵是直立的；它像同一个家族故事里的另一条路线，让用户理解“苏格兰”不只等于折耳。', bodyEn: 'Scottish Straight is tied to the Scottish family context while keeping upright ears.', tone: 'history' },
  'scottish-straight-longhair': { titleZh: '长毛苏立的蓬松旁支', titleEn: 'The fluffy branch of Scottish Straight', bodyZh: '长毛苏格兰立耳把直耳和蓬松被毛组合起来；它的故事价值在于帮用户把“折耳、立耳、长毛”这些日常叫法拆清楚。', bodyEn: 'Scottish Straight Longhair helps separate straight ears, folded ears, and coat length within the Scottish family context.', tone: 'history' },
  'selkirk-rex-longhair': { titleZh: '长毛塞尔凯克像会动的羊毛团', titleEn: 'Selkirk Rex Longhair as a moving wool ball', bodyZh: '长毛塞尔凯克卷毛猫把羊毛卷质感放大了；它的故事天然带笑点：看起来像一团会自己走路的卷卷毛线。', bodyEn: 'Selkirk Rex Longhair amplifies the woolly curl impression into a walking bundle of curls.', tone: 'funny' },
  serengeti: { titleZh: '塞伦盖蒂的长腿剪影', titleEn: 'The long-legged Serengeti silhouette', bodyZh: '塞伦盖蒂猫的名字让人想到草原，外形也强调长腿和斑点感；它的故事重点是“野性视觉灵感”和现代家猫品种之间的界线。', bodyEn: 'Serengeti is remembered for a savanna-like name, long legs, and spotted visual inspiration within a domestic breed.', tone: 'history' },
  snowshoe: { titleZh: '雪鞋猫真的像穿了白鞋', titleEn: 'Snowshoe really looks like it wears white shoes', bodyZh: '雪鞋猫的名字几乎就是笑点本身：重点色猫脚上多了白色“鞋子”。这个品种非常适合图标化，因为名字和外观能一眼对上。', bodyEn: 'Snowshoe is memorable because the name matches the white feet so directly.', tone: 'funny' },
  'tennessee-rex': { titleZh: '田纳西卷毛的闪光卷', titleEn: 'The glittering curls of Tennessee Rex', bodyZh: '田纳西卷毛猫的故事围绕卷毛和独特被毛质感展开；它像一个冷门但有亮点的品种，适合在图鉴里用波纹和闪光符号记住。', bodyEn: 'Tennessee Rex is remembered for curly coat texture and a distinctive coat impression that deserves a visual ripple mark.', tone: 'legend' },
  toybob: { titleZh: '迷你短尾像口袋里的小猫', titleEn: 'A tiny bobtail like a pocket cat', bodyZh: '玩具短尾猫的记忆点是小体型和短尾；它的名字听起来像玩具，但图鉴会把它作为真实品种记录，而不是玩具化地理解。', bodyEn: 'Toybob is remembered for tiny size and a bobtail, but the story keeps it grounded as a real breed, not a toy.', tone: 'touching' },
}

const storyFor = (breed: BaseBreedOrigin, zhName: string): VerifiedBreedStory => {
  const seed = verifiedStorySeeds[breed.id]
  const legacyStory = curatedStoryOverrides[breed.id] ?? curatedStories[breed.id]

  if (!seed) {
    if (legacyStory) {
      return {
        ...legacyStory,
        tone: legacyStory.tone ?? 'history',
        sourceType: legacyStory.sourceType ?? 'official',
        evidenceNoteZh: `${zhName} 的故事来自可追溯的品种资料；当前条目保留为兼容数据，后续应迁移到 verifiedStorySeeds。`,
        evidenceNoteEn: `${breed.ticaName} uses a traceable breed profile; this legacy entry should be migrated into verifiedStorySeeds.`,
      }
    }

    throw new Error(`Missing verified story for ${breed.id}`)
  }

  const sourceName = seed.sourceName ?? `TICA ${breed.ticaName} profile`
  const sourceUrl = seed.sourceUrl ?? sourceUrlFor(breed.id)
  const evidenceNoteZh = seed.evidenceNoteZh
    ?? `${zhName} 的故事依据 ${sourceName} 改写；这里保留来源链接，避免把历史轶事伪装成未核验新闻。`
  const evidenceNoteEn = seed.evidenceNoteEn
    ?? `${breed.ticaName} is rewritten from ${sourceName}; the source link is kept so the anecdote stays traceable.`
  const readerTone: StoryTone = seed.tone === 'care'
    ? 'touching'
    : seed.tone === 'history'
      ? 'legend'
      : seed.tone

  return {
    titleZh: seed.titleZh,
    titleEn: seed.titleEn,
    bodyZh: seed.bodyZh,
    bodyEn: seed.bodyEn,
    sourceName,
    sourceUrl,
    type: seed.type ?? (seed.tone === 'funny' ? 'culture' : seed.tone === 'care' ? 'anecdote' : 'history'),
    tone: readerTone,
    sourceType: seed.sourceType ?? 'official',
    evidenceNoteZh,
    evidenceNoteEn,
  }
}

const fallbackPhotoFor = (breed: BaseBreedOrigin, index: number): BreedPhoto => {
  const photo = photoPool[index % photoPool.length]

  return {
    ...photo,
    objectPosition: '50% 38%',
    fit: 'cover',
    verifiedBreedPhoto: false,
    sourceUrl: photo.sourceUrl,
    altZh: `${fallbackZhName(breed)}\u7684\u771f\u5b9e\u732b\u54aa\u7167\u7247\u53c2\u8003`,
    altEn: `Real cat photo reference for ${breed.ticaName}`,
  }
}

const photoForBreed = (breed: BaseBreedOrigin, index: number): BreedPhoto =>
  breedPhotoRegistry[breed.id] ?? ticaPhotoForBreed(breed) ?? fallbackPhotoFor(breed, index)

const enhanceBreed = (breed: BaseBreedOrigin, index: number): BreedOrigin => {
  const zhName = fallbackZhName(breed)
  const aliases = curatedNames[breed.id]?.aliases ?? []
  const coatLength = inferCoat(breed)
  const ticaUrl = breed.sourceUrl === ticaBreedSource ? sourceUrlFor(breed.id) : breed.sourceUrl
  const zhTraits = [coatLabelZh[coatLength], ...aliases.slice(0, 2), ...breed.traits.slice(0, 2)]
  const enTraits = [coatLabelEn[coatLength], ...breed.traits]
  const photo = photoForBreed(breed, index)
  const story = storyFor({ ...breed, sourceUrl: ticaUrl }, zhName)
  const markerProfile = markerProfileFor(breed, coatLength)
  const enrichedPhoto = {
    ...photo,
    markerSrc: photo.markerSrc ?? photo.src,
    markerObjectPosition: photo.markerObjectPosition ?? photo.objectPosition ?? '50% 38%',
    altZh: `${zhName}\u7684\u771f\u5b9e\u732b\u54aa\u7167\u7247\u53c2\u8003`,
    altEn: `Real cat photo reference for ${breed.ticaName}`,
  }
  const commonChineseSearches = Array.from(new Set([zhName, ...aliases]))

  return {
    ...breed,
    zhName,
    sourceUrl: ticaUrl,
    zhAliases: aliases,
    commonChineseSearches,
    searchTokens: [
      breed.id,
      breed.ticaName,
      breed.ticaName.replace(/\s+/g, ''),
      zhName,
      ...aliases,
      ...commonChineseSearches,
      breed.originLabel,
      ...breed.traits,
      coatLabelZh[coatLength],
      coatLabelEn[coatLength],
    ].map((token) => token.toLowerCase()),
    localized: {
      zh: {
        name: zhName,
        summary: `${zhName}\u6e90\u81ea ${breed.originLabel}\uff0c\u5728 TICA \u56fe\u9274\u4e2d\u4ee5 ${zhTraits.slice(0, 2).join('\u3001')} \u7b49\u7279\u5f81\u88ab\u8bb0\u4f4f\u3002`,
        traits: zhTraits,
      },
      en: {
        name: breed.ticaName,
        summary: breed.summary,
        traits: enTraits,
      },
    },
    coatLength,
    photo: enrichedPhoto,
    story,
    verifiedStory: story,
    detailFacts: buildDetailFacts(breed, coatLength),
    markerProfile,
    breedIconProfile: iconProfileFor(breed, markerProfile),
    readingSections: readingSectionsFor(breed, zhName, story, aliases),
    sourceLinks: sourceLinksFor({ ...breed, sourceUrl: ticaUrl }, enrichedPhoto, story),
    externalStories: externalStoryRegistry[breed.id] ?? [],
  }
}

export const breeds: BreedOrigin[] = baseBreeds.map(enhanceBreed)

export const breedsMissingVerifiedMarkerPhotos = breeds
  .filter((breed) => !breed.photo.verifiedBreedPhoto)
  .map((breed) => breed.id)

const missingVerifiedData = breeds.filter(
  (breed) =>
    !breed.breedIconProfile
    || !breed.verifiedStory.sourceUrl
    || breed.verifiedStory.titleEn.includes('field note')
    || breed.verifiedStory.titleZh.includes('\u54c1\u79cd\u5c0f\u8bb0')
    || breed.verifiedStory.bodyEn.includes('field note')
    || breed.verifiedStory.bodyZh.includes('\u54c1\u79cd\u5c0f\u8bb0'),
)

if (missingVerifiedData.length > 0) {
  throw new Error(
    `Missing verified cat atlas data: ${missingVerifiedData.map((breed) => breed.id).join(', ')}`,
  )
}

export const regions: Region[] = [
  'Global',
  'Asia',
  'Europe',
  'North America',
  'Middle East',
  'Africa/Oceania',
]

export const getBreedById = (id?: string | null) =>
  breeds.find((breed) => breed.id === id) ?? null

export const getBreedSearchHint = (
  breed: BreedOrigin,
  query: string,
  language: 'zh' | 'en',
) => {
  const normalizedQuery = query.trim().toLowerCase()
  if (!normalizedQuery) return null

  const matchedAlias = breed.commonChineseSearches.find(
    (alias) => alias.toLowerCase() === normalizedQuery,
  )
  if (matchedAlias) {
    return language === 'zh'
      ? `\u201c${matchedAlias}\u201d \u662f\u5e38\u7528\u53eb\u6cd5\uff0c\u5bf9\u5e94 ${breed.zhName}`
      : `"${matchedAlias}" is mapped to ${breed.ticaName}`
  }

  const partialAlias = breed.commonChineseSearches.find((alias) =>
    alias.toLowerCase().includes(normalizedQuery),
  )
  if (partialAlias) {
    return language === 'zh'
      ? `\u547d\u4e2d\u5e38\u7528\u53eb\u6cd5\uff1a${partialAlias}`
      : `Matched common name: ${partialAlias}`
  }

  if (breed.originLabel.toLowerCase().includes(normalizedQuery)) {
    return language === 'zh'
      ? `\u547d\u4e2d\u539f\u4ea7\u5730\uff1a${breed.originLabel}`
      : `Matched origin: ${breed.originLabel}`
  }

  return null
}

const fuzzyIncludes = (token: string, query: string) => {
  if (token.includes(query) || query.includes(token)) return true
  if (query.length < 3 || token.length < 3) return false

  let cursor = 0
  for (const char of query) {
    cursor = token.indexOf(char, cursor)
    if (cursor === -1) return false
    cursor += 1
  }
  return true
}

const searchRank = (breed: BreedOrigin, query: string) => {
  if (!query) return 0

  const compactName = breed.ticaName.replace(/\s+/g, '').toLowerCase()
  const exactAliases = breed.zhAliases.map((alias) => alias.toLowerCase())

  if (exactAliases.includes(query)) return 0
  if (breed.zhName.toLowerCase() === query) return 1
  if (breed.ticaName.toLowerCase() === query || compactName === query) return 2
  if (breed.zhName.toLowerCase().includes(query)) return 3
  if (breed.ticaName.toLowerCase().includes(query) || compactName.includes(query)) return 4
  if (exactAliases.some((alias) => alias.includes(query))) return 5
  if (breed.originLabel.toLowerCase().includes(query)) return 6
  if (breed.searchTokens.some((token) => token.includes(query))) return 7
  return 8
}

export const getVisibleBreeds = (
  region: Region,
  query: string,
  coatFilter: 'all' | CoatLength = 'all',
) => {
  const normalizedQuery = query.trim().toLowerCase()

  return breeds
    .filter((breed) => {
      const matchesRegion = region === 'Global' || breed.region === region
      const matchesCoat = coatFilter === 'all' || breed.coatLength === coatFilter
      const matchesQuery =
        normalizedQuery.length === 0 ||
        breed.searchTokens.some((token) => fuzzyIncludes(token, normalizedQuery))

      return matchesRegion && matchesCoat && matchesQuery
    })
    .sort((a, b) => {
      const rankDelta =
        searchRank(a, normalizedQuery) - searchRank(b, normalizedQuery)
      if (rankDelta !== 0) return rankDelta
      return a.ticaName.localeCompare(b.ticaName)
    })
}
