import green from '@/assets/game/deco/grass/green-grass.svg'
import thinGreen from '@/assets/game/deco/grass/thin-green-grass.svg'
import thinYellow from '@/assets/game/deco/grass/thin-yellow-grass.svg'
import yellow from '@/assets/game/deco/grass/yellow-grass.svg'
import { useRef } from 'react'

export type GrassVariant =
  | 'green'
  | 'thin-green'
  | 'thin-yellow'
  | 'yellow'

export default function Grass({
  x,
  y,
  scale = 1,
  variant = 'green',
  flip = false,
  register,
}: {
  x: number
  y: number
  scale?: number
  variant?: GrassVariant
  flip?: boolean
  register?: (el: SVGImageElement | null) => void
}) {
  const ref = useRef<SVGImageElement | null>(null)

  const GRASS_MAP: Record<
    GrassVariant,
    { src: string; w: number; h: number; rot: number }
  > = {
    green: { src: green, w: 49, h: 35, rot: 4 },
    'thin-green': { src: thinGreen, w: 20, h: 28, rot: 6 },
    'thin-yellow': { src: thinYellow, w: 27, h: 37, rot: 5 },
    yellow: { src: yellow, w: 34, h: 25, rot: 3 },
  }

  const grass = GRASS_MAP[variant]
  const scaleX = flip ? -scale : scale

  return (
    <g transform={`translate(${x}, ${y})`}>
      <g transform={`scale(${scaleX}, ${scale})`}>
        <image
          ref={(el) => {
            ref.current = el
            register?.(el)
          }}
          href={grass.src}
          width={grass.w}
          height={grass.h}
          x={-grass.w / 2}
          y={-grass.h}
          className="grass"
          style={{
            '--rot': `${grass.rot}deg`,
          } as React.CSSProperties}
        />
      </g>
    </g>
  )
}
