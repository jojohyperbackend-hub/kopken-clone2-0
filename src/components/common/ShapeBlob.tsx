export type ShapeBlobVariant = 'organic' | 'wave-divider' | 'corner-frame'

export interface ShapeBlobProps {
  variant?: ShapeBlobVariant
  className?: string
}

const organicPath =
  'M50 6C68 2 92 14 96 38C100 64 82 92 54 96C28 100 2 82 2 54C2 28 28 10 50 6Z'

const wavePath =
  'M0 40C120 10 240 70 360 40C480 10 600 70 720 40C840 10 960 70 1080 40C1200 10 1320 70 1440 40V100H0V40Z'

const cornerFramePath =
  'M0 72C0 32.2355 32.2355 0 72 0H280C319.765 0 352 32.2355 352 72V280C352 319.765 384.235 352 424 352H0V72Z'

const viewBoxByVariant: Record<ShapeBlobVariant, string> = {
  organic: '0 0 100 100',
  'wave-divider': '0 0 1440 100',
  'corner-frame': '0 0 424 352',
}

const pathByVariant: Record<ShapeBlobVariant, string> = {
  organic: organicPath,
  'wave-divider': wavePath,
  'corner-frame': cornerFramePath,
}

export const ShapeBlob = ({
  variant = 'organic',
  className,
}: ShapeBlobProps) => {
  return (
    <svg
      viewBox={viewBoxByVariant[variant]}
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d={pathByVariant[variant]} fill="currentColor" />
    </svg>
  )
}
