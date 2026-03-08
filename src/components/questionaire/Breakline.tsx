interface BreakLineProps {
  variant?: 'black' | 'pink'
}

const BreakLine = ({ variant = 'black' }: BreakLineProps) => {
  const lineColor = variant === 'black' ? 'bg-black' : 'bg-main-pink'
  return <div className={`h-px w-full ${lineColor}`} />
}

export default BreakLine
