export type ThemeMode = 'light' | 'dark'

export type NavLinkId =
  | 'beranda'
  | 'tentang'
  | 'visi-misi'
  | 'nilai'
  | 'lokasi'
  | 'mitra'
  | 'kontak'

export interface NavLinkItem {
  id: NavLinkId
  label: string
  href: string
}

export interface HeroContent {
  eyebrow: string
  headline: string
  subheadline: string
  ctaLabel: string
  scrollHintLabel: string
  assetSrc: string
  assetAlt: string
}

export interface AboutContent {
  sectionLabel: string
  title: string
  paragraphs: string[]
  personalStoryPlaceholder: string | null
}

export interface MissionPoint {
  id: string
  label: string
}

export interface VisionMissionContent {
  sectionLabel: string
  visionTitle: string
  visionStatement: string
  missionTitle: string
  missionPoints: MissionPoint[]
}

export type ValueCardSize = 'large' | 'medium' | 'small'

export interface ValueItem {
  id: string
  title: string
  description: string
  cardSize: ValueCardSize
}

export interface ValuesContent {
  sectionLabel: string
  title: string
  subtitle: string
  items: ValueItem[]
}

export interface LocationContent {
  sectionLabel: string
  title: string
  description: string
  addressPlaceholder: string | null
  landmarkPlaceholder: string | null
  operatingHoursPlaceholder: string | null
}

export interface PartnerBadge {
  id: string
  name: string
}

export interface PartnersContent {
  sectionLabel: string
  isVisible: boolean
  badges: PartnerBadge[]
}

export interface ContactChannel {
  id: string
  label: string
  value: string | null
}

export interface CtaContent {
  eyebrow: string
  headline: string
  description: string
  ctaLabel: string
  contactChannels: ContactChannel[]
}

export type ScrollRevealVariant = 'fade-slide-up' | 'fade-scale' | 'fade-only'

export interface ScrollRevealConfig {
  variant: ScrollRevealVariant
  distance: number
  duration: number
  staggerStep: number
  easing: string
}

export type DeviceMotionProfile = 'desktop' | 'mobile' | 'reduced'

export interface MatchMediaBreakpoints {
  desktop: string
  mobile: string
  reducedMotion: string
}

export interface LenisConfig {
  duration: number
  easing: (time: number) => number
  smoothWheel: boolean
  touchMultiplier: number
}
