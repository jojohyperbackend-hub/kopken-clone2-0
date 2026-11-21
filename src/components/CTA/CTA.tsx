import { useRef } from 'react'
import { CoffeeBeanRain } from '../common/CoffeeBeanRain'
import type { ContactChannel, CtaContent } from '../../types'
import { useScrollTrigger } from '../../hooks/useScrollTrigger'
import { scrollToTarget } from '../../lib/lenis'

const LeafShadowFrond = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 120 200"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    className={className}
  >
    <path d="M60 4C40 30 14 50 10 90C8 120 26 150 54 160C40 140 36 112 48 86C40 100 24 104 14 92C34 92 46 78 50 56C34 62 20 54 16 36C38 42 54 30 60 4Z" />
    <path d="M60 4C80 30 106 50 110 90C112 120 94 150 66 160C80 140 84 112 72 86C80 100 96 104 106 92C86 92 74 78 70 56C86 62 100 54 104 36C82 42 66 30 60 4Z" />
  </svg>
)

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <path d="M5 4H9L11 9L8.5 10.5C9.5 13 11 14.5 13.5 15.5L15 13L20 15V19C20 20.1 19.1 21 18 21C10.3 20.5 4 14.2 3.5 6.5C3.4 5.1 4.5 4 5 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
)

const SocialIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="16.8" cy="7.2" r="0.9" fill="currentColor" />
  </svg>
)

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 7.5V12L15 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const contactIconMap: Record<string, JSX.Element> = {
  whatsapp: <PhoneIcon />,
  sosial: <SocialIcon />,
  jam: <ClockIcon />,
}

const defaultContactChannels: ContactChannel[] = [
  { id: 'whatsapp', label: 'Nomor telepon/WhatsApp', value: null },
  { id: 'sosial', label: 'Media sosial', value: null },
  { id: 'jam', label: 'Jam operasional', value: null },
]

const defaultCtaContent: CtaContent = {
  eyebrow: 'Sampai bertemu di sini',
  headline: 'Mampir dan Rasakan Sendiri',
  description:
    'Kami lebih senang kalau kamu datang langsung daripada sekadar baca cerita kami di sini.',
  ctaLabel: 'Lihat Lokasi Kami',
  contactChannels: defaultContactChannels,
}

const ArrowIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M5 12H19M19 12L13 6M19 12L13 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export interface CTAProps {
  content?: CtaContent
}

export const CTA = ({ content = defaultCtaContent }: CTAProps) => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const currentYear = new Date().getFullYear()

  useScrollTrigger(sectionRef, {
    revealGroups: ['.cta-reveal-text', '.cta-reveal-chip'],
    parallax: true,
  })

  const handleLihatLokasi = () => {
    scrollToTarget('#lokasi', -72)
  }

  const handleKembaliKeAtas = () => {
    scrollToTarget('#beranda', 0)
  }

  return (
    <section
      id="kontak"
      ref={sectionRef}
      className="relative bg-bg-base px-3 pb-3 pt-10 md:px-6 md:pb-6 md:pt-16"
    >
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-surface-strong text-surface-strong-text md:rounded-[3rem]">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <CoffeeBeanRain density={22} tone="light" parallaxStrength={0.25} />
        </div>
        <div
          className="pointer-events-none absolute left-1/2 top-[38%] -z-10 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: 'radial-gradient(closest-side, rgba(184,122,61,0.32), rgba(184,122,61,0.06) 60%, transparent 75%)' }}
          aria-hidden="true"
        />

        <div data-speed="0.3" className="pointer-events-none absolute -right-8 -top-4 -z-10 hidden md:block">
          <LeafShadowFrond className="h-[22rem] w-[11rem] rotate-[20deg] text-accent-soft opacity-[0.07] blur-[2px]" />
        </div>
        <div data-speed="-0.2" className="pointer-events-none absolute -left-10 bottom-24 -z-10 hidden md:block">
          <LeafShadowFrond className="h-[18rem] w-[9rem] -rotate-[160deg] text-accent-soft opacity-[0.05] blur-[2px]" />
        </div>

        <div className="relative px-5 pb-24 pt-24 text-center md:px-10 md:pb-32 md:pt-36">
          <p className="cta-reveal-text mb-7 flex items-center justify-center gap-4 font-display text-lg italic text-accent-soft">
            <span className="h-px w-10 bg-current opacity-60" aria-hidden="true" />
            {content.eyebrow}
            <span className="h-px w-10 bg-current opacity-60" aria-hidden="true" />
          </p>

          <h2 className="cta-reveal-text mx-auto max-w-4xl font-display text-[clamp(2.8rem,7.4vw,6.2rem)] font-normal leading-[0.98] tracking-[-0.035em]">
            {content.headline}
          </h2>

          <p className="cta-reveal-text mx-auto mt-7 max-w-lg text-[1.05rem] font-light leading-[1.8] text-surface-strong-text/75">
            {content.description}
          </p>

          <button
            type="button"
            onClick={handleLihatLokasi}
            className="cta-reveal-text btn-lux mx-auto mt-11 bg-[var(--palette-milk-foam)] text-[var(--palette-espresso)]"
            style={{
              ['--btn-hover-bg' as string]: 'var(--palette-caramel)',
              ['--btn-hover-color' as string]: 'var(--palette-milk-foam)',
              ['--btn-arrow-color' as string]: 'var(--palette-milk-foam)',
            }}
          >
            {content.ctaLabel}
            <span className="btn-arrow" aria-hidden="true">
              <ArrowIcon />
            </span>
          </button>

          <div className="mx-auto mt-14 flex max-w-3xl flex-wrap items-center justify-center gap-3">
            {content.contactChannels.map((channel) => (
              <span
                key={channel.id}
                className="cta-reveal-chip inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm backdrop-blur-sm transition-colors duration-300 hover:border-accent-soft/60"
              >
                <span className="text-accent-soft">{contactIconMap[channel.id]}</span>
                <span className={channel.value ? '' : 'italic text-surface-strong-text/65'}>
                  {channel.value ?? channel.label}
                </span>
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 px-5 py-7 md:px-10">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-xs text-surface-strong-text/60 md:flex-row">
            <div className="flex flex-col items-center leading-tight md:items-start">
              <span className="font-display text-lg text-surface-strong-text">
                Kopi Kenangan
              </span>
              <span className="font-display text-sm italic text-accent-soft">Margasatwa</span>
            </div>

            <p>© {currentYear} Kopi Kenangan Margasatwa</p>

            <button
              type="button"
              onClick={handleKembaliKeAtas}
              className="group flex items-center gap-3 transition-colors duration-300 hover:text-surface-strong-text"
            >
              Kembali ke atas
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-all duration-500 group-hover:-translate-y-1 group-hover:border-accent-soft group-hover:text-accent-soft"
                aria-hidden="true"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M12 19V5M12 5L6 11M12 5L18 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
