import { useEffect, useMemo, useRef, useState } from 'react'
import type { NavLinkId, NavLinkItem, ThemeMode } from '../../types'
import { scrollToTarget } from '../../lib/lenis'
import { useActiveSection } from '../../hooks/useActiveSection'

const THEME_STORAGE_KEY = 'kopken-theme'

const PRIMARY_NAV_LINKS: NavLinkItem[] = [
  { id: 'beranda', label: 'Beranda', href: '#beranda' },
  { id: 'tentang', label: 'Tentang', href: '#tentang' },
  { id: 'visi-misi', label: 'Visi & Misi', href: '#visi-misi' },
  { id: 'nilai', label: 'Nilai Kami', href: '#nilai' },
  { id: 'lokasi', label: 'Lokasi', href: '#lokasi' },
]

const MITRA_NAV_LINK: NavLinkItem = {
  id: 'mitra',
  label: 'Mitra',
  href: '#mitra',
}

const KONTAK_NAV_LINK: NavLinkItem = {
  id: 'kontak',
  label: 'Kontak',
  href: '#kontak',
}

const readInitialTheme = (): ThemeMode => {
  if (typeof window === 'undefined') {
    return 'light'
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)

  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

const SunIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M12 2.5V5M12 19V21.5M4.5 12H2M22 12H19.5M5.6 5.6L7.4 7.4M18.4 18.4L16.6 16.6M18.4 5.6L16.6 7.4M5.6 18.4L7.4 16.6"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
)

const MoonIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M20 14.2C18.7 14.8 17.3 15.1 15.9 15.1C10.6 15.1 6.3 10.8 6.3 5.5C6.3 4.1 6.6 2.7 7.2 1.5C4 2.9 1.8 6.1 1.8 9.8C1.8 14.9 5.9 19 11 19C14.7 19 17.9 16.8 19.3 13.6C19.5 13.8 19.8 14 20 14.2Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
)

const MenuIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M4 7H20"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      className="origin-center transition-transform duration-300"
      style={{
        transform: isOpen ? 'translateY(5px) rotate(45deg)' : 'none',
        transformBox: 'fill-box',
      }}
    />
    <path
      d="M4 12H20"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      className="transition-opacity duration-200"
      style={{ opacity: isOpen ? 0 : 1 }}
    />
    <path
      d="M4 17H20"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      className="origin-center transition-transform duration-300"
      style={{
        transform: isOpen ? 'translateY(-5px) rotate(-45deg)' : 'none',
        transformBox: 'fill-box',
      }}
    />
  </svg>
)

const LogoMark = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M10 20H32V30C32 36.6 26.6 42 20 42C13.4 42 8 36.6 8 30V20Z"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinejoin="round"
    />
    <path
      d="M32 22H36C38.76 22 41 24.24 41 27C41 29.76 38.76 32 36 32H32.8"
      stroke="currentColor"
      strokeWidth="2.4"
    />
    <path
      d="M15 12C15 9 18 8 18 5M22 12C22 9 25 8 25 5"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
  </svg>
)

const ArrowIcon = () => (
  <svg
    width="12"
    height="12"
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

export interface NavbarProps {
  showMitraLink?: boolean
}

export const Navbar = ({ showMitraLink = false }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [theme, setTheme] = useState<ThemeMode>(readInitialTheme)
  const progressRef = useRef<HTMLSpanElement | null>(null)

  const navLinks = useMemo<NavLinkItem[]>(
    () =>
      showMitraLink ? [...PRIMARY_NAV_LINKS, MITRA_NAV_LINK] : PRIMARY_NAV_LINKS,
    [showMitraLink],
  )

  const sectionIds = useMemo(
    () => [...navLinks.map((link) => link.id), KONTAK_NAV_LINK.id] as NavLinkId[],
    [navLinks],
  )

  const activeSectionId = useActiveSection(sectionIds)

  useEffect(() => {
    let frameId = 0

    const update = () => {
      frameId = 0
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight
      const ratio = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${ratio})`
      }

      setIsScrolled(window.scrollY > 24)
    }

    const requestUpdate = () => {
      if (frameId === 0) {
        frameId = window.requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId)
      }
    }
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

  const handleNavigate = (
    event: React.MouseEvent<HTMLAnchorElement>,
    sectionId: NavLinkId,
  ) => {
    event.preventDefault()
    scrollToTarget(`#${sectionId}`, -80)
    setIsMenuOpen(false)
  }

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
  }

  const isDark = theme === 'dark'

  const shellClass =
    isScrolled || isMenuOpen
      ? 'border-[color:var(--color-hairline)] bg-[rgba(29,19,14,0.82)] text-[var(--palette-milk-foam)] shadow-strong backdrop-blur-xl backdrop-saturate-150'
      : 'border-transparent bg-transparent text-[var(--palette-milk-foam)]'

  const contactClass =
    'bg-[var(--palette-milk-foam)] text-[var(--palette-espresso)] hover:bg-accent hover:text-[var(--palette-milk-foam)]'

  const iconSwap = 'absolute inset-0 flex items-center justify-center transition-all duration-500'

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
      <div
        className={`relative mx-auto max-w-5xl overflow-hidden border transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isMenuOpen ? 'rounded-[1.5rem]' : 'rounded-full'
        } ${shellClass}`}
      >
        <nav
          className="flex items-center justify-between gap-3 py-1.5 pl-1.5 pr-1.5 md:pl-2"
          aria-label="Navigasi utama"
        >
          <a
            href="#beranda"
            onClick={(event) => handleNavigate(event, 'beranda')}
            className="flex items-center gap-2.5 rounded-full pr-2"
          >
            <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-[color:var(--color-hairline)] bg-accent text-[var(--palette-milk-foam)]">
              <LogoMark />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-[0.95rem] font-medium tracking-[-0.01em]">
                Kopi Kenangan
              </span>
              <span className="mt-0.5 font-display text-[0.68rem] italic text-accent-soft">
                Margasatwa
              </span>
            </span>
          </a>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map((link) => {
              const isActive = activeSectionId === link.id
              return (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={(event) => handleNavigate(event, link.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`group relative inline-flex items-center px-3 py-1.5 text-[13px] leading-none tracking-[0.01em] transition-opacity duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-accent-soft transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'}
              aria-pressed={isDark}
              className="relative h-8 w-8 flex-none rounded-full border border-current/20 transition-colors duration-300 hover:border-accent-soft hover:text-accent-soft"
            >
              <span
                className={`${iconSwap} ${
                  isDark
                    ? 'rotate-0 scale-100 opacity-100'
                    : 'rotate-90 scale-50 opacity-0'
                }`}
              >
                <SunIcon />
              </span>
              <span
                className={`${iconSwap} ${
                  isDark
                    ? '-rotate-90 scale-50 opacity-0'
                    : 'rotate-0 scale-100 opacity-100'
                }`}
              >
                <MoonIcon />
              </span>
            </button>

            <a
              href={KONTAK_NAV_LINK.href}
              onClick={(event) => handleNavigate(event, KONTAK_NAV_LINK.id)}
              className={`hidden h-8 items-center gap-2 rounded-full px-4 text-[13px] font-medium leading-none transition-colors duration-300 lg:inline-flex ${contactClass}`}
            >
              {KONTAK_NAV_LINK.label}
              <ArrowIcon />
            </a>

            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav-panel"
              aria-label={isMenuOpen ? 'Tutup menu' : 'Buka menu'}
              className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-current/20 lg:hidden"
            >
              <MenuIcon isOpen={isMenuOpen} />
            </button>
          </div>
        </nav>

        {isMenuOpen ? (
          <div
            id="mobile-nav-panel"
            className="border-t border-[color:var(--color-hairline)] px-2 pb-3 pt-2 lg:hidden"
          >
            <ul className="flex flex-col gap-0.5">
              {[...navLinks, KONTAK_NAV_LINK].map((link, index) => {
                const isActive = activeSectionId === link.id
                return (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      onClick={(event) => handleNavigate(event, link.id)}
                      aria-current={isActive ? 'page' : undefined}
                      style={{ animation: `kopken-rise 0.6s cubic-bezier(0.22,1,0.36,1) ${index * 45}ms both` }}
                      className={`flex items-center justify-between rounded-xl px-3 py-2.5 font-display text-lg transition-colors duration-300 hover:bg-white/5 ${
                        isActive ? 'text-accent-soft' : ''
                      }`}
                    >
                      {link.label}
                      <span className="font-body text-[10px] opacity-50" aria-hidden="true">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        ) : null}

        <span
          ref={progressRef}
          aria-hidden="true"
          className={`absolute bottom-0 left-0 h-px w-full origin-left bg-accent-soft transition-opacity duration-500 ${
            isScrolled ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transform: 'scaleX(0)' }}
        />
      </div>
    </header>
  )
}
