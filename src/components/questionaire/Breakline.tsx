interface BreakLineProps {
  variant?: 'black' | 'pink' | 'purple'
  width?: number
}

const BreakLine = ({ variant = 'black', width }: BreakLineProps) => {
  const lineColor =
    variant === 'black'
      ? 'bg-black'
      : variant === 'pink'
        ? 'bg-main-pink'
        : 'bg-sub-purple'
  return (
    <div
      className={`h-px w-full ${lineColor}`}
      style={{ maxWidth: width ? `${width}px` : '100%' }}
    />
  )
}

export default BreakLine
