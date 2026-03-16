import greenRound from '@/assets/game/deco/tree/green-round-tree.png'
import pinkCurly from '@/assets/game/deco/tree/pink-curly-tree.png'
import pinkPointy from '@/assets/game/deco/tree/pink-pointy-tree.png'
import pinkRound from '@/assets/game/deco/tree/pink-round-tree.png'
import purpleCurly from '@/assets/game/deco/tree/purple-curly-tree.png'
import purplePointy from '@/assets/game/deco/tree/purple-pointy-tree.png'
import { useEffect, useState } from 'react'

export type TreeVariant =
  | 'green-round'
  | 'pink-curly'
  | 'pink-pointy'
  | 'pink-round'
  | 'purple-curly'
  | 'purple-pointy'

export default function WavingTree({
  x,
  y,
  scale = 1,
  variant = 'purple-pointy',
  flip = false,
}: {
  x: number
  y: number
  scale?: number
  variant?: TreeVariant
  flip?: boolean
}) {
  const [style, setStyle] = useState<React.CSSProperties | undefined>(undefined)

  useEffect(() => {
    const delay = -(Math.random() * 5)
    const duration = 4 + Math.random() * 3

    setStyle({
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
    })
  }, [])

  const TREE_MAP: Record<TreeVariant, string> = {
    'green-round': greenRound,
    'pink-curly': pinkCurly,
    'pink-pointy': pinkPointy,
    'pink-round': pinkRound,
    'purple-curly': purpleCurly,
    'purple-pointy': purplePointy,
  }

  const tree = TREE_MAP[variant]

  const scaleX = flip ? -scale : scale

  return (
    <g transform={`translate(${x}, ${y})`}>
      <g transform={`scale(${scaleX}, ${scale})`}>
        <image
          href={tree}
          width={57}
          height={144}
          x={-28.5}
          y={-144}
          className="tree-sway"
          style={style}
        />
      </g>
    </g>
  )
}
