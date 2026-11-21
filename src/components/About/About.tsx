import { useRef } from 'react'
import type { AboutContent } from '../../types'
import { useScrollTrigger } from '../../hooks/useScrollTrigger'
import heroPhoto from '../../assets/kopikenagan.jpg'

const defaultAboutContent: AboutContent = {
  sectionLabel: 'Tentang kami',
  title: 'Berawal dari sini, dekat dengan keseharian.',
  paragraphs: [
    'Kopi Kenangan Margasatwa berada di kawasan dekat Pasar Labu. Nama ini kami pakai bukan tanpa alasan — daerah ini yang jadi titik awal cerita kami, tempat kami mulai menyeduh dan menyajikan kopi untuk orang-orang sekitar.',
    'Kami bukan bisnis besar dengan cabang di mana-mana. Fokus kami sederhana: menjaga rasa, menjaga pelayanan, dan dikenal karena konsisten — bukan karena ramai sesaat.',
  ],
  personalStoryPlaceholder:
    'Tambahkan 1–2 kalimat cerita personal/latar belakang pendirian jika ada, misal alasan nama "Margasatwa" dipilih, siapa yang memulai, atau momen pentingnya.',
}

const SteamingCupIcon = () => (
  <svg
    width="52"
    height="52"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M16 28H44V38C44 45.7 37.7 52 30 52C22.3 52 16 45.7 16 38V28Z"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <path
      d="M44 30H48C50.7614 30 53 32.2386 53 35C53 37.7614 50.7614 40 48 40H44.8"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <path
      d="M12 56H48"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path
      d="M24 10C22 13 26 14 25 17"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <path
      d="M32 8C30 11 34 12 33 15"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
)

const QuoteMarkIcon = () => (
  <svg
    width="34"
    height="26"
    viewBox="0 0 34 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M14 0C9 0 5 2 2.5 5.5C0.5 8.5 -0.3 12 0.5 16L2 26H8L6 15C8 15 10 13.8 11.5 11.8C13 9.8 13.5 7.5 13 5L14 0Z"
      fill="currentColor"
    />
    <path
      d="M31.5 0C26.5 0 22.5 2 20 5.5C18 8.5 17.2 12 18 16L19.5 26H25.5L23.5 15C25.5 15 27.5 13.8 29 11.8C30.5 9.8 31 7.5 30.5 5L31.5 0Z"
      fill="currentColor"
    />
  </svg>
)

export interface AboutProps {
  content?: AboutContent
}

export const About = ({ content = defaultAboutContent }: AboutProps) => {
  const sectionRef = useRef<HTMLElement | null>(null)

  useScrollTrigger(sectionRef, {
    revealGroups: ['.about-reveal-text'],
    decorativeTargets: ['.about-decorative-badge'],
    parallax: true,
  })

  const [firstParagraph, ...restParagraphs] = content.paragraphs

  return (
    <section
      id="tentang"
      ref={sectionRef}
      className="relative overflow-hidden bg-bg-base px-5 py-24 md:px-10 md:py-36"
    >
      {/* cahaya karamel samar */}
      <div
        data-speed="0.3"
        className="pointer-events-none absolute -right-40 top-10 h-[36rem] w-[36rem] rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(184,122,61,0.12), transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        {/* ── Visual lengkung ── */}
        <div className="relative mx-auto w-full max-w-[22rem] lg:max-w-[26rem]">
          <div data-speed="-0.12" className="relative">
            <div className="about-decorative-badge arch relative aspect-[4/5] overflow-hidden bg-bg-alt shadow-strong">
              <img
                src={heroPhoto}
                alt=""
                aria-hidden="true"
                data-speed="0.2"
                loading="lazy"
                decoding="async"
                className="h-full w-full scale-[1.35] object-cover object-[22%_92%]"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(180deg, rgba(29,19,14,0.05), rgba(29,19,14,0.45))' }}
                aria-hidden="true"
              />
            </div>
            <div
              className="about-decorative-badge arch pointer-events-none absolute -inset-3 border border-[color:var(--color-hairline)]"
              aria-hidden="true"
            />
          </div>

          {/* lencana cangkir dengan cincin berputar */}
          <div
            data-speed="0.18"
            className="about-decorative-badge absolute -bottom-10 -right-4 flex h-36 w-36 items-center justify-center md:-right-12 md:h-44 md:w-44"
          >
            <div
              className="absolute inset-0 rounded-full border border-dashed border-accent/60"
              style={{ animation: 'kopken-spin 60s linear infinite' }}
              aria-hidden="true"
            />
            <div
              className="absolute inset-3 flex items-center justify-center rounded-full bg-surface-strong text-accent-soft shadow-strong"
              aria-hidden="true"
            >
              <SteamingCupIcon />
            </div>
          </div>

          <p className="about-decorative-badge mt-16 max-w-[13rem] font-display text-lg italic leading-snug text-text-body/70">
            Kopi. Warga. Cerita sehari-hari.
          </p>
        </div>

        {/* ── Teks ── */}
        <div className="max-w-2xl">
          <p className="about-reveal-text section-mark mb-6">{content.sectionLabel}</p>

          <h2 className="about-reveal-text font-display text-[clamp(2.4rem,5vw,4.1rem)] leading-[1.04] tracking-[-0.025em] text-text-heading">
            {content.title}
          </h2>

          <div className="about-reveal-text relative mt-10 pl-8 md:pl-10">
            <span className="absolute left-0 top-1 text-accent" aria-hidden="true">
              <QuoteMarkIcon />
            </span>
            <span className="absolute bottom-1 left-[0.55rem] top-12 w-px bg-[color:var(--color-hairline)]" aria-hidden="true" />
            <p className="font-display text-[1.35rem] italic leading-[1.55] text-text-heading/90 md:text-[1.6rem]">
              {firstParagraph}
            </p>
          </div>

          <div className="mt-8 space-y-4 pl-8 text-[1.02rem] font-light leading-[1.8] text-text-body/85 md:pl-10">
            {restParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="about-reveal-text">
                {paragraph}
              </p>
            ))}
          </div>

          {content.personalStoryPlaceholder ? (
            <div className="about-reveal-text ml-8 mt-8 rounded-[var(--radius-md)] border border-dashed border-[color:var(--color-hairline)] bg-bg-alt/50 px-5 py-4 text-sm italic leading-relaxed text-text-body/70 md:ml-10">
              {content.personalStoryPlaceholder}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
