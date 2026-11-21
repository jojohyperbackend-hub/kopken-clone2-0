export interface IconLeafProps {
  size?: number
  strokeWidth?: number
  className?: string
}

export const IconLeaf = ({
  size = 32,
  strokeWidth = 1.5,
  className,
}: IconLeafProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12 36C10 26 14 14 32 10C36 10 38 12 38 16C34 34 22 38 12 36Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 34C20 26 26 18 36 12"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
