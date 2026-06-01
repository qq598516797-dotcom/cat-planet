import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { SRGBColorSpace } from 'three'
import { CameraRig } from './CameraRig'
import { Globe } from './Globe'
import { MarkerProjectionBridge } from './MarkerProjectionBridge'
import { StarField } from './StarField'
import { useCatPlanetStore } from '../store/useCatPlanetStore'

function SceneContents() {
  return (
    <>
      <color attach="background" args={['#fffaf4']} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 2.5, 4]} intensity={2.42} color="#fffaf2" />
      <directionalLight position={[-3, -1, -4]} intensity={0.82} color="#8dd7ff" />
      <pointLight position={[0, 2.4, 2.8]} intensity={0.72} color="#ff7ca7" />
      <StarField />
      <group>
        <Globe />
      </group>
      <CameraRig />
      <MarkerProjectionBridge />
    </>
  )
}

export function PlanetScene() {
  const clearSelection = useCatPlanetStore((state) => state.clearSelection)

  return (
    <Canvas
      className="planet-canvas"
      camera={{ position: [0.2, 0.65, 4.2], fov: 42, near: 0.1, far: 80 }}
      dpr={[1, 1.35]}
      gl={{
        antialias: true,
        alpha: false,
        preserveDrawingBuffer: false,
        powerPreference: 'high-performance',
      }}
      onCreated={({ gl }) => {
        gl.outputColorSpace = SRGBColorSpace
      }}
      onPointerMissed={() => {
        document.body.style.cursor = 'auto'
        clearSelection()
      }}
    >
      <Suspense fallback={null}>
        <SceneContents />
      </Suspense>
    </Canvas>
  )
}
