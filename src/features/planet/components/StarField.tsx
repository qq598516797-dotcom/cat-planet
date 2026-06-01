import { useMemo } from 'react'
import * as THREE from 'three'

export function StarField() {
  const positions = useMemo(() => {
    const vertices: number[] = []

    for (let i = 0; i < 850; i += 1) {
      const radius = 24 + ((i * 17) % 90) / 12
      const theta = (i * 2.399963229728653) % (Math.PI * 2)
      const phi = Math.acos(2 * (((i * 37) % 997) / 997) - 1)

      vertices.push(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta),
      )
    }

    return new Float32Array(vertices)
  }, [])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={new THREE.Color('#fff7fb')}
        size={0.035}
        sizeAttenuation
        transparent
        opacity={0.62}
      />
    </points>
  )
}
