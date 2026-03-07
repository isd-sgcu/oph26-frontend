import greenGrass from '@/assets/game/deco/grass/green-grass.png'
import tinyGreenGrass from '@/assets/game/deco/grass/thin-green-grass.png'
import yellowGrass from '@/assets/game/deco/grass/yellow-grass.png'
import tinyYellowGrass from '@/assets/game/deco/grass/thin-yellow-grass.png'

export type GrassVariant =
  | 'gg'
  | 'tgg'
  | 'yg'
  | 'tyg'

const GRASS_MAP: Record<GrassVariant, string> = {
  'gg': greenGrass,
  'tgg': tinyGreenGrass,
  'yg': yellowGrass,
  'tyg': tinyYellowGrass
}

export default function Grass({
  x,
  y,
  scale = 1,
  variant = 'gg',
  flip = false,
  innerRef,
}: {
  x: number
  y: number
  scale?: number
  variant?: GrassVariant
  flip?: boolean
  innerRef: (el: SVGGElement | null) => void
}) {
  const grass = GRASS_MAP[variant]
  const scaleX = flip ? -scale : scale

  return (
    <g transform={`translate(${x}, ${y})`}>
      <g transform={`scale(${scaleX}, ${scale})`}>
        <g ref={innerRef}>
          <image
            href={grass}
            width={40}
            height={60}
            x={-20}
            y={-60}
          />
        </g>
      </g>
    </g>
  )
}