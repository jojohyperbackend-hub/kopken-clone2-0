import { useRef } from 'react'
import type { MissionPoint, VisionMissionContent } from '../../types'
import { CoffeeBeanRain } from '../common/CoffeeBeanRain'
import { formatOrdinalSectionIndex } from '../../utils/formatNumber'
import { useScrollTrigger } from '../../hooks/useScrollTrigger'

const defaultMissionPoints: MissionPoint[] = [
  {
    id: 'misi-1',
    label: 'Menyajikan kopi dengan kualitas yang konsisten setiap hari',
  },
  {
    id: 'misi-2',
    label: 'Memberikan pelayanan yang ramah dan tidak terburu-buru',
  },
  {
    id: 'misi-3',
    label: 'Menjaga suasana tempat agar nyaman untuk nongkrong maupun kerja',
  },
]

const missionPlaceholder =
  'Kopi Kenangan menetapkan visi dan misi harga yang terjangkau karena mereka ingin mengisi celah pasar di Indonesia dengan menyediakan kopi lokal berkualitas tinggi yang bisa dinikmati sebagai rutinitas harian oleh kalangan muda dan masyarakat kelas menengah tanpa harus membayar mahal seperti di kedai kopi internasional, yang diwujudkan melalui efisiensi biaya operasional lewat konsep kedai grab-and-go demi mengejar volume penjualan dan ekspansi yang cepat.'

const defaultVisionMissionContent: VisionMissionContent = {
  sectionLabel: 'Visi & Misi',
  visionTitle: 'Visi kami',
  visionStatement:
    'Menjadi tempat ngopi yang nyaman dan dipercaya oleh warga sekitar Pasar Labu dan sekitarnya.',
  missionTitle: 'Yang kami jaga',
  missionPoints: defaultMissionPoints,
}

export interface VisionMissionProps {
  content?: VisionMissionContent
}

export const VisionMission = ({
  content = defaultVisionMissionContent,
}: VisionMissionProps) => {
  const sectionRef = useRef<HTMLElement | null>(null)

  useScrollTrigger(sectionRef, {
    revealGroups: ['.vm-reveal-vision', '.vm-reveal-mission-item'],
    parallax: true,
  })

  return (
    <section
      id="visi-misi"
      ref={sectionRef}
      className="relative z-10 bg-bg-base px-3 md:px-6"
    >
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-surface-strong px-5 py-24 text-surface-strong-text md:rounded-[3rem] md:px-12 md:py-32">
        {/* biji kopi samar, lapisan jauh */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-40" aria-hidden="true">
          <CoffeeBeanRain density={12} tone="light" parallaxStrength={0.2} />
        </div>
        <div
          data-speed="0.2"
          className="pointer-events-none absolute -left-40 top-0 -z-10 h-[40rem] w-[40rem] rounded-full"
          style={{ background: 'radial-gradient(closest-side, rgba(184,122,61,0.22), transparent 70%)' }}
          aria-hidden="true"
        />

        <div className="mx-auto max-w-7xl">
          <p className="section-mark mb-14 !text-accent-soft md:mb-20">{content.sectionLabel}</p>

          <div className="grid gap-16 lg:grid-cols-[1.35fr_1fr] lg:gap-24">
            <div className="relative">
              <div data-speed="0.25" className="pointer-events-none absolute -left-2 top-6 md:-left-8 md:top-4">
                <span
                  className="block font-display text-[9rem] leading-none text-accent-soft opacity-[0.18] md:text-[14rem]"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
              </div>
              <p className="vm-reveal-vision relative mb-6 font-display text-lg italic text-accent-soft">
                {content.visionTitle}
              </p>
              <h2 className="vm-reveal-vision relative font-display text-[clamp(2.1rem,4.4vw,3.75rem)] font-normal leading-[1.12] tracking-[-0.02em]">
                {content.visionStatement}
              </h2>
              <svg
                width="72"
                height="44"
                viewBox="0 0 56 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="vm-reveal-vision mt-10 text-accent-soft"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M4 32C14 10 30 10 36 24C40 33 48 30 52 20"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <path
                  d="M44 16L52 20L46 26"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="lg:pt-14">
              <h3 className="mb-8 font-display text-2xl font-normal">
                {content.missionTitle}
              </h3>
              <ol className="border-t border-white/12">
                {content.missionPoints.map((point, index) => (
                  <li
                    key={point.id}
                    className="vm-reveal-mission-item group grid grid-cols-[3.25rem_1fr] items-baseline gap-2 border-b border-white/12 py-6"
                  >
                    <span className="font-display text-2xl italic text-accent-soft/80 transition-colors duration-500 group-hover:text-accent-soft">
                      {formatOrdinalSectionIndex(index + 1)}
                    </span>
                    <p className="text-[1.02rem] font-light leading-relaxed text-surface-strong-text/85">
                      {point.label}
                    </p>
                  </li>
                ))}
                <li className="vm-reveal-mission-item grid grid-cols-[3.25rem_1fr] gap-2 py-6 text-sm italic text-surface-strong-text/55">
                  <span aria-hidden="true" className="font-display text-2xl not-italic text-white/20">+</span>
                  <span>{missionPlaceholder}</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
