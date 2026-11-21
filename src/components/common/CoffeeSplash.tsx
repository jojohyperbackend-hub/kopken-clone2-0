import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'

/**
 * Efek cipratan cairan kopi berbasis <canvas>.
 * - Klik / tap di area `targetRef` → mahkota cipratan + tetesan yang jatuh kena gravitasi.
 * - Tetesan digambar memanjang searah kecepatan (kesan cairan), dengan kilau krema.
 * - Saat tetesan mendarat → noda kecil yang memudar.
 * - `ambient`: cipratan otomatis sesekali saat area terlihat di layar.
 * - Loop rAF hanya jalan saat ada partikel; mati total saat reduced-motion.
 */

export interface CoffeeSplashProps {
  /** Elemen yang menerima klik/tap. Kalau kosong, pakai parent canvas. */
  targetRef?: RefObject<HTMLElement | null>
  /** Cipratan otomatis berkala (ms). 0 = mati. */
  ambientInterval?: number
  /** Skala besar cipratan (1 = normal). */
  intensity?: number
  /** 'espresso' untuk latar terang, 'latte' untuk latar gelap. */
  tone?: keyof typeof COFFEE_TONES
  className?: string
}

interface Drop {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  life: number
  maxLife: number
  color: string
  floorY: number
}

interface Ring {
  x: number
  y: number
  r: number
  maxR: number
  life: number
  maxLife: number
}

interface Stain {
  x: number
  y: number
  rx: number
  ry: number
  life: number
  maxLife: number
  color: string
}

const COFFEE_TONES = {
  /** kopi pekat — untuk latar terang */
  espresso: ['#2e180c', '#3f2213', '#55301b', '#6b3e22', '#7d4a2a'],
  /** kopi susu / karamel — tetap kelihatan di latar gelap */
  latte: ['#7d4a2a', '#8f5530', '#a4663a', '#b87a3d', '#9a5f36'],
}
const CREMA = ['#c08a5c', '#d6a66b', '#e8cfae']
const GRAVITY = 1500
const IGNORE_SELECTOR = 'a, button, input, textarea, select, label, [data-no-splash]'

const pick = <T,>(list: T[]) => list[Math.floor(Math.random() * list.length)]

export const CoffeeSplash = ({
  targetRef,
  ambientInterval = 0,
  intensity = 1,
  tone = 'latte',
  className = '',
}: CoffeeSplashProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const target = targetRef?.current ?? canvas.parentElement
    if (!target) return undefined

    const COFFEE = COFFEE_TONES[tone]
    const isMobile = window.matchMedia('(max-width: 767px)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2)
    const scale = (isMobile ? 0.75 : 1) * intensity

    let width = 0
    let height = 0
    const drops: Drop[] = []
    const rings: Ring[] = []
    const stains: Stain[] = []
    let frameId = 0
    let last = 0
    let visible = true

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.max(1, Math.round(width * dpr))
      canvas.height = Math.max(1, Math.round(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)

    const splash = (x: number, y: number) => {
      // gelombang mahkota
      rings.push({ x, y, r: 4, maxR: 70 * scale, life: 0, maxLife: 0.7 })
      rings.push({ x, y, r: 2, maxR: 40 * scale, life: -0.08, maxLife: 0.6 })

      const floorY = y + 6 + Math.random() * 30
      const count = Math.round((isMobile ? 18 : 28) * Math.min(intensity, 1.4))

      for (let i = 0; i < count; i += 1) {
        // sebaran ke atas, sebagian kecil menyamping
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.95
        const speed = (220 + Math.random() * 520) * scale
        const isCrema = Math.random() < 0.22
        drops.push({
          x: x + (Math.random() - 0.5) * 10,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r: (1.6 + Math.random() * (isCrema ? 2.4 : 4.6)) * scale,
          life: 0,
          maxLife: 1.6 + Math.random() * 0.8,
          color: isCrema ? pick(CREMA) : pick(COFFEE),
          floorY: floorY + (Math.random() - 0.5) * 40,
        })
      }

      // kolom tengah (jet) — beberapa tetes besar naik lurus
      for (let i = 0; i < 3; i += 1) {
        drops.push({
          x: x + (Math.random() - 0.5) * 6,
          y,
          vx: (Math.random() - 0.5) * 40,
          vy: -(520 + i * 90 + Math.random() * 120) * scale,
          r: (4.5 - i) * scale + 1.5,
          life: 0,
          maxLife: 2,
          color: pick(COFFEE),
          floorY,
        })
      }

      stains.push({
        x,
        y: floorY,
        rx: 26 * scale,
        ry: 7 * scale,
        life: 0,
        maxLife: 1.4,
        color: COFFEE[3],
      })

      if (!frameId) {
        last = performance.now()
        frameId = requestAnimationFrame(tick)
      }
    }

    const drawDrop = (d: Drop, alpha: number) => {
      const speed = Math.hypot(d.vx, d.vy)
      const stretch = Math.min(speed * 0.018, 3.2)
      const angle = Math.atan2(d.vy, d.vx)

      ctx.save()
      ctx.translate(d.x, d.y)
      ctx.rotate(angle)
      ctx.globalAlpha = alpha

      // badan tetesan memanjang (ekor di belakang)
      ctx.fillStyle = d.color
      ctx.beginPath()
      ctx.ellipse(-d.r * stretch * 0.5, 0, d.r * (1 + stretch * 0.6), d.r * 0.92, 0, 0, Math.PI * 2)
      ctx.fill()

      // kepala bulat
      ctx.beginPath()
      ctx.arc(0, 0, d.r, 0, Math.PI * 2)
      ctx.fill()

      // kilau
      ctx.globalAlpha = alpha * 0.55
      ctx.fillStyle = '#f5e6d0'
      ctx.beginPath()
      ctx.arc(d.r * 0.25, -d.r * 0.35, d.r * 0.32, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    const tick = (now: number) => {
      const dt = Math.min(Math.max((now - last) / 1000, 0), 0.033)
      last = now
      ctx.clearRect(0, 0, width, height)

      // noda di "lantai"
      for (let i = stains.length - 1; i >= 0; i -= 1) {
        const s = stains[i]
        s.life += dt
        const t = s.life / s.maxLife
        if (t >= 1) {
          stains.splice(i, 1)
          continue
        }
        const grow = 1 - Math.pow(1 - Math.min(t * 3, 1), 3)
        ctx.globalAlpha = (1 - t) * 0.45
        ctx.fillStyle = s.color
        ctx.beginPath()
        ctx.ellipse(s.x, s.y, Math.max(0, s.rx * grow), Math.max(0, s.ry * grow), 0, 0, Math.PI * 2)
        ctx.fill()
      }

      // cincin mahkota
      for (let i = rings.length - 1; i >= 0; i -= 1) {
        const ring = rings[i]
        ring.life += dt
        if (ring.life < 0) continue
        const t = Math.max(0, ring.life / ring.maxLife)
        if (t >= 1) {
          rings.splice(i, 1)
          continue
        }
        const ease = 1 - Math.pow(1 - t, 3)
        const r = ring.r + (ring.maxR - ring.r) * ease
        ctx.globalAlpha = (1 - t) * 0.7
        ctx.strokeStyle = CREMA[1]
        ctx.lineWidth = 2.4 * (1 - t) + 0.4
        ctx.beginPath()
        ctx.ellipse(ring.x, ring.y, r, r * 0.28, 0, 0, Math.PI * 2)
        ctx.stroke()
        ctx.globalAlpha = (1 - t) * 0.35
        ctx.strokeStyle = COFFEE[2]
        ctx.lineWidth = 5 * (1 - t)
        ctx.beginPath()
        ctx.ellipse(ring.x, ring.y + 2, r * 0.82, r * 0.22, 0, 0, Math.PI * 2)
        ctx.stroke()
      }

      // tetesan
      for (let i = drops.length - 1; i >= 0; i -= 1) {
        const d = drops[i]
        d.life += dt
        d.vy += GRAVITY * dt
        d.vx *= 0.995
        d.x += d.vx * dt
        d.y += d.vy * dt

        const landed = d.vy > 0 && d.y >= d.floorY
        if (landed || d.life >= d.maxLife || d.y > height + 40) {
          if (landed && d.r > 2.2) {
            stains.push({
              x: d.x,
              y: d.floorY,
              rx: d.r * 2.6,
              ry: d.r * 0.8,
              life: 0,
              maxLife: 0.9,
              color: d.color,
            })
          }
          drops.splice(i, 1)
          continue
        }

        const fade = 1 - Math.max(0, (d.life - d.maxLife * 0.7) / (d.maxLife * 0.3))
        drawDrop(d, fade)
      }

      ctx.globalAlpha = 1

      if (drops.length || rings.length || stains.length) {
        frameId = requestAnimationFrame(tick)
      } else {
        frameId = 0
        ctx.clearRect(0, 0, width, height)
      }
    }

    const handlePointer = (event: PointerEvent) => {
      if (event.button !== 0) return
      const el = event.target as Element | null
      if (el?.closest?.(IGNORE_SELECTOR)) return
      const rect = canvas.getBoundingClientRect()
      splash(event.clientX - rect.left, event.clientY - rect.top)
    }

    target.addEventListener('pointerdown', handlePointer, { passive: true })

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    io.observe(canvas)

    let ambientId = 0
    if (ambientInterval > 0) {
      ambientId = window.setInterval(() => {
        if (!visible || document.hidden || width === 0) return
        splash(width * (0.15 + Math.random() * 0.7), height * (0.55 + Math.random() * 0.3))
      }, ambientInterval)
    }

    return () => {
      target.removeEventListener('pointerdown', handlePointer)
      resizeObserver.disconnect()
      io.disconnect()
      window.clearInterval(ambientId)
      cancelAnimationFrame(frameId)
    }
  }, [targetRef, ambientInterval, intensity, tone])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  )
}
