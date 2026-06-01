import type { Region } from '../../breeds/data/breeds'

export interface CameraFlightTarget {
  label: string
  lat: number
  lon: number
  distance: number
}

export const regionTargets: Record<Region, CameraFlightTarget> = {
  Global: {
    label: 'Global',
    lat: 18,
    lon: 10,
    distance: 4.2,
  },
  Asia: {
    label: 'Asia',
    lat: 26,
    lon: 102,
    distance: 3.05,
  },
  Europe: {
    label: 'Europe',
    lat: 52,
    lon: 10,
    distance: 3,
  },
  'North America': {
    label: 'North America',
    lat: 43,
    lon: -98,
    distance: 3.1,
  },
  'Middle East': {
    label: 'Middle East',
    lat: 31,
    lon: 42,
    distance: 2.85,
  },
  'Africa/Oceania': {
    label: 'Africa/Oceania',
    lat: -2,
    lon: 42,
    distance: 3.25,
  },
}
