import { useEffect, useRef } from 'react'
import {
  gsap,
  matchMediaBreakpoints,
  createSectionReveal,
  createDecorativeScaleIn,
  createParallaxLayer,
} from '../lib/gsap'
import type { DeviceMotionProfile } from '../types'

export interface ScrollTriggerSelectors {
  revealGroups?: string[]
  decorativeTargets?: string[]
  parallax?: boolean
  parallaxHero?: boolean
}

const motionProfileByQueryKey: Record<string, DeviceMotionProfile> = {
  isDesktop: 'desktop',
  isMobile: 'mobile',
  isReducedMotion: 'reduced',
}

export const useScrollTrigger = (
  containerRef: React.RefObject<HTMLElement | null>,
  selectors: ScrollTriggerSelectors,
): void => {
  const selectorsRef = useRef(selectors)
  selectorsRef.current = selectors

  useEffect(() => {
    const containerElement = containerRef.current

    if (!containerElement) {
      return undefined
    }

    const matchMediaContext = gsap.matchMedia()

    matchMediaContext.add(
      {
        isReducedMotion: matchMediaBreakpoints.reducedMotion,
        isMobile: matchMediaBreakpoints.mobile,
        isDesktop: matchMediaBreakpoints.desktop,
      },
      (context) => {
        const activeConditions = context.conditions as Record<string, boolean>
        const matchedKey = Object.keys(activeConditions).find(
          (key) => activeConditions[key],
        )
        const profile: DeviceMotionProfile = matchedKey
          ? motionProfileByQueryKey[matchedKey]
          : 'mobile'

        const activeSelectors = selectorsRef.current

        const sectionGsapContext = gsap.context(() => {
          activeSelectors.revealGroups?.forEach((selector) => {
            const targets = containerElement.querySelectorAll(selector)
            if (targets.length > 0) {
              createSectionReveal(targets, profile)
            }
          })

          activeSelectors.decorativeTargets?.forEach((selector) => {
            const targets = containerElement.querySelectorAll(selector)
            if (targets.length > 0) {
              createDecorativeScaleIn(targets, profile)
            }
          })

          if (activeSelectors.parallax) {
            containerElement
              .querySelectorAll('[data-speed]')
              .forEach((layer) => {
                createParallaxLayer(
                  layer,
                  containerElement,
                  profile,
                  activeSelectors.parallaxHero === true,
                )
              })
          }
        }, containerElement)

        return () => sectionGsapContext.revert()
      },
    )

    return () => {
      matchMediaContext.revert()
    }
  }, [containerRef])
}
