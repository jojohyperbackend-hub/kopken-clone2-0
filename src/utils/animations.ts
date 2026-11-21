import type { DeviceMotionProfile } from '../types'

export const ANIMATION_DURATION: Record<DeviceMotionProfile, number> = {
  desktop: 0.7,
  mobile: 0.45,
  reduced: 0.2,
}

export const ANIMATION_DISTANCE_PX: Record<DeviceMotionProfile, number> = {
  desktop: 28,
  mobile: 14,
  reduced: 0,
}

export const STAGGER_STEP_SECONDS: Record<DeviceMotionProfile, number> = {
  desktop: 0.1,
  mobile: 0.05,
  reduced: 0,
}

export const MAX_STAGGERED_ITEMS: Record<DeviceMotionProfile, number> = {
  desktop: Infinity,
  mobile: 3,
  reduced: 1,
}

export const EASING_CURVE = {
  standard: 'power2.out',
  reducedMotion: 'power1.out',
} as const

export const THEME_TRANSITION_DURATION_MS = 260

export const LENIS_SCROLL_DURATION: Record<'desktop' | 'mobile', number> = {
  desktop: 1.1,
  mobile: 0.8,
}

export const clampStaggerIndex = (
  index: number,
  profile: DeviceMotionProfile,
): number => {
  const cap = MAX_STAGGERED_ITEMS[profile]
  return Number.isFinite(cap) ? Math.min(index, cap) : index
}

export const getStaggerDelay = (
  index: number,
  profile: DeviceMotionProfile,
): number => {
  const cappedIndex = clampStaggerIndex(index, profile)
  return cappedIndex * STAGGER_STEP_SECONDS[profile]
}

export const resolveTranslateDistance = (
  profile: DeviceMotionProfile,
): number => ANIMATION_DISTANCE_PX[profile]

export const resolveAnimationDuration = (
  profile: DeviceMotionProfile,
): number => ANIMATION_DURATION[profile]

export const resolveEasing = (profile: DeviceMotionProfile): string =>
  profile === 'reduced' ? EASING_CURVE.reducedMotion : EASING_CURVE.standard

export const buildThemeTransitionValue = (
  properties: string[] = ['background-color', 'color', 'border-color'],
): string =>
  properties
    .map(
      (property) =>
        `${property} ${THEME_TRANSITION_DURATION_MS}ms ease-in-out`,
    )
    .join(', ')

export const resolveLenisDuration = (
  profile: Exclude<DeviceMotionProfile, 'reduced'>,
): number => LENIS_SCROLL_DURATION[profile]
