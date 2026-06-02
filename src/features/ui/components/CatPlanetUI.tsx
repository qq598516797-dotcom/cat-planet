import { useEffect, useMemo, useRef, useState, type Ref } from 'react'
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'
import { Draggable } from 'gsap/Draggable'
import { useGSAP } from '@gsap/react'
import {
  CalendarDays,
  BookOpen,
  Cat,
  ChevronRight,
  Compass,
  ExternalLink,
  Eye,
  EyeOff,
  Filter,
  GitCompare,
  Globe2,
  Heart,
  Info,
  Image,
  LibraryBig,
  Languages,
  MapPin,
  PlayCircle,
  Route,
  RotateCcw,
  Search,
  Brush,
  Gamepad2,
  Soup,
  Sparkles,
  Star,
  X,
} from 'lucide-react'
import {
  breeds,
  breedsForPersonalityZone,
  getBreedById,
  getBreedSearchHint,
  getVisibleBreeds,
  passportRegionForBreed,
  personalityZoneIdsForBreed,
  personalityZones,
  regions,
  ticaBreedSource,
  type AtlasKindFilter,
  type BreedOrigin,
  type PersonalityZoneId,
  type Region,
} from '../../breeds/data/breeds'
import { regionTargets } from '../../planet/data/regionTargets'
import {
  useCatPlanetStore,
  homeDecorCatalog,
  homeLevelTitles,
  homeXpTargetForLevel,
  type ActiveExperience,
  type CoatFilter,
  type GuardianBirthday,
  type HomeAction,
  type HomeDailyWish,
  type HomeDecorId,
  type HomeDiaryEntry,
  type HomeInteractionMode,
  type HomeMood,
  type HomeWishCompletionSource,
  type HomeStatsState,
  type Language,
} from '../../planet/store/useCatPlanetStore'

gsap.registerPlugin(Flip, Draggable, useGSAP)

const copy = {
  zh: {
    hide: '????',
    show: '????',
    reset: '??????',
    eyebrow: '3D ????',
    title: '????',
    source: '??????',
    search: '?????????????????',
    regions: '??????',
    list: '????',
    emptyTitle: '?????????????',
    emptyBody: '????????????????????????????????????????????',
    dataNote: '???????????????????????????????',
    aliases: '????',
    origin: '???',
    status: '????',
    coordinate: '????',
    countries: '??/??',
    story: '????',
    externalStories: '?????',
    facts: '????',
    traits: '?????',
    care: '??',
    size: '??',
    lifespan: '??',
    colors: '?????',
    sources: '????',
    photoCredit: '??',
    ticaProfile: '????',
    ticaAll: 'TICA ????',
    high: '??/????',
    medium: '??????',
    low: '??????',
    atlas: '??',
    route: '??',
    quiz: '????',
    compare: '??',
    constellation: '??',
    personalityMap: '????',
    passport: '????',
    dailyCat: '????',
    todayLand: '????',
    dailyPrompt: '?????????????',
    landHere: '?????',
    favorite: '??',
    favorited: '???',
    compareAdd: '????',
    compareRemove: '????',
    compareLimit: '???? 3 ??',
    openRoute: '????',
    radar: '????',
    careGuide: '????',
    routeCard: '??????',
    journeyIntro: '??????????????????????',
    routeOrigin: '??????',
    routeDevelopment: '????????',
    routeToday: '?????????',
    constellationTitle: '?????',
    constellationIntro: '?????????????????????????????',
    guardianPrompt: '??????',
    guardianResult: '?????',
    guardianBackup: '?????',
    guardianWhy: '???????',
    guardianPersonality: '????',
    guardianOrigin: '????',
    guardianCare: '????',
    guardianSources: '????',
    guardianArticle: '????',
    guardianVideo: '????',
    storySector: '????',
    passportTitle: '????',
    passportEmpty: '??????????????????????',
    savedCoordinates: '????????',
    passportIntro: '?????????????????????????????',
    passportProgress: '????',
    passportStamps: '????',
    passportStickers: '????',
    passportNoStamps: '???????????',
    passportNoStickers: '????????????????????',
    exploredCount: '???',
    stampCount: '??',
    stickerCount: '??',
    shareCardTitle: '??????',
    shareCardGuardian: '?????',
    shareCardFavorites: '????',
    shareCardModeGuardian: '?????',
    shareCardModeFavorites: '????',
    shareCardFront: '??',
    shareCardBack: '??',
    shareCardPurpose: '???????????????????????????',
    shareCardStamp: '????',
    shareCardCoords: '????',
    shareCardStamps: '????',
    downloadCurrentCard: '?????',
    downloadBothCards: '?????',
    viewStory: '?????',
    testFriend: '??????',
    generatingCard: '???...',
    birthDate: '??',
    guardianLanding: '?????',
    cardLineOne: '????????????????',
    cardLineTwo: '???????????????????',
    cardLineThree: '?????????????????',
    soundOn: '????',
    soundOff: '????',
    downloadPassport: '?????',
    noRoute: '??????????????????????????',
    quizTitle: '??????????',
    quizSubtitle: '??????????? 1-2 ?????????',
    quizProgress: '???',
    quizResults: '????',
    quizBack: '???',
    quizNext: '???',
    quizFinish: '????',
    quizRestart: '????',
    quizReason: '????',
    compareEmpty: '????????????????? 2-3 ???',
    clearCompare: '????',
    storyEntry: '????',
    personalityMapTitle: '??????',
    personalityMapIntro: '??????????????????????????????',
    personalityMapEmpty: '????????????????',
    companionTitle: '????',
    companionChoose: '??????',
    companionCollapse: '??',
    companionExpand: '????',
    companionIdle: '???????????????????',
    companionHappy: '?????????????',
    companionCurious: '???????????????',
    companionSleepy: '???????????????',
    catHomeTitle: '????',
    catHomeIntro: '??????????????????????????????????',
    catHomePick: '?????',
    homeHunger: '??',
    homeClean: '??',
    homeEnergy: '??',
    homeMoodStat: '??',
    homeAffection: '??',
    homeFeed: '??',
    homeGroom: '??',
    homeCleanAction: '??',
    homePlay: '??',
    homeRest: '??',
    homeActionFeed: '??????????????',
    homeActionGroom: '??????????????',
    homeActionClean: '???????????????',
    homeActionPlay: '?????????????????',
    homeActionRest: '???????????????????',
    homeNoCat: '??????????????????????',
    homeDailyWish: '????',
    homeWishDone: '???????',
    homeWishReward: '??',
    homeGoNow: '???',
    homeLevel: '????',
    homeStardust: '??',
    homeDecor: '????',
    homeDiary: '????',
    homeEmptyDiary: '??????????????????????',
    homeAwayNote: '?????????????',
    homeWishCareFeed: '????????',
    homeWishCareGroom: '?????????',
    homeWishCareClean: '??????????',
    homeWishCarePlay: '?????????',
    homeWishCareRest: '??????????',
    homeWishExplore: '?????????????',
    homeWishPersonality: '?????????????',
    homeWishStory: '????????',
    homeWishFavorite: '?????????',
    homeWishCompare: '????????????',
    compareDropTitle: '?????????',
    compareDropHint: '???????????????????????',
    compareDropFull: '?????? 3 ???',
  },
  en: {
    hide: 'Hide interface',
    show: 'Show interface',
    reset: 'Reset to global view',
    eyebrow: '3D Cat Planet',
    title: 'Cat Planet',
    source: 'Open sources',
    search: 'Search cat, breed, coat pattern, alias, origin, or trait',
    regions: 'Quick region picker',
    list: 'Cat atlas',
    emptyTitle: 'Care for your home cat, then explore the planet',
    emptyBody: 'Start with Cat Home feeding and grooming, or search Ragdoll, Maine Coon, Chinese Domestic Cat, Calico, or Orange Tabby.',
    dataNote: 'Coordinates are for atlas display, not exact birthplaces. Coat patterns do not have one fixed origin.',
    aliases: 'Common aliases',
    origin: 'Origin',
    status: 'Registry status',
    coordinate: 'Coordinate basis',
    countries: 'Countries',
    story: 'Verified story',
    externalStories: 'Stories & videos',
    facts: 'Atlas facts',
    traits: 'Traits',
    care: 'Care',
    size: 'Size',
    lifespan: 'Lifespan',
    colors: 'Visual keywords',
    sources: 'Sources',
    photoCredit: 'Photo',
    ticaProfile: 'Breed profile',
    ticaAll: 'TICA all breeds',
    high: 'Country/region centroid',
    medium: 'Historical-region centroid',
    low: 'Broad area centroid',
    atlas: 'Atlas',
    route: 'Journey',
    quiz: 'Match Quiz',
    compare: 'Compare',
    constellation: 'Constellation',
    personalityMap: 'Personality Map',
    passport: 'Cat Home',
    dailyCat: 'Daily Cat',
    todayLand: 'Today we land on',
    dailyPrompt: 'Today we land on this cat coordinate',
    landHere: 'Land here',
    favorite: 'Favorite',
    favorited: 'Saved',
    compareAdd: 'Compare',
    compareRemove: 'Remove',
    compareLimit: 'Compare up to 3 cats',
    openRoute: 'Open journey',
    radar: 'Personality radar',
    careGuide: 'Care notes',
    routeCard: 'Breed origin journey',
    journeyIntro: 'Read where this cat started, how it spread, and why people remember it today.',
    routeOrigin: 'Start: origin',
    routeDevelopment: 'Development: breeding and spread',
    routeToday: 'Today: family image',
    constellationTitle: 'Guardian cat constellation',
    constellationIntro: 'Choose a birthday to reveal your guardian cat and read why it fits.',
    guardianPrompt: 'Choose your birthday',
    guardianResult: 'Your guardian cat',
    guardianBackup: 'Backup guardian',
    guardianWhy: 'Why this cat fits you',
    guardianPersonality: 'Personality fit',
    guardianOrigin: 'Origin mood',
    guardianCare: 'Companion notes',
    guardianSources: 'Keep reading',
    guardianArticle: 'Breed article',
    guardianVideo: 'Video doorway',
    storySector: 'Constellation reading',
    passportTitle: 'Cat Home',
    passportEmpty: 'Choose a home cat first, then feed, groom, clean, or play with it.',
    savedCoordinates: 'Saved planet coordinates',
    passportIntro: 'Stamps and stickers are removed here. This is now a light interactive cat home.',
    passportProgress: 'Home status',
    passportStamps: 'Home status',
    passportStickers: 'Home cats',
    passportNoStamps: 'Choose a cat for Cat Home first.',
    passportNoStickers: 'Pick a cat from the atlas, guardian result, or personality map.',
    exploredCount: 'Explored',
    stampCount: 'Clean',
    stickerCount: 'Bond',
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
    soundOn: 'Home feedback',
    soundOff: 'Home feedback',
    downloadPassport: 'Download share image',
    noRoute: 'This entry does not have a dedicated origin journey yet. Read its detail and sources first.',
    quizTitle: 'Find a cat that fits me',
    quizSubtitle: 'Answer one card at a time. The result recommends 1-2 fitting cats.',
    quizProgress: 'Answered',
    quizResults: 'Recommended cats',
    quizBack: 'Back',
    quizNext: 'Next',
    quizFinish: 'See matches',
    quizRestart: 'Restart',
    quizReason: 'Why it fits',
    compareEmpty: 'Add 2-3 cats from details, personality cards, or planet avatars first.',
    clearCompare: 'Clear compare',
    storyEntry: 'Story entry',
    personalityMapTitle: 'Cat Personality Map',
    personalityMapIntro: 'Cats are grouped by personality radar zones so their lifestyle fit is easier to understand.',
    personalityMapEmpty: 'Not enough representative cats in this zone yet.',
    companionTitle: 'Cloud Cat Cabin',
    companionChoose: 'Set home cat',
    companionCollapse: 'Collapse',
    companionExpand: 'Open cabin',
    companionIdle: 'Open Cat Home to feed, groom, or play first.',
    companionHappy: 'It was just cared for and feels better.',
    companionCurious: 'It wants to meet a new friend on the planet.',
    companionSleepy: 'The cabin is quiet and it is resting by the window.',
    catHomeTitle: 'Cat Home',
    catHomeIntro: 'Your home cat gives one small wish that leads you back to the planet: explore, save, compare, and read stories.',
    catHomePick: 'Choose home cat',
    homeHunger: 'Fullness',
    homeClean: 'Clean',
    homeEnergy: 'Energy',
    homeMoodStat: 'Mood',
    homeAffection: 'Bond',
    homeFeed: 'Feed',
    homeGroom: 'Groom',
    homeCleanAction: 'Clean',
    homePlay: 'Play',
    homeRest: 'Rest',
    homeActionFeed: 'The cat is full and settles into a softer mood.',
    homeActionGroom: 'Its coat is brushed smooth and it closes its eyes.',
    homeActionClean: 'The home feels clean and lighter now.',
    homeActionPlay: 'It chased the toy and bonded with you.',
    homeActionRest: 'It napped near the window and woke up facing the planet.',
    homeNoCat: 'Choose a cat from the atlas, guardian result, or personality map first.',
    homeDailyWish: 'Daily wish',
    homeWishDone: 'Daily wish complete',
    homeWishReward: 'Reward',
    homeGoNow: 'Go now',
    homeLevel: 'Companion level',
    homeStardust: 'Stardust',
    homeDecor: 'Cabin decor',
    homeDiary: 'Cabin diary',
    homeEmptyDiary: 'After completing a wish, your small diary with the cat appears here.',
    homeAwayNote: 'I slept for a long while and happened to be waiting for you.',
    homeWishCareFeed: 'I want a small dried fish snack.',
    homeWishCareGroom: 'I want my fur brushed smooth.',
    homeWishCareClean: 'I want the cabin to feel bright again.',
    homeWishCarePlay: 'I want to chase a toy once.',
    homeWishCareRest: 'I want a short nap by the window.',
    homeWishExplore: 'I want to visit a cat from another region.',
    homeWishPersonality: 'I want to meet a friend with a matching personality.',
    homeWishStory: 'I want to watch one story star.',
    homeWishFavorite: 'I want to organize the photo wall.',
    homeWishCompare: 'I want to find a similar friend to compare.',
    compareDropTitle: 'Drag a cat here to compare',
    compareDropHint: 'Drag from the left list, personality cards, or planet avatars.',
    compareDropFull: 'You can compare up to 3 cats.',
  },
} satisfies Record<Language, Record<string, string>>

Object.assign(copy.zh, {
  hide: '隐藏界面',
  show: '显示界面',
  reset: '回到全球视角',
  eyebrow: '3D 猫咪星球',
  title: '猫咪星球',
  source: '查看资料来源',
  search: '搜索猫咪、品种、花色、简称或原产地',
  regions: '地区快速选择',
  list: '猫咪图鉴',
  emptyTitle: '先照顾小家猫咪，再探索星球',
  emptyBody: '可以先进入猫咪小家投喂、梳毛、陪玩，也可以搜索美短、英短、布偶、中华田园猫、三花、橘猫。',
  dataNote: '坐标用于图鉴展示，不代表精确出生地点。花色猫不绑定单一原产地。',
  aliases: '常用叫法',
  origin: '原产地',
  status: '登记状态',
  coordinate: '坐标说明',
  countries: '国家/地区',
  story: '可查故事',
  externalStories: '故事与视频',
  facts: '图鉴信息',
  traits: '性格与特征',
  care: '护理',
  size: '体型',
  lifespan: '寿命',
  colors: '外观关键词',
  sources: '资料来源',
  photoCredit: '图片',
  ticaProfile: '品种资料',
  ticaAll: 'TICA 品种列表',
  high: '国家/地区质心',
  medium: '历史地区质心',
  low: '粗略区域质心',
  atlas: '图鉴',
  route: '旅程',
  quiz: '选猫测试',
  compare: '对比',
  constellation: '星座',
  personalityMap: '性格星图',
  passport: '猫咪小家',
  dailyCat: '每日猫咪',
  todayLand: '今日降落',
  dailyPrompt: '今天从这只猫的星球坐标出发',
  landHere: '定位到星球',
  favorite: '收藏',
  favorited: '已收藏',
  compareAdd: '加入对比',
  compareRemove: '移出对比',
  compareLimit: '最多对比 3 只猫',
  openRoute: '查看旅程',
  radar: '性格雷达',
  careGuide: '照顾提醒',
  routeCard: '品种起源旅程',
  journeyIntro: '用时间线读懂它从哪里来，以及为什么被人记住。',
  routeOrigin: '起点：原产地',
  routeDevelopment: '发展：培育与传播',
  routeToday: '今天：家庭中的形象',
  constellationTitle: '守护猫星座',
  constellationIntro: '选择生日日期，找到你的守护猫，并查看性格、起源和相处提示。',
  guardianPrompt: '选择你的生日',
  guardianResult: '你的守护猫',
  guardianBackup: '备选守护猫',
  guardianWhy: '为什么它适合你',
  guardianPersonality: '性格契合',
  guardianOrigin: '起源气质',
  guardianCare: '相处提示',
  guardianSources: '继续了解',
  guardianArticle: '品种文章',
  guardianVideo: '视频入口',
  storySector: '星座解析',
  passportTitle: '猫咪小家',
  passportEmpty: '先选择一只猫入住，再投喂、梳毛、打扫或陪玩。',
  savedCoordinates: '已收藏的星球坐标',
  passportIntro: '这里不再展示印章和贴纸，而是照顾一只会提出愿望的小家猫咪。',
  passportProgress: '小家状态',
  passportStamps: '小家状态',
  passportStickers: '小家猫咪',
  passportNoStamps: '先选择一只猫入住小家。',
  passportNoStickers: '可以从图鉴、守护猫或性格星图选择入住猫。',
  exploredCount: '已探索',
  stampCount: '整洁',
  stickerCount: '亲密',
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
  soundOn: '小家反馈',
  soundOff: '小家反馈',
  downloadPassport: '下载分享图',
  noRoute: '这个条目暂时还没有专属起源旅程，可以先看详情和来源。',
  quizTitle: '帮我找一只适合我的猫',
  quizSubtitle: '一题一题回答，最后推荐 1-2 个更适合你的猫咪。',
  quizProgress: '已回答',
  quizResults: '推荐结果',
  quizBack: '上一题',
  quizNext: '下一题',
  quizFinish: '查看推荐',
  quizRestart: '重新测试',
  quizReason: '匹配理由',
  compareEmpty: '先从详情页、性格星图或地球头像加入 2-3 只猫。',
  clearCompare: '清空对比',
  storyEntry: '故事入口',
  personalityMapTitle: '猫咪性格星图',
  personalityMapIntro: '把猫咪按性格雷达聚成星区，更直观看出它们适合怎样的生活节奏。',
  personalityMapEmpty: '这个星区暂时还没有足够代表猫咪。',
  companionTitle: '云养猫舱',
  companionChoose: '设为小家猫咪',
  companionCollapse: '收起',
  companionExpand: '打开猫舱',
  companionIdle: '点我进入猫咪小家，先投喂、梳毛或陪玩。',
  companionHappy: '刚刚被照顾过，心情变好了。',
  companionCurious: '它想去星球上认识新的猫咪朋友。',
  companionSleepy: '小家安静下来，它正在窗边休息。',
  catHomeTitle: '猫咪小家',
  catHomeIntro: '入住猫每天会提出一个小愿望，引导你去探索星球、收藏、对比或阅读故事。',
  catHomePick: '选择入住猫',
  homeHunger: '饱腹',
  homeClean: '清洁',
  homeEnergy: '精力',
  homeMoodStat: '心情',
  homeAffection: '亲密',
  homeFeed: '投喂',
  homeGroom: '梳毛',
  homeCleanAction: '打扫',
  homePlay: '陪玩',
  homeRest: '休息',
  homeActionFeed: '它吃饱了，尾巴轻轻晃了一下。',
  homeActionGroom: '毛发被梳顺了，看起来更精神。',
  homeActionClean: '小家被打扫干净，空气都变亮了。',
  homeActionPlay: '它追着玩具扑了一下，心情明显变好。',
  homeActionRest: '它在窗边睡了一会儿，醒来刚好看见星球。',
  homeNoCat: '先从图鉴、守护猫或性格星图里选择一只猫入住。',
  homeDailyWish: '今日愿望',
  homeWishDone: '今日愿望已完成',
  homeWishReward: '奖励',
  homeGoNow: '去完成',
  homeLevel: '陪伴等级',
  homeStardust: '星尘',
  homeDecor: '小家装饰',
  homeDiary: '猫舱日记',
  homeEmptyDiary: '完成一次愿望后，这里会留下你和猫咪的小日记。',
  homeAwayNote: '我睡了很久，刚好等你回来。',
  homeWishCareFeed: '想吃一点小鱼干。',
  homeWishCareGroom: '想把毛毛梳顺一点。',
  homeWishCareClean: '想把小家打扫亮一点。',
  homeWishCarePlay: '想追着玩具扑一下。',
  homeWishCareRest: '想在窗边睡一小会儿。',
  homeWishExplore: '想去看看一个新的地区猫咪。',
  homeWishPersonality: '想认识一只性格相近的朋友。',
  homeWishStory: '想看一颗故事星。',
  homeWishFavorite: '想整理一张照片墙。',
  homeWishCompare: '想找一只相似伙伴来对比。',
  compareDropTitle: '拖一只猫到这里对比',
  compareDropHint: '可以从左侧列表、性格星图卡片或地球头像拖进来。',
  compareDropFull: '对比栏最多放 3 只猫。',
})

const regionLabel: Record<Language, Record<Region, string>> = {
  zh: {
    Global: '??',
    Asia: '??',
    Europe: '??',
    'North America': '???',
    'Middle East': '??',
    'Africa/Oceania': '??/???',
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

Object.assign(regionLabel.zh, {
  Global: '全球',
  Asia: '亚洲',
  Europe: '欧洲',
  'North America': '北美洲',
  'Middle East': '中东',
  'Africa/Oceania': '非洲/大洋洲',
})

const coatLabel: Record<Language, Record<CoatFilter, string>> = {
  zh: {
    all: '??',
    short: '??',
    long: '??',
    hairless: '??',
    rex: '??',
    mixed: '???',
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

Object.assign(coatLabel.zh, {
  all: '全部',
  short: '短毛',
  long: '长毛',
  hairless: '无毛',
  rex: '卷毛',
  mixed: '多毛型',
})

const atlasKindFilterLabel: Record<Language, Record<AtlasKindFilter, string>> = {
  zh: {
    all: '??',
    formalBreed: '????',
    localAndPattern: '?????',
  },
  en: {
    all: 'All',
    formalBreed: 'Formal breeds',
    localAndPattern: 'Local & coat',
  },
}

Object.assign(atlasKindFilterLabel.zh, {
  all: '全部',
  formalBreed: '正式品种',
  localAndPattern: '本土与花色',
})

const atlasKindLabel: Record<Language, Record<BreedOrigin['atlasKind'], string>> = {
  zh: {
    formalBreed: '????',
    localDomestic: '???',
    coatPattern: '????',
  },
  en: {
    formalBreed: 'Formal breed',
    localDomestic: 'Local domestic',
    coatPattern: 'Coat pattern',
  },
}

Object.assign(atlasKindLabel.zh, {
  formalBreed: '正式品种',
  localDomestic: '本土猫',
  coatPattern: '花色类型',
})

const coatFilters: CoatFilter[] = ['all', 'short', 'long', 'hairless', 'rex', 'mixed']
const atlasKindFilters: AtlasKindFilter[] = ['all', 'formalBreed', 'localAndPattern']
const experienceOptions: Array<{ id: ActiveExperience; icon: typeof Globe2 }> = [
  { id: 'atlas', icon: Globe2 },
  { id: 'route', icon: Route },
  { id: 'quiz', icon: Compass },
  { id: 'compare', icon: GitCompare },
  { id: 'constellation', icon: Star },
  { id: 'personalityMap', icon: Sparkles },
  { id: 'passport', icon: LibraryBig },
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
    affectionate: '???',
    active: '???',
    calm: '???',
    grooming: '????',
    beginnerFriendly: '????',
    shedding: '????',
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

Object.assign(radarLabel.zh, {
  affectionate: '亲人度',
  active: '活跃度',
  calm: '安静度',
  grooming: '护理难度',
  beginnerFriendly: '新手友好',
  shedding: '掉毛程度',
})

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
  '.atlas-kind-filter button',
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

function regionCount(region: Region, coatFilter: CoatFilter, atlasKindFilter: AtlasKindFilter) {
  return getVisibleBreeds(region, '', coatFilter, atlasKindFilter).length
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
  const coordinateValue = breed.atlasKind === 'coatPattern'
    ? language === 'zh'
      ? '不限定地理原产地'
      : 'No single geographic origin'
    : t[breed.confidence]
  const countriesValue = breed.atlasKind === 'coatPattern'
    ? language === 'zh'
      ? '可出现在不同地区'
      : 'Can appear in many regions'
    : breed.countries.join(', ')

  return [
    [t.origin, breed.originLabel],
    [t.coordinate, coordinateValue],
    [t.size, breed.detailFacts.size],
    [t.lifespan, breed.detailFacts.lifespan],
    [t.care, breed.detailFacts.care],
    [t.countries, countriesValue],
  ] as const
}

const photoStyleFor = (breed: BreedOrigin) => ({
  objectFit: breed.photo.fit ?? 'cover',
  objectPosition: breed.photo.objectPosition ?? '50% 38%',
})

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
  const atlasKindFilter = useCatPlanetStore((state) => state.atlasKindFilter)
  const setAtlasKindFilter = useCatPlanetStore((state) => state.setAtlasKindFilter)
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
  const guardianBirthday = useCatPlanetStore((state) => state.guardianBirthday)
  const guardianZodiacId = useCatPlanetStore((state) => state.guardianZodiacId)
  const guardianBreedIds = useCatPlanetStore((state) => state.guardianBreedIds)
  const exploredBreedIds = useCatPlanetStore((state) => state.exploredBreedIds)
  const companionBreedId = useCatPlanetStore((state) => state.companionBreedId)
  const companionCollapsed = useCatPlanetStore((state) => state.companionCollapsed)
  const homeCatBreedId = useCatPlanetStore((state) => state.homeCatBreedId)
  const homeMood = useCatPlanetStore((state) => state.homeMood)
  const homeStats = useCatPlanetStore((state) => state.homeStats)
  const homeLevel = useCatPlanetStore((state) => state.homeLevel)
  const homeXp = useCatPlanetStore((state) => state.homeXp)
  const homeStardust = useCatPlanetStore((state) => state.homeStardust)
  const homeDailyWish = useCatPlanetStore((state) => state.homeDailyWish)
  const homeDiaryEntries = useCatPlanetStore((state) => state.homeDiaryEntries)
  const homeUnlockedDecorIds = useCatPlanetStore((state) => state.homeUnlockedDecorIds)
  const homeEquippedDecorIds = useCatPlanetStore((state) => state.homeEquippedDecorIds)
  const homeInteractionMode = useCatPlanetStore((state) => state.homeInteractionMode)
  const homeLastAction = useCatPlanetStore((state) => state.homeLastAction)
  const compareDropHintSeen = useCatPlanetStore((state) => state.compareDropHintSeen)
  const toggleFavoriteBreed = useCatPlanetStore((state) => state.toggleFavoriteBreed)
  const toggleCompareBreed = useCatPlanetStore((state) => state.toggleCompareBreed)
  const clearCompare = useCatPlanetStore((state) => state.clearCompare)
  const setGuardianMatch = useCatPlanetStore((state) => state.setGuardianMatch)
  const recordBreedExploration = useCatPlanetStore((state) => state.recordBreedExploration)
  const setCompanionBreed = useCatPlanetStore((state) => state.setCompanionBreed)
  const setCompanionCollapsed = useCatPlanetStore((state) => state.setCompanionCollapsed)
  const setHomeCatBreed = useCatPlanetStore((state) => state.setHomeCatBreed)
  const clearHomeCatBreed = useCatPlanetStore((state) => state.clearHomeCatBreed)
  const performHomeAction = useCatPlanetStore((state) => state.performHomeAction)
  const checkInHome = useCatPlanetStore((state) => state.checkInHome)
  const completeDailyWish = useCatPlanetStore((state) => state.completeDailyWish)
  const equipHomeDecor = useCatPlanetStore((state) => state.equipHomeDecor)
  const setCompareDropHintSeen = useCatPlanetStore((state) => state.setCompareDropHintSeen)
  const t = copy[language]

  const selectedBreed = getBreedById(selectedBreedId)
  const hoveredBreed = getBreedById(hoveredBreedId)
  const tooltipBreed = hoveredBreed ?? selectedBreed
  const visibleBreeds = getVisibleBreeds(activeRegion, searchQuery, coatFilter, atlasKindFilter)
  const dailyBreed = getBreedById(dailyBreedId)
  const companionBreed = getBreedById(companionBreedId)
  const homeCatBreed = getBreedById(homeCatBreedId)

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
    atlasKindFilter,
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
    if (!detailItems || detailItems.length === 0) return

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
    if (activeExperience === 'passport') {
      checkInHome()
    }
  }, [activeExperience, checkInHome])

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
    atlasKindFilter,
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
  }

  const handleAtlasKindFilterSelect = (filter: AtlasKindFilter) => {
    setAtlasKindFilter(filter)
    if (filter === 'localAndPattern') {
      setActiveRegion('Global')
      flyTo(regionTargets.Global)
    }
  }

  const handleBreedSelect = (breed: BreedOrigin) => {
    setActiveExperience('atlas')
    recordBreedExploration(breed.id, passportRegionForBreed(breed))
    completeDailyWish({
      kind: 'explore',
      breedId: breed.id,
      region: breed.region,
      personalityZoneIds: personalityZoneIdsForBreed(breed),
    })
    if (breed.atlasKind === 'coatPattern') {
      setActiveRegion('Global')
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
  }

  const handleSetGuardianMatch = (
    birthday: GuardianBirthday,
    zodiacId: string,
    breedIds: string[],
  ) => {
    setGuardianMatch(birthday, zodiacId, breedIds)
    const primaryBreedId = breedIds[0] ?? null
    if (primaryBreedId) {
      const breed = getBreedById(primaryBreedId)
      if (breed) recordBreedExploration(breed.id, passportRegionForBreed(breed))
      setCompanionBreed(primaryBreedId)
    }
  }

  const handleExperienceSelect = (experience: ActiveExperience) => {
    setActiveExperience(experience)
  }

  const handleRouteStopSelect = (breed: BreedOrigin, lat: number, lon: number, label: string) => {
    setActiveExperience('atlas')
    setActiveRegion(breed.region)
    flyTo({ ...regionTargets[breed.region], label, lat, lon, distance: 2.58 }, breed.id)
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
        <div
          ref={workspaceRef}
          className="workspace-shell"
          data-experience={activeExperience}
          data-has-selection={Boolean(selectedBreed)}
          aria-label="Cat planet controls"
        >
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
              favoriteCount={favoriteBreedIds.length || exploredBreedIds.length}
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

            <div className="atlas-kind-filter" aria-label="Cat atlas type filter">
              {atlasKindFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className={filter === atlasKindFilter ? 'active' : ''}
                  data-atlas-kind={filter}
                  onClick={() => handleAtlasKindFilterSelect(filter)}
                >
                  {atlasKindFilterLabel[language][filter]}
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
                  <strong>{regionCount(region, coatFilter, atlasKindFilter)}</strong>
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

          <section className="detail-panel" aria-live="polite" hidden={activeExperience !== 'atlas'}>
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
                onOpenStory={(breedId) => completeDailyWish({ kind: 'story', breedId })}
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

          {activeExperience !== 'atlas' && (
            <ExperiencePanel
              activeExperience={activeExperience}
              language={language}
              selectedBreed={selectedBreed}
              compareBreedIds={compareBreedIds}
              favoriteBreedIds={favoriteBreedIds}
              guardianBirthday={guardianBirthday}
              guardianZodiacId={guardianZodiacId}
              guardianBreedIds={guardianBreedIds}
              exploredBreedIds={exploredBreedIds}
              dailyBreedId={dailyBreedId}
              companionBreedId={companionBreedId}
              homeCatBreedId={homeCatBreedId}
              homeMood={homeMood}
              homeStats={homeStats}
              homeLevel={homeLevel}
              homeXp={homeXp}
              homeStardust={homeStardust}
              homeDailyWish={homeDailyWish}
              homeDiaryEntries={homeDiaryEntries}
              homeUnlockedDecorIds={homeUnlockedDecorIds}
              homeEquippedDecorIds={homeEquippedDecorIds}
              homeInteractionMode={homeInteractionMode}
              homeLastAction={homeLastAction}
              compareDropHintSeen={compareDropHintSeen}
              onSelectExperience={handleExperienceSelect}
              onSelectBreed={handleBreedSelect}
              onRouteStop={handleRouteStopSelect}
              onClearCompare={clearCompare}
              onToggleCompare={toggleCompareBreed}
              onToggleFavorite={toggleFavoriteBreed}
              onSetGuardianMatch={handleSetGuardianMatch}
              onSetHomeCatBreed={setHomeCatBreed}
              onClearHomeCatBreed={clearHomeCatBreed}
              onPerformHomeAction={performHomeAction}
              onCompleteDailyWish={completeDailyWish}
              onEquipHomeDecor={equipHomeDecor}
              onSetCompareDropHintSeen={setCompareDropHintSeen}
            />
          )}

          {activeExperience === 'atlas' && (
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
                    {regionLabel[language][region]} {regionCount(region, coatFilter, atlasKindFilter)}
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {activeExperience === 'atlas' && tooltipBreed && tooltipPosition.visible && (
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

      {uiVisible && (
        <CompanionCabin
          activeExperience={activeExperience}
          language={language}
          breed={homeCatBreed ?? companionBreed ?? selectedBreed ?? dailyBreed ?? null}
          mood={homeMood}
          collapsed={companionCollapsed}
          exploredCount={exploredBreedIds.length}
          onCollapseChange={setCompanionCollapsed}
          onOpenPassport={() => handleExperienceSelect('passport')}
        />
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
  const originText = breed.atlasKind === 'coatPattern'
    ? language === 'zh'
      ? `${breed.ticaName} · 不限定地理原产地`
      : `${breed.ticaName} · No single geographic origin`
    : `${breed.ticaName} · ${breed.originLabel}`

  return (
    <button
      type="button"
      className={selected ? 'active' : ''}
      data-breed-id={breed.id}
      data-drag-breed-id={breed.id}
      data-active={selected}
      onClick={() => onSelect(breed)}
    >
      <span className="drag-grip breed-drag-grip" aria-hidden="true">
        {language === 'zh' ? '拖' : 'drag'}
      </span>
      <CatAvatar tone={catToneFor(breed.id)} />
      <span>
        <strong>{breed.localized[language].name}</strong>
        <small>
          <span className={`atlas-kind-badge ${breed.atlasKind}`}>
            {atlasKindLabel[language][breed.atlasKind]}
          </span>
          {originText}
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
        <img
          src={breed.photo.markerSrc ?? breed.photo.src}
          alt=""
          style={photoStyleFor(breed)}
          onError={(event) => {
            event.currentTarget.style.display = 'none'
          }}
        />
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
  onOpenStory,
}: {
  breed: BreedOrigin
  language: Language
  favorite: boolean
  compareSelected: boolean
  compareFull: boolean
  onToggleFavorite: (id: string) => void
  onToggleCompare: (id: string) => void
  onOpenRoute: () => void
  onOpenStory: (breedId: string) => void
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
  const detailPhotoSrc = breed.photo.markerSrc ?? breed.photo.src
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
          src={detailPhotoSrc}
          alt={photoAlt}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.hidden = true
          }}
          style={{
            objectFit: breed.photo.fit ?? 'cover',
            objectPosition:
              breed.photo.markerObjectPosition
              ?? breed.photo.objectPosition
              ?? '50% 38%',
          }}
        />
        <CatAvatar tone={catToneFor(breed.id)} className="detail-photo-fallback" />
        <div className="detail-photo-badge">
          <Image size={14} />
          <span>{breed.photo.license}</span>
        </div>
      </div>

      <div className="detail-kicker">
        {breed.atlasKind === 'coatPattern'
          ? atlasKindLabel[language][breed.atlasKind]
          : regionLabel[language][breed.region]}
      </div>
      <div className="detail-hero">
        <CatAvatar tone={catToneFor(breed.id)} className="detail-cat" />
        <div>
          <h2>{localized.name}</h2>
          <p className="zh-name">{breed.ticaName}</p>
        </div>
      </div>

      <p className="summary">{localized.summary}</p>
      <div className={`classification-note ${breed.atlasKind}`}>
        <span>{atlasKindLabel[language][breed.atlasKind]}</span>
        <p>{language === 'zh' ? breed.classificationNoteZh : breed.classificationNoteEn}</p>
      </div>

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
        <a href={story.sourceUrl} target="_blank" rel="noreferrer" onClick={() => onOpenStory(breed.id)}>
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
              onClick={() => onOpenStory(breed.id)}
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
  guardianBirthday,
  guardianZodiacId,
  guardianBreedIds,
  exploredBreedIds,
  dailyBreedId,
  companionBreedId,
  homeCatBreedId,
  homeMood,
  homeStats,
  homeLevel,
  homeXp,
  homeStardust,
  homeDailyWish,
  homeDiaryEntries,
  homeUnlockedDecorIds,
  homeEquippedDecorIds,
  homeInteractionMode,
  homeLastAction,
  compareDropHintSeen,
  onSelectExperience,
  onSelectBreed,
  onRouteStop,
  onClearCompare,
  onToggleCompare,
  onToggleFavorite,
  onSetGuardianMatch,
  onSetHomeCatBreed,
  onClearHomeCatBreed,
  onPerformHomeAction,
  onCompleteDailyWish,
  onEquipHomeDecor,
  onSetCompareDropHintSeen,
}: {
  activeExperience: ActiveExperience
  language: Language
  selectedBreed: BreedOrigin | null
  compareBreedIds: string[]
  favoriteBreedIds: string[]
  guardianBirthday: GuardianBirthday | null
  guardianZodiacId: string | null
  guardianBreedIds: string[]
  exploredBreedIds: string[]
  dailyBreedId: string | null
  companionBreedId: string | null
  homeCatBreedId: string | null
  homeMood: HomeMood
  homeStats: HomeStatsState
  homeLevel: number
  homeXp: number
  homeStardust: number
  homeDailyWish: HomeDailyWish
  homeDiaryEntries: HomeDiaryEntry[]
  homeUnlockedDecorIds: HomeDecorId[]
  homeEquippedDecorIds: HomeDecorId[]
  homeInteractionMode: HomeInteractionMode
  homeLastAction: HomeAction | null
  compareDropHintSeen: boolean
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
  onSetHomeCatBreed: (id: string | null) => void
  onClearHomeCatBreed: () => void
  onPerformHomeAction: (action: HomeAction) => void
  onCompleteDailyWish: (source: {
    kind: 'care' | 'explore' | 'story' | 'favorite' | 'compare'
    action?: HomeAction
    region?: Region
    personalityZoneIds?: PersonalityZoneId[]
    breedId?: string
  }) => void
  onEquipHomeDecor: (decorId: HomeDecorId) => void
  onSetCompareDropHintSeen: (seen: boolean) => void
}) {
  const panelRef = useRef<HTMLDivElement | null>(null)
  const t = copy[language]

  useGSAP(() => {
    if (!panelRef.current) return
    const reduceMotion = prefersReducedMotion()
    gsap.fromTo(
      panelRef.current,
      { autoAlpha: 0, filter: 'blur(8px)', scale: 0.985 },
      {
        autoAlpha: 1,
        filter: 'blur(0px)',
        scale: 1,
        duration: reduceMotion ? 0.01 : 0.34,
        ease: 'power3.out',
      },
    )
    const items = panelRef.current.querySelectorAll('[data-animate-item]')
    if (items.length > 0) {
      gsap.fromTo(
        items,
        { autoAlpha: 0, y: 12 },
        {
          autoAlpha: 1,
          y: 0,
          duration: reduceMotion ? 0.01 : 0.26,
          ease: 'power2.out',
          stagger: reduceMotion ? 0 : 0.035,
        },
      )
    }
  }, { scope: panelRef, dependencies: [activeExperience, language] })

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
                    : activeExperience === 'personalityMap'
                      ? t.personalityMapTitle
                      : t.catHomeTitle}
          </h2>
        </div>
        <div className="experience-panel-actions">
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
          compareDropHintSeen={compareDropHintSeen}
          onSelectBreed={onSelectBreed}
          onClearCompare={onClearCompare}
          onToggleCompare={onToggleCompare}
          onSetCompareDropHintSeen={onSetCompareDropHintSeen}
        />
      )}
      {activeExperience === 'personalityMap' && (
        <PersonalityMapExperience
          language={language}
          compareBreedIds={compareBreedIds}
          homeCatBreedId={homeCatBreedId}
          onSelectBreed={onSelectBreed}
          onToggleCompare={onToggleCompare}
          onSetHomeCatBreed={onSetHomeCatBreed}
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
        <CatHomeExperience
          language={language}
          exploredBreedIds={exploredBreedIds}
          favoriteBreedIds={favoriteBreedIds}
          guardianBreedIds={guardianBreedIds}
          dailyBreedId={dailyBreedId}
          companionBreedId={companionBreedId}
          homeCatBreedId={homeCatBreedId}
          homeMood={homeMood}
          homeStats={homeStats}
          homeLevel={homeLevel}
          homeXp={homeXp}
          homeStardust={homeStardust}
          homeDailyWish={homeDailyWish}
          homeDiaryEntries={homeDiaryEntries}
          homeUnlockedDecorIds={homeUnlockedDecorIds}
          homeEquippedDecorIds={homeEquippedDecorIds}
          homeInteractionMode={homeInteractionMode}
          homeLastAction={homeLastAction}
          compareBreedIds={compareBreedIds}
          onSelectBreed={onSelectBreed}
          onToggleCompare={onToggleCompare}
          onSetHomeCatBreed={onSetHomeCatBreed}
          onClearHomeCatBreed={onClearHomeCatBreed}
          onPerformHomeAction={onPerformHomeAction}
          onCompleteDailyWish={onCompleteDailyWish}
          onEquipHomeDecor={onEquipHomeDecor}
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
  const routeBreeds = breeds.filter((breed) =>
    breed.atlasKind === 'formalBreed' && breed.explorationRoute)
  const breed = selectedBreed?.atlasKind === 'formalBreed' && selectedBreed.explorationRoute
    ? selectedBreed
    : routeBreeds[0]
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
      .filter((breed) => breed.atlasKind !== 'coatPattern')
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
  compareDropHintSeen,
  onSelectBreed,
  onClearCompare,
  onToggleCompare,
  onSetCompareDropHintSeen,
}: {
  language: Language
  compareBreedIds: string[]
  compareDropHintSeen: boolean
  onSelectBreed: (breed: BreedOrigin) => void
  onClearCompare: () => void
  onToggleCompare: (id: string) => void
  onSetCompareDropHintSeen: (seen: boolean) => void
}) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const dropRef = useRef<HTMLDivElement | null>(null)
  const compareBreeds = compareBreedIds
    .map((id) => getBreedById(id))
    .filter((breed): breed is BreedOrigin => Boolean(breed))
  const dragSourceBreeds = useMemo(() => {
    const selected = compareBreeds[0]
    const pool = [
      selected,
      ...breeds.filter((breed) => breed.atlasKind !== 'coatPattern'),
    ].filter((breed): breed is BreedOrigin => Boolean(breed))
    return [...new Map(pool.map((breed) => [breed.id, breed])).values()].slice(0, 8)
  }, [compareBreeds])
  const dropCopy = compareBreedIds.length >= 3 ? copy[language].compareDropFull : copy[language].compareDropHint

  useGSAP((_, contextSafe) => {
    const root = rootRef.current
    const dropZone = dropRef.current
    if (!root || !dropZone) return

    const reduceMotion = prefersReducedMotion()
    let dragGhost: HTMLElement | null = null
    const showDropFeedback = (contextSafe ?? ((fn: (accepted: boolean) => void) => fn))((accepted: boolean) => {
      gsap.fromTo(
        dropZone,
        {
          scale: accepted ? 0.98 : 1,
          x: 0,
          filter: accepted
            ? 'brightness(1.08) saturate(1.14)'
            : 'brightness(1) saturate(1)',
        },
        {
          scale: 1,
          x: accepted ? 0 : 8,
          filter: 'brightness(1) saturate(1)',
          duration: reduceMotion ? 0.01 : 0.26,
          ease: accepted ? 'back.out(1.7)' : 'power2.out',
          yoyo: !accepted,
          repeat: accepted || reduceMotion ? 0 : 3,
        },
      )
    })

    const dragTargets = [
      ...Array.from(document.querySelectorAll<HTMLElement>('.screen-marker-button.is-single[data-drag-breed-id], .screen-marker-item[data-drag-breed-id]')),
      ...Array.from(root.querySelectorAll<HTMLElement>('[data-compare-drag-source="true"]')),
    ].filter((target) => Boolean(target.dataset.dragBreedId))

    const pointerInDropZone = (event?: MouseEvent | PointerEvent | TouchEvent) => {
      const rect = dropZone.getBoundingClientRect()
      const point = (() => {
        if (event && 'changedTouches' in event && event.changedTouches.length > 0) {
          return event.changedTouches[0]
        }
        if (event && 'clientX' in event) return event
        return null
      })()
      if (!point) return false
      return point.clientX >= rect.left
        && point.clientX <= rect.right
        && point.clientY >= rect.top
        && point.clientY <= rect.bottom
    }

    const addBreedFromDrop = (breedId: string) => {
      if (compareBreedIds.includes(breedId)) {
        showDropFeedback(true)
        return
      }
      if (compareBreedIds.length >= 3) {
        showDropFeedback(false)
        return
      }
      const state = Flip.getState(root.querySelectorAll('.compare-card'))
      onToggleCompare(breedId)
      onSetCompareDropHintSeen(true)
      showDropFeedback(true)
      window.requestAnimationFrame(() => {
        Flip.from(state, {
          duration: reduceMotion ? 0.01 : 0.38,
          ease: 'power3.out',
          absolute: true,
          simple: true,
          stagger: reduceMotion ? 0 : 0.035,
        })
      })
    }

    const cleanupFns: Array<() => void> = []
    dragTargets.forEach((target) => {
      let dragging = false
      let startX = 0
      let startY = 0
      let dropHovered = false
      const breedId = target.dataset.dragBreedId
      const breed = breedId ? getBreedById(breedId) : null

      const removeGhost = () => {
        if (!dragGhost) return
        gsap.to(dragGhost, {
          autoAlpha: 0,
          scale: 0.86,
          duration: reduceMotion ? 0.01 : 0.18,
          ease: 'power2.out',
          onComplete: () => {
            dragGhost?.remove()
            dragGhost = null
          },
        })
      }

      const beginDrag = (event: PointerEvent) => {
        if (!breedId) return
        target.dataset.compareDragSuppressClick = ''
        startX = event.clientX
        startY = event.clientY
        dragging = false
        target.setPointerCapture?.(event.pointerId)
        window.addEventListener('pointermove', moveDrag)
        window.addEventListener('pointerup', endDrag)
        window.addEventListener('pointercancel', endDrag)
      }

      const moveDrag = (event: PointerEvent) => {
        if (!breedId) return
        const distance = Math.hypot(event.clientX - startX, event.clientY - startY)
        if (!dragging && distance < 8) return
        event.preventDefault()
        if (!dragging) {
          dragging = true
          target.classList.add('is-dragging-cat')
          dragGhost = document.createElement('div')
          dragGhost.className = 'compare-drag-ghost'
          dragGhost.innerHTML = breed?.photo.markerSrc || breed?.photo.src
            ? `<img src="${breed.photo.markerSrc ?? breed.photo.src}" alt="" /><span>${breed.localized[language].name}</span>`
            : `<span>${breed?.localized[language].name ?? ''}</span>`
          document.body.appendChild(dragGhost)
          gsap.set(dragGhost, { x: event.clientX + 14, y: event.clientY + 14, autoAlpha: 0, scale: 0.86 })
          gsap.to(dragGhost, { autoAlpha: 1, scale: 1, duration: reduceMotion ? 0.01 : 0.16, ease: 'power2.out' })
          gsap.to(target, {
            scale: 1.05,
            filter: 'brightness(1.08) saturate(1.1) drop-shadow(0 18px 28px rgba(74, 45, 54, 0.24))',
            duration: reduceMotion ? 0.01 : 0.18,
            ease: 'power2.out',
            overwrite: 'auto',
          })
          gsap.to(dropZone, {
            scale: 1.02,
            filter: 'brightness(1.05) saturate(1.08)',
            duration: reduceMotion ? 0.01 : 0.18,
            ease: 'power2.out',
            overwrite: 'auto',
          })
        }
        if (dragGhost) gsap.set(dragGhost, { x: event.clientX + 14, y: event.clientY + 14 })
        dropHovered = pointerInDropZone(event)
        dropZone.classList.toggle('is-hovered', dropHovered)
      }

      const endDrag = (event: PointerEvent) => {
        if (!breedId) return
        window.removeEventListener('pointermove', moveDrag)
        window.removeEventListener('pointerup', endDrag)
        window.removeEventListener('pointercancel', endDrag)
        target.releasePointerCapture?.(event.pointerId)
        target.classList.remove('is-dragging-cat')
        dropZone.classList.remove('is-hovered')
        gsap.to(target, {
          scale: 1,
          filter: '',
          duration: reduceMotion ? 0.01 : 0.2,
          ease: 'power3.out',
          clearProps: 'transform,filter',
        })
        gsap.to(dropZone, {
          scale: 1,
          filter: 'brightness(1) saturate(1)',
          duration: reduceMotion ? 0.01 : 0.18,
          ease: 'power2.out',
          overwrite: 'auto',
        })
        removeGhost()
        if (!dragging) return
        dragging = false
        target.dataset.compareDragSuppressClick = 'true'
        const acceptedDrop = dropHovered
          || (dragGhost ? Draggable.hitTest(dragGhost, dropZone, '35%') : false)
          || pointerInDropZone(event)
        dropHovered = false
        if (!acceptedDrop) {
          showDropFeedback(false)
          return
        }
        addBreedFromDrop(breedId)
      }

      const suppressDragClick = (event: MouseEvent) => {
        if (target.dataset.compareDragSuppressClick !== 'true') return
        event.preventDefault()
        event.stopPropagation()
        target.dataset.compareDragSuppressClick = ''
      }

      target.addEventListener('pointerdown', beginDrag)
      target.addEventListener('click', suppressDragClick, true)
      cleanupFns.push(() => {
        target.removeEventListener('pointerdown', beginDrag)
        target.removeEventListener('click', suppressDragClick, true)
        window.removeEventListener('pointermove', moveDrag)
        window.removeEventListener('pointerup', endDrag)
        window.removeEventListener('pointercancel', endDrag)
      })
    })

    if (!compareDropHintSeen && !reduceMotion) {
      const demo = root.querySelector('.compare-demo-avatar')
      gsap.timeline({ delay: 0.24, defaults: { ease: 'power3.out' } })
        .fromTo(demo, { autoAlpha: 0, x: -44, y: -14, scale: 0.8 }, { autoAlpha: 1, x: 0, y: 0, scale: 1, duration: 0.34 })
        .to(demo, { x: 78, y: 18, scale: 0.92, duration: 0.72, ease: 'power2.inOut' })
        .to(dropZone, { scale: 1.03, duration: 0.18 }, '<0.46')
        .to(demo, { autoAlpha: 0, scale: 0.72, duration: 0.22 })
        .to(dropZone, { scale: 1, duration: 0.22 }, '<')
      onSetCompareDropHintSeen(true)
    }

    return () => {
      cleanupFns.forEach((cleanup) => cleanup())
      dragGhost?.remove()
    }
  }, { scope: rootRef, dependencies: [compareBreedIds.join('|'), compareDropHintSeen, language, dragSourceBreeds.map((breed) => breed.id).join('|')], revertOnUpdate: true })

  return (
    <div ref={rootRef} className="compare-panel" data-animate-item>
      <div ref={dropRef} className="compare-drop-zone">
        <span className="compare-demo-avatar">
          <Cat size={18} />
        </span>
        <GitCompare size={18} />
        <strong>{copy[language].compareDropTitle}</strong>
        <p>{dropCopy}</p>
        <small>{compareBreedIds.length}/3</small>
      </div>

      <div className="compare-toolbar">
        <p className="experience-empty">{copy[language].compareEmpty}</p>
        {compareBreeds.length > 0 && (
          <button type="button" className="clear-compare" onClick={onClearCompare}>
            {copy[language].clearCompare}
          </button>
        )}
      </div>

      <section className="compare-source-strip" aria-label={language === 'zh' ? '可拖拽猫咪' : 'Draggable cats'}>
        <div>
          <strong>{language === 'zh' ? '从这里拖一只猫' : 'Drag a cat from here'}</strong>
          <p>{language === 'zh' ? '也可以拖地球上的单只猫头像。松手到上方对比栏即可加入。' : 'You can also drag a single planet avatar. Drop it on the compare zone above.'}</p>
        </div>
        <div className="compare-source-grid">
          {dragSourceBreeds.map((breed) => (
            <button
              key={breed.id}
              type="button"
              className="compare-source-card"
              data-drag-breed-id={breed.id}
              data-compare-drag-source="true"
              onClick={() => onToggleCompare(breed.id)}
              disabled={compareBreedIds.length >= 3 && !compareBreedIds.includes(breed.id)}
            >
              <span className="drag-grip" aria-hidden="true">{language === 'zh' ? '拖' : 'drag'}</span>
              <img src={breed.photo.markerSrc ?? breed.photo.src} alt="" style={photoStyleFor(breed)} />
              <span>
                <strong>{breed.localized[language].name}</strong>
                <small>{compareBreedIds.includes(breed.id) ? copy[language].compareRemove : copy[language].compareAdd}</small>
              </span>
            </button>
          ))}
        </div>
      </section>

      {compareBreeds.length > 0 && (
        <div className="compare-grid">
          {compareBreeds.map((breed) => (
            <article key={breed.id} className="compare-card">
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
      )}
    </div>
  )
}

function PersonalityMapExperience({
  language,
  compareBreedIds,
  homeCatBreedId,
  onSelectBreed,
  onToggleCompare,
  onSetHomeCatBreed,
}: {
  language: Language
  compareBreedIds: string[]
  homeCatBreedId: string | null
  onSelectBreed: (breed: BreedOrigin) => void
  onToggleCompare: (id: string) => void
  onSetHomeCatBreed: (id: string | null) => void
}) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const catGridRef = useRef<HTMLDivElement | null>(null)
  const [activeZoneId, setActiveZoneId] = useState<PersonalityZoneId>('affectionate')
  const activeZone = personalityZones.find((zone) => zone.id === activeZoneId) ?? personalityZones[0]
  const zoneBreeds = breedsForPersonalityZone(activeZone.id, 8)

  useGSAP(() => {
    if (!rootRef.current) return
    const reduceMotion = prefersReducedMotion()
    const cards = rootRef.current.querySelectorAll('.personality-zone-card, .personality-cat-card')
    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        { autoAlpha: 0, y: 18, scale: 0.96, filter: 'blur(8px)' },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: reduceMotion ? 0.01 : 0.34,
          ease: 'power3.out',
          stagger: reduceMotion ? 0 : { each: 0.035, from: 'start' },
        },
      )
    }
    const sparks = rootRef.current.querySelectorAll('.personality-zone-card.active .zone-spark')
    if (sparks.length > 0) {
      gsap.fromTo(
        sparks,
        { autoAlpha: 0, scale: 0.2, x: 0, y: 0 },
        {
          autoAlpha: 1,
          scale: 1,
          x: (index) => [16, -14, 8][index] ?? 0,
          y: (index) => [-10, 12, 16][index] ?? 0,
          duration: reduceMotion ? 0.01 : 0.42,
          ease: 'back.out(1.8)',
          stagger: reduceMotion ? 0 : 0.045,
        },
      )
    }
  }, { scope: rootRef, dependencies: [activeZoneId, language] })

  const handleZoneSelect = (zoneId: PersonalityZoneId) => {
    if (zoneId === activeZoneId) return
    const state = catGridRef.current
      ? Flip.getState(catGridRef.current.querySelectorAll('.personality-cat-card'))
      : null
    setActiveZoneId(zoneId)
    if (state) {
      window.requestAnimationFrame(() => {
        Flip.from(state, {
          duration: prefersReducedMotion() ? 0.01 : 0.36,
          ease: 'power3.out',
          absolute: true,
          simple: true,
          stagger: prefersReducedMotion() ? 0 : 0.035,
        })
      })
    }
  }

  return (
    <div ref={rootRef} className="personality-map-panel" data-animate-item>
      <p>{copy[language].personalityMapIntro}</p>
      <div className="personality-zone-grid">
        {personalityZones.map((zone) => (
          <button
            key={zone.id}
            type="button"
            className={`personality-zone-card ${zone.id === activeZone.id ? 'active' : ''}`}
            onClick={() => handleZoneSelect(zone.id)}
          >
            <span>{zone.icon}</span>
            <i className="zone-spark spark-a" aria-hidden="true" />
            <i className="zone-spark spark-b" aria-hidden="true" />
            <i className="zone-spark spark-c" aria-hidden="true" />
            <strong>{language === 'zh' ? zone.labelZh : zone.labelEn}</strong>
            <small>{language === 'zh' ? zone.descriptionZh : zone.descriptionEn}</small>
          </button>
        ))}
      </div>
      <section className="personality-zone-detail">
        <div className="personality-zone-heading">
          <span>{activeZone.icon}</span>
          <div>
            <h3>{language === 'zh' ? activeZone.labelZh : activeZone.labelEn}</h3>
            <p>{language === 'zh' ? activeZone.descriptionZh : activeZone.descriptionEn}</p>
          </div>
        </div>
        {zoneBreeds.length === 0 ? (
          <p className="experience-empty">{copy[language].personalityMapEmpty}</p>
        ) : (
          <div ref={catGridRef} className="personality-cat-grid">
            {zoneBreeds.map((breed) => {
              const compareSelected = compareBreedIds.includes(breed.id)
              const compareFull = compareBreedIds.length >= 3 && !compareSelected
              const isHomeCat = homeCatBreedId === breed.id
              const zoneLabels = personalityZoneIdsForBreed(breed)
                .map((id) => personalityZones.find((zone) => zone.id === id))
                .filter((zone): zone is (typeof personalityZones)[number] => Boolean(zone))
                .slice(0, 2)
              return (
                <article
                  key={breed.id}
                  className={`personality-cat-card ${isHomeCat ? 'is-home-cat' : ''}`}
                  data-drag-breed-id={breed.id}
                  data-compare-drag-source="true"
                >
                  <span className="drag-grip personality-drag-grip" aria-hidden="true">
                    {language === 'zh' ? '拖' : 'drag'}
                  </span>
                  <button type="button" className="personality-cat-main" onClick={() => onSelectBreed(breed)}>
                    <img src={breed.photo.markerSrc ?? breed.photo.src} alt="" style={photoStyleFor(breed)} />
                    <span>
                      <strong>{breed.localized[language].name}</strong>
                      <small>{getLocalizedTraits(breed, language).slice(0, 2).join(' / ')}</small>
                    </span>
                  </button>
                  <div className="personality-tags">
                    {zoneLabels.map((zone) => (
                      <span key={zone.id}>{language === 'zh' ? zone.labelZh : zone.labelEn}</span>
                    ))}
                    {isHomeCat && <span>{language === 'zh' ? '小家猫咪' : 'Home cat'}</span>}
                  </div>
                  <div className="personality-card-actions">
                    <button type="button" onClick={() => onSelectBreed(breed)}>{copy[language].landHere}</button>
                    <button
                      type="button"
                      disabled={compareFull}
                      onClick={() => onToggleCompare(breed.id)}
                    >
                      {compareSelected ? copy[language].compareRemove : copy[language].compareAdd}
                    </button>
                    <button type="button" onClick={() => onSetHomeCatBreed(breed.id)}>
                      {copy[language].companionChoose}
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </section>
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
    const dots = rootRef.current.querySelectorAll('.zodiac-badge-spark')
    const cards = rootRef.current.querySelectorAll('.guardian-card, .guardian-reading-card')
    const activeDot = rootRef.current.querySelector('.zodiac-badge-current')
    const orbit = rootRef.current.querySelector('.zodiac-orbit')
    if (!orbit) return
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
    if (dots.length > 0) {
      timeline.fromTo(
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
    }
    if (activeDot) {
      timeline.to(
        activeDot,
        {
          scale: 1.08,
          autoAlpha: 1,
          filter: 'drop-shadow(0 0 16px rgba(255, 111, 159, 0.86))',
          duration: reduceMotion ? 0.01 : 0.28,
          ease: 'back.out(2)',
        },
        '>-0.04',
      )
    }
    if (cards.length > 0) {
      timeline.fromTo(
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
    }
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
            {[0, 1, 2].map((index) => (
              <span key={index} className={`zodiac-badge-spark spark-${index + 1}`} />
            ))}
            <strong className="zodiac-badge-current" aria-hidden="true">
              {zodiac.symbol}
            </strong>
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

function CatHomeExperience({
  language,
  exploredBreedIds,
  favoriteBreedIds,
  guardianBreedIds,
  dailyBreedId,
  companionBreedId,
  homeCatBreedId,
  homeMood,
  homeStats,
  homeLevel,
  homeXp,
  homeStardust,
  homeDailyWish,
  homeDiaryEntries,
  homeUnlockedDecorIds,
  homeEquippedDecorIds,
  homeInteractionMode,
  homeLastAction,
  compareBreedIds,
  onSelectBreed,
  onToggleCompare,
  onSetHomeCatBreed,
  onClearHomeCatBreed,
  onPerformHomeAction,
  onCompleteDailyWish,
  onEquipHomeDecor,
}: {
  language: Language
  exploredBreedIds: string[]
  favoriteBreedIds: string[]
  guardianBreedIds: string[]
  dailyBreedId: string | null
  companionBreedId: string | null
  homeCatBreedId: string | null
  homeMood: HomeMood
  homeStats: HomeStatsState
  homeLevel: number
  homeXp: number
  homeStardust: number
  homeDailyWish: HomeDailyWish
  homeDiaryEntries: HomeDiaryEntry[]
  homeUnlockedDecorIds: HomeDecorId[]
  homeEquippedDecorIds: HomeDecorId[]
  homeInteractionMode: HomeInteractionMode
  homeLastAction: HomeAction | null
  compareBreedIds: string[]
  onSelectBreed: (breed: BreedOrigin) => void
  onToggleCompare: (id: string) => void
  onSetHomeCatBreed: (id: string | null) => void
  onClearHomeCatBreed: () => void
  onPerformHomeAction: (action: HomeAction) => void
  onCompleteDailyWish: (source: HomeWishCompletionSource) => void
  onEquipHomeDecor: (decorId: HomeDecorId) => void
}) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const decorGridRef = useRef<HTMLDivElement | null>(null)
  const actionTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const { contextSafe } = useGSAP({ scope: rootRef })
  const [pickerCollapsed, setPickerCollapsed] = useState(Boolean(homeCatBreedId))
  const homeBreed = getBreedById(homeCatBreedId)
  const suggestedBreed = getBreedById(companionBreedId)
    ?? guardianBreedIds.map((id) => getBreedById(id)).find((breed): breed is BreedOrigin => Boolean(breed))
    ?? exploredBreedIds.map((id) => getBreedById(id)).find((breed): breed is BreedOrigin => Boolean(breed))
    ?? getBreedById(dailyBreedId)
    ?? null
  const activeBreed = homeBreed
  const candidateBreeds = useMemo(() => {
    const personalizedBreeds = [...new Set([...guardianBreedIds, ...favoriteBreedIds, ...exploredBreedIds, dailyBreedId].filter((id): id is string => Boolean(id)))]
      .map((id) => getBreedById(id))
      .filter((breed): breed is BreedOrigin => Boolean(breed))
    const fallbackBreeds = breeds.filter((breed) => breed.atlasKind !== 'coatPattern').slice(0, 6)
    return [...new Map([...personalizedBreeds, ...fallbackBreeds].map((breed) => [breed.id, breed])).values()].slice(0, 6)
  }, [dailyBreedId, exploredBreedIds, favoriteBreedIds, guardianBreedIds])
  const wishTargetBreed = useMemo(() => {
    if (homeDailyWish.type === 'exploreRegion' && homeDailyWish.targetRegion) {
      return breeds.find((breed) => breed.region === homeDailyWish.targetRegion && breed.atlasKind !== 'coatPattern')
        ?? suggestedBreed
    }
    if (homeDailyWish.type === 'findPersonality' && homeDailyWish.targetPersonalityZoneId) {
      return breedsForPersonalityZone(homeDailyWish.targetPersonalityZoneId, 1)[0] ?? suggestedBreed
    }
    if (homeDailyWish.type === 'openStory') {
      return (activeBreed?.externalStories.length ? activeBreed : breeds.find((breed) => breed.externalStories.length > 0))
        ?? suggestedBreed
    }
    if (homeDailyWish.type === 'favoriteBreed' || homeDailyWish.type === 'compareBreed') {
      return activeBreed ?? suggestedBreed ?? getBreedById(dailyBreedId)
    }
    return activeBreed ?? suggestedBreed
  }, [activeBreed, dailyBreedId, homeDailyWish, suggestedBreed])
  const homeActionText = {
    feed: copy[language].homeActionFeed,
    groom: copy[language].homeActionGroom,
    clean: copy[language].homeActionClean,
    play: copy[language].homeActionPlay,
    rest: copy[language].homeActionRest,
  } satisfies Record<HomeAction, string>
  const actionText = homeLastAction ? homeActionText[homeLastAction] : copy[language].catHomeIntro
  const moodLabel: Record<HomeMood, string> = {
    idle: language === 'zh' ? '待机' : 'Idle',
    happy: language === 'zh' ? '开心' : 'Happy',
    hungry: language === 'zh' ? '想吃饭' : 'Hungry',
    clean: language === 'zh' ? '清爽' : 'Fresh',
    playful: language === 'zh' ? '想玩' : 'Playful',
    sleepy: language === 'zh' ? '困了' : 'Sleepy',
  }
  const homeActions: Array<{ id: HomeAction; icon: typeof Cat; label: string }> = [
    { id: 'feed', icon: Soup, label: copy[language].homeFeed },
    { id: 'groom', icon: Brush, label: copy[language].homeGroom },
    { id: 'clean', icon: Sparkles, label: copy[language].homeCleanAction },
    { id: 'play', icon: Gamepad2, label: copy[language].homePlay },
    { id: 'rest', icon: CalendarDays, label: copy[language].homeRest },
  ]
  const careRows = [
    { key: 'fullness', label: copy[language].homeHunger, value: homeStats.fullness },
    { key: 'cleanliness', label: copy[language].homeClean, value: homeStats.cleanliness },
    { key: 'energy', label: copy[language].homeEnergy, value: homeStats.energy },
    { key: 'mood', label: copy[language].homeMoodStat, value: homeStats.mood },
    { key: 'affection', label: copy[language].homeAffection, value: homeStats.affection },
  ]
  const levelTitle = homeLevelTitles[language][Math.max(0, homeLevel - 1)] ?? homeLevelTitles[language][0]
  const xpTarget = homeXpTargetForLevel(homeLevel)
  const equippedDecor = homeDecorCatalog.filter((decor) => homeEquippedDecorIds.includes(decor.id))
  const diaryEntries = homeDiaryEntries.slice(0, 3)
  const wishLabel = homeWishLabel(homeDailyWish, language)
  const wishCtaLabel = homeWishCtaLabel(homeDailyWish, language)
  const pickerOpen = !homeCatBreedId || !pickerCollapsed

  useGSAP(() => {
    if (!rootRef.current) return
    const reduceMotion = prefersReducedMotion()
    const homeCat = rootRef.current.querySelector('.cat-home-pet')
    const roomItems = rootRef.current.querySelectorAll('.cat-home-room-item, .cat-home-room-prop')
    const statusRows = rootRef.current.querySelectorAll('.cat-home-meter')
    const animatedItems = rootRef.current.querySelectorAll('[data-home-animate]')
    if (animatedItems.length > 0) {
      gsap.fromTo(
        animatedItems,
        { autoAlpha: 0, y: 18, scale: 0.98, filter: 'blur(8px)' },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: reduceMotion ? 0.01 : 0.36,
          ease: 'power3.out',
          stagger: reduceMotion ? 0 : 0.045,
        },
      )
    }
    if (homeCat) {
      gsap.fromTo(
        homeCat,
        { y: 10, scale: 0.94, rotate: homeMood === 'playful' ? -5 : 0 },
        {
          y: 0,
          scale: 1,
          rotate: 0,
          duration: reduceMotion ? 0.01 : 0.48,
          ease: homeMood === 'playful' ? 'back.out(2.1)' : 'power3.out',
        },
      )
    }
    if (roomItems.length > 0) {
      gsap.fromTo(
        roomItems,
        { autoAlpha: 0.4, y: 12, scale: 0.9 },
        { autoAlpha: 1, y: 0, scale: 1, duration: reduceMotion ? 0.01 : 0.34, ease: 'back.out(1.7)', stagger: reduceMotion ? 0 : 0.04 },
      )
    }
    if (statusRows.length > 0) {
      gsap.fromTo(
        statusRows,
        { scaleX: 0.96, filter: 'brightness(1.08)' },
        { scaleX: 1, filter: 'brightness(1)', duration: reduceMotion ? 0.01 : 0.24, ease: 'power2.out' },
      )
    }
  }, { scope: rootRef, dependencies: [activeBreed?.id, homeMood, homeLastAction, homeDailyWish.id, language] })

  useGSAP(() => {
    if (!decorGridRef.current) return
    const state = Flip.getState(decorGridRef.current.querySelectorAll('.cat-home-decor-card'))
    window.requestAnimationFrame(() => {
      Flip.from(state, {
        duration: prefersReducedMotion() ? 0.01 : 0.34,
        ease: 'power3.out',
        absolute: false,
        simple: true,
        stagger: prefersReducedMotion() ? 0 : 0.035,
      })
    })
  }, { scope: decorGridRef, dependencies: [homeEquippedDecorIds.join('|'), homeUnlockedDecorIds.join('|')] })

  const handleAction = (action: HomeAction) => {
    contextSafe(() => {
      onPerformHomeAction(action)
      const root = rootRef.current
      if (!root) return
      const target = root.querySelector('.cat-home-pet')
      const effect = root.querySelector('.cat-home-effect[data-action="' + action + '"]')
      const food = root.querySelector('.cat-home-food')
      const brush = root.querySelector('.cat-home-brush')
      const wand = root.querySelector('.cat-home-wand')
      const nap = root.querySelector('.cat-home-nap')
      const reward = root.querySelectorAll('.cat-home-reward-dot')
      const toy = root.querySelector('.cat-home-toy-ball')
      const bowl = root.querySelector('.cat-home-bowl')
      const shine = root.querySelector('.cat-home-shine')
      const room = root.querySelector('.cat-home-room')
      if (!target || !effect) return
      actionTimelineRef.current?.kill()
      const reduceMotion = prefersReducedMotion()
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })
      actionTimelineRef.current = timeline
      gsap.set([food, brush, wand, nap], { autoAlpha: 0 })
      gsap.set(reward, { autoAlpha: 0, scale: 0.4, x: 0, y: 0 })
      if (reduceMotion) {
        timeline.to(target, { scale: 1.03, duration: 0.01 }).to(target, { scale: 1, duration: 0.01 })
        return
      }
      timeline
        .to(room, { filter: action === 'rest' ? 'brightness(0.96) saturate(0.95)' : 'brightness(1.05) saturate(1.08)', duration: 0.18 }, 0)
        .to(target, {
          y: action === 'play' ? -22 : action === 'rest' ? 10 : -8,
          scale: action === 'feed' ? 1.1 : action === 'play' ? 1.08 : 1.04,
          rotate: action === 'groom' ? 2 : action === 'play' ? -6 : action === 'rest' ? 1 : 0,
          duration: 0.24,
        }, 0)
        .fromTo(effect, { autoAlpha: 0, y: 22, scale: 0.56 }, { autoAlpha: 1, y: 0, scale: 1.1, duration: 0.3 }, '<0.03')
      if (action === 'feed' && bowl) {
        timeline.fromTo(food, { autoAlpha: 0, x: -120, y: -78, scale: 0.52, rotate: -26 }, { autoAlpha: 1, x: 18, y: 28, scale: 1.16, rotate: 16, duration: 0.64, ease: 'power2.inOut' }, '<')
          .fromTo(bowl, { scale: 0.82, y: 18 }, { scale: 1.14, y: -2, duration: 0.24 }, '<')
          .to(target, { x: 14, y: -2, scale: 1.12, duration: 0.24 }, '<0.2')
          .to(bowl, { scale: 1, y: 0, duration: 0.24 }, '>')
          .to(food, { autoAlpha: 0, scale: 0.45, duration: 0.24 }, '>-0.04')
      }
      if (action === 'groom') {
        timeline.fromTo(brush, { autoAlpha: 0, x: -128, y: -28, rotate: -16 }, { autoAlpha: 1, x: 104, y: 24, rotate: 14, duration: 0.58, ease: 'power2.inOut' }, '<')
          .to(brush, { x: -70, y: -8, rotate: -12, duration: 0.42, ease: 'power2.inOut' })
          .to(brush, { autoAlpha: 0, y: -28, duration: 0.24 })
      }
      if (action === 'play' && toy) {
        timeline.fromTo(wand, { autoAlpha: 0, x: -118, y: -76, rotate: -28 }, { autoAlpha: 1, x: 78, y: -24, rotate: 22, duration: 0.48, ease: 'power2.inOut' }, '<')
          .to(toy, { x: -72, y: 44, rotate: 300, scale: 1.2, duration: 0.48, ease: 'power2.inOut' }, '<')
          .to(target, { y: -30, x: -10, rotate: -8, scale: 1.1, duration: 0.28, ease: 'back.out(2.4)' }, '<0.16')
          .to(toy, { x: 0, y: 0, rotate: 0, scale: 1, duration: 0.34, ease: 'power3.out' })
          .to(wand, { autoAlpha: 0, x: 90, y: -44, duration: 0.26 }, '<0.1')
      }
      if ((action === 'groom' || action === 'clean') && shine) {
        timeline.fromTo(shine, { autoAlpha: 0, x: -140 }, { autoAlpha: 1, x: 150, duration: 0.58 }, '<')
          .to(shine, { autoAlpha: 0, duration: 0.16 })
      }
      if (action === 'clean') {
        timeline.to(root.querySelectorAll('.cat-home-room-prop, .cat-home-room-item'), { y: -3, scale: 1.04, duration: 0.18, stagger: 0.025 }, '<0.06')
          .to(root.querySelectorAll('.cat-home-room-prop, .cat-home-room-item'), { y: 0, scale: 1, duration: 0.22, stagger: 0.02 })
      }
      if (action === 'rest') {
        timeline.fromTo(nap, { autoAlpha: 0, y: 12, scale: 0.7 }, { autoAlpha: 1, y: -18, scale: 1, duration: 0.46 }, '<')
          .to(nap, { autoAlpha: 0, y: -34, scale: 0.84, duration: 0.36 }, '>')
      }
      timeline
        .fromTo(reward, { autoAlpha: 0, scale: 0.45, x: 0, y: 0 }, {
          autoAlpha: 1,
          scale: 1,
          x: (index) => [-52, 44, 6][index] ?? 0,
          y: (index) => [-46, -34, -62][index] ?? -28,
          duration: 0.42,
          stagger: 0.06,
          ease: 'back.out(1.8)',
        }, '<0.08')
        .to(reward, { autoAlpha: 0, y: -82, duration: 0.38, stagger: 0.04 }, '>-0.02')
        .to(target, { x: 0, y: 0, scale: 1, rotate: 0, duration: 0.38, ease: 'back.out(1.7)' })
        .to(effect, { scale: 1, duration: 0.26 }, '<')
        .to(effect, { autoAlpha: 0, y: -12, duration: 0.28 }, '+=0.08')
        .to(room, { filter: 'brightness(1) saturate(1)', duration: 0.28 }, '<')
    })()
  }

  const handleWishCta = () => {
    if (homeDailyWish.completed) return
    if (homeDailyWish.type === 'careAction' && homeDailyWish.targetAction) {
      handleAction(homeDailyWish.targetAction)
      return
    }
    if (homeDailyWish.type === 'exploreRegion' || homeDailyWish.type === 'findPersonality') {
      if (wishTargetBreed) onSelectBreed(wishTargetBreed)
      return
    }
    if (homeDailyWish.type === 'openStory') {
      const storyUrl = wishTargetBreed?.externalStories[0]?.url ?? wishTargetBreed?.verifiedStory.sourceUrl
      if (storyUrl) {
        window.open(storyUrl, '_blank', 'noopener,noreferrer')
      }
      onCompleteDailyWish({ kind: 'story', breedId: wishTargetBreed?.id })
      return
    }
    if (homeDailyWish.type === 'favoriteBreed') {
      if (wishTargetBreed && !favoriteBreedIds.includes(wishTargetBreed.id)) {
        onSelectBreed(wishTargetBreed)
      }
      onCompleteDailyWish({ kind: 'favorite', breedId: wishTargetBreed?.id })
      return
    }
    if (homeDailyWish.type === 'compareBreed' && wishTargetBreed) {
      onToggleCompare(wishTargetBreed.id)
    }
  }

  const pickerSection = (
    <section className="cat-home-picker" data-home-animate>
      <div className="passport-section-title">
        <h3>{language === 'zh' ? '更换入住猫' : 'Change home cat'}</h3>
        <p>{activeBreed ? (language === 'zh' ? '小家一次只住一只猫。需要更换时，从下面选择新的入住猫。' : 'Only one cat lives here at a time. Pick another cat below to replace it.') : copy[language].passportIntro}</p>
        <button type="button" className="cat-home-picker-toggle" onClick={() => setPickerCollapsed((collapsed) => !collapsed)}>
          {pickerOpen ? (language === 'zh' ? '收起候选' : 'Hide choices') : copy[language].catHomePick}
        </button>
      </div>
      {candidateBreeds.length === 0 ? (
        <p className="passport-empty">{copy[language].homeNoCat}</p>
      ) : pickerOpen ? (
        <div className="cat-home-candidates">
          {candidateBreeds.map((breed) => {
            const selected = breed.id === activeBreed?.id
            const compareSelected = compareBreedIds.includes(breed.id)
            const compareFull = compareBreedIds.length >= 3 && !compareSelected
            return (
              <article
                key={breed.id}
                className={selected ? 'active' : ''}
                data-drag-breed-id={breed.id}
                data-compare-drag-source="true"
              >
                <span className="drag-grip cat-home-drag-grip" aria-hidden="true">
                  {language === 'zh' ? '拖' : 'drag'}
                </span>
                <button type="button" onClick={() => onSetHomeCatBreed(breed.id)}>
                  <img src={breed.photo.markerSrc ?? breed.photo.src} alt="" style={photoStyleFor(breed)} />
                  <span>
                    <strong>{breed.localized[language].name}</strong>
                    <small>{getLocalizedTraits(breed, language).slice(0, 2).join(' / ')}</small>
                  </span>
                </button>
                <div>
                  <button type="button" onClick={() => onSelectBreed(breed)}>{copy[language].landHere}</button>
                  <button type="button" disabled={compareFull} onClick={() => onToggleCompare(breed.id)}>
                    {compareSelected ? copy[language].compareRemove : copy[language].compareAdd}
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      ) : (
        <p className="passport-empty">{language === 'zh' ? '候选列表已收起。当前小家只保留一只入住猫。' : 'Choices are hidden. Cat Home keeps one active home cat.'}</p>
      )}
    </section>
  )

  return (
    <div ref={rootRef} className="cat-home-panel" data-animate-item>
      <section className="cat-home-hero" data-home-animate>
        <div className="cat-home-room" aria-hidden="true">
          <span className="cat-home-wall-art cat-home-room-prop" />
          <span className="cat-home-window cat-home-room-prop" />
          <span className="cat-home-shelf cat-home-room-prop" />
          <span className="cat-home-bowl cat-home-room-prop" />
          <span className="cat-home-toy-ball cat-home-room-prop" />
          <span className="cat-home-shine" />
          {equippedDecor.map((decor) => (
            <span key={decor.id} className={'cat-home-room-item ' + decor.id} />
          ))}
          {equippedDecor.length === 0 && <span className="cat-home-room-item soft-rug" />}
          <span className="cat-home-effect" data-action="feed">{language === 'zh' ? '小鱼干' : 'snack'}</span>
          <span className="cat-home-effect" data-action="groom">{language === 'zh' ? '梳顺啦' : 'brushed'}</span>
          <span className="cat-home-effect" data-action="clean">{language === 'zh' ? '亮起来' : 'clean'}</span>
          <span className="cat-home-effect" data-action="play">{language === 'zh' ? '扑一下' : 'pounce'}</span>
          <span className="cat-home-effect" data-action="rest">{language === 'zh' ? '打个盹' : 'nap'}</span>
          <span className="cat-home-food" aria-hidden="true" />
          <span className="cat-home-brush" aria-hidden="true" />
          <span className="cat-home-wand" aria-hidden="true" />
          <span className="cat-home-nap" aria-hidden="true">Zz</span>
          <span className="cat-home-reward-dot dot-a" aria-hidden="true" />
          <span className="cat-home-reward-dot dot-b" aria-hidden="true" />
          <span className="cat-home-reward-dot dot-c" aria-hidden="true" />
        </div>
        <div className="cat-home-pet">
          {activeBreed?.photo.verifiedBreedPhoto ? (
            <img
              src={activeBreed.photo.src}
              alt=""
              style={{
                objectFit: activeBreed.photo.fit ?? 'cover',
                objectPosition: activeBreed.photo.objectPosition ?? '50% 38%',
              }}
            />
          ) : (
            <Cat size={44} />
          )}
        </div>
        <div className="cat-home-copy">
          <span>{copy[language].catHomeTitle}</span>
          <h3>{activeBreed ? activeBreed.localized[language].name : copy[language].homeNoCat}</h3>
          <p>{actionText}</p>
          <div className="cat-home-mood-row">
            <em>{moodLabel[homeMood]}</em>
            {activeBreed && (
              <button type="button" className="cat-home-remove" onClick={onClearHomeCatBreed}>
                {language === 'zh' ? '移出小家' : 'Remove home cat'}
              </button>
            )}
            {homeDiaryEntries.some((entry) => entry.textZh === copy.zh.homeAwayNote || entry.textEn === copy.en.homeAwayNote) && (
              <small>{copy[language].homeAwayNote}</small>
            )}
          </div>
        </div>
      </section>

      <section className="cat-home-actions" data-home-animate>
        {homeActions.map((action) => {
          const Icon = action.icon
          return (
            <button
              key={action.id}
              type="button"
              disabled={!activeBreed}
              className={homeInteractionMode === actionModeFor(action.id) ? 'active' : ''}
              onClick={() => handleAction(action.id)}
            >
              <span><Icon size={16} /></span>
              {action.label}
            </button>
          )
        })}
      </section>

      <section className="cat-home-dashboard" data-home-animate>
        <article className="cat-home-level-card">
          <span>{copy[language].homeLevel}</span>
          <strong>Lv.{homeLevel} {levelTitle}</strong>
          <meter min="0" max={xpTarget} value={homeXp} />
          <small>{homeXp}/{xpTarget} XP · {copy[language].homeStardust} {homeStardust}</small>
        </article>
        <article className={'cat-home-wish-card ' + (homeDailyWish.completed ? 'complete' : '')}>
          <span>{homeDailyWish.completed ? copy[language].homeWishDone : copy[language].homeDailyWish}</span>
          <strong>{wishLabel}</strong>
          <p>
            {copy[language].homeWishReward}: +{homeDailyWish.reward.xp} XP · +{homeDailyWish.reward.affection} {copy[language].homeAffection} · +{homeDailyWish.reward.stardust} {copy[language].homeStardust}
          </p>
          <button type="button" disabled={homeDailyWish.completed} onClick={handleWishCta}>
            <Sparkles size={15} />
            {homeDailyWish.completed ? copy[language].homeWishDone : wishCtaLabel}
          </button>
        </article>
      </section>

      <section className="cat-home-status" data-home-animate>
        {careRows.map((row) => (
          <div key={row.key} className="cat-home-meter">
            <span>{row.label}</span>
            <meter min="0" max="100" value={row.value} />
            <strong>{row.value}</strong>
          </div>
        ))}
      </section>

      {pickerSection}

      <section className="cat-home-decor" data-home-animate>
        <div className="passport-section-title">
          <h3>{copy[language].homeDecor}</h3>
          <p>{language === 'zh' ? '装饰会改变小家的动作表现和愿望倾向，不只是摆设。' : 'Decor changes actions and wish tendencies, not just the look.'}</p>
        </div>
        <div ref={decorGridRef} className="cat-home-decor-grid">
          {homeDecorCatalog.map((decor) => {
            const unlocked = homeUnlockedDecorIds.includes(decor.id)
            const equipped = homeEquippedDecorIds.includes(decor.id)
            return (
              <button
                key={decor.id}
                type="button"
                className={'cat-home-decor-card ' + (equipped ? 'equipped' : '')}
                disabled={!unlocked}
                onClick={() => onEquipHomeDecor(decor.id)}
              >
                <span className={'decor-symbol ' + decor.id} />
                <strong>{language === 'zh' ? decor.labelZh : decor.labelEn}</strong>
                <small>{unlocked ? (language === 'zh' ? decor.descriptionZh : decor.descriptionEn) : 'Lv.' + decor.unlockLevel}</small>
              </button>
            )
          })}
        </div>
      </section>

      <section className="cat-home-diary" data-home-animate>
        <div className="passport-section-title">
          <h3>{copy[language].homeDiary}</h3>
          <p>{language === 'zh' ? '探索、愿望和照顾会变成猫舱回忆。' : 'Exploration, wishes, and care become cabin memories.'}</p>
        </div>
        {diaryEntries.length === 0 ? (
          <p className="passport-empty">{copy[language].homeEmptyDiary}</p>
        ) : (
          <div className="cat-home-diary-list">
            {diaryEntries.map((entry) => (
              <article key={entry.id}>
                <span>{new Date(entry.createdAt).toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-US')}</span>
                <p>{language === 'zh' ? entry.textZh : entry.textEn}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

const actionModeFor = (action: HomeAction): HomeInteractionMode => {
  if (action === 'feed') return 'feeding'
  if (action === 'groom') return 'grooming'
  if (action === 'clean') return 'cleaning'
  if (action === 'play') return 'playing'
  return 'resting'
}

const homeWishLabel = (wish: HomeDailyWish, language: Language) => {
  if (wish.type === 'careAction') {
    if (wish.targetAction === 'feed') return copy[language].homeWishCareFeed
    if (wish.targetAction === 'groom') return copy[language].homeWishCareGroom
    if (wish.targetAction === 'clean') return copy[language].homeWishCareClean
    if (wish.targetAction === 'play') return copy[language].homeWishCarePlay
    return copy[language].homeWishCareRest
  }
  if (wish.type === 'exploreRegion') {
    const region = wish.targetRegion ? regionLabel[language][wish.targetRegion] : ''
    return `${copy[language].homeWishExplore}${region ? ` ${region}` : ''}`
  }
  if (wish.type === 'findPersonality') {
    const zone = wish.targetPersonalityZoneId
      ? personalityZones.find((item) => item.id === wish.targetPersonalityZoneId)
      : null
    const label = zone ? (language === 'zh' ? zone.labelZh : zone.labelEn) : ''
    return `${copy[language].homeWishPersonality}${label ? ` ${label}` : ''}`
  }
  if (wish.type === 'openStory') return copy[language].homeWishStory
  if (wish.type === 'favoriteBreed') return copy[language].homeWishFavorite
  return copy[language].homeWishCompare
}

const homeWishCtaLabel = (wish: HomeDailyWish, language: Language) => {
  if (wish.type === 'careAction' && wish.targetAction) {
    const actionLabel: Record<HomeAction, string> = {
      feed: copy[language].homeFeed,
      groom: copy[language].homeGroom,
      clean: copy[language].homeCleanAction,
      play: copy[language].homePlay,
      rest: copy[language].homeRest,
    }
    return actionLabel[wish.targetAction]
  }
  return copy[language].homeGoNow
}

function CompanionCabin({
  activeExperience,
  language,
  breed,
  mood,
  collapsed,
  exploredCount,
  onCollapseChange,
  onOpenPassport,
}: {
  activeExperience: ActiveExperience
  language: Language
  breed: BreedOrigin | null
  mood: HomeMood
  collapsed: boolean
  exploredCount: number
  onCollapseChange: (collapsed: boolean) => void
  onOpenPassport: () => void
}) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const t = copy[language]
  const moodLine = {
    idle: t.companionIdle,
    happy: t.companionHappy,
    hungry: language === 'zh' ? '它有点饿了，去小家投喂一下。' : 'It is a bit hungry. Open Cat Home and feed it.',
    clean: language === 'zh' ? '小家刚整理好，看起来很清爽。' : 'The room feels clean and fresh.',
    playful: t.companionCurious,
    sleepy: t.companionSleepy,
  } satisfies Record<HomeMood, string>
  const companionName = breed?.localized[language].name ?? t.companionTitle

  useGSAP(() => {
    if (!rootRef.current) return
    const reduceMotion = prefersReducedMotion()
    const face = rootRef.current.querySelector('.companion-face')
    const bubble = rootRef.current.querySelector('.companion-bubble')
    gsap.fromTo(
      rootRef.current,
      { autoAlpha: 0, y: 20, scale: 0.96 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: reduceMotion ? 0.01 : 0.34,
        ease: 'back.out(1.5)',
      },
    )
    if (face) {
      gsap.to(face, {
        y: mood === 'sleepy' ? 2 : -3,
        rotation: mood === 'playful' ? 3 : mood === 'happy' ? -3 : 0,
        duration: reduceMotion ? 0.01 : 1.8,
        ease: 'sine.inOut',
        repeat: reduceMotion ? 0 : -1,
        yoyo: true,
      })
    }
    if (bubble) {
      gsap.fromTo(
        bubble,
        { autoAlpha: 0, y: 8, scale: 0.96 },
        {
          autoAlpha: collapsed ? 0 : 1,
          y: 0,
          scale: 1,
          duration: reduceMotion ? 0.01 : 0.26,
          ease: 'power2.out',
        },
      )
    }
  }, { scope: rootRef, dependencies: [breed?.id, mood, collapsed, language] })

  if (collapsed) {
    return (
      <button
        ref={rootRef as Ref<HTMLButtonElement>}
        type="button"
        className="companion-cabin collapsed"
        data-experience={activeExperience}
        onClick={() => onCollapseChange(false)}
        title={t.companionExpand}
      >
        <Cat size={18} />
        <span>{exploredCount}</span>
      </button>
    )
  }

  return (
    <aside
      ref={rootRef}
      className={`companion-cabin mood-${mood}`}
      data-experience={activeExperience}
      aria-label={t.companionTitle}
    >
      <button
        type="button"
        className="companion-collapse"
        onClick={() => onCollapseChange(true)}
        title={t.companionCollapse}
      >
        <X size={14} />
      </button>
      <button type="button" className="companion-main" onClick={onOpenPassport}>
        <span className="companion-face">
          {breed?.photo.verifiedBreedPhoto ? (
            <img src={breed.photo.markerSrc ?? breed.photo.src} alt="" style={photoStyleFor(breed)} />
          ) : (
            <Cat size={24} />
          )}
        </span>
        <span className="companion-copy">
          <small>{t.companionTitle}</small>
          <strong>{companionName}</strong>
        </span>
      </button>
      <p className="companion-bubble">{moodLine[mood]}</p>
    </aside>
  )
}
