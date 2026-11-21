import { useEffect, useRef, useState } from 'react'
import type { HeroContent } from '../../types'
import { useScrollTrigger } from '../../hooks/useScrollTrigger'
import { scrollToTarget } from '../../lib/lenis'
import { CoffeeBeanRain } from '../common/CoffeeBeanRain'
import { CoffeeSplash } from '../common/CoffeeSplash'
import heroPhoto from '../../assets/kopikenagan.jpg'

const defaultHeroContent: HeroContent = {
  eyebrow: 'Dari dekat Pasar Labu',
  headline: 'Kopi Kenangan Margasatwa',
  subheadline:
    'Dari kawasan dekat Pasar Labu, kami menyeduh kopi dengan cara yang sederhana — tanpa buru-buru, tanpa berlebihan.',
  ctaLabel: 'Kenali Kami Lebih Dekat',
  scrollHintLabel: 'Cerita sederhana kami',
  assetSrc: heroPhoto,
  assetAlt: 'Secangkir kopi di atas meja kayu, suasana Kopi Kenangan Margasatwa',
}

export interface HeroProps {
  content?: HeroContent
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

const CupPlaceholderIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M12 20H32V30C32 36.6 26.6 42 20 42C13.4 42 8 36.6 8 30V20Z"
      stroke="currentColor"
      strokeWidth="1.4"
    />
    <path
      d="M32 22H36C38.7614 22 41 24.2386 41 27C41 29.7614 38.7614 32 36 32H32.8"
      stroke="currentColor"
      strokeWidth="1.4"
    />
    <path d="M6 44H34" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

const BeanGlyph = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    className={className}
  >
    <ellipse cx="12" cy="16" rx="9" ry="13.5" stroke="currentColor" strokeWidth="1.3" />
    <path d="M12 3.5C17 10 7 22 12 28.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
)

/** Pisah headline jadi baris pembuka + nama (kata terakhir) tanpa mengubah teksnya. */
const splitHeadline = (headline: string): [string, string] => {
  const trimmed = headline.trim()
  const lastSpace = trimmed.lastIndexOf(' ')
  if (lastSpace === -1) return ['', trimmed]
  return [trimmed.slice(0, lastSpace), trimmed.slice(lastSpace + 1)]
}

export const Hero = ({ content = defaultHeroContent }: HeroProps) => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const tiltRef = useRef<HTMLDivElement | null>(null)
  const [hasImageFailed, setHasImageFailed] = useState(false)

  useScrollTrigger(sectionRef, {
    revealGroups: ['.hero-reveal-eyebrow', '.hero-reveal-headline', '.hero-reveal-body'],
    decorativeTargets: ['.hero-decorative-frame'],
    parallax: true,
    parallaxHero: true,
  })

  // Tilt 3D halus mengikuti kursor (hanya desktop dengan pointer presisi)
  useEffect(() => {
    const tiltElement = tiltRef.current
    const sectionElement = sectionRef.current
    if (!tiltElement || !sectionElement) return undefined

    const canTilt =
      window.matchMedia('(pointer: fine) and (min-width: 1024px)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!canTilt) return undefined

    let frameId = 0
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const animate = () => {
      currentX += (targetX - currentX) * 0.08
      currentY += (targetY - currentY) * 0.08
      tiltElement.style.transform = `perspective(1200px) rotateY(${currentX * 7}deg) rotateX(${-currentY * 6}deg)`
      if (Math.abs(targetX - currentX) > 0.001 || Math.abs(targetY - currentY) > 0.001) {
        frameId = requestAnimationFrame(animate)
      } else {
        frameId = 0
      }
    }

    const handleMove = (event: PointerEvent) => {
      const rect = sectionElement.getBoundingClientRect()
      targetX = (event.clientX - rect.left) / rect.width - 0.5
      targetY = (event.clientY - rect.top) / rect.height - 0.5
      if (!frameId) frameId = requestAnimationFrame(animate)
    }

    const handleLeave = () => {
      targetX = 0
      targetY = 0
      if (!frameId) frameId = requestAnimationFrame(animate)
    }

    sectionElement.addEventListener('pointermove', handleMove, { passive: true })
    sectionElement.addEventListener('pointerleave', handleLeave)

    return () => {
      cancelAnimationFrame(frameId)
      sectionElement.removeEventListener('pointermove', handleMove)
      sectionElement.removeEventListener('pointerleave', handleLeave)
    }
  }, [])

  const handleCtaClick = () => {
    scrollToTarget('#tentang', -72)
  }

  const handleScrollHintClick = () => {
    scrollToTarget('#tentang', -72)
  }

  const [headlineLead, headlineName] = splitHeadline(content.headline)

  return (
    <section
      id="beranda"
      ref={sectionRef}
      className="relative isolate overflow-hidden rounded-b-[2rem] bg-surface-strong text-surface-strong-text md:rounded-b-[3.5rem]"
    >
      {/* ── Lapisan latar (parallax) ── */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div
          data-speed="0.35"
          className="absolute -right-[20%] -top-[30%] h-[60rem] w-[60rem] rounded-full opacity-60"
          style={{
            background:
              'radial-gradient(closest-side, rgba(184,122,61,0.38), rgba(184,122,61,0.08) 55%, transparent 75%)',
          }}
        />
        <div
          data-speed="0.15"
          className="absolute -left-[25%] bottom-[-35%] h-[46rem] w-[46rem] rounded-full"
          style={{
            background:
              'radial-gradient(closest-side, rgba(214,166,107,0.14), transparent 70%)',
          }}
        />
        {/* garis-garis lengkung tipis, gema motif pintu */}
        <svg
          data-speed="0.2"
          className="absolute left-1/2 top-[12%] hidden h-[115%] w-[70rem] -translate-x-1/2 text-accent-soft opacity-[0.09] md:block"
          viewBox="0 0 1000 1000"
          fill="none"
          preserveAspectRatio="xMidYMin meet"
        >
          {[0, 1, 2, 3].map((ring) => (
            <path
              key={ring}
              d={`M${120 + ring * 70} 1000V${500 - ring * 0}C${120 + ring * 70} ${260 + ring * 40} ${290 + ring * 50} ${90 + ring * 50} 500 ${90 + ring * 50}C${710 - ring * 50} ${90 + ring * 50} ${880 - ring * 70} ${260 + ring * 40} ${880 - ring * 70} 500V1000`}
              stroke="currentColor"
              strokeWidth="1"
            />
          ))}
        </svg>
        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.28), transparent)' }}
        />
      </div>

      {/* ── Hujan biji kopi ── */}
      <div className="pointer-events-none absolute inset-0 -z-[5]" aria-hidden="true">
        <CoffeeBeanRain density={30} tone="light" parallaxStrength={0.3} />
      </div>

      <div className="relative mx-auto grid min-h-[100svh] max-w-7xl items-center gap-14 px-5 pb-20 pt-32 md:px-10 md:pb-24 md:pt-36 lg:grid-cols-[1.12fr_0.88fr] lg:gap-10">
        {/* ── Teks ── */}
        <div className="relative z-10 max-w-2xl">
          <p className="hero-reveal-eyebrow mb-8 flex items-center gap-3 text-sm text-accent-soft">
            <BeanGlyph className="h-4 w-3" />
            <span className="font-display text-base italic tracking-wide">{content.eyebrow}</span>
            <span className="h-px w-12 bg-current opacity-60" aria-hidden="true" />
          </p>

          <h1 className="hero-reveal-headline font-display font-normal">
            {headlineLead ? (
              <span className="block text-[clamp(1.6rem,3.4vw,2.6rem)] italic leading-none text-accent-soft">
                {headlineLead}
              </span>
            ) : null}
            <span className="mt-2 block text-[clamp(3.4rem,9.2vw,7.6rem)] leading-[0.92] tracking-[-0.035em]">
              {headlineName}
            </span>
          </h1>

          <div className="hero-reveal-headline mt-7 flex items-center gap-4" aria-hidden="true">
            <span className="h-px w-16 bg-accent-soft/70" />
            <BeanGlyph className="h-3.5 w-2.5 text-accent-soft" />
            <span className="h-px w-6 bg-accent-soft/40" />
          </div>

          <p className="hero-reveal-body mt-7 max-w-[30rem] text-[1.05rem] font-light leading-[1.75] text-surface-strong-text/80 md:text-lg">
            {content.subheadline}
          </p>

          <div className="hero-reveal-body mt-11 flex flex-wrap items-center gap-x-8 gap-y-6">
            <button
              type="button"
              onClick={handleCtaClick}
              className="btn-lux bg-accent text-[var(--palette-milk-foam)] shadow-[0_20px_50px_-20px_rgba(184,122,61,0.8)]"
            >
              {content.ctaLabel}
              <span className="btn-arrow" aria-hidden="true">
                <ArrowIcon />
              </span>
            </button>

            <button
              type="button"
              onClick={handleScrollHintClick}
              className="group flex items-center gap-3 text-sm text-surface-strong-text/70 transition-colors hover:text-surface-strong-text"
            >
              <span
                className="relative h-10 w-6 rounded-full border border-current/40 transition-colors group-hover:border-accent-soft"
                aria-hidden="true"
              >
                <span
                  className="absolute left-1/2 top-2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent-soft"
                  style={{ animation: 'kopken-scroll-dot 1.8s ease-in-out infinite' }}
                />
              </span>
              <span className="border-b border-transparent pb-0.5 transition-colors group-hover:border-current/40">
                {content.scrollHintLabel}
              </span>
            </button>
          </div>
        </div>

        {/* ── Foto dalam lengkung ── */}
        <div data-speed="0.12" className="relative mx-auto w-full max-w-[19rem] sm:max-w-sm lg:ml-auto lg:mr-4 lg:max-w-[26rem]">
          <div ref={tiltRef} className="relative will-change-transform" style={{ transformStyle: 'preserve-3d' }}>
            {/* garis lengkung emas di belakang */}
            <div
              className="hero-decorative-frame arch absolute -inset-3 border border-accent-soft/50 md:-inset-4"
              aria-hidden="true"
            />
            <div
              className="hero-decorative-frame arch absolute inset-x-6 -bottom-6 top-10 -z-10 bg-accent/30 blur-3xl"
              aria-hidden="true"
            />

            <div className="hero-unveil arch relative z-10 aspect-[3/4] w-full overflow-hidden bg-[var(--palette-roasted-bean)] shadow-strong">
              {hasImageFailed ? (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-6 text-center text-accent-soft">
                  <CupPlaceholderIcon />
                  <p className="text-xs opacity-80">Foto suasana segera hadir di sini.</p>
                </div>
              ) : (
                <img
                  src={content.assetSrc}
                  alt={content.assetAlt}
                  data-speed="0.18"
                  className="h-full w-full scale-[1.18] object-cover object-[50%_40%]"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  onError={() => setHasImageFailed(true)}
                />
              )}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(29,19,14,0) 55%, rgba(29,19,14,0.55) 100%), radial-gradient(120% 80% at 50% 0%, rgba(255,240,220,0.12), transparent 60%)',
                }}
                aria-hidden="true"
              />
            </div>

            {/* stempel berputar */}
            <div
              data-speed="-0.25"
              className="absolute -bottom-8 -left-6 z-20 md:-bottom-10 md:-left-12"
              style={{ transform: 'translateZ(40px)' }}
            >
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-[var(--palette-milk-foam)] text-[var(--palette-espresso)] shadow-strong md:h-32 md:w-32">
                <svg
                  viewBox="0 0 100 100"
                  className="stamp-spin absolute inset-1.5 h-[calc(100%-0.75rem)] w-[calc(100%-0.75rem)]"
                  aria-hidden="true"
                  focusable="false"
                >
                  <defs>
                    <path id="hero-stamp-path" d="M50 50m-38 0a38 38 0 1 1 76 0a38 38 0 1 1 -76 0" />
                  </defs>
                  <text fontSize="9" fill="currentColor" letterSpacing="1.4" fontFamily="var(--font-body)">
                    <textPath href="#hero-stamp-path" textLength="232">
                      Sederhana • Konsisten • Dekat Warga •
                    </textPath>
                  </text>
                </svg>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-[var(--palette-milk-foam)] md:h-12 md:w-12">
                  <BeanGlyph className="h-5 w-4" />
                </span>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 pl-20 text-xs text-surface-strong-text/55 md:mt-14 md:pl-24">
            <span className="font-display text-sm italic text-surface-strong-text/75">Secangkir suasana.</span>
            <span>Ilustrasi suasana kopi</span>
          </div>
        </div>
      </div>

      {/* ── Cipratan kopi saat klik / tap ── */}
      <div className="pointer-events-none absolute inset-0 z-20" aria-hidden="true">
        <CoffeeSplash targetRef={sectionRef} tone="latte" />
      </div>
    </section>
  )
}
