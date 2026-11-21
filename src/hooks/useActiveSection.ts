import { useEffect, useState } from 'react'
import type { NavLinkId } from '../types'

export const useActiveSection = (
  sectionIds: NavLinkId[],
  rootMargin = '-45% 0px -50% 0px',
): NavLinkId | null => {
  const [activeSectionId, setActiveSectionId] = useState<NavLinkId | null>(
    sectionIds[0] ?? null,
  )

  const idsKey = sectionIds.join('|')

  useEffect(() => {
    const sectionElements = idsKey
      .split('|')
      .map((sectionId) => document.getElementById(sectionId))
      .filter((element): element is HTMLElement => element !== null)

    if (sectionElements.length === 0) {
      return undefined
    }

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting)

        if (visibleEntry) {
          setActiveSectionId(visibleEntry.target.id as NavLinkId)
        }
      },
      {
        root: null,
        rootMargin,
        threshold: 0,
      },
    )

    sectionElements.forEach((element) => intersectionObserver.observe(element))

    return () => {
      intersectionObserver.disconnect()
    }
  }, [idsKey, rootMargin])

  return activeSectionId
}
