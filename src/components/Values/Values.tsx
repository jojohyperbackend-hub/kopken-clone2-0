import { useRef } from 'react'
import type { ValueItem, ValuesContent } from '../../types'
import { IconLeaf } from '../common/IconLeaf'
import { IconPaw } from '../common/IconPaw'
import { useScrollTrigger } from '../../hooks/useScrollTrigger'

const RingsIcon = ({ size = 32 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <circle cx="14" cy="22" r="10" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="26" cy="22" r="10" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

const DotGridPattern = ({ id }: { id: string }) => (
  <svg
    className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05]"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <pattern id={id} width="22" height="22" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.4" fill="currentColor" />
    </pattern>
    <rect width="100%" height="100%" fill={`url(#${id})`} />
  </svg>
)

const defaultValueItems: ValueItem[] = [
  {
    id: 'konsisten',
    title: 'Konsisten',
    description:
      'Rasa dan pelayanan yang sama setiap kali pelanggan datang, bukan hanya di awal buka.',
    cardSize: 'large',
  },
  {
    id: 'sederhana',
    title: 'Sederhana',
    description:
      'Tidak berlebihan dalam konsep, fokus pada hal yang penting: kopi yang enak dan tempat yang nyaman.',
    cardSize: 'small',
  },
  {
    id: 'dekat-warga',
    title: 'Dekat dengan Warga',
    description:
      'Berada di tengah lingkungan sekitar Pasar Labu, kami bagian dari keseharian warga di sini — bukan sekadar lewat.',
    cardSize: 'medium',
  },
]

const defaultValuesContent: ValuesContent = {
  sectionLabel: 'Nilai kami',
  title: 'Hal kecil, kami jaga.',
  subtitle: 'Dalam rasa, pelayanan, dan suasana.',
  items: defaultValueItems,
}

export interface ValuesProps {
  content?: ValuesContent
}

const cardSizeClassMap: Record<ValueItem['cardSize'], string> = {
  large:
    'border border-white/[0.06] bg-surface-strong text-surface-strong-text min-h-[22rem] md:min-h-[30rem] p-8 md:p-12',
  medium:
    'border border-[color:var(--color-hairline)] bg-bg-alt/70 min-h-[15rem] p-7 md:p-9',
  small:
    'border border-[color:var(--color-hairline)] bg-bg-base min-h-[15rem] p-7 md:p-9',
}

const titleSizeClassMap: Record<ValueItem['cardSize'], string> = {
  large: 'text-[clamp(2.4rem,4.4vw,3.6rem)] tracking-[-0.025em]',
  medium: 'text-3xl md:text-[2.1rem]',
  small: 'text-3xl md:text-[2.1rem]',
}

const iconBadgeClassMap: Record<ValueItem['cardSize'], string> = {
  large: 'border border-white/15 text-accent-soft',
  medium: 'border border-[color:var(--color-hairline)] text-accent',
  small: 'border border-[color:var(--color-hairline)] text-accent',
}

const valueBadgeLabelMap: Record<string, string> = {
  konsisten: 'Rasa & pelayanan',
  sederhana: 'Seperlunya',
  'dekat-warga': 'Lingkungan',
}

const cardSpeeds = ['0.04', '-0.06', '0.08']

const renderValueIcon = (valueId: string) => {
  if (valueId === 'konsisten') {
    return <RingsIcon size={22} />
  }

  if (valueId === 'sederhana') {
    return <IconLeaf size={22} />
  }

  return <IconPaw size={22} />
}

const renderValueWatermark = (valueId: string) => {
  if (valueId === 'konsisten') {
    return <RingsIcon size={176} />
  }

  if (valueId === 'sederhana') {
    return <IconLeaf size={140} strokeWidth={1} />
  }

  return <IconPaw size={140} strokeWidth={1} />
}

export const Values = ({ content = defaultValuesContent }: ValuesProps) => {
  const sectionRef = useRef<HTMLElement | null>(null)

  useScrollTrigger(sectionRef, {
    revealGroups: ['.values-reveal-heading'],
    decorativeTargets: ['.values-card'],
    parallax: true,
  })

  // urutan tampilan: kartu besar dulu, lainnya menyusul (data asli tidak diubah)
  const orderedItems = [...content.items].sort(
    (first, second) =>
      Number(second.cardSize === 'large') - Number(first.cardSize === 'large'),
  )

  return (
    <section
      id="nilai"
      ref={sectionRef}
      className="relative overflow-hidden bg-bg-base px-5 py-24 text-text-body md:px-10 md:py-36"
    >
      <div className="relative mx-auto max-w-7xl">
        <p className="values-reveal-heading section-mark mb-6">{content.sectionLabel}</p>

        <div className="mb-14 flex flex-col gap-4 md:mb-20 md:flex-row md:items-end md:justify-between">
          <h2 className="values-reveal-heading font-display text-[clamp(2.6rem,5.4vw,4.4rem)] leading-[1] tracking-[-0.03em] text-text-heading">
            {content.title}
          </h2>
          <p className="values-reveal-heading max-w-xs font-display text-lg italic text-text-body/65 md:pb-2 md:text-right">
            {content.subtitle}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-12 md:grid-rows-[auto_auto] md:gap-6">
          {orderedItems.map((item, index) => (
            <div
              key={item.id}
              data-speed={cardSpeeds[index % cardSpeeds.length]}
              className={item.cardSize === 'large' ? 'md:col-span-7 md:row-span-2' : 'md:col-span-5'}
            >
              <article
                className={`values-card group relative flex h-full flex-col justify-between overflow-hidden rounded-[var(--radius-lg)] transition-[transform,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-strong ${cardSizeClassMap[item.cardSize]}`}
              >
                {item.cardSize === 'large' ? (
                  <>
                    <DotGridPattern id={`values-dot-grid-${item.id}`} />
                    <div
                      className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full"
                      style={{ background: 'radial-gradient(closest-side, rgba(214,166,107,0.25), transparent 70%)' }}
                      aria-hidden="true"
                    />
                  </>
                ) : null}

                <span
                  className="pointer-events-none absolute -bottom-8 -right-6 opacity-[0.07] transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-6 group-hover:scale-105"
                  aria-hidden="true"
                >
                  {renderValueWatermark(item.id)}
                </span>

                <div className="relative flex items-center justify-between gap-4">
                  <span
                    className={`font-display text-base italic ${
                      item.cardSize === 'large' ? 'text-accent-soft' : 'text-accent'
                    }`}
                  >
                    {valueBadgeLabelMap[item.id]}
                  </span>
                  <span
                    className={`flex h-12 w-12 flex-none items-center justify-center rounded-full transition-transform duration-700 group-hover:rotate-12 ${iconBadgeClassMap[item.cardSize]}`}
                  >
                    {renderValueIcon(item.id)}
                  </span>
                </div>

                <div className="relative mt-12">
                  <h3 className={`mb-3 font-display font-normal leading-[1.02] ${titleSizeClassMap[item.cardSize]}`}>
                    {item.title}
                  </h3>
                  <p
                    className={`max-w-md font-light leading-[1.75] ${
                      item.cardSize === 'large'
                        ? 'text-[1.05rem] text-surface-strong-text/80'
                        : 'text-[0.97rem] text-text-body/80'
                    }`}
                  >
                    {item.description}
                  </p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
