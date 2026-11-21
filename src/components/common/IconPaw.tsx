export interface IconPawProps {
  size?: number
  strokeWidth?: number
  className?: string
}

export const IconPaw = ({
  size = 32,
  strokeWidth = 1.5,
  className,
}: IconPawProps) => {
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
      <ellipse
        cx="24"
        cy="30"
        rx="11"
        ry="9"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <ellipse
        cx="12"
        cy="16"
        rx="4.2"
        ry="5.2"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <ellipse
        cx="22"
        cy="11"
        rx="4.2"
        ry="5.4"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <ellipse
        cx="33"
        cy="12"
        rx="4"
        ry="5.2"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <ellipse
        cx="40"
        cy="20"
        rx="3.8"
        ry="4.8"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    </svg>
  )
}
