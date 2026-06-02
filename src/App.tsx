import { Component, useCallback, useEffect, useState, type ErrorInfo, type ReactNode } from 'react'
import './App.css'
import { CatPlanetIntro } from './features/intro/components/CatPlanetIntro'
import { MarkerOverlay } from './features/planet/components/MarkerOverlay'
import { PlanetScene } from './features/planet/components/PlanetScene'
import { CatPlanetUI } from './features/ui/components/CatPlanetUI'

class AppErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Cat Planet failed to render', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="cat-planet-app cat-planet-error">
          <section className="app-fallback-card" role="alert">
            <span>Cat Planet</span>
            <h1>页面暂时没有正确加载</h1>
            <p>
              这通常是浏览器 WebGL、缓存或本地数据异常导致的。刷新后如果仍然黑屏，可以清理站点缓存后再打开。
            </p>
            <button type="button" onClick={() => window.location.reload()}>
              重新加载
            </button>
          </section>
        </main>
      )
    }

    return this.props.children
  }
}

function App() {
  const [introDone, setIntroDone] = useState(false)
  const completeIntro = useCallback(() => {
    setIntroDone(true)
  }, [])

  useEffect(() => {
    const fallbackTimer = window.setTimeout(() => {
      setIntroDone(true)
    }, 5200)

    return () => window.clearTimeout(fallbackTimer)
  }, [])

  return (
    <AppErrorBoundary>
      <main className={`cat-planet-app ${introDone ? '' : 'intro-playing'}`}>
        <PlanetScene />
        <MarkerOverlay />
        <CatPlanetUI motionReady={introDone} />
        {!introDone && <CatPlanetIntro onComplete={completeIntro} />}
      </main>
    </AppErrorBoundary>
  )
}

export default App
