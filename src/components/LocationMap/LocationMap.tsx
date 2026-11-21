import { useRef } from 'react'
import type { LocationContent } from '../../types'
import { useScrollTrigger } from '../../hooks/useScrollTrigger'

const defaultLocationContent: LocationContent = {
  sectionLabel: 'Lokasi',
  title: 'Di sekitar Pasar Labu.',
  description: 'Kopi Kenangan Margasatwa berlokasi di kawasan dekat Pasar Labu.',
  addressPlaceholder:
    'Jl. Margasatwa Raya No.2, RT.001/RW.04, Pd. Labu, Kec. Cilandak, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12450.',
  landmarkPlaceholder: 'Ruko Margasatwa dan dekat LPIA Pondok Labu.',
  operatingHoursPlaceholder: 'Senin–Kamis & Minggu pukul 07.00–21.30 WIB; Jumat–Sabtu pukul 07.00–23.30 WIB',
}

const IllustratedMapIcon = () => (
  <svg
    viewBox="0 0 320 220"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    className="h-full w-full"
  >
    <path
      d="M20 180L60 140H120L150 170L190 130H240L290 170"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="4 6"
      style={{ animation: 'kopken-dash 2.4s linear infinite' }}
    />
    <rect
      x="40"
      y="110"
      width="90"
      height="70"
      rx="4"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <path d="M40 110L85 82L130 110" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <rect x="58" y="134" width="16" height="22" stroke="currentColor" strokeWidth="1.3" />
    <rect x="96" y="134" width="16" height="22" stroke="currentColor" strokeWidth="1.3" />
    <path
      d="M40 128C58 118 112 118 130 128"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <rect
      x="170"
      y="96"
      width="70"
      height="84"
      rx="4"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <rect x="184" y="118" width="14" height="18" stroke="currentColor" strokeWidth="1.2" />
    <rect x="212" y="118" width="14" height="18" stroke="currentColor" strokeWidth="1.2" />
    <rect x="184" y="150" width="14" height="18" stroke="currentColor" strokeWidth="1.2" />
    <rect x="212" y="150" width="14" height="18" stroke="currentColor" strokeWidth="1.2" />
    <circle cx="272" cy="150" r="22" stroke="currentColor" strokeWidth="1.4" />
    <path
      d="M260 146C264 138 280 138 284 146C288 154 276 162 272 170C268 162 256 154 260 146Z"
      stroke="currentColor"
      strokeWidth="1.2"
    />
  </svg>
)

const PinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <path d="M12 21C12 21 19 14.5 19 9.5C19 5.9 15.9 3 12 3C8.1 3 5 5.9 5 9.5C5 14.5 12 21 12 21Z" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="12" cy="9.5" r="2.3" stroke="currentColor" strokeWidth="1.6" />
  </svg>
)

const CompassIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M14.8 9.2L13 14L9.2 15.8L11 11L14.8 9.2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
  </svg>
)

const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 7.5V12L15 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export interface LocationMapProps {
  content?: LocationContent
}

const LocationMap = ({ content = defaultLocationContent }: LocationMapProps) => {
  const sectionRef = useRef<HTMLElement | null>(null)

  useScrollTrigger(sectionRef, {
    revealGroups: ['.location-reveal-text', '.location-info-row'],
    decorativeTargets: ['.location-decorative-map'],
    parallax: true,
  })

  const infoRows = [
    { id: 'alamat', icon: <PinIcon />, label: 'Alamat', value: content.addressPlaceholder },
    { id: 'patokan', icon: <CompassIcon />, label: 'Patokan', value: content.landmarkPlaceholder },
    { id: 'jam', icon: <ClockIcon />, label: 'Jam operasional', value: content.operatingHoursPlaceholder },
  ].filter((row) => row.value)

  return (
    <section
      id="lokasi"
      ref={sectionRef}
      className="relative overflow-hidden bg-bg-alt/60 px-5 py-24 md:px-10 md:py-36"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
        <div data-speed="0.08" className="order-2 lg:order-1">
          <div className="location-decorative-map relative mx-auto max-w-[32rem]">
            <div
              className="arch pointer-events-none absolute -inset-3 border border-[color:var(--color-hairline)] md:-inset-4"
              aria-hidden="true"
            />
            <div className="arch relative overflow-hidden bg-surface-strong px-8 pb-10 pt-24 text-accent-soft shadow-strong transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.012] md:px-12 md:pb-14 md:pt-32">
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
              >
                <pattern id="location-grid" width="28" height="28" patternUnits="userSpaceOnUse">
                  <path d="M28 0H0V28" fill="none" stroke="currentColor" strokeWidth="0.6" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#location-grid)" />
              </svg>
              <div
                className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full"
                style={{ background: 'radial-gradient(closest-side, rgba(214,166,107,0.22), transparent 70%)' }}
                aria-hidden="true"
              />
              <div className="relative">
                <IllustratedMapIcon />
              </div>
            </div>
          </div>
          <div className="mx-auto mt-6 flex max-w-[32rem] flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-xs text-text-body/60">
            <span className="font-display text-sm italic text-text-body/75">Sepotong suasana lingkungan.</span>
            <span>Ilustrasi, bukan peta lokasi</span>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <p className="location-reveal-text section-mark mb-6">{content.sectionLabel}</p>

          <h2 className="location-reveal-text font-display text-[clamp(2.6rem,5.4vw,4.4rem)] leading-[1] tracking-[-0.03em] text-text-heading">
            {content.title}
          </h2>

          <p className="location-reveal-text mt-6 max-w-md text-[1.05rem] font-light leading-[1.8] text-text-body/85">
            {content.description}
          </p>

          {infoRows.length > 0 ? (
            <ul className="mt-10 border-t border-[color:var(--color-hairline)]">
              {infoRows.map((row) => (
                <li
                  key={row.id}
                  className="location-info-row group flex items-start gap-5 border-b border-[color:var(--color-hairline)] py-5"
                >
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-[color:var(--color-hairline)] text-accent transition-colors duration-500 group-hover:bg-accent group-hover:text-[var(--palette-milk-foam)]">
                    {row.icon}
                  </span>
                  <span className="flex flex-col gap-1 pt-0.5 text-sm leading-relaxed">
                    <span className="font-display text-lg text-text-heading">{row.label}</span>
                    <span className="italic text-text-body/65">{row.value}</span>
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default LocationMap
