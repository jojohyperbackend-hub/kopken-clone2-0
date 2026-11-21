import { useEffect, useRef } from 'react'
import type Lenis from 'lenis'
import { createLenis, destroyLenis, getLenisInstance } from '../lib/lenis'
import { ScrollTrigger, refreshScrollTrigger } from '../lib/gsap'
import { matchMediaBreakpoints } from '../lib/gsap'

export const useLenis = (): React.RefObject<Lenis | null> => {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenisInstance = createLenis()
    lenisRef.current = lenisInstance

    const handleLenisScroll = () => {
      ScrollTrigger.update()
    }

    lenisInstance.on('scroll', handleLenisScroll)

    const mobileMediaQuery = window.matchMedia(matchMediaBreakpoints.mobile)

    const handleBreakpointChange = () => {
      destroyLenis()
      const recreatedInstance = createLenis()
      lenisRef.current = recreatedInstance
      recreatedInstance.on('scroll', handleLenisScroll)
      refreshScrollTrigger()
    }

    mobileMediaQuery.addEventListener('change', handleBreakpointChange)

    refreshScrollTrigger()

    return () => {
      mobileMediaQuery.removeEventListener('change', handleBreakpointChange)
      lenisInstance.off('scroll', handleLenisScroll)
      destroyLenis()
      lenisRef.current = null
    }
  }, [])

  return lenisRef
}

export const useLenisInstance = (): Lenis | null => getLenisInstance()
