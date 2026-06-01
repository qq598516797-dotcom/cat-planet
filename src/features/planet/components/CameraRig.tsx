import { useEffect, useRef } from 'react'
import { OrbitControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { gsap } from 'gsap'
import * as THREE from 'three'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { cameraPositionForLatLon } from '../math/geo'
import { useCatPlanetStore } from '../store/useCatPlanetStore'

export function CameraRig() {
  const controlsRef = useRef<OrbitControlsImpl | null>(null)
  const { camera } = useThree()
  const cameraFlightTarget = useCatPlanetStore(
    (state) => state.cameraFlightTarget,
  )

  useEffect(() => {
    camera.position.set(0.22, 0.68, 4.55)
    camera.lookAt(0, 0, 0)
  }, [camera])

  useEffect(() => {
    if (!cameraFlightTarget || !controlsRef.current) {
      return
    }

    const controls = controlsRef.current
    const nextPosition = cameraPositionForLatLon(
      cameraFlightTarget.lat,
      cameraFlightTarget.lon,
      cameraFlightTarget.distance,
    )
    const timeline = gsap.timeline({
      defaults: {
        duration: 1.15,
        ease: 'power3.inOut',
      },
      onUpdate: () => {
        camera.lookAt(0, 0, 0)
        controls.update()
      },
      onComplete: () => {
        controls.update()
      },
    })

    controls.enabled = false
    timeline.to(camera.position, {
      x: nextPosition.x,
      y: nextPosition.y,
      z: nextPosition.z,
    })
    timeline.to(
      controls.target,
      {
        x: 0,
        y: 0,
        z: 0,
      },
      0,
    )
    timeline.eventCallback('onComplete', () => {
      controls.enabled = true
      controls.update()
    })

    return () => {
      timeline.kill()
      controls.enabled = true
    }
  }, [camera, cameraFlightTarget])

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableDamping
      dampingFactor={0.07}
      minDistance={2.05}
      maxDistance={5.9}
      rotateSpeed={0.58}
      zoomSpeed={0.72}
      touches={{
        ONE: THREE.TOUCH.ROTATE,
        TWO: THREE.TOUCH.DOLLY_ROTATE,
      }}
    />
  )
}
