import mountain from '@/assets/game/deco/mountain.svg'

export default function Mountain({
  x,
  y,
  scale = 1,
  flip = false,
}: {
  x: number
  y: number
  scale?: number
  flip?: boolean
}) {
  const scaleX = flip ? -scale : scale

  return (
    <g transform={`translate(${x}, ${y})`}>
      <g transform={`scale(${scaleX}, ${scale})`}>
        <image href={mountain} width={347} height={210} x={-173.5} y={-210} />
      </g>
    </g>
  )
}
