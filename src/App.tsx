import { useCallback, useState } from 'react'
import './App.css'
import { CatPlanetIntro } from './features/intro/components/CatPlanetIntro'
import { MarkerOverlay } from './features/planet/components/MarkerOverlay'
import { PlanetScene } from './features/planet/components/PlanetScene'
import { CatPlanetUI } from './features/ui/components/CatPlanetUI'

function App() {
  const [introDone, setIntroDone] = useState(false)
  const completeIntro = useCallback(() => {
    setIntroDone(true)
  }, [])

  return (
    <main className={`cat-planet-app ${introDone ? '' : 'intro-playing'}`}>
      <PlanetScene />
      <MarkerOverlay />
      <CatPlanetUI motionReady={introDone} />
      {!introDone && <CatPlanetIntro onComplete={completeIntro} />}
    </main>
  )
}

export default App
