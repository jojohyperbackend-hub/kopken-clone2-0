import { useRef } from 'react'
import type { PartnersContent } from '../../types'
import { useScrollTrigger } from '../../hooks/useScrollTrigger'

const defaultPartnersContent: PartnersContent = {
  sectionLabel: 'Mitra',
  isVisible: false,
  badges: [],
}

export interface PartnersProps {
  content?: PartnersContent
}

export const Partners = ({ content = defaultPartnersContent }: PartnersProps) => {
  const sectionRef = useRef<HTMLElement | null>(null)

  useScrollTrigger(sectionRef, {
    revealGroups: ['.partners-reveal-badge'],
  })

  if (!content.isVisible || content.badges.length === 0) {
    return null
  }

  return (
    <section
      id="mitra"
      ref={sectionRef}
      className="bg-bg-base px-5 text-text-heading md:px-10"
      style={{ paddingTop: 80, paddingBottom: 96 }}
    >
      <div className="mx-auto max-w-6xl">
        <p className="section-mark mb-8">
          {content.sectionLabel}
        </p>

        <div className="flex flex-wrap items-center gap-4">
          {content.badges.map((badge) => (
            <span
              key={badge.id}
              className="partners-reveal-badge rounded-full border border-[color:var(--color-hairline)] px-5 py-2.5 font-display text-base transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              {badge.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
