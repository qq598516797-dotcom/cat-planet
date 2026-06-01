import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import {
  BookOpen,
  Cat,
  ChevronRight,
  ExternalLink,
  Eye,
  EyeOff,
  Filter,
  Globe2,
  Image,
  Info,
  Languages,
  MapPin,
  PlayCircle,
  RotateCcw,
  Search,
  Sparkles,
} from 'lucide-react'
import {
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
  type CoatFilter,
  type Language,
} from '../../planet/store/useCatPlanetStore'

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
  const t = copy[language]

  const selectedBreed = getBreedById(selectedBreedId)
  const hoveredBreed = getBreedById(hoveredBreedId)
  const tooltipBreed = hoveredBreed ?? selectedBreed
  const visibleBreeds = getVisibleBreeds(activeRegion, searchQuery, coatFilter)

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
  }

  const handleBreedSelect = (breed: BreedOrigin) => {
    setActiveRegion(breed.region)
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
              <BreedDetail breed={selectedBreed} language={language} />
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

function BreedDetail({
  breed,
  language,
}: {
  breed: BreedOrigin
  language: Language
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
