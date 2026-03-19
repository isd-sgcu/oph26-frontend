import { useEffect, useRef } from 'react'
import bush from '@/assets/game/deco/bush/bush.svg'
import cluster1 from '@/assets/game/deco/bush/bush-cluster-1.svg'
import cluster2 from '@/assets/game/deco/bush/bush-cluster-2.svg'
import cluster3 from '@/assets/game/deco/bush/bush-cluster-3.svg'

export type BushVariant = 'bush' | 'cluster-1' | 'cluster-2' | 'cluster-3'

const ANIMATIONS = [
  { name: 'bush-breathe', duration: 1200 },
  { name: 'bush-nudge', duration: 900 },
  { name: 'bush-rustle', duration: 700 },
]

export default function Bush({
  x,
  y,
  scale = 1,
  variant = 'bush',
  flip = false,
}: {
  x: number
  y: number
  scale?: number
  variant?: BushVariant
  flip?: boolean
}) {
  const ref = useRef<SVGImageElement | null>(null)

  useEffect(() => {
    let timeout: number
    let lastIndex = -1

    const playRandom = () => {
      const el = ref.current
      if (!el) return

      let index
      do {
        index = Math.floor(Math.random() * ANIMATIONS.length)
      } while (index === lastIndex)

      lastIndex = index
      const anim = ANIMATIONS[index]

      el.style.animation = `${anim.name} ${anim.duration}ms ease-in-out`

      timeout = window.setTimeout(() => {
        el.style.animation = 'none'

        const nextDelay = 2500 + Math.random() * 5000
        timeout = window.setTimeout(playRandom, nextDelay)
      }, anim.duration)
    }

    const initialDelay = Math.random() * 4000
    timeout = window.setTimeout(playRandom, initialDelay)

    return () => window.clearTimeout(timeout)
  }, [])

  const BUSH_MAP: Record<BushVariant, { src: string; w: number; h: number }> = {
    bush: { src: bush, w: 130, h: 64 },
    'cluster-1': { src: cluster1, w: 176, h: 51 },
    'cluster-2': { src: cluster2, w: 232, h: 68 },
    'cluster-3': { src: cluster3, w: 204, h: 65 },
  }

  const bushAsset = BUSH_MAP[variant]
  const scaleX = flip ? -scale : scale

  return (
    <g transform={`translate(${x}, ${y})`}>
      <g transform={`scale(${scaleX}, ${scale})`}>
        <image
          ref={ref}
          href={bushAsset.src}
          width={bushAsset.w}
          height={bushAsset.h}
          x={-bushAsset.w / 2}
          y={-bushAsset.h}
          className="bush"
        />
      </g>
    </g>
  )
}
