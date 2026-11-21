import { useEffect, useRef } from 'react'

/**
 * Hujan biji kopi berbasis <canvas>.
 * - Biji digambar sekali ke sprite offscreen, lalu hanya di-drawImage tiap frame (murah).
 * - 3 lapis kedalaman: dekat (besar, cepat, tajam) → jauh (kecil, pelan, pudar).
 * - Parallax: tiap lapis bergeser berbeda saat scroll & (desktop) mengikuti kursor.
 * - Mobile: jumlah biji lebih sedikit, DPR dibatasi, 30fps, tanpa efek kursor.
 * - Berhenti otomatis saat di luar layar / tab tidak aktif; statis saat reduced-motion.
 */

export interface CoffeeBeanRainProps {
  /** Jumlah biji di desktop. Mobile otomatis ~40%. */
  density?: number
  /** Nada warna biji: 'roast' (gelap) untuk latar terang/gelap umum, 'light' untuk latar sangat gelap. */
  tone?: 'roast' | 'light'
  className?: string
  /** Kekuatan parallax scroll (0–1). */
  parallaxStrength?: number
}

interface Bean {
  x: number
  y: number
  depth: number // 0 = jauh, 1 = dekat
  speed: number
  rotation: number
  spin: number
  swayPhase: number
  swayAmp: number
  tilt: number // 0..1 → efek biji berputar 3D (skala X)
  tiltSpeed: number
  sprite: number
}

const SPRITE_SIZE = 96

const drawBeanSprite = (
  ctx: CanvasRenderingContext2D,
  size: number,
  palette: { body: string; shade: string; light: string; crease: string },
  softness: number,
) => {
  const cx = size / 2
  const cy = size / 2
  const rx = size * 0.27
  const ry = size * 0.38

  ctx.save()
  ctx.translate(cx, cy)

  // bayangan lembut
  ctx.shadowColor = 'rgba(10, 5, 3, 0.35)'
  ctx.shadowBlur = size * (0.06 + softness * 0.12)
  ctx.shadowOffsetY = size * 0.03

  const body = ctx.createRadialGradient(-rx * 0.35, -ry * 0.45, rx * 0.1, 0, 0, ry * 1.1)
  body.addColorStop(0, palette.light)
  body.addColorStop(0.45, palette.body)
  body.addColorStop(1, palette.shade)

  ctx.fillStyle = body
  ctx.beginPath()
  ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2)
  ctx.fill()

  ctx.shadowColor = 'transparent'

  // alur tengah biji (huruf S)
  ctx.strokeStyle = palette.crease
  ctx.lineWidth = size * 0.045
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(0, -ry * 0.82)
  ctx.bezierCurveTo(rx * 0.55, -ry * 0.3, -rx * 0.55, ry * 0.3, 0, ry * 0.82)
  ctx.stroke()

  // kilau tipis
  ctx.globalAlpha = 0.35
  ctx.strokeStyle = palette.light
  ctx.lineWidth = size * 0.02
  ctx.beginPath()
  ctx.ellipse(-rx * 0.35, -ry * 0.1, rx * 0.35, ry * 0.6, 0.15, Math.PI * 1.05, Math.PI * 1.55)
  ctx.stroke()

  ctx.restore()
}

const PALETTES = {
  roast: [
    { body: '#4a2c1d', shade: '#1f120b', light: '#8a5a3a', crease: '#140b06' },
    { body: '#5a3622', shade: '#26150c', light: '#9b6844', crease: '#170c07' },
    { body: '#3d2418', shade: '#1a0f09', light: '#7a4d31', crease: '#110904' },
  ],
  light: [
    { body: '#6b4128', shade: '#2e1a0f', light: '#c08a5c', crease: '#1a0e07' },
    { body: '#7a4b2e', shade: '#341e11', light: '#d29a68', crease: '#1d1008' },
    { body: '#5c3720', shade: '#28170c', light: '#ad7a4f', crease: '#160c06' },
  ],
}

export const CoffeeBeanRain = ({
  density = 26,
  tone = 'roast',
  className,
  parallaxStrength = 0.35,
}: CoffeeBeanRainProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    const isMobile = window.matchMedia('(max-width: 767px)').matches
    const isCoarse = window.matchMedia('(pointer: coarse)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2)
    const beanCount = Math.max(6, Math.round(isMobile ? density * 0.4 : density))
    const frameInterval = isMobile ? 1000 / 30 : 0

    // ── sprite: 3 varian warna × 2 tingkat kelembutan
    const sprites: HTMLCanvasElement[] = []
    PALETTES[tone].forEach((palette) => {
      ;[0, 1].forEach((softness) => {
        const sprite = document.createElement('canvas')
        sprite.width = SPRITE_SIZE
        sprite.height = SPRITE_SIZE
        const sctx = sprite.getContext('2d')
        if (sctx) drawBeanSprite(sctx, SPRITE_SIZE, palette, softness)
        sprites.push(sprite)
      })
    })

    let width = 0
    let height = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()

    const makeBean = (initial: boolean, keepDepth?: number): Bean => {
      // lebih banyak biji jauh daripada dekat
      const depth = keepDepth ?? Math.pow(Math.random(), 1.4)
      return {
        x: Math.random() * width,
        y: initial ? Math.random() * height : -60 - Math.random() * height * 0.4,
        depth,
        speed: 18 + depth * 46 + Math.random() * 10,
        rotation: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * (0.5 + depth * 1.2),
        swayPhase: Math.random() * Math.PI * 2,
        swayAmp: 6 + Math.random() * 18,
        tilt: Math.random() * Math.PI * 2,
        tiltSpeed: 0.6 + Math.random() * 1.4,
        sprite:
          Math.floor(Math.random() * PALETTES[tone].length) * 2 + (depth < 0.45 ? 1 : 0),
      }
    }

    const beans: Bean[] = Array.from({ length: beanCount }, () => makeBean(true))
    beans.sort((a, b) => a.depth - b.depth)

    // parallax state
    let scrollOffset = 0
    let pointerX = 0
    let pointerY = 0
    let easedPX = 0
    let easedPY = 0

    const readScroll = () => {
      const rect = canvas.getBoundingClientRect()
      scrollOffset = -rect.top
    }

    const handlePointer = (event: PointerEvent) => {
      pointerX = event.clientX / window.innerWidth - 0.5
      pointerY = event.clientY / window.innerHeight - 0.5
    }

    const draw = (dt: number, time: number) => {
      ctx.clearRect(0, 0, width, height)

      easedPX += (pointerX - easedPX) * 0.05
      easedPY += (pointerY - easedPY) * 0.05

      for (const bean of beans) {
        if (dt > 0) {
          bean.y += bean.speed * dt
          bean.rotation += bean.spin * dt
          bean.tilt += bean.tiltSpeed * dt
          if (bean.y > height + 80) {
            Object.assign(bean, makeBean(false, bean.depth))
          }
        }

        const size = 14 + bean.depth * 34
        const sway = Math.sin(time * 0.0006 + bean.swayPhase) * bean.swayAmp * (0.4 + bean.depth)
        const parallaxY = scrollOffset * parallaxStrength * (0.15 + bean.depth * 0.85)
        const parallaxX = easedPX * 40 * bean.depth
        const parallaxPY = easedPY * 24 * bean.depth

        // posisi y dengan wrap agar tetap mengisi area saat discroll
        const span = height + 160
        let drawY = (bean.y - parallaxY + parallaxPY + 80) % span
        if (drawY < 0) drawY += span
        drawY -= 80

        const scaleX = 0.55 + Math.abs(Math.cos(bean.tilt)) * 0.45

        ctx.save()
        ctx.globalAlpha = 0.35 + bean.depth * 0.65
        ctx.translate(bean.x + sway + parallaxX, drawY)
        ctx.rotate(bean.rotation)
        ctx.scale(scaleX, 1)
        ctx.drawImage(sprites[bean.sprite], -size / 2, -size / 2, size, size)
        ctx.restore()
      }
    }

    // reduced motion → gambar sekali saja
    if (reducedMotion) {
      draw(0, 0)
      const handleStaticResize = () => {
        resize()
        draw(0, 0)
      }
      window.addEventListener('resize', handleStaticResize)
      return () => window.removeEventListener('resize', handleStaticResize)
    }

    let rafId = 0
    let lastTime = 0
    let lastDraw = 0
    let isVisible = true

    const loop = (time: number) => {
      rafId = requestAnimationFrame(loop)
      if (!isVisible || document.hidden) {
        lastTime = time
        return
      }
      if (frameInterval && time - lastDraw < frameInterval) return
      lastDraw = time

      const dt = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0
      lastTime = time
      readScroll()
      draw(dt, time)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
      },
      { rootMargin: '80px' },
    )
    observer.observe(canvas)

    let resizeTimer = 0
    const handleResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        const oldW = width
        resize()
        if (oldW > 0) {
          const ratio = width / oldW
          beans.forEach((bean) => {
            bean.x *= ratio
          })
        }
      }, 120)
    }

    window.addEventListener('resize', handleResize)
    if (!isCoarse) window.addEventListener('pointermove', handlePointer, { passive: true })

    rafId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafId)
      observer.disconnect()
      window.clearTimeout(resizeTimer)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('pointermove', handlePointer)
    }
  }, [density, tone, parallaxStrength])

  return (
    <canvas
      ref={canvasRef}
      className={className ?? 'pointer-events-none absolute inset-0 h-full w-full'}
      aria-hidden="true"
    />
  )
}
