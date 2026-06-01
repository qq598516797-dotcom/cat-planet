import * as THREE from 'three'

const DEG_TO_RAD = Math.PI / 180

export const latLonToVector3 = (lat: number, lon: number, radius: number) => {
  const phi = (90 - lat) * DEG_TO_RAD
  const theta = (lon + 180) * DEG_TO_RAD

  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  )
}

export const cameraPositionForLatLon = (
  lat: number,
  lon: number,
  distance: number,
) => latLonToVector3(lat, lon, distance)

export const worldToScreen = (
  worldPosition: THREE.Vector3,
  camera: THREE.Camera,
  size: { width: number; height: number },
) => {
  const projected = worldPosition.clone().project(camera)

  return {
    x: (projected.x * 0.5 + 0.5) * size.width,
    y: (-projected.y * 0.5 + 0.5) * size.height,
    visible: projected.z > -1 && projected.z < 1,
  }
}
