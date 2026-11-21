import Lenis from 'lenis'
import type { LenisConfig } from '../types'

const desktopLenisConfig: LenisConfig = {
  duration: 1.1,
  easing: (time: number) => Math.min(1, 1.001 - Math.pow(2, -10 * time)),
  smoothWheel: true,
  touchMultiplier: 1.5,
}

const mobileLenisConfig: LenisConfig = {
  duration: 0.8,
  easing: (time: number) => Math.min(1, 1.001 - Math.pow(2, -10 * time)),
  smoothWheel: true,
  touchMultiplier: 1.8,
}

let lenisInstance: Lenis | null = null
let rafHandle: number | null = null

const isMobileViewport = () => window.matchMedia('(max-width: 767px)').matches

const resolveLenisConfig = (): LenisConfig =>
  isMobileViewport() ? mobileLenisConfig : desktopLenisConfig

const runLenisFrame = (time: number) => {
  lenisInstance?.raf(time)
  rafHandle = requestAnimationFrame(runLenisFrame)
}

export const createLenis = (): Lenis => {
  if (lenisInstance) {
    return lenisInstance
  }

  const config = resolveLenisConfig()

  lenisInstance = new Lenis({
    duration: config.duration,
    easing: config.easing,
    smoothWheel: config.smoothWheel,
    touchMultiplier: config.touchMultiplier,
  })

  rafHandle = requestAnimationFrame(runLenisFrame)

  return lenisInstance
}

export const getLenisInstance = (): Lenis | null => lenisInstance

export const destroyLenis = (): void => {
  if (rafHandle !== null) {
    cancelAnimationFrame(rafHandle)
    rafHandle = null
  }

  lenisInstance?.destroy()
  lenisInstance = null
}

export const scrollToTarget = (
  target: string | HTMLElement,
  offset = 0,
): void => {
  lenisInstance?.scrollTo(target, { offset })
}
