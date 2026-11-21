import { useRef } from 'react'
import PatternWaves from '../PatternWaves/PatternWaves'
import { CoffeeSplash } from '../common/CoffeeSplash'

/**
 * Jeda visual antara Hero dan Tentang:
 * latar PatternWaves (React Bits) + cipratan kopi saat diklik / tap.
 */
export const CoffeeWaves = () => {
  const areaRef = useRef<HTMLDivElement | null>(null)

  return (
    <section aria-label="Gelombang kopi" className="bg-bg-base px-3 pt-3 md:px-6 md:pt-6">
      <div
        ref={areaRef}
        className="overflow-hidden rounded-[2rem] md:rounded-[3rem]"
        style={{ width: '100%', height: '600px', position: 'relative' }}
      >
        <PatternWaves
          preset="silk"
          color="#ffffff"
          backgroundColor="#000000"
          fade="edges"
          interactive
          cursorSize={50}
          cursorStrength={0.6}
        />

        <CoffeeSplash targetRef={areaRef} ambientInterval={3800} intensity={1.15} tone="latte" />

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-[var(--palette-milk-foam)]">
          <p className="mb-5 flex items-center gap-3 font-display text-base italic text-accent-soft">
            <span className="h-px w-8 bg-current opacity-60" aria-hidden="true" />
            Diseduh perlahan
            <span className="h-px w-8 bg-current opacity-60" aria-hidden="true" />
          </p>
          <h2 className="max-w-3xl font-display text-[clamp(2.2rem,6vw,4.8rem)] font-normal leading-[1] tracking-[-0.03em] [text-shadow:0_4px_30px_rgba(0,0,0,0.6)]">
            Setiap tegukan, <span className="italic text-accent-soft">satu gelombang</span> kenangan.
          </h2>
          <p className="mt-6 text-xs uppercase tracking-[0.3em] text-white/55">
            Sentuh atau klik untuk menciprat
          </p>
        </div>
      </div>
    </section>
  )
}
