import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type {
  DeviceMotionProfile,
  MatchMediaBreakpoints,
  ScrollRevealConfig,
} from '../types'

gsap.registerPlugin(ScrollTrigger)

export const matchMediaBreakpoints: MatchMediaBreakpoints = {
  desktop: '(min-width: 1024px)',
  mobile: '(max-width: 767px)',
  reducedMotion: '(prefers-reduced-motion: reduce)',
}

const desktopRevealConfig: ScrollRevealConfig = {
  variant: 'fade-slide-up',
  distance: 28,
  duration: 0.7,
  staggerStep: 0.1,
  easing: 'power2.out',
}

const mobileRevealConfig: ScrollRevealConfig = {
  variant: 'fade-slide-up',
  distance: 14,
  duration: 0.45,
  staggerStep: 0.05,
  easing: 'power2.out',
}

const reducedRevealConfig: ScrollRevealConfig = {
  variant: 'fade-only',
  distance: 0,
  duration: 0.2,
  staggerStep: 0,
  easing: 'power1.out',
}

export const getRevealConfig = (
  profile: DeviceMotionProfile,
): ScrollRevealConfig => {
  if (profile === 'reduced') {
    return reducedRevealConfig
  }

  if (profile === 'mobile') {
    return mobileRevealConfig
  }

  return desktopRevealConfig
}

export const resolveMotionProfile = (): DeviceMotionProfile => {
  if (window.matchMedia(matchMediaBreakpoints.reducedMotion).matches) {
    return 'reduced'
  }

  if (window.matchMedia(matchMediaBreakpoints.mobile).matches) {
    return 'mobile'
  }

  return 'desktop'
}

export const createSectionReveal = (
  targets: gsap.TweenTarget,
  profile: DeviceMotionProfile,
): gsap.core.Tween => {
  const config = getRevealConfig(profile)

  return gsap.from(targets, {
    autoAlpha: 0,
    y: config.variant === 'fade-only' ? 0 : config.distance,
    duration: config.duration,
    ease: config.easing,
    stagger: config.staggerStep,
    scrollTrigger: {
      trigger: targets as gsap.DOMTarget,
      start: 'top 85%',
      
      toggleActions: 'play none none reverse',
    },
  })
}

export const createDecorativeScaleIn = (
  targets: gsap.TweenTarget,
  profile: DeviceMotionProfile,
): gsap.core.Tween => {
  const config = getRevealConfig(profile)
  const shouldScale = profile !== 'mobile' && profile !== 'reduced'

  return gsap.from(targets, {
    autoAlpha: 0,
    scale: shouldScale ? 0.92 : 1,
    duration: config.duration,
    ease: config.easing,
    scrollTrigger: {
      trigger: targets as gsap.DOMTarget,
      start: 'top 85%',
      
      toggleActions: 'play none none reverse',
    },
  })
}

export const createParallaxLayer = (
  target: Element,
  trigger: Element,
  profile: DeviceMotionProfile,
  isHeroMode = false,
): gsap.core.Tween | null => {
  if (profile === 'reduced') {
    return null
  }

  const speed = Number(target.getAttribute('data-speed') ?? 0.2)
  const distance = 160 * speed * (profile === 'mobile' ? 0.5 : 1)

  if (isHeroMode) {
    return gsap.fromTo(
      target,
      { y: 0 },
      {
        y: distance * 2,
        ease: 'none',
        scrollTrigger: {
          trigger,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      },
    )
  }

  return gsap.fromTo(
    target,
    { y: -distance },
    {
      y: distance,
      ease: 'none',
      scrollTrigger: {
        trigger,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.8,
      },
    },
  )
}

export const refreshScrollTrigger = (): void => {
  ScrollTrigger.refresh()
}

export const killAllScrollTriggers = (): void => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
}

export { gsap, ScrollTrigger }
