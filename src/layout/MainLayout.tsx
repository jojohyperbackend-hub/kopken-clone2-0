import type { ReactNode } from 'react'
import { Navbar } from '../components/Navbar/Navbar'
import { useLenis } from '../hooks/useLenis'

export interface MainLayoutProps {
  children: ReactNode
  showMitraLink?: boolean
}

export const MainLayout = ({ children, showMitraLink = false }: MainLayoutProps) => {
  useLenis()

  return (
    <div className="bg-bg-base text-text-body">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[100] focus:rounded-md focus:bg-surface-strong focus:px-4 focus:py-2 focus:text-surface-strong-text"
      >
        Lompat ke konten utama
      </a>

      <Navbar showMitraLink={showMitraLink} />

      <main id="main-content">{children}</main>
    </div>
  )
}
