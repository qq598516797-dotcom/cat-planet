import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { SRGBColorSpace } from 'three'
import { CameraRig } from './CameraRig'
import { Globe } from './Globe'
import { MarkerProjectionBridge } from './MarkerProjectionBridge'
import { StarField } from './StarField'
import { useCatPlanetStore } from '../store/useCatPlanetStore'

const canUseWebGL = () => {
  if (typeof document === 'undefined') return true
  try {
    const canvas = document.createElement('canvas')
    return Boolean(
      canvas.getContext('webgl2')
      || canvas.getContext('webgl')
      || canvas.getContext('experimental-webgl'),
    )
  } catch {
    return false
  }
}

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

  if (!canUseWebGL()) {
    return (
      <section className="planet-canvas planet-fallback" aria-label="WebGL fallback">
        <div>
          <span>Cat Planet</span>
          <h2>当前浏览器无法启动 3D 星球</h2>
          <p>页面仍然可以浏览猫咪小家、选猫测试、性格星图和详情内容。建议开启硬件加速，或换一个浏览器再试。</p>
        </div>
      </section>
    )
  }

  return (
    <Canvas
      className="planet-canvas"
      camera={{ position: [0.22, 0.68, 4.55], fov: 40, near: 0.1, far: 80 }}
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
