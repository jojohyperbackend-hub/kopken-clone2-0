import type { ReactNode } from 'react'

export type ContainerWidth = 'default' | 'narrow' | 'full'

export interface MainResponsiveLayoutProps {
  children: ReactNode
  width?: ContainerWidth
  className?: string
}

const widthClassMap: Record<ContainerWidth, string> = {
  default: 'max-w-6xl',
  narrow: 'max-w-3xl',
  full: 'max-w-none',
}

export const MainResponsiveLayout = ({
  children,
  width = 'default',
  className,
}: MainResponsiveLayoutProps) => {
  const widthClass = widthClassMap[width]
  const combinedClassName = className
    ? `mx-auto px-5 md:px-10 ${widthClass} ${className}`
    : `mx-auto px-5 md:px-10 ${widthClass}`

  return <div className={combinedClassName}>{children}</div>
}
