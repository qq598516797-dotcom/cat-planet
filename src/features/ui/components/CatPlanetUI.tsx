import { useEffect, useMemo, useRef, useState, type CSSProperties, type Ref } from 'react'
import { toPng } from 'html-to-image'
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'
import { useGSAP } from '@gsap/react'
import {
  BookOpen,
  CalendarDays,
  Cat,
  ChevronRight,
  Compass,
  Download,
  ExternalLink,
  Eye,
  EyeOff,
  Filter,
  GitCompare,
  Globe2,
  Heart,
  Image,
  Info,
  Languages,
  MapPin,
  PlayCircle,
  Route,
  RotateCcw,
  Search,
  Share2,
  Sparkles,
  Star,
  Volume2,
  VolumeX,
} from 'lucide-react'
import {
  breeds,
  getBreedById,
  getBreedSearchHint,
  getVisibleBreeds,
  regions,
  ticaBreedSource,
  type BreedOrigin,
  type Region,
} from '../../breeds/data/breeds'
import { regionTargets } from '../../planet/data/regionTargets'
import {
  useCatPlanetStore,
  type ActiveExperience,
  type CoatFilter,
  type GuardianBirthday,
  type Language,
  type ShareCardMode,
  type ShareCardSide,
} from '../../planet/store/useCatPlanetStore'

gsap.registerPlugin(Flip, useGSAP)

const copy = {
  zh: {
    hide: '隐藏界面',
    show: '显示界面',
    reset: '回到全球视角',
    eyebrow: '3D 猫咪品种地球图鉴',
    title: '猫咪星球',
    source: '查看 TICA 总品种来源',
    search: '搜索品种、简称、原产地或特征',
    regions: '地区快速选择',
    list: '品种图鉴',
    emptyTitle: '选择一个猫咪品种',
    emptyBody: '搜索“美短”“英短”“布偶”“缅因”或拖动星球，悬停品种徽章查看原产地。',
    dataNote: '坐标为国家或历史地区质心，用于图鉴展示，不代表精确出生地点。',
    aliases: '常用叫法',
    origin: '原产地',
    status: 'TICA 状态',
    coordinate: '坐标口径',
    countries: '国家/地区',
    story: '专属可查故事',
    externalStories: '故事与视频',
    facts: '图鉴信息',
    traits: '性格与特征',
    care: '护理',
    size: '体型',
    lifespan: '寿命',
    colors: '外观关键词',
    sources: '资料来源',
    photoCredit: '图片',
    ticaProfile: 'TICA 品种资料',
    ticaAll: 'TICA 总品种页',
    high: '国家/地区质心',
    medium: '历史地区质心',
    low: '粗略区域质心',
    atlas: '图鉴',
    route: '旅程',
    quiz: '选猫测试',
    compare: '对比',
    constellation: '星座',
    passport: '我的星球',
    dailyCat: '每日猫咪',
    todayLand: '今日推荐',
    dailyPrompt: '今天降落到这只猫的星球坐标',
    landHere: '定位到星球',
    favorite: '收藏',
    favorited: '已收藏',
    compareAdd: '加入对比',
    compareRemove: '移出对比',
    compareLimit: '最多对比 3 个品种',
    openRoute: '查看旅程',
    radar: '性格雷达',
    careGuide: '照顾提醒',
    routeCard: '品种起源旅程',
    journeyIntro: '用时间线读懂这个品种从哪里来、为什么会被记住。',
    routeOrigin: '起点：原产地',
    routeDevelopment: '发展：培育/传播背景',
    routeToday: '今天：现代家庭中的形象',
    constellationTitle: '守护猫星座',
    constellationIntro: '选择生日日期，星座会筛选出你的守护猫，并解释它为什么适合你。',
    guardianPrompt: '选择你的生日日期',
    guardianResult: '你的守护猫咪',
    guardianBackup: '备选守护猫',
    guardianWhy: '为什么它是你的守护猫',
    guardianPersonality: '性格契合',
    guardianOrigin: '起源气质',
    guardianCare: '相处提示',
    guardianSources: '继续了解',
    guardianArticle: '品种文章',
    guardianVideo: '视频入口',
    storySector: '星座解析',
    passportTitle: '我的猫咪星球',
    passportEmpty: '先测出你的守护猫，或收藏喜欢的猫咪，再生成分享名片。',
    savedCoordinates: '已收藏的星球坐标',
    shareCardTitle: '猫咪星球名片',
    shareCardGuardian: '我的守护猫',
    shareCardFavorites: '收藏星球',
    shareCardModeGuardian: '守护猫名片',
    shareCardModeFavorites: '收藏名片',
    shareCardFront: '正面',
    shareCardBack: '背面',
    shareCardPurpose: '保存我的守护猫星球坐标，也可以分享给朋友测同款守护猫。',
    shareCardStamp: '守护邮戳',
    shareCardCoords: '星球坐标',
    shareCardStamps: '收藏邮票',
    downloadCurrentCard: '下载当前面',
    downloadBothCards: '下载双面图',
    viewStory: '看它的故事',
    testFriend: '给朋友测一测',
    generatingCard: '生成中...',
    birthDate: '生日',
    guardianLanding: '今天降落在',
    cardLineOne: '这是一张来自猫咪星球的温柔坐标。',
    cardLineTwo: '把喜欢的猫咪、星座和故事一起保存下来。',
    cardLineThree: '下次打开图鉴，可以继续从这里出发。',
    soundOn: '关闭音效',
    soundOff: '开启音效',
    downloadPassport: '下载分享图',
    noRoute: '这个品种暂时还没有专属起源旅程。',
    quizTitle: '帮我找一只适合我的猫',
    quizSubtitle: '一题一题回答，最后推荐 1-2 个更适合你的品种。',
    quizProgress: '已回答',
    quizResults: '推荐结果',
    quizBack: '上一题',
    quizNext: '下一题',
    quizFinish: '查看推荐',
    quizRestart: '重新测试',
    quizReason: '匹配理由',
    compareEmpty: '先在详情页把 2-3 个品种加入对比。',
    clearCompare: '清空对比',
    storyEntry: '故事入口',
  },
  en: {
    hide: 'Hide interface',
    show: 'Show interface',
    reset: 'Reset to global view',
    eyebrow: '3D Cat Breed Atlas',
    title: 'Cat Planet',
    source: 'Open TICA breed source',
    search: 'Search breed, alias, origin, or trait',
    regions: 'Quick region picker',
    list: 'Breed atlas',
    emptyTitle: 'Choose a cat breed',
    emptyBody: 'Try “American Shorthair”, “Ragdoll”, “Maine Coon”, or rotate the planet and hover a breed badge.',
    dataNote: 'Coordinates are country or historical-region centroids for atlas display, not exact birthplaces.',
    aliases: 'Common aliases',
    origin: 'Origin',
    status: 'TICA status',
    coordinate: 'Coordinate basis',
    countries: 'Countries',
    story: 'Verified breed story',
    externalStories: 'Stories & videos',
    facts: 'Atlas facts',
    traits: 'Traits',
    care: 'Care',
    size: 'Size',
    lifespan: 'Lifespan',
    colors: 'Visual keywords',
    sources: 'Sources',
    photoCredit: 'Photo',
    ticaProfile: 'TICA breed profile',
    ticaAll: 'TICA all breeds',
    high: 'Country/region centroid',
    medium: 'Historical-region centroid',
    low: 'Broad area centroid',
    atlas: 'Atlas',
    route: 'Journey',
    quiz: 'Match Quiz',
    compare: 'Compare',
    constellation: 'Constellation',
    passport: 'My Planet',
    dailyCat: 'Daily Cat',
    todayLand: 'Today we land on',
    dailyPrompt: 'Today we land on this cat coordinate',
    landHere: 'Land here',
    favorite: 'Favorite',
    favorited: 'Saved',
    compareAdd: 'Compare',
    compareRemove: 'Remove',
    compareLimit: 'Compare up to 3 breeds',
    openRoute: 'Open journey',
    radar: 'Personality radar',
    careGuide: 'Beginner care notes',
    routeCard: 'Breed origin journey',
    journeyIntro: 'Read where this breed started, how it spread, and why people remember it today.',
    routeOrigin: 'Start: origin',
    routeDevelopment: 'Development: breeding and spread',
    routeToday: 'Today: family image',
    constellationTitle: 'Guardian cat constellation',
    constellationIntro: 'Choose a birth date. The constellation match will pick a guardian cat and explain why it fits.',
    guardianPrompt: 'Choose your birth date',
    guardianResult: 'Your guardian cat',
    guardianBackup: 'Backup guardian',
    guardianWhy: 'Why this cat fits your sign',
    guardianPersonality: 'Personality fit',
    guardianOrigin: 'Origin mood',
    guardianCare: 'Companion notes',
    guardianSources: 'Keep reading',
    guardianArticle: 'Breed article',
    guardianVideo: 'Video doorway',
    storySector: 'Constellation reading',
    passportTitle: 'My Cat Planet',
    passportEmpty: 'Find your guardian cat or save favorite breeds first, then generate a share card.',
    savedCoordinates: 'Saved planet coordinates',
    shareCardTitle: 'Cat Planet Card',
    shareCardGuardian: 'My Guardian Cat',
    shareCardFavorites: 'Favorite Planet',
    shareCardModeGuardian: 'Guardian card',
    shareCardModeFavorites: 'Favorites card',
    shareCardFront: 'Front',
    shareCardBack: 'Back',
    shareCardPurpose: 'Save your guardian cat coordinate and share it so friends can find theirs too.',
    shareCardStamp: 'Guardian stamp',
    shareCardCoords: 'Planet coordinates',
    shareCardStamps: 'Saved stamps',
    downloadCurrentCard: 'Download this side',
    downloadBothCards: 'Download both sides',
    viewStory: 'Read its story',
    testFriend: 'Test a friend',
    generatingCard: 'Generating...',
    birthDate: 'Birthday',
    guardianLanding: 'Today we land on',
    cardLineOne: 'A soft coordinate from Cat Planet.',
    cardLineTwo: 'Save your favorite cats, sign, and story together.',
    cardLineThree: 'Next time, continue exploring from here.',
    soundOn: 'Mute sound',
    soundOff: 'Enable sound',
    downloadPassport: 'Download share image',
    noRoute: 'This breed does not have a dedicated origin journey yet. Read its story and sources first.',
    quizTitle: 'Find a cat that fits me',
    quizSubtitle: 'Answer one card at a time. The result recommends 1-2 fitting breeds.',
    quizProgress: 'Answered',
    quizResults: 'Recommended breeds',
    quizBack: 'Back',
    quizNext: 'Next',
    quizFinish: 'See matches',
    quizRestart: 'Restart',
    quizReason: 'Why it fits',
    compareEmpty: 'Add 2-3 breeds from the detail panel first.',
    clearCompare: 'Clear compare',
    storyEntry: 'Story entry',
  },
} satisfies Record<Language, Record<string, string>>

const regionLabel: Record<Language, Record<Region, string>> = {
  zh: {
    Global: '全球',
    Asia: '亚洲',
    Europe: '欧洲',
    'North America': '北美洲',
    'Middle East': '中东',
    'Africa/Oceania': '非洲/大洋洲',
  },
  en: {
    Global: 'Global',
    Asia: 'Asia',
    Europe: 'Europe',
    'North America': 'North America',
    'Middle East': 'Middle East',
    'Africa/Oceania': 'Africa/Oceania',
  },
}

const coatLabel: Record<Language, Record<CoatFilter, string>> = {
  zh: {
    all: '全部',
    short: '短毛',
    long: '长毛',
    hairless: '无毛',
    rex: '卷毛',
    mixed: '多毛型',
  },
  en: {
    all: 'All',
    short: 'Short',
    long: 'Long',
    hairless: 'Hairless',
    rex: 'Rex',
    mixed: 'Mixed',
  },
}

const coatFilters: CoatFilter[] = ['all', 'short', 'long', 'hairless', 'rex', 'mixed']
const experienceOptions: Array<{ id: ActiveExperience; icon: typeof Globe2 }> = [
  { id: 'atlas', icon: Globe2 },
  { id: 'route', icon: Route },
  { id: 'quiz', icon: Compass },
  { id: 'compare', icon: GitCompare },
  { id: 'constellation', icon: Star },
  { id: 'passport', icon: Share2 },
]

const radarKeys = [
  'affectionate',
  'active',
  'calm',
  'grooming',
  'beginnerFriendly',
  'shedding',
] as const

const radarLabel: Record<Language, Record<(typeof radarKeys)[number], string>> = {
  zh: {
    affectionate: '亲人度',
    active: '活跃度',
    calm: '安静度',
    grooming: '护理难度',
    beginnerFriendly: '新手友好',
    shedding: '掉毛程度',
  },
  en: {
    affectionate: 'Affection',
    active: 'Active',
    calm: 'Calm',
    grooming: 'Grooming',
    beginnerFriendly: 'Beginner',
    shedding: 'Shedding',
  },
}

const quizQuestions = [
  {
    id: 'space',
    label: { zh: '居住空间', en: 'Living space' },
    options: [
      { label: { zh: '小户型，希望它适应室内节奏', en: 'Compact home, indoor-friendly rhythm' }, target: { active: 3, calm: 4, beginnerFriendly: 4 } },
      { label: { zh: '空间充足，可以跑跳攀爬', en: 'Roomy home with climbing space' }, target: { active: 5, calm: 2 } },
      { label: { zh: '不确定，想先稳妥一点', en: 'Not sure, keep it balanced' }, target: { active: 3, calm: 3, beginnerFriendly: 4 } },
    ],
  },
  {
    id: 'family',
    label: { zh: '家里成员', en: 'Household' },
    options: [
      { label: { zh: '有小孩、老人或访客', en: 'Kids, elders, or frequent guests' }, target: { affectionate: 5, beginnerFriendly: 5, calm: 4 } },
      { label: { zh: '主要是成年人，环境安静', en: 'Mostly adults, quiet home' }, target: { affectionate: 3, calm: 4 } },
      { label: { zh: '经常有人来，希望它胆子大', en: 'Guests often visit; confidence matters' }, target: { affectionate: 4, active: 4, beginnerFriendly: 4 } },
    ],
  },
  {
    id: 'time',
    label: { zh: '每天陪伴时间', en: 'Daily companionship' },
    options: [
      { label: { zh: '比较少，希望它能自处', en: 'Limited time, independent cat preferred' }, target: { active: 2, calm: 5, affectionate: 3 } },
      { label: { zh: '每天能稳定互动一会儿', en: 'Steady daily interaction' }, target: { active: 3, calm: 4, affectionate: 4 } },
      { label: { zh: '很多时间陪它玩和训练', en: 'Lots of play and training time' }, target: { active: 5, affectionate: 5 } },
    ],
  },
  {
    id: 'shedding',
    label: { zh: '掉毛接受度', en: 'Shedding tolerance' },
    options: [
      { label: { zh: '希望尽量少掉毛', en: 'Prefer as little shedding as possible' }, target: { shedding: 1, grooming: 2 } },
      { label: { zh: '可以接受日常清理', en: 'Regular cleanup is fine' }, target: { shedding: 3, grooming: 3 } },
      { label: { zh: '长毛也可以，只要性格合适', en: 'Longhair is fine if personality fits' }, target: { shedding: 5, grooming: 5, affectionate: 4 } },
    ],
  },
  {
    id: 'grooming',
    label: { zh: '护理投入', en: 'Grooming effort' },
    options: [
      { label: { zh: '越简单越好', en: 'Keep care simple' }, target: { grooming: 2, beginnerFriendly: 5 } },
      { label: { zh: '愿意每周梳毛护理', en: 'Weekly brushing is fine' }, target: { grooming: 4, affectionate: 4 } },
      { label: { zh: '能接受更细致的护理', en: 'Detailed care is acceptable' }, target: { grooming: 5, beginnerFriendly: 3 } },
    ],
  },
  {
    id: 'vibe',
    label: { zh: '喜欢的性格气质', en: 'Preferred vibe' },
    options: [
      { label: { zh: '安静陪伴型', en: 'Calm companion' }, target: { calm: 5, active: 2 } },
      { label: { zh: '活泼探索型', en: 'Playful explorer' }, target: { active: 5, calm: 2 } },
      { label: { zh: '亲人但不要太闹', en: 'Affectionate but not too loud' }, target: { affectionate: 5, calm: 4, active: 3 } },
    ],
  },
  {
    id: 'clingy',
    label: { zh: '能否接受粘人', en: 'Clinginess' },
    options: [
      { label: { zh: '喜欢它经常靠近我', en: 'I like a cat that stays close' }, target: { affectionate: 5, active: 3 } },
      { label: { zh: '希望彼此有空间', en: 'I prefer more personal space' }, target: { affectionate: 2, calm: 4 } },
    ],
  },
  {
    id: 'beginner',
    label: { zh: '养猫经验', en: 'Cat-owning experience' },
    options: [
      { label: { zh: '第一次养猫，希望稳妥', en: 'First-time owner, keep it manageable' }, target: { beginnerFriendly: 5, grooming: 2, calm: 4 } },
      { label: { zh: '有经验，可以接受更特别的品种', en: 'Experienced; unique breeds are fine' }, target: { beginnerFriendly: 2, grooming: 4, active: 4 } },
    ],
  },
  {
    id: 'coat',
    label: { zh: '毛发偏好', en: 'Coat preference' },
    options: [
      { label: { zh: '短毛清爽', en: 'Clean short coat' }, target: { grooming: 2, shedding: 2, beginnerFriendly: 4 } },
      { label: { zh: '长毛蓬松', en: 'Fluffy longhair' }, target: { grooming: 5, shedding: 5, calm: 4 } },
      { label: { zh: '无毛或卷毛也想了解', en: 'Hairless or rex cats interest me' }, target: { grooming: 4, shedding: 1, active: 4 } },
    ],
  },
  {
    id: 'interaction',
    label: { zh: '互动感期待', en: 'Interaction level' },
    options: [
      { label: { zh: '像安静室友，陪着就好', en: 'Quiet roommate energy' }, target: { calm: 5, active: 2, affectionate: 3 } },
      { label: { zh: '希望它聪明、会回应', en: 'Smart and responsive' }, target: { active: 5, affectionate: 5, calm: 2 } },
      { label: { zh: '介于两者之间', en: 'Somewhere in between' }, target: { active: 3, affectionate: 4, calm: 4 } },
    ],
  },
] as const

type QuizAnswers = Record<string, number>

const routeStepKind = ['routeOrigin', 'routeDevelopment', 'routeToday'] as const
const routeStepFallback = {
  zh: [
    '先看这个品种的地理起点，理解它为什么会在这里被记录。',
    '再看它如何进入育种、猫展或家庭文化，被更多人认识。',
    '最后回到今天的家庭场景，理解它为什么仍然被喜欢。',
  ],
  en: [
    'Start with the place context that anchors this breed.',
    'Then read how breeding, cat fancy, or family culture helped it spread.',
    'Finally return to the modern companion image people remember today.',
  ],
} satisfies Record<Language, string[]>

const guardianMonthLabels = {
  zh: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
} satisfies Record<Language, string[]>

const zodiacProfiles = [
  {
    id: 'aries',
    start: [3, 21],
    end: [4, 19],
    name: { zh: '白羊座', en: 'Aries' },
    symbol: '♈',
    keyword: { zh: '勇敢 / 直接 / 探索', en: 'brave / direct / adventurous' },
    primaryBreedId: 'bengal',
    backupBreedId: 'devon-rex',
  },
  {
    id: 'taurus',
    start: [4, 20],
    end: [5, 20],
    name: { zh: '金牛座', en: 'Taurus' },
    symbol: '♉',
    keyword: { zh: '稳定 / 温和 / 享受生活', en: 'steady / gentle / comfort-loving' },
    primaryBreedId: 'british-shorthair',
    backupBreedId: 'ragdoll',
  },
  {
    id: 'gemini',
    start: [5, 21],
    end: [6, 21],
    name: { zh: '双子座', en: 'Gemini' },
    symbol: '♊',
    keyword: { zh: '好奇 / 灵动 / 会互动', en: 'curious / agile / interactive' },
    primaryBreedId: 'devon-rex',
    backupBreedId: 'siamese',
  },
  {
    id: 'cancer',
    start: [6, 22],
    end: [7, 22],
    name: { zh: '巨蟹座', en: 'Cancer' },
    symbol: '♋',
    keyword: { zh: '温柔 / 顾家 / 需要陪伴', en: 'soft / homely / companionable' },
    primaryBreedId: 'ragdoll',
    backupBreedId: 'birman',
  },
  {
    id: 'leo',
    start: [7, 23],
    end: [8, 22],
    name: { zh: '狮子座', en: 'Leo' },
    symbol: '♌',
    keyword: { zh: '大气 / 自信 / 有存在感', en: 'bold / confident / present' },
    primaryBreedId: 'maine-coon',
    backupBreedId: 'persian',
  },
  {
    id: 'virgo',
    start: [8, 23],
    end: [9, 22],
    name: { zh: '处女座', en: 'Virgo' },
    symbol: '♍',
    keyword: { zh: '克制 / 清爽 / 有秩序', en: 'tidy / composed / precise' },
    primaryBreedId: 'russian-blue',
    backupBreedId: 'american-shorthair',
  },
  {
    id: 'libra',
    start: [9, 23],
    end: [10, 23],
    name: { zh: '天秤座', en: 'Libra' },
    symbol: '♎',
    keyword: { zh: '优雅 / 平衡 / 审美感', en: 'elegant / balanced / graceful' },
    primaryBreedId: 'persian',
    backupBreedId: 'birman',
  },
  {
    id: 'scorpio',
    start: [10, 24],
    end: [11, 22],
    name: { zh: '天蝎座', en: 'Scorpio' },
    symbol: '♏',
    keyword: { zh: '神秘 / 亲密 / 反差感', en: 'intense / close / distinctive' },
    primaryBreedId: 'sphynx',
    backupBreedId: 'bengal',
  },
  {
    id: 'sagittarius',
    start: [11, 23],
    end: [12, 21],
    name: { zh: '射手座', en: 'Sagittarius' },
    symbol: '♐',
    keyword: { zh: '自由 / 表达 / 爱探索', en: 'free / expressive / exploratory' },
    primaryBreedId: 'siamese',
    backupBreedId: 'abyssinian',
  },
  {
    id: 'capricorn',
    start: [12, 22],
    end: [1, 19],
    name: { zh: '摩羯座', en: 'Capricorn' },
    symbol: '♑',
    keyword: { zh: '可靠 / 稳定 / 耐心', en: 'reliable / steady / patient' },
    primaryBreedId: 'american-shorthair',
    backupBreedId: 'british-shorthair',
  },
  {
    id: 'aquarius',
    start: [1, 20],
    end: [2, 18],
    name: { zh: '水瓶座', en: 'Aquarius' },
    symbol: '♒',
    keyword: { zh: '特别 / 聪明 / 有想法', en: 'unusual / clever / independent' },
    primaryBreedId: 'abyssinian',
    backupBreedId: 'sphynx',
  },
  {
    id: 'pisces',
    start: [2, 19],
    end: [3, 20],
    name: { zh: '双鱼座', en: 'Pisces' },
    symbol: '♓',
    keyword: { zh: '温柔 / 浪漫 / 共情', en: 'tender / dreamy / empathetic' },
    primaryBreedId: 'birman',
    backupBreedId: 'ragdoll',
  },
] as const

type ZodiacProfile = (typeof zodiacProfiles)[number]

const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

const isDateInRange = (
  month: number,
  day: number,
  start: readonly [number, number],
  end: readonly [number, number],
) => {
  const date = month * 100 + day
  const startValue = start[0] * 100 + start[1]
  const endValue = end[0] * 100 + end[1]
  if (startValue <= endValue) return date >= startValue && date <= endValue
  return date >= startValue || date <= endValue
}

const zodiacForBirthday = (birthday: GuardianBirthday) =>
  zodiacProfiles.find((profile) =>
    isDateInRange(birthday.month, birthday.day, profile.start, profile.end),
  ) ?? zodiacProfiles[0]

const zodiacById = (id: string | null) =>
  zodiacProfiles.find((profile) => profile.id === id) ?? null

const guardianKeywordForBreed = (breedId: string, language: Language) => {
  const keyword = zodiacProfiles.find((option) => option.primaryBreedId === breedId)
    ?? zodiacProfiles.find((option) => option.backupBreedId === breedId)
  if (keyword) return keyword.keyword[language]
  return language === 'zh' ? '守护 / 陪伴 / 治愈' : 'guardian / companion / comfort'
}

const dateLabelFor = (birthday: GuardianBirthday | null, language: Language) => {
  if (!birthday) return language === 'zh' ? '未选择' : 'Not selected'
  return language === 'zh'
    ? `${birthday.month}月${birthday.day}日`
    : `${guardianMonthLabels.en[birthday.month - 1]} ${birthday.day}`
}

const guardianExplanationFor = (
  zodiac: ZodiacProfile,
  breed: BreedOrigin,
  language: Language,
) => {
  const traits = getLocalizedTraits(breed, language).slice(0, 3).join(language === 'zh' ? '、' : ', ')
  const source = breed.externalStories[0] ?? null
  return {
    personality: language === 'zh'
      ? `${zodiac.name.zh} 的关键词是 ${zodiac.keyword.zh}。${breed.localized.zh.name} 的图鉴特征包含 ${traits}，所以它更像一个能回应你节奏的守护伙伴。`
      : `${zodiac.name.en} is about ${zodiac.keyword.en}. ${breed.localized.en.name} carries ${traits}, making it a good guardian companion for this sign.`,
    origin: language === 'zh'
      ? `${breed.localized.zh.name} 的原产地线索来自 ${breed.originLabel}，这让它的气质不只停在外形，也带着地域和品种历史的记忆点。`
      : `${breed.localized.en.name} is tied to ${breed.originLabel}, giving the match a place-based story rather than only a cute look.`,
    care: language === 'zh'
      ? `${breed.careGuide.familyFitZh} ${breed.careGuide.activityZh}`
      : `${breed.careGuide.familyFitEn} ${breed.careGuide.activityEn}`,
    videoUrl: source?.url ?? `https://www.youtube.com/results?search_query=${encodeURIComponent(`${breed.ticaName} cat breed video`)}`,
    videoSource: source?.sourceName ?? 'YouTube',
  }
}

const matchReasonFor = (
  breed: BreedOrigin,
  target: BreedOrigin['personalityRadar'],
  language: Language,
) => {
  const closest = [...radarKeys]
    .sort((a, b) =>
      Math.abs(breed.personalityRadar[a] - target[a])
      - Math.abs(breed.personalityRadar[b] - target[b]),
    )
    .slice(0, 2)
    .map((key) => radarLabel[language][key])
    .join(language === 'zh' ? '、' : ', ')

  if (language === 'zh') {
    return `${breed.localized.zh.name} 在 ${closest} 上更接近你的答案，护理和相处节奏也比较容易匹配。`
  }

  return `${breed.localized.en.name} is close to your answers on ${closest}, with a care and companionship rhythm that fits your choices.`
}

const catPalette = ['peach', 'cream', 'cocoa', 'calico', 'sky', 'petal']
const interactiveMotionSelector = [
  '.language-toggle button',
  '.source-link',
  '.hud-icon',
  '.coat-filter button',
  '.region-grid button',
  '.dock-pills button',
  '.breed-list button',
  '.source-stack a',
  '.story-card a',
].join(',')

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

type StoryTone = NonNullable<BreedOrigin['verifiedStory']['tone']>

const storyToneLabel: Record<Language, Record<StoryTone, string>> = {
  zh: {
    funny: '趣闻',
    touching: '暖心',
    legend: '传奇',
    history: '历史',
    care: '护理',
  },
  en: {
    funny: 'Fun',
    touching: 'Warm',
    legend: 'Legend',
    history: 'History',
    care: 'Care',
  },
}

type StorySourceType = NonNullable<BreedOrigin['verifiedStory']['sourceType']>
type ExternalStoryTone = NonNullable<BreedOrigin['externalStories'][number]['tone']>
type ExternalStorySourceType = NonNullable<BreedOrigin['externalStories'][number]['sourceType']>

const storySourceTypeLabel: Record<Language, Record<StorySourceType, string>> = {
  zh: {
    official: '官方品种资料',
    association: '协会资料',
    reference: '百科/参考资料',
    news: '新闻故事',
    culture: '文化来源',
  },
  en: {
    official: 'Official breed profile',
    association: 'Association source',
    reference: 'Reference source',
    news: 'News story',
    culture: 'Culture source',
  },
}

const externalStoryToneLabel: Record<Language, Record<ExternalStoryTone, string>> = {
  zh: {
    funny: '好笑',
    touching: '暖心',
    informative: '资料',
    legendary: '传奇',
  },
  en: {
    funny: 'Fun',
    touching: 'Warm',
    informative: 'Guide',
    legendary: 'Legend',
  },
}

const externalStorySourceLabel: Record<Language, Record<ExternalStorySourceType, string>> = {
  zh: {
    news: '新闻',
    video: '视频',
    rescue: '救助',
    culture: '文化',
    official: '官方',
  },
  en: {
    news: 'News',
    video: 'Video',
    rescue: 'Rescue',
    culture: 'Culture',
    official: 'Official',
  },
}

const storyToneFor = (story: BreedOrigin['verifiedStory']): StoryTone => {
  if (story.tone) return story.tone
  if (story.type === 'culture') return 'funny'
  if (story.type === 'anecdote') return 'care'
  return 'history'
}

const catToneFor = (id: string) => {
  const hash = [...id].reduce((total, char) => total + char.charCodeAt(0), 0)
  return catPalette[hash % catPalette.length]
}

function regionCount(region: Region, coatFilter: CoatFilter) {
  return getVisibleBreeds(region, '', coatFilter).length
}

function CatAvatar({
  tone,
  className = '',
}: {
  tone: string
  className?: string
}) {
  return (
    <span className={`cat-avatar ${tone} ${className}`} aria-hidden="true">
      <span className="cat-ear left" />
      <span className="cat-ear right" />
      <span className="cat-face">:3</span>
    </span>
  )
}

function getLocalizedTraits(breed: BreedOrigin, language: Language) {
  return breed.localized[language].traits.slice(0, 5)
}

function factItems(breed: BreedOrigin, language: Language) {
  const t = copy[language]
  return [
    [t.origin, breed.originLabel],
    [t.coordinate, t[breed.confidence]],
    [t.size, breed.detailFacts.size],
    [t.lifespan, breed.detailFacts.lifespan],
    [t.care, breed.detailFacts.care],
    [t.countries, breed.countries.join(', ')],
  ] as const
}

const photoStyleFor = (breed: BreedOrigin) => ({
  objectFit: breed.photo.fit ?? 'cover',
  objectPosition: breed.photo.objectPosition ?? '50% 38%',
})

const playSoftUiSound = () => {
  if (typeof window === 'undefined') return
  const AudioContextClass = window.AudioContext
    ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!AudioContextClass) return

  const audio = new AudioContextClass()
  const oscillator = audio.createOscillator()
  const gain = audio.createGain()
  oscillator.type = 'sine'
  oscillator.frequency.setValueAtTime(660, audio.currentTime)
  oscillator.frequency.exponentialRampToValueAtTime(420, audio.currentTime + 0.14)
  gain.gain.setValueAtTime(0.001, audio.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.035, audio.currentTime + 0.02)
  gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.18)
  oscillator.connect(gain)
  gain.connect(audio.destination)
  oscillator.start()
  oscillator.stop(audio.currentTime + 0.2)
  window.setTimeout(() => {
    void audio.close()
  }, 260)
}

export function CatPlanetUI({ motionReady = true }: { motionReady?: boolean }) {
  const workspaceRef = useRef<HTMLDivElement | null>(null)
  const tooltipRef = useRef<HTMLDivElement | null>(null)
  const uiVisible = useCatPlanetStore((state) => state.uiVisible)
  const toggleUiVisible = useCatPlanetStore((state) => state.toggleUiVisible)
  const activeRegion = useCatPlanetStore((state) => state.activeRegion)
  const setActiveRegion = useCatPlanetStore((state) => state.setActiveRegion)
  const searchQuery = useCatPlanetStore((state) => state.searchQuery)
  const setSearchQuery = useCatPlanetStore((state) => state.setSearchQuery)
  const coatFilter = useCatPlanetStore((state) => state.coatFilter)
  const setCoatFilter = useCatPlanetStore((state) => state.setCoatFilter)
  const selectedBreedId = useCatPlanetStore((state) => state.selectedBreedId)
  const hoveredBreedId = useCatPlanetStore((state) => state.hoveredBreedId)
  const tooltipPosition = useCatPlanetStore((state) => state.tooltipPosition)
  const flyTo = useCatPlanetStore((state) => state.flyTo)
  const language = useCatPlanetStore((state) => state.language)
  const setLanguage = useCatPlanetStore((state) => state.setLanguage)
  const activeExperience = useCatPlanetStore((state) => state.activeExperience)
  const setActiveExperience = useCatPlanetStore((state) => state.setActiveExperience)
  const compareBreedIds = useCatPlanetStore((state) => state.compareBreedIds)
  const favoriteBreedIds = useCatPlanetStore((state) => state.favoriteBreedIds)
  const dailyBreedId = useCatPlanetStore((state) => state.dailyBreedId)
  const soundEnabled = useCatPlanetStore((state) => state.soundEnabled)
  const guardianBirthday = useCatPlanetStore((state) => state.guardianBirthday)
  const guardianZodiacId = useCatPlanetStore((state) => state.guardianZodiacId)
  const guardianBreedIds = useCatPlanetStore((state) => state.guardianBreedIds)
  const shareCardMode = useCatPlanetStore((state) => state.shareCardMode)
  const shareCardSide = useCatPlanetStore((state) => state.shareCardSide)
  const toggleFavoriteBreed = useCatPlanetStore((state) => state.toggleFavoriteBreed)
  const toggleCompareBreed = useCatPlanetStore((state) => state.toggleCompareBreed)
  const clearCompare = useCatPlanetStore((state) => state.clearCompare)
  const setSoundEnabled = useCatPlanetStore((state) => state.setSoundEnabled)
  const setGuardianMatch = useCatPlanetStore((state) => state.setGuardianMatch)
  const setShareCardMode = useCatPlanetStore((state) => state.setShareCardMode)
  const setShareCardSide = useCatPlanetStore((state) => state.setShareCardSide)
  const t = copy[language]

  const selectedBreed = getBreedById(selectedBreedId)
  const hoveredBreed = getBreedById(hoveredBreedId)
  const tooltipBreed = hoveredBreed ?? selectedBreed
  const visibleBreeds = getVisibleBreeds(activeRegion, searchQuery, coatFilter)
  const dailyBreed = getBreedById(dailyBreedId)

  useEffect(() => {
    if (!uiVisible || !motionReady || !workspaceRef.current) return

    const reduceMotion = prefersReducedMotion()
    const context = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(
        '.control-panel, .detail-panel, .quick-region-dock',
      )

      gsap.fromTo(
        panels,
        {
          autoAlpha: 0,
          y: 18,
          scale: 0.985,
          filter: 'blur(8px)',
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: reduceMotion ? 0.01 : 0.46,
          ease: 'power3.out',
          stagger: reduceMotion ? 0 : 0.055,
          overwrite: true,
        },
      )
    }, workspaceRef)

    return () => context.revert()
  }, [motionReady, uiVisible])

  useEffect(() => {
    if (!uiVisible || !motionReady || !workspaceRef.current) return

    const reduceMotion = prefersReducedMotion()
    const elements = gsap.utils.toArray<HTMLElement>(
      interactiveMotionSelector,
      workspaceRef.current,
    )

    const removeListeners = elements.map((element) => {
      const onEnter = () => {
        gsap.to(element, {
          y: -2,
          scale: 1.012,
          filter: 'brightness(1.035) saturate(1.05)',
          duration: reduceMotion ? 0.01 : 0.2,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      }
      const onLeave = () => {
        gsap.to(element, {
          y: 0,
          scale: 1,
          filter: 'brightness(1) saturate(1)',
          duration: reduceMotion ? 0.01 : 0.22,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      }
      const onPress = () => {
        gsap.to(element, {
          y: 0,
          scale: 0.985,
          duration: reduceMotion ? 0.01 : 0.09,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      }

      element.addEventListener('pointerenter', onEnter)
      element.addEventListener('pointerleave', onLeave)
      element.addEventListener('pointerdown', onPress)
      element.addEventListener('pointerup', onEnter)
      element.addEventListener('pointercancel', onLeave)

      return () => {
        element.removeEventListener('pointerenter', onEnter)
        element.removeEventListener('pointerleave', onLeave)
        element.removeEventListener('pointerdown', onPress)
        element.removeEventListener('pointerup', onEnter)
        element.removeEventListener('pointercancel', onLeave)
      }
    })

    return () => {
      removeListeners.forEach((remove) => remove())
      gsap.killTweensOf(elements)
    }
  }, [
    activeRegion,
    coatFilter,
    language,
    searchQuery,
    selectedBreedId,
    uiVisible,
    motionReady,
    visibleBreeds.length,
  ])

  useEffect(() => {
    if (!motionReady) return

    const detailPhotoImage = workspaceRef.current?.querySelector<HTMLElement>('.detail-photo img')
    const detailItems = workspaceRef.current?.querySelectorAll<HTMLElement>(
      '.detail-photo, .detail-kicker, .detail-hero, .summary, .alias-panel, .detail-panel section',
    )
    if (!detailItems) return

    const reduceMotion = prefersReducedMotion()
    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: {
          overwrite: true,
        },
      })

      if (detailPhotoImage) {
        timeline.fromTo(
          detailPhotoImage,
          {
            scale: 1.045,
            filter: 'saturate(0.98) contrast(0.98) brightness(1.02)',
          },
          {
            scale: 1,
            filter: 'saturate(1.04) contrast(1.02) brightness(1)',
            duration: reduceMotion ? 0.01 : 0.58,
            ease: 'power3.out',
          },
          0,
        )
      }

      timeline.fromTo(
        detailItems,
        {
          autoAlpha: 0.48,
          y: 16,
          filter: 'blur(7px)',
        },
        {
          autoAlpha: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: reduceMotion ? 0.01 : 0.42,
          ease: 'power3.out',
          stagger: reduceMotion ? 0 : 0.04,
        },
        0.02,
      )
    }, workspaceRef)

    return () => context.revert()
  }, [language, motionReady, selectedBreedId])

  useEffect(() => {
    if (!uiVisible || !motionReady || !workspaceRef.current) return

    const reduceMotion = prefersReducedMotion()
    const items = workspaceRef.current.querySelectorAll<HTMLElement>('.breed-list button')
    if (items.length === 0) return

    gsap.fromTo(
      items,
      {
        autoAlpha: 0.58,
        x: -8,
        filter: 'blur(4px)',
      },
      {
        autoAlpha: 1,
        x: 0,
        filter: 'blur(0px)',
        duration: reduceMotion ? 0.01 : 0.26,
        ease: 'power2.out',
        stagger: reduceMotion ? 0 : 0.012,
        overwrite: true,
      },
    )
  }, [
    activeRegion,
    coatFilter,
    language,
    motionReady,
    searchQuery,
    uiVisible,
    visibleBreeds.length,
  ])

  useEffect(() => {
    if (!uiVisible || !motionReady || !workspaceRef.current) return

    const reduceMotion = prefersReducedMotion()
    const cards = gsap.utils.toArray<HTMLElement>(
      '.story-card, .external-story-card',
      workspaceRef.current,
    )

    const removeListeners = cards.map((card) => {
      const onEnter = (event: PointerEvent) => {
        const bounds = card.getBoundingClientRect()
        const rotateY = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2.8
        const rotateX = -((event.clientY - bounds.top) / bounds.height - 0.5) * 2.2

        gsap.to(card, {
          y: -4,
          rotateX,
          rotateY,
          filter: 'brightness(1.035) saturate(1.06)',
          duration: reduceMotion ? 0.01 : 0.24,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      }
      const onMove = (event: PointerEvent) => {
        const bounds = card.getBoundingClientRect()
        gsap.to(card, {
          rotateY: ((event.clientX - bounds.left) / bounds.width - 0.5) * 2.8,
          rotateX: -((event.clientY - bounds.top) / bounds.height - 0.5) * 2.2,
          duration: reduceMotion ? 0.01 : 0.16,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      }
      const onLeave = () => {
        gsap.to(card, {
          y: 0,
          rotateX: 0,
          rotateY: 0,
          filter: 'brightness(1) saturate(1)',
          duration: reduceMotion ? 0.01 : 0.34,
          ease: 'elastic.out(1, 0.72)',
          overwrite: 'auto',
        })
      }

      card.addEventListener('pointerenter', onEnter)
      card.addEventListener('pointermove', onMove)
      card.addEventListener('pointerleave', onLeave)

      return () => {
        card.removeEventListener('pointerenter', onEnter)
        card.removeEventListener('pointermove', onMove)
        card.removeEventListener('pointerleave', onLeave)
      }
    })

    return () => {
      removeListeners.forEach((remove) => remove())
      gsap.killTweensOf(cards)
    }
  }, [language, motionReady, selectedBreedId, uiVisible])

  useEffect(() => {
    if (!tooltipRef.current || !tooltipPosition.visible) return

    const reduceMotion = prefersReducedMotion()
    gsap.fromTo(
      tooltipRef.current,
      {
        autoAlpha: 0,
        filter: 'blur(6px)',
      },
      {
        autoAlpha: 1,
        filter: 'blur(0px)',
        duration: reduceMotion ? 0.01 : 0.16,
        ease: 'power2.out',
        overwrite: true,
      },
    )
  }, [tooltipBreed?.id, tooltipPosition.visible])

  const handleRegionSelect = (region: Region) => {
    setActiveRegion(region)
    flyTo(regionTargets[region])
    if (soundEnabled) playSoftUiSound()
  }

  const handleBreedSelect = (breed: BreedOrigin) => {
    setActiveRegion(breed.region)
    flyTo(
      {
        ...regionTargets[breed.region],
        label: breed.ticaName,
        lat: breed.lat,
        lon: breed.lon,
        distance: 2.7,
      },
      breed.id,
    )
    if (soundEnabled) playSoftUiSound()
  }

  const handleExperienceSelect = (experience: ActiveExperience) => {
    setActiveExperience(experience)
    if (soundEnabled) playSoftUiSound()
  }

  const handleRouteStopSelect = (breed: BreedOrigin, lat: number, lon: number, label: string) => {
    setActiveRegion(breed.region)
    flyTo({ ...regionTargets[breed.region], label, lat, lon, distance: 2.58 }, breed.id)
    if (soundEnabled) playSoftUiSound()
  }

  return (
    <>
      <button
        className="hud-icon hud-toggle"
        type="button"
        aria-label={uiVisible ? t.hide : t.show}
        title={uiVisible ? t.hide : t.show}
        onClick={toggleUiVisible}
      >
        {uiVisible ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>

      {!uiVisible && (
        <button
          className="hud-icon hud-reset"
          type="button"
          aria-label={t.reset}
          title={t.reset}
          onClick={() => handleRegionSelect('Global')}
        >
          <RotateCcw size={20} />
        </button>
      )}

      {uiVisible && (
        <div ref={workspaceRef} className="workspace-shell" aria-label="Cat planet controls">
          <aside className="control-panel">
            <div className="panel-header">
              <div>
                <div className="eyebrow">
                  <Sparkles size={14} />
                  {t.eyebrow}
                </div>
                <h1>{t.title}</h1>
              </div>
              <div className="panel-actions">
                <div className="language-toggle" aria-label="Language">
                  <Languages size={15} />
                  <button
                    type="button"
                    className={language === 'zh' ? 'active' : ''}
                    onClick={() => setLanguage('zh')}
                  >
                    中
                  </button>
                  <button
                    type="button"
                    className={language === 'en' ? 'active' : ''}
                    onClick={() => setLanguage('en')}
                  >
                    EN
                  </button>
                </div>
                <a
                  href={ticaBreedSource}
                  target="_blank"
                  rel="noreferrer"
                  className="source-link"
                  aria-label={t.source}
                  title={t.source}
                >
                  <Info size={18} />
                </a>
              </div>
            </div>

            <ExperienceSwitcher
              activeExperience={activeExperience}
              language={language}
              onSelect={handleExperienceSelect}
              compareCount={compareBreedIds.length}
              favoriteCount={favoriteBreedIds.length}
            />

            {dailyBreed && (
              <DailyCatCard
                breed={dailyBreed}
                language={language}
                onSelect={handleBreedSelect}
              />
            )}

            <div className="search-box">
              <Search size={17} />
              <input
                data-testid="breed-search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={t.search}
                aria-label={t.search}
              />
            </div>

            <div className="coat-filter" aria-label="Coat filter">
              <Filter size={15} />
              {coatFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className={filter === coatFilter ? 'active' : ''}
                  data-coat={filter}
                  onClick={() => setCoatFilter(filter)}
                >
                  {coatLabel[language][filter]}
                </button>
              ))}
            </div>

            <div className="region-grid" aria-label={t.regions}>
              {regions.map((region) => (
                <button
                  key={region}
                  type="button"
                  className={region === activeRegion ? 'active' : ''}
                  data-region={region}
                  data-active={region === activeRegion}
                  onClick={() => handleRegionSelect(region)}
                >
                  <span>{regionLabel[language][region]}</span>
                  <strong>{regionCount(region, coatFilter)}</strong>
                </button>
              ))}
            </div>

            <div className="breed-list-heading">
              <Cat size={15} />
              <span>{t.list}</span>
              <strong>{visibleBreeds.length}</strong>
            </div>
            <div className="breed-list" aria-label={t.list}>
              {visibleBreeds.map((breed) => (
                <BreedListItem
                  key={breed.id}
                  breed={breed}
                  language={language}
                  selected={breed.id === selectedBreedId}
                  searchQuery={searchQuery}
                  onSelect={handleBreedSelect}
                />
              ))}
            </div>
          </aside>

          <section className="detail-panel" aria-live="polite">
            {selectedBreed ? (
              <BreedDetail
                breed={selectedBreed}
                language={language}
                favorite={favoriteBreedIds.includes(selectedBreed.id)}
                compareSelected={compareBreedIds.includes(selectedBreed.id)}
                compareFull={compareBreedIds.length >= 3 && !compareBreedIds.includes(selectedBreed.id)}
                onToggleFavorite={toggleFavoriteBreed}
                onToggleCompare={toggleCompareBreed}
                onOpenRoute={() => setActiveExperience('route')}
              />
            ) : (
              <div className="empty-detail">
                <Globe2 size={28} />
                <h2>{t.emptyTitle}</h2>
                <p>{t.emptyBody}</p>
                <p className="data-note">{t.dataNote}</p>
              </div>
            )}
          </section>

          {!selectedBreed && (
            <div className="scene-caption" aria-hidden="true">
              <span>Cat Atlas</span>
              <small>{t.emptyTitle}</small>
            </div>
          )}

          {activeExperience !== 'atlas' && (
            <ExperiencePanel
              activeExperience={activeExperience}
              language={language}
              selectedBreed={selectedBreed}
              compareBreedIds={compareBreedIds}
              favoriteBreedIds={favoriteBreedIds}
              soundEnabled={soundEnabled}
              guardianBirthday={guardianBirthday}
              guardianZodiacId={guardianZodiacId}
              guardianBreedIds={guardianBreedIds}
              shareCardMode={shareCardMode}
              shareCardSide={shareCardSide}
              onSelectExperience={handleExperienceSelect}
              onSelectBreed={handleBreedSelect}
              onRouteStop={handleRouteStopSelect}
              onClearCompare={clearCompare}
              onToggleCompare={toggleCompareBreed}
              onToggleFavorite={toggleFavoriteBreed}
              onSetGuardianMatch={setGuardianMatch}
              onSetShareCardMode={setShareCardMode}
              onSetShareCardSide={setShareCardSide}
              onToggleSound={() => setSoundEnabled(!soundEnabled)}
            />
          )}

          <section className="quick-region-dock" aria-label={t.regions}>
            <div className="dock-title">
              <MapPin size={15} />
              <span>{t.regions}</span>
            </div>
            <div className="dock-pills">
              {regions.map((region) => (
                <button
                  key={region}
                  type="button"
                  className={region === activeRegion ? 'active' : ''}
                  data-region={region}
                  onClick={() => handleRegionSelect(region)}
                >
                  {regionLabel[language][region]} {regionCount(region, coatFilter)}
                </button>
              ))}
            </div>
          </section>
        </div>
      )}

      {tooltipBreed && tooltipPosition.visible && (
        <div
          ref={tooltipRef}
          className="breed-tooltip"
          data-testid="breed-tooltip"
          data-breed-id={tooltipBreed.id}
          style={{
            transform: `translate3d(${tooltipPosition.x + 16}px, ${tooltipPosition.y - 18}px, 0)`,
          }}
        >
          <CatAvatar tone={catToneFor(tooltipBreed.id)} className="tooltip-cat" />
          {tooltipBreed.photo.verifiedBreedPhoto && (
            <img
              src={tooltipBreed.photo.markerSrc ?? tooltipBreed.photo.src}
              alt=""
              className="tooltip-preview"
              loading="lazy"
              decoding="async"
              style={{
                objectFit: tooltipBreed.photo.fit ?? 'cover',
                objectPosition:
                  tooltipBreed.photo.markerObjectPosition
                  ?? tooltipBreed.photo.objectPosition
                  ?? '50% 38%',
              }}
            />
          )}
          <strong>{tooltipBreed.localized[language].name}</strong>
          <span>{tooltipBreed.ticaName}</span>
          <small>{tooltipBreed.originLabel}</small>
        </div>
      )}
    </>
  )
}

function BreedListItem({
  breed,
  language,
  selected,
  searchQuery,
  onSelect,
}: {
  breed: BreedOrigin
  language: Language
  selected: boolean
  searchQuery: string
  onSelect: (breed: BreedOrigin) => void
}) {
  const hint = getBreedSearchHint(breed, searchQuery, language)

  return (
    <button
      type="button"
      className={selected ? 'active' : ''}
      data-breed-id={breed.id}
      data-active={selected}
      onClick={() => onSelect(breed)}
    >
      <CatAvatar tone={catToneFor(breed.id)} />
      <span>
        <strong>{breed.localized[language].name}</strong>
        <small>
          {breed.ticaName} · {breed.originLabel}
        </small>
        {hint && <em className="match-hint">{hint}</em>}
      </span>
      <ChevronRight size={17} />
    </button>
  )
}

function ExperienceSwitcher({
  activeExperience,
  language,
  onSelect,
  compareCount,
  favoriteCount,
}: {
  activeExperience: ActiveExperience
  language: Language
  onSelect: (experience: ActiveExperience) => void
  compareCount: number
  favoriteCount: number
}) {
  const t = copy[language]

  return (
    <div className="experience-switcher" aria-label="Experience modes">
      {experienceOptions.map(({ id, icon: Icon }) => (
        <button
          key={id}
          type="button"
          className={activeExperience === id ? 'active' : ''}
          onClick={() => onSelect(id)}
        >
          <Icon size={14} />
          <span>{t[id]}</span>
          {id === 'compare' && compareCount > 0 && <em>{compareCount}</em>}
          {id === 'passport' && favoriteCount > 0 && <em>{favoriteCount}</em>}
        </button>
      ))}
    </div>
  )
}

function DailyCatCard({
  breed,
  language,
  onSelect,
}: {
  breed: BreedOrigin
  language: Language
  onSelect: (breed: BreedOrigin) => void
}) {
  const t = copy[language]
  return (
    <button type="button" className="daily-cat-card" onClick={() => onSelect(breed)}>
      <span className="daily-cat-photo">
        <img src={breed.photo.markerSrc ?? breed.photo.src} alt="" style={photoStyleFor(breed)} />
      </span>
      <span>
        <small><CalendarDays size={12} /> {t.dailyCat}</small>
        <strong>{t.todayLand} {breed.localized[language].name}</strong>
        <em>{t.dailyPrompt}</em>
      </span>
      <ChevronRight size={16} />
    </button>
  )
}

function BreedDetail({
  breed,
  language,
  favorite,
  compareSelected,
  compareFull,
  onToggleFavorite,
  onToggleCompare,
  onOpenRoute,
}: {
  breed: BreedOrigin
  language: Language
  favorite: boolean
  compareSelected: boolean
  compareFull: boolean
  onToggleFavorite: (id: string) => void
  onToggleCompare: (id: string) => void
  onOpenRoute: () => void
}) {
  const t = copy[language]
  const localized = breed.localized[language]
  const story = breed.verifiedStory
  const storyTitle = language === 'zh' ? story.titleZh : story.titleEn
  const storyBody = language === 'zh' ? story.bodyZh : story.bodyEn
  const storyEvidence = language === 'zh' ? story.evidenceNoteZh : story.evidenceNoteEn
  const storyTone = storyToneFor(story)
  const storySourceLabel = storySourceTypeLabel[language][story.sourceType]
  const photoAlt = language === 'zh' ? breed.photo.altZh : breed.photo.altEn
  const aliases = breed.zhAliases.length > 0 ? breed.zhAliases : [breed.zhName]
  const traits = getLocalizedTraits(breed, language)
  const facts = factItems(breed, language)
  const readingSections = breed.readingSections.map((section) => ({
    title: language === 'zh' ? section.titleZh : section.titleEn,
    body: language === 'zh' ? section.bodyZh : section.bodyEn,
  }))
  const externalStories = breed.externalStories.map((story) => ({
    ...story,
    title: language === 'zh' ? story.titleZh : story.titleEn,
    summary: language === 'zh' ? story.summaryZh : story.summaryEn,
  }))

  return (
    <article data-testid="breed-detail" data-breed-id={breed.id}>
      <div className="detail-photo">
        <img
          src={breed.photo.src}
          alt={photoAlt}
          loading="lazy"
          style={{
            objectFit: breed.photo.fit ?? 'cover',
            objectPosition: breed.photo.objectPosition ?? '50% 38%',
          }}
        />
        <div className="detail-photo-badge">
          <Image size={14} />
          <span>{breed.photo.license}</span>
        </div>
      </div>

      <div className="detail-kicker">{regionLabel[language][breed.region]}</div>
      <div className="detail-hero">
        <CatAvatar tone={catToneFor(breed.id)} className="detail-cat" />
        <div>
          <h2>{localized.name}</h2>
          <p className="zh-name">{breed.ticaName}</p>
        </div>
      </div>

      <p className="summary">{localized.summary}</p>

      <div className="detail-actions">
        <button type="button" className={favorite ? 'active' : ''} onClick={() => onToggleFavorite(breed.id)}>
          <Heart size={15} fill={favorite ? 'currentColor' : 'none'} />
          {favorite ? t.favorited : t.favorite}
        </button>
        <button
          type="button"
          className={compareSelected ? 'active' : ''}
          disabled={compareFull}
          title={compareFull ? t.compareLimit : undefined}
          onClick={() => onToggleCompare(breed.id)}
        >
          <GitCompare size={15} />
          {compareSelected ? t.compareRemove : t.compareAdd}
        </button>
        {breed.explorationRoute && (
          <button type="button" onClick={onOpenRoute}>
            <Route size={15} />
            {t.openRoute}
          </button>
        )}
      </div>

      <section className="alias-panel">
        <h3>{t.aliases}</h3>
        <div className="trait-row">
          {aliases.slice(0, 5).map((alias) => (
            <span key={alias}>{alias}</span>
          ))}
        </div>
      </section>

      <section>
        <h3>{t.facts}</h3>
        <dl className="detail-grid">
          {facts.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section>
        <h3>{t.traits}</h3>
        <div className="trait-row">
          {traits.map((trait) => (
            <span key={trait}>{trait}</span>
          ))}
        </div>
      </section>

      <PersonalityRadar breed={breed} language={language} />
      <CareGuide breed={breed} language={language} />

      {breed.explorationRoute && (
        <RouteSummary breed={breed} language={language} onOpenRoute={onOpenRoute} />
      )}

      <section className="story-card">
        <div className="story-title">
          <BookOpen size={17} />
          <h3>{t.story}</h3>
          <span className={`story-tone ${storyTone}`}>
            {storyToneLabel[language][storyTone]}
          </span>
        </div>
        <strong>{storyTitle}</strong>
        <p>{storyBody}</p>
        <div className="story-source-meta">
          <span>{storySourceLabel}</span>
          <span>{language === 'zh' ? '品种专属线索' : 'Breed-specific lead'}</span>
        </div>
        <p className="story-evidence">{storyEvidence}</p>
        <a href={story.sourceUrl} target="_blank" rel="noreferrer">
          {story.sourceName}
          <ExternalLink size={14} />
        </a>
      </section>

      {externalStories.length > 0 && (
        <section className="external-story-stack">
          <div className="story-title">
            <PlayCircle size={17} />
            <h3>{t.externalStories}</h3>
          </div>
          {externalStories.map((story) => (
            <a
              key={story.url}
              href={story.url}
              target="_blank"
              rel="noreferrer"
              className="external-story-card"
              data-external-story
            >
              <span className={`external-story-tone ${story.tone}`}>
                {externalStoryToneLabel[language][story.tone]}
              </span>
              <strong>{story.title}</strong>
              <p>{story.summary}</p>
              <small>
                {externalStorySourceLabel[language][story.sourceType]}
                {story.platform ? ` · ${story.platform}` : ''}
                {' · '}
                {story.sourceName}
              </small>
            </a>
          ))}
        </section>
      )}

      <section className="reading-stack">
        {readingSections.map((section) => (
          <div key={section.title} className="reading-section">
            <h3>{section.title}</h3>
            <p>{section.body}</p>
          </div>
        ))}
      </section>

      <section className="source-stack">
        <h3>{t.sources}</h3>
        {breed.sourceLinks.map((source) => (
          <a key={`${source.type}-${source.url}`} href={source.url} target="_blank" rel="noreferrer">
            {language === 'zh' ? source.labelZh : source.labelEn}
            <ExternalLink size={14} />
          </a>
        ))}
      </section>
    </article>
  )
}

function PersonalityRadar({ breed, language }: { breed: BreedOrigin; language: Language }) {
  return (
    <section className="radar-card">
      <div className="story-title">
        <Compass size={17} />
        <h3>{copy[language].radar}</h3>
      </div>
      <div className="radar-metrics">
        {radarKeys.map((key) => (
          <div key={key}>
            <span>{radarLabel[language][key]}</span>
            <meter min="1" max="5" value={breed.personalityRadar[key]} />
            <strong>{breed.personalityRadar[key]}</strong>
          </div>
        ))}
      </div>
    </section>
  )
}

function CareGuide({ breed, language }: { breed: BreedOrigin; language: Language }) {
  const careItems = [
    language === 'zh' ? breed.careGuide.groomingZh : breed.careGuide.groomingEn,
    language === 'zh' ? breed.careGuide.activityZh : breed.careGuide.activityEn,
    language === 'zh' ? breed.careGuide.familyFitZh : breed.careGuide.familyFitEn,
  ]

  return (
    <section className="care-guide">
      <div className="story-title">
        <Heart size={17} />
        <h3>{copy[language].careGuide}</h3>
      </div>
      <ul>
        {careItems.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </section>
  )
}

function RouteSummary({
  breed,
  language,
  onOpenRoute,
}: {
  breed: BreedOrigin
  language: Language
  onOpenRoute: () => void
}) {
  const route = breed.explorationRoute
  if (!route) return null

  return (
    <section className="route-summary-card">
      <div className="story-title">
        <Route size={17} />
        <h3>{copy[language].routeCard}</h3>
      </div>
      <strong>{language === 'zh' ? route.titleZh : route.titleEn}</strong>
      <p>{language === 'zh' ? route.summaryZh : route.summaryEn}</p>
      <button type="button" onClick={onOpenRoute}>{copy[language].openRoute}</button>
    </section>
  )
}

function ExperiencePanel({
  activeExperience,
  language,
  selectedBreed,
  compareBreedIds,
  favoriteBreedIds,
  soundEnabled,
  guardianBirthday,
  guardianZodiacId,
  guardianBreedIds,
  shareCardMode,
  shareCardSide,
  onSelectExperience,
  onSelectBreed,
  onRouteStop,
  onClearCompare,
  onToggleCompare,
  onToggleFavorite,
  onSetGuardianMatch,
  onSetShareCardMode,
  onSetShareCardSide,
  onToggleSound,
}: {
  activeExperience: ActiveExperience
  language: Language
  selectedBreed: BreedOrigin | null
  compareBreedIds: string[]
  favoriteBreedIds: string[]
  soundEnabled: boolean
  guardianBirthday: GuardianBirthday | null
  guardianZodiacId: string | null
  guardianBreedIds: string[]
  shareCardMode: ShareCardMode
  shareCardSide: ShareCardSide
  onSelectExperience: (experience: ActiveExperience) => void
  onSelectBreed: (breed: BreedOrigin) => void
  onRouteStop: (breed: BreedOrigin, lat: number, lon: number, label: string) => void
  onClearCompare: () => void
  onToggleCompare: (id: string) => void
  onToggleFavorite: (id: string) => void
  onSetGuardianMatch: (
    birthday: GuardianBirthday,
    zodiacId: string,
    breedIds: string[],
  ) => void
  onSetShareCardMode: (mode: ShareCardMode) => void
  onSetShareCardSide: (side: ShareCardSide) => void
  onToggleSound: () => void
}) {
  const panelRef = useRef<HTMLDivElement | null>(null)
  const t = copy[language]

  useEffect(() => {
    if (!panelRef.current) return
    const reduceMotion = prefersReducedMotion()
    const context = gsap.context(() => {
      gsap.fromTo(
        panelRef.current,
        { autoAlpha: 0, filter: 'blur(8px)' },
        {
          autoAlpha: 1,
          filter: 'blur(0px)',
          duration: reduceMotion ? 0.01 : 0.34,
          ease: 'power3.out',
        },
      )
      gsap.fromTo(
        '.experience-panel [data-animate-item]',
        { autoAlpha: 0, y: 12 },
        {
          autoAlpha: 1,
          y: 0,
          duration: reduceMotion ? 0.01 : 0.26,
          ease: 'power2.out',
          stagger: reduceMotion ? 0 : 0.035,
        },
      )
    }, panelRef)
    return () => context.revert()
  }, [activeExperience, language])

  return (
    <section ref={panelRef} className="experience-panel" data-experience={activeExperience}>
      <div className="experience-panel-header">
        <div>
          <span>{t[activeExperience]}</span>
          <h2>
            {activeExperience === 'route'
              ? t.routeCard
              : activeExperience === 'quiz'
                ? t.quizTitle
                : activeExperience === 'compare'
                  ? t.compare
                  : activeExperience === 'constellation'
                    ? t.constellationTitle
                    : t.passportTitle}
          </h2>
        </div>
        <div className="experience-panel-actions">
          <button type="button" onClick={onToggleSound} title={soundEnabled ? t.soundOn : t.soundOff}>
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
          <button type="button" onClick={() => onSelectExperience('atlas')}>{t.atlas}</button>
        </div>
      </div>

      {activeExperience === 'route' && (
        <RouteExperience selectedBreed={selectedBreed} language={language} onSelectBreed={onSelectBreed} onRouteStop={onRouteStop} />
      )}
      {activeExperience === 'quiz' && (
        <QuizExperience
          language={language}
          compareBreedIds={compareBreedIds}
          onSelectBreed={onSelectBreed}
          onToggleCompare={onToggleCompare}
        />
      )}
      {activeExperience === 'compare' && (
        <CompareExperience
          language={language}
          compareBreedIds={compareBreedIds}
          onSelectBreed={onSelectBreed}
          onClearCompare={onClearCompare}
        />
      )}
      {activeExperience === 'constellation' && (
        <ConstellationExperience
          language={language}
          compareBreedIds={compareBreedIds}
          favoriteBreedIds={favoriteBreedIds}
          guardianBirthday={guardianBirthday}
          guardianZodiacId={guardianZodiacId}
          guardianBreedIds={guardianBreedIds}
          onSelectBreed={onSelectBreed}
          onToggleCompare={onToggleCompare}
          onToggleFavorite={onToggleFavorite}
          onSetGuardianMatch={onSetGuardianMatch}
        />
      )}
      {activeExperience === 'passport' && (
        <PassportExperience
          language={language}
          favoriteBreedIds={favoriteBreedIds}
          guardianBirthday={guardianBirthday}
          guardianZodiacId={guardianZodiacId}
          guardianBreedIds={guardianBreedIds}
          shareCardMode={shareCardMode}
          shareCardSide={shareCardSide}
          compareBreedIds={compareBreedIds}
          onSelectBreed={onSelectBreed}
          onToggleCompare={onToggleCompare}
          onSetShareCardMode={onSetShareCardMode}
          onSetShareCardSide={onSetShareCardSide}
          onSelectExperience={onSelectExperience}
        />
      )}
    </section>
  )
}

function RouteExperience({
  selectedBreed,
  language,
  onSelectBreed,
  onRouteStop,
}: {
  selectedBreed: BreedOrigin | null
  language: Language
  onSelectBreed: (breed: BreedOrigin) => void
  onRouteStop: (breed: BreedOrigin, lat: number, lon: number, label: string) => void
}) {
  const routeBreeds = breeds.filter((breed) => breed.explorationRoute)
  const breed = selectedBreed?.explorationRoute ? selectedBreed : routeBreeds[0]
  const route = breed?.explorationRoute

  if (!breed || !route) return <p className="experience-empty">{copy[language].noRoute}</p>

  const journeyStops = routeStepKind.map((kind, index) => {
    const stop = route.stops[index] ?? route.stops[route.stops.length - 1]
    const fallback = routeStepFallback[language][index]
    const isTodayFallback = index >= route.stops.length
    return {
      kind,
      stop,
      title: copy[language][kind],
      note: language === 'zh'
        ? isTodayFallback ? fallback : stop?.noteZh || fallback
        : isTodayFallback ? fallback : stop?.noteEn || fallback,
      label: language === 'zh'
        ? isTodayFallback ? breed.localized.zh.name : stop?.labelZh || route.titleZh
        : isTodayFallback ? breed.localized.en.name : stop?.labelEn || route.titleEn,
    }
  })

  return (
    <div className="route-experience" data-animate-item>
      <div className="route-breed-row">
        {routeBreeds.map((item) => (
          <button key={item.id} type="button" className={item.id === breed.id ? 'active' : ''} onClick={() => onSelectBreed(item)}>
            <img src={item.photo.markerSrc ?? item.photo.src} alt="" style={photoStyleFor(item)} />
            <span>{item.localized[language].name}</span>
          </button>
        ))}
      </div>
      <article className="route-card">
        <span>{copy[language].routeCard}</span>
        <h3>{language === 'zh' ? route.titleZh : route.titleEn}</h3>
        <p>{language === 'zh' ? route.summaryZh : route.summaryEn}</p>
        <p className="route-intro">{copy[language].journeyIntro}</p>
        <div className="route-timeline">
          {journeyStops.map(({ kind, stop, title, note, label }, index) => (
            <button
              key={`${kind}-${stop?.labelEn ?? index}`}
              type="button"
              onClick={() => stop && onRouteStop(breed, stop.lat, stop.lon, label)}
            >
              <strong>{String(index + 1).padStart(2, '0')}</strong>
              <span>
                <b>{title}</b>
                <em>{label}</em>
                <small>{note}</small>
              </span>
            </button>
          ))}
        </div>
      </article>
    </div>
  )
}

function QuizExperience({
  language,
  compareBreedIds,
  onSelectBreed,
  onToggleCompare,
}: {
  language: Language
  compareBreedIds: string[]
  onSelectBreed: (breed: BreedOrigin) => void
  onToggleCompare: (id: string) => void
}) {
  const [answers, setAnswers] = useState<QuizAnswers>({})
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const currentQuestion = quizQuestions[currentQuestionIndex]
  const selectedOption = answers[currentQuestion.id]
  const answeredCount = Object.keys(answers).length

  const target = useMemo(() => {
    const sums: Partial<Record<(typeof radarKeys)[number], number>> = {}
    const counts: Partial<Record<(typeof radarKeys)[number], number>> = {}

    quizQuestions.forEach((question) => {
      const answerIndex = answers[question.id]
      if (answerIndex === undefined) return
      const option = question.options[answerIndex]
      Object.entries(option.target).forEach(([key, value]) => {
        const radarKey = key as (typeof radarKeys)[number]
        sums[radarKey] = (sums[radarKey] ?? 0) + Number(value)
        counts[radarKey] = (counts[radarKey] ?? 0) + 1
      })
    })

    return radarKeys.reduce((result, key) => {
      result[key] = Math.round((sums[key] ?? 3 * (counts[key] ?? 1)) / (counts[key] ?? 1))
      return result
    }, {} as BreedOrigin['personalityRadar'])
  }, [answers])

  const results = useMemo(() => {
    return [...breeds]
      .map((breed) => ({
        breed,
        score: radarKeys.reduce((sum, key) => sum + Math.abs(breed.personalityRadar[key] - target[key]), 0),
      }))
      .sort((a, b) => a.score - b.score)
      .slice(0, 2)
  }, [target])

  const answerQuestion = (index: number) => {
    setAnswers((current) => ({ ...current, [currentQuestion.id]: index }))
  }

  const goNext = () => {
    if (currentQuestionIndex >= quizQuestions.length - 1) {
      setIsComplete(true)
      return
    }
    setCurrentQuestionIndex((current) => current + 1)
  }

  const restartQuiz = () => {
    setAnswers({})
    setCurrentQuestionIndex(0)
    setIsComplete(false)
  }

  return (
    <div className="quiz-panel" data-animate-item>
      <p>{copy[language].quizSubtitle}</p>
      <div className="quiz-stepper" aria-label={copy[language].quizProgress}>
        <span>{copy[language].quizProgress} {answeredCount}/{quizQuestions.length}</span>
        <div>
          {quizQuestions.map((question, index) => (
            <i
              key={question.id}
              className={index === currentQuestionIndex ? 'active' : answers[question.id] !== undefined ? 'done' : ''}
            />
          ))}
        </div>
      </div>

      {!isComplete ? (
        <article className="quiz-card">
          <span>{String(currentQuestionIndex + 1).padStart(2, '0')}</span>
          <h3>{currentQuestion.label[language]}</h3>
          <div className="quiz-answer-grid">
            {currentQuestion.options.map((option, index) => (
              <button
                key={option.label.en}
                type="button"
                className={selectedOption === index ? 'active' : ''}
                onClick={() => answerQuestion(index)}
              >
                {option.label[language]}
              </button>
            ))}
          </div>
          <div className="quiz-nav">
            <button
              type="button"
              disabled={currentQuestionIndex === 0}
              onClick={() => setCurrentQuestionIndex((current) => Math.max(0, current - 1))}
            >
              {copy[language].quizBack}
            </button>
            <button type="button" disabled={selectedOption === undefined} onClick={goNext}>
              {currentQuestionIndex === quizQuestions.length - 1
                ? copy[language].quizFinish
                : copy[language].quizNext}
            </button>
          </div>
        </article>
      ) : (
        <div className="quiz-results">
          <div className="quiz-results-header">
            <h3>{copy[language].quizResults}</h3>
            <button type="button" onClick={restartQuiz}>{copy[language].quizRestart}</button>
          </div>
          {results.map(({ breed, score }) => {
            const compareSelected = compareBreedIds.includes(breed.id)
            const compareFull = compareBreedIds.length >= 3 && !compareSelected
            return (
              <article key={breed.id} className="quiz-result-card">
                <img src={breed.photo.markerSrc ?? breed.photo.src} alt="" style={photoStyleFor(breed)} />
                <div>
                  <strong>{breed.localized[language].name}</strong>
                  <small>{breed.originLabel} / match {Math.max(68, 100 - score * 6)}%</small>
                  <p><b>{copy[language].quizReason}</b>{matchReasonFor(breed, target, language)}</p>
                </div>
                <div className="quiz-result-actions">
                  <button type="button" onClick={() => onSelectBreed(breed)}>{copy[language].landHere}</button>
                  <button
                    type="button"
                    disabled={compareFull}
                    onClick={() => onToggleCompare(breed.id)}
                  >
                    {compareSelected ? copy[language].compareRemove : copy[language].compareAdd}
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}

function CompareExperience({
  language,
  compareBreedIds,
  onSelectBreed,
  onClearCompare,
}: {
  language: Language
  compareBreedIds: string[]
  onSelectBreed: (breed: BreedOrigin) => void
  onClearCompare: () => void
}) {
  const compareBreeds = compareBreedIds
    .map((id) => getBreedById(id))
    .filter((breed): breed is BreedOrigin => Boolean(breed))

  return (
    <div className="compare-panel" data-animate-item>
      {compareBreeds.length < 2 ? (
        <p className="experience-empty">{copy[language].compareEmpty}</p>
      ) : (
        <>
          <button type="button" className="clear-compare" onClick={onClearCompare}>
            {copy[language].clearCompare}
          </button>
          <div className="compare-grid">
            {compareBreeds.map((breed) => (
              <article key={breed.id}>
                <img src={breed.photo.markerSrc ?? breed.photo.src} alt="" style={photoStyleFor(breed)} />
                <h3>{breed.localized[language].name}</h3>
                <p>{breed.originLabel}</p>
                <dl className="compare-facts">
                  <div>
                    <dt>{copy[language].care}</dt>
                    <dd>{breed.detailFacts.care}</dd>
                  </div>
                  <div>
                    <dt>{coatLabel[language][breed.coatLength]}</dt>
                    <dd>{breed.detailFacts.size}</dd>
                  </div>
                </dl>
                <div className="mini-bars">
                  {radarKeys.slice(0, 4).map((key) => (
                    <div key={key}>
                      <span>{radarLabel[language][key]}</span>
                      <meter min="1" max="5" value={breed.personalityRadar[key]} />
                    </div>
                  ))}
                </div>
                <a href={breed.verifiedStory.sourceUrl} target="_blank" rel="noreferrer">
                  {copy[language].storyEntry}
                  <ExternalLink size={13} />
                </a>
                <button type="button" onClick={() => onSelectBreed(breed)}>{copy[language].landHere}</button>
              </article>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function ConstellationExperience({
  language,
  compareBreedIds,
  favoriteBreedIds,
  guardianBirthday,
  guardianZodiacId,
  guardianBreedIds,
  onSelectBreed,
  onToggleCompare,
  onToggleFavorite,
  onSetGuardianMatch,
}: {
  language: Language
  compareBreedIds: string[]
  favoriteBreedIds: string[]
  guardianBirthday: GuardianBirthday | null
  guardianZodiacId: string | null
  guardianBreedIds: string[]
  onSelectBreed: (breed: BreedOrigin) => void
  onToggleCompare: (id: string) => void
  onToggleFavorite: (id: string) => void
  onSetGuardianMatch: (
    birthday: GuardianBirthday,
    zodiacId: string,
    breedIds: string[],
  ) => void
}) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const initialBirthday = guardianBirthday ?? { month: 3, day: 21 }
  const [month, setMonth] = useState(initialBirthday.month)
  const [day, setDay] = useState(initialBirthday.day)
  const validDay = Math.min(day, daysInMonth[month - 1])
  const birthday = useMemo(
    () => ({ month, day: validDay }),
    [month, validDay],
  )
  const zodiac = zodiacForBirthday(birthday)
  const currentZodiac = zodiacById(guardianZodiacId) ?? zodiac
  const currentGuardianIds = guardianBreedIds.length > 0
    ? guardianBreedIds
    : [currentZodiac.primaryBreedId, currentZodiac.backupBreedId]
  const guardianBreeds = currentGuardianIds
    .map((id) => getBreedById(id))
    .filter((breed): breed is BreedOrigin => Boolean(breed))
  const primaryBreed = guardianBreeds[0]
  const primaryExplanation = primaryBreed
    ? guardianExplanationFor(currentZodiac, primaryBreed, language)
    : null

  useGSAP(() => {
    if (!rootRef.current) return
    const reduceMotion = prefersReducedMotion()
    const dots = rootRef.current.querySelectorAll('.zodiac-orbit-dot')
    const cards = rootRef.current.querySelectorAll('.guardian-card, .guardian-reading-card')
    const activeDot = rootRef.current.querySelector('.zodiac-orbit-dot.is-current')
    const orbit = rootRef.current.querySelector('.zodiac-orbit')
    const timeline = gsap.timeline({
      defaults: {
        duration: reduceMotion ? 0.01 : 0.42,
        ease: 'power3.out',
      },
    })

    timeline
      .fromTo(
        orbit,
        { rotate: -18, scale: 0.94, filter: 'blur(4px)' },
        { rotate: 0, scale: 1, filter: 'blur(0px)' },
      )
      .fromTo(
        dots,
        { autoAlpha: 0, scale: 0.22, y: 10 },
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: reduceMotion ? 0.01 : 0.34,
          ease: 'back.out(1.8)',
          stagger: reduceMotion ? 0 : { each: 0.025, from: 'center' },
        },
        '<0.02',
      )
      .to(
        activeDot,
        {
          scale: 1.9,
          autoAlpha: 1,
          boxShadow: '0 0 22px rgba(255, 111, 159, 0.9)',
          duration: reduceMotion ? 0.01 : 0.28,
          ease: 'back.out(2)',
        },
        '>-0.04',
      )
      .fromTo(
        cards,
        { autoAlpha: 0, y: 20, rotateX: -10, rotateY: -5, filter: 'blur(10px)' },
        {
          autoAlpha: 1,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          filter: 'blur(0px)',
          duration: reduceMotion ? 0.01 : 0.46,
          stagger: reduceMotion ? 0 : 0.07,
        },
        '<0.12',
      )
  }, { scope: rootRef, dependencies: [currentZodiac.id, guardianBreedIds.join('|'), language] })

  const runGuardianMatch = () => {
    const matchedZodiac = zodiacForBirthday(birthday)
    const matchedBreedIds = [matchedZodiac.primaryBreedId, matchedZodiac.backupBreedId]
    const flipState = rootRef.current
      ? Flip.getState(rootRef.current.querySelectorAll('.guardian-card, .guardian-reading-card'))
      : null
    onSetGuardianMatch(birthday, matchedZodiac.id, matchedBreedIds)
    if (flipState) {
      window.requestAnimationFrame(() => {
        Flip.from(flipState, {
          duration: prefersReducedMotion() ? 0.01 : 0.46,
          ease: 'power3.out',
          absolute: true,
          stagger: prefersReducedMotion() ? 0 : 0.04,
        })
      })
    }
  }

  return (
    <div ref={rootRef} className="constellation-panel" data-animate-item>
      <p>{copy[language].constellationIntro}</p>
      <section className="guardian-picker">
        <h3>{copy[language].guardianPrompt}</h3>
        <div className="birthday-picker">
          <div className="guardian-months">
          {guardianMonthLabels[language].map((label, index) => (
            <button
              key={label}
              type="button"
              className={month === index + 1 ? 'active' : ''}
              onClick={() => setMonth(index + 1)}
            >
              {label}
            </button>
          ))}
          </div>
          <div className="guardian-days">
            {Array.from({ length: daysInMonth[month - 1] }, (_, index) => index + 1).map((date) => (
              <button
                key={date}
                type="button"
                className={validDay === date ? 'active' : ''}
                onClick={() => setDay(date)}
              >
                {date}
              </button>
            ))}
          </div>
        </div>
        <div className="zodiac-preview">
          <div className="zodiac-orbit" aria-hidden="true">
            {Array.from({ length: 12 }, (_, index) => (
              <span
                key={index}
                className={[
                  'zodiac-orbit-dot',
                  zodiacProfiles[index]?.id === currentZodiac.id ? 'is-current' : '',
                ].filter(Boolean).join(' ')}
                style={{ '--dot-index': index } as CSSProperties}
              />
            ))}
            <strong aria-hidden="true">{zodiac.name[language].slice(0, 1)}</strong>
          </div>
          <span>
            <small>{copy[language].birthDate} · {dateLabelFor(birthday, language)}</small>
            <b>{zodiac.name[language]}</b>
            <em>{zodiac.keyword[language]}</em>
          </span>
          <button type="button" onClick={runGuardianMatch}>
            <Sparkles size={15} />
            {language === 'zh' ? '点亮守护猫' : 'Reveal guardian'}
          </button>
        </div>
      </section>
      <section className="guardian-result">
        <h3>{copy[language].guardianResult}</h3>
        <div className="guardian-cards">
          {guardianBreeds.map((breed, index) => {
            const compareSelected = compareBreedIds.includes(breed.id)
            const favorite = favoriteBreedIds.includes(breed.id)
            const compareFull = compareBreedIds.length >= 3 && !compareSelected
            return (
              <article key={breed.id} className={index === 0 ? 'guardian-card primary' : 'guardian-card'}>
                <img src={breed.photo.markerSrc ?? breed.photo.src} alt="" style={photoStyleFor(breed)} />
                <span>{index === 0 ? copy[language].guardianResult : copy[language].guardianBackup}</span>
                <h4>{breed.localized[language].name}</h4>
                <p>{guardianKeywordForBreed(breed.id, language)}</p>
                <div className="guardian-actions">
                  <button type="button" onClick={() => onSelectBreed(breed)}>{copy[language].landHere}</button>
                  <button
                    type="button"
                    disabled={compareFull}
                    onClick={() => onToggleCompare(breed.id)}
                  >
                    {compareSelected ? copy[language].compareRemove : copy[language].compareAdd}
                  </button>
                  <button type="button" className={favorite ? 'active' : ''} onClick={() => onToggleFavorite(breed.id)}>
                    <Heart size={13} fill={favorite ? 'currentColor' : 'none'} />
                    {favorite ? copy[language].favorited : copy[language].favorite}
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </section>
      {primaryBreed && primaryExplanation && (
        <section className="guardian-reading-card">
          <h3>{copy[language].guardianWhy}</h3>
          <div className="guardian-reading-grid">
            <article>
              <Sparkles size={16} />
              <strong>{copy[language].guardianPersonality}</strong>
              <p>{primaryExplanation.personality}</p>
            </article>
            <article>
              <MapPin size={16} />
              <strong>{copy[language].guardianOrigin}</strong>
              <p>{primaryExplanation.origin}</p>
            </article>
            <article>
              <Heart size={16} />
              <strong>{copy[language].guardianCare}</strong>
              <p>{primaryExplanation.care}</p>
            </article>
          </div>
          <div className="guardian-source-links">
            <button
              type="button"
              onClick={() => onSelectBreed(primaryBreed)}
            >
              {copy[language].landHere}
            </button>
            <a href={primaryBreed.verifiedStory.sourceUrl} target="_blank" rel="noreferrer">
              {copy[language].guardianArticle}
              <ExternalLink size={13} />
            </a>
            <a href={primaryExplanation.videoUrl} target="_blank" rel="noreferrer">
              {copy[language].guardianVideo}
              <PlayCircle size={13} />
            </a>
          </div>
        </section>
      )}
    </div>
  )
}

function PassportExperience({
  language,
  favoriteBreedIds,
  guardianBirthday,
  guardianZodiacId,
  guardianBreedIds,
  shareCardMode,
  shareCardSide,
  compareBreedIds,
  onSelectBreed,
  onToggleCompare,
  onSetShareCardMode,
  onSetShareCardSide,
  onSelectExperience,
}: {
  language: Language
  favoriteBreedIds: string[]
  guardianBirthday: GuardianBirthday | null
  guardianZodiacId: string | null
  guardianBreedIds: string[]
  shareCardMode: ShareCardMode
  shareCardSide: ShareCardSide
  compareBreedIds: string[]
  onSelectBreed: (breed: BreedOrigin) => void
  onToggleCompare: (id: string) => void
  onSetShareCardMode: (mode: ShareCardMode) => void
  onSetShareCardSide: (side: ShareCardSide) => void
  onSelectExperience: (experience: ActiveExperience) => void
}) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const cardFaceRef = useRef<HTMLDivElement | null>(null)
  const duoExportRef = useRef<HTMLDivElement | null>(null)
  const [generating, setGenerating] = useState(false)
  const [generatingKind, setGeneratingKind] = useState<'single' | 'double' | null>(null)
  const favoriteBreeds = favoriteBreedIds
    .map((id) => getBreedById(id))
    .filter((breed): breed is BreedOrigin => Boolean(breed))
  const guardianZodiac = zodiacById(guardianZodiacId)
  const guardianBreeds = guardianBreedIds
    .map((id) => getBreedById(id))
    .filter((breed): breed is BreedOrigin => Boolean(breed))
  const mainGuardian = guardianBreeds[0] ?? favoriteBreeds[0] ?? null
  const cardBreeds = shareCardMode === 'guardian'
    ? guardianBreeds
    : favoriteBreeds
  const hasCardData = Boolean(mainGuardian) || favoriteBreeds.length > 0
  const displayedBreeds = (cardBreeds.length > 0 ? cardBreeds : favoriteBreeds).slice(0, 3)
  const cardTitle = shareCardMode === 'guardian'
    ? copy[language].shareCardGuardian
    : copy[language].shareCardFavorites
  const cardKeyword = mainGuardian
    ? guardianKeywordForBreed(mainGuardian.id, language)
    : language === 'zh' ? '收藏 / 探索 / 治愈' : 'favorite / explore / comfort'
  const coordinateLabel = mainGuardian
    ? `${mainGuardian.lat.toFixed(1)}, ${mainGuardian.lon.toFixed(1)}`
    : '0.0, 0.0'
  const dateLabel = guardianZodiac
    ? `${guardianZodiac.name[language]} · ${dateLabelFor(guardianBirthday, language)}`
    : copy[language].savedCoordinates
  const shareLines = [
    copy[language].cardLineOne,
    copy[language].cardLineTwo,
    copy[language].cardLineThree,
  ]
  const compareSelected = mainGuardian ? compareBreedIds.includes(mainGuardian.id) : false
  const compareFull = Boolean(mainGuardian) && compareBreedIds.length >= 3 && !compareSelected

  useGSAP(() => {
    if (!cardFaceRef.current) return
    const reduceMotion = prefersReducedMotion()
    const face = cardFaceRef.current
    const timeline = gsap.timeline({
      defaults: {
        duration: reduceMotion ? 0.01 : 0.46,
        ease: 'power3.out',
      },
    })

    timeline
      .fromTo(
        face,
        { autoAlpha: 0, y: 34, rotate: -1.6, scale: 0.965, filter: 'blur(10px)' },
        { autoAlpha: 1, y: 0, rotate: 0, scale: 1, filter: 'blur(0px)' },
      )
      .fromTo(
        '.share-card-photo-mask',
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: reduceMotion ? 0.01 : 0.5, ease: 'power3.inOut' },
        '<0.08',
      )
      .fromTo(
        '.share-card-rule',
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: reduceMotion ? 0.01 : 0.48, ease: 'power2.out' },
        '<0.08',
      )
      .fromTo(
        '.share-card-stamp, .share-card-postmark, .share-card-chip',
        { autoAlpha: 0, scale: 0.7, rotate: -8 },
        {
          autoAlpha: 1,
          scale: 1,
          rotate: 0,
          duration: reduceMotion ? 0.01 : 0.36,
          ease: 'back.out(1.8)',
          stagger: reduceMotion ? 0 : 0.05,
        },
        '<0.12',
      )
      .fromTo(
        '.share-card-animate',
        { autoAlpha: 0, y: 16 },
        {
          autoAlpha: 1,
          y: 0,
          duration: reduceMotion ? 0.01 : 0.34,
          stagger: reduceMotion ? 0 : 0.045,
        },
        '<0.04',
      )
  }, {
    scope: rootRef,
    dependencies: [
      shareCardMode,
      shareCardSide,
      guardianBreedIds.join('|'),
      favoriteBreedIds.join('|'),
      language,
    ],
  })

  const exportNode = async (
    node: HTMLElement,
    filename: string,
    kind: 'single' | 'double',
  ) => {
    if (!hasCardData) return
    setGenerating(true)
    setGeneratingKind(kind)
    const reduceMotion = prefersReducedMotion()
    try {
      await gsap.to(node, {
        scale: reduceMotion ? 1 : 1.012,
        filter: 'brightness(1.035) saturate(1.06)',
        duration: reduceMotion ? 0.01 : 0.16,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out',
      })
      const dataUrl = await toPng(node, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: '#fff7f3',
      })
      const link = document.createElement('a')
      link.download = filename
      link.href = dataUrl
      link.click()
    } finally {
      gsap.set(node, { clearProps: 'scale,filter' })
      setGenerating(false)
      setGeneratingKind(null)
    }
  }

  const downloadCurrentSide = async () => {
    if (!cardFaceRef.current) return
    await exportNode(cardFaceRef.current, `cat-planet-${shareCardSide}.png`, 'single')
  }

  const downloadBothSides = async () => {
    if (!duoExportRef.current) return
    await exportNode(duoExportRef.current, 'cat-planet-card-front-back.png', 'double')
  }

  return (
    <div ref={rootRef} className="passport-panel" data-animate-item>
      <div className="passport-mode-switch">
        <button
          type="button"
          className={shareCardMode === 'guardian' ? 'active' : ''}
          onClick={() => onSetShareCardMode('guardian')}
        >
          {copy[language].shareCardModeGuardian}
        </button>
        <button
          type="button"
          className={shareCardMode === 'favorites' ? 'active' : ''}
          onClick={() => onSetShareCardMode('favorites')}
        >
          {copy[language].shareCardModeFavorites}
        </button>
      </div>
      <div className="passport-card">
        <span>{copy[language].passportTitle}</span>
        <h3>{copy[language].shareCardTitle}</h3>
        <p className="passport-purpose">{copy[language].shareCardPurpose}</p>
        {!hasCardData ? (
          <p className="passport-empty">{copy[language].passportEmpty}</p>
        ) : (
          <>
            <div className="share-card-side-switch">
              <button
                type="button"
                className={shareCardSide === 'front' ? 'active' : ''}
                onClick={() => onSetShareCardSide('front')}
              >
                {copy[language].shareCardFront}
              </button>
              <button
                type="button"
                className={shareCardSide === 'back' ? 'active' : ''}
                onClick={() => onSetShareCardSide('back')}
              >
                {copy[language].shareCardBack}
              </button>
            </div>
            <ShareCardFace
              ref={cardFaceRef}
              side={shareCardSide}
              language={language}
              title={cardTitle}
              keyword={cardKeyword}
              dateLabel={dateLabel}
              coordinateLabel={coordinateLabel}
              guardianZodiac={guardianZodiac}
              mainBreed={mainGuardian}
              displayedBreeds={displayedBreeds}
              shareLines={shareLines}
            />
            <div ref={duoExportRef} className="share-card-duo-export" aria-hidden="true">
              <ShareCardFace
                side="front"
                language={language}
                title={cardTitle}
                keyword={cardKeyword}
                dateLabel={dateLabel}
                coordinateLabel={coordinateLabel}
                guardianZodiac={guardianZodiac}
                mainBreed={mainGuardian}
                displayedBreeds={displayedBreeds}
                shareLines={shareLines}
              />
              <ShareCardFace
                side="back"
                language={language}
                title={cardTitle}
                keyword={cardKeyword}
                dateLabel={dateLabel}
                coordinateLabel={coordinateLabel}
                guardianZodiac={guardianZodiac}
                mainBreed={mainGuardian}
                displayedBreeds={displayedBreeds}
                shareLines={shareLines}
              />
            </div>
            {mainGuardian && (
              <div className="passport-cta-row">
                <button type="button" onClick={() => onSelectBreed(mainGuardian)}>
                  <BookOpen size={14} />
                  {copy[language].viewStory}
                </button>
                <button
                  type="button"
                  disabled={compareFull}
                  onClick={() => onToggleCompare(mainGuardian.id)}
                >
                  <GitCompare size={14} />
                  {compareSelected ? copy[language].compareRemove : copy[language].compareAdd}
                </button>
                <button type="button" onClick={() => onSelectExperience('constellation')}>
                  <Star size={14} />
                  {copy[language].testFriend}
                </button>
              </div>
            )}
          </>
        )}
      </div>
      {favoriteBreeds.length > 0 && (
        <div className="passport-saved-list">
          <h3>{copy[language].savedCoordinates}</h3>
          {favoriteBreeds.map((breed) => {
              const compareSelected = compareBreedIds.includes(breed.id)
              const compareFull = compareBreedIds.length >= 3 && !compareSelected
              return (
                <article key={breed.id} className="passport-breed">
                  <button type="button" onClick={() => onSelectBreed(breed)}>
                    <img src={breed.photo.markerSrc ?? breed.photo.src} alt="" style={photoStyleFor(breed)} />
                    <span>
                      {breed.localized[language].name}
                      <small>{breed.lat.toFixed(1)}, {breed.lon.toFixed(1)} · {getLocalizedTraits(breed, language).slice(0, 2).join(' / ')}</small>
                    </span>
                  </button>
                  <button
                    type="button"
                    disabled={compareFull}
                    className="passport-compare"
                    onClick={() => onToggleCompare(breed.id)}
                  >
                    {compareSelected ? copy[language].compareRemove : copy[language].compareAdd}
                  </button>
                </article>
              )
          })}
        </div>
      )}
      <button
        type="button"
        className="passport-download"
        disabled={!hasCardData || generating}
        onClick={downloadCurrentSide}
      >
        <Download size={16} />
        {generating && generatingKind === 'single'
          ? copy[language].generatingCard
          : copy[language].downloadCurrentCard}
      </button>
      <button
        type="button"
        className="passport-download secondary"
        disabled={!hasCardData || generating}
        onClick={downloadBothSides}
      >
        <Share2 size={16} />
        {generating && generatingKind === 'double'
          ? copy[language].generatingCard
          : copy[language].downloadBothCards}
      </button>
    </div>
  )
}

const ShareCardFace = ({
  ref,
  side,
  language,
  title,
  keyword,
  dateLabel,
  coordinateLabel,
  guardianZodiac,
  mainBreed,
  displayedBreeds,
  shareLines,
}: {
  ref?: Ref<HTMLDivElement>
  side: ShareCardSide
  language: Language
  title: string
  keyword: string
  dateLabel: string
  coordinateLabel: string
  guardianZodiac: ZodiacProfile | null
  mainBreed: BreedOrigin | null
  displayedBreeds: BreedOrigin[]
  shareLines: string[]
}) => {
  const mainName = mainBreed?.localized[language].name ?? copy[language].passportTitle
  const mainEnglishName = mainBreed?.ticaName ?? 'Cat Planet'
  const photoSrc = mainBreed?.photo.src ?? mainBreed?.photo.markerSrc
  const photoStyle = mainBreed ? photoStyleFor(mainBreed) : undefined
  const zodiacLabel = guardianZodiac
    ? `${guardianZodiac.symbol} ${guardianZodiac.name[language]}`
    : copy[language].shareCardFavorites

  return (
    <div
      ref={ref}
      className={`share-card-face share-card-${side}`}
      data-card-side={side}
    >
      <div className="share-card-paper-grain" aria-hidden="true" />
      <div className="share-card-postmark" aria-hidden="true">
        <Sparkles size={14} />
        <span>{copy[language].shareCardStamp}</span>
      </div>
      <header className="share-card-editorial-head share-card-animate">
        <span className="share-card-kicker">{title}</span>
        <strong>CAT PLANET</strong>
        <em>{language === 'zh' ? '猫咪星球' : 'Guardian Cat Atlas'}</em>
      </header>
      <div className="share-card-rule" aria-hidden="true" />

      {side === 'front' ? (
        <>
          <section className="share-card-front-meta share-card-animate">
            <span>{copy[language].birthDate}</span>
            <b>{dateLabel}</b>
            <span>{copy[language].guardianResult}</span>
            <b>{mainName}</b>
          </section>
          <section className="share-card-front-title share-card-animate">
            <small>{zodiacLabel}</small>
            <h4>{mainName}</h4>
            <p>{keyword}</p>
          </section>
          <div className="share-card-photo-mask share-card-front-photo">
            {photoSrc && (
              <img
                src={photoSrc}
                alt=""
                className="share-card-photo"
                style={photoStyle}
              />
            )}
          </div>
          <footer className="share-card-editorial-foot share-card-animate">
            <span>{copy[language].shareCardCoords}</span>
            <b>{coordinateLabel}</b>
            <span>{mainEnglishName}</span>
          </footer>
        </>
      ) : (
        <>
          <section className="share-card-back-grid">
            <div className="share-card-photo-mask share-card-back-photo">
              {photoSrc && (
                <img
                  src={photoSrc}
                  alt=""
                  className="share-card-photo"
                  style={photoStyle}
                />
              )}
            </div>
            <div className="share-card-back-copy share-card-animate">
              <small>{copy[language].guardianLanding}</small>
              <h4>{mainName}</h4>
              <p>{keyword}</p>
              <dl>
                <div>
                  <dt>{copy[language].shareCardCoords}</dt>
                  <dd>{coordinateLabel}</dd>
                </div>
                <div>
                  <dt>{copy[language].birthDate}</dt>
                  <dd>{dateLabel}</dd>
                </div>
              </dl>
            </div>
          </section>
          <ul className="share-card-copy share-card-animate">
            {shareLines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <section className="share-card-mini-cats share-card-animate" aria-label={copy[language].shareCardStamps}>
            {displayedBreeds.map((breed) => (
              <span key={breed.id}>
                <img src={breed.photo.markerSrc ?? breed.photo.src} alt="" style={photoStyleFor(breed)} />
                <b>{breed.localized[language].name}</b>
              </span>
            ))}
          </section>
          <footer className="share-card-editorial-foot share-card-animate">
            <span>{copy[language].shareCardStamps}</span>
            <b>{displayedBreeds.length}</b>
            <span>Cat Planet Passport</span>
          </footer>
        </>
      )}
    </div>
  )
}
