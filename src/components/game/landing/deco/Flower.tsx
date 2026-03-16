import pinkFlower from '@/assets/game/deco/flower/pink-flower.svg'
import purpleFlower from '@/assets/game/deco/flower/purple-flower.svg'
import yellowFlower from '@/assets/game/deco/flower/yellow-flower.svg'
import { useEffect, useState } from 'react'

export type FlowerVariant = 'pink' | 'purple' | 'yellow'

const flowerMap: Record<FlowerVariant, string> = {
  pink: pinkFlower,
  purple: purpleFlower,
  yellow: yellowFlower,
}

export default function Flower({
  x,
  y,
  scale = 1,
  rotate = 0,
  animate = false,
  getWorldBounds,
  variant = 'pink',
}: {
  x: number
  y: number
  scale?: number
  rotate?: number
  animate?: boolean
  getWorldBounds: () => {
    left: number
    right: number
    top: number
    bottom: number
  } | null
  variant?: FlowerVariant
}) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!animate) return

    let frame: number

    const check = () => {
      const bounds = getWorldBounds()
      if (!bounds) return

      const inside =
        x > bounds.left &&
        x < bounds.right &&
        y > bounds.top &&
        y < bounds.bottom

      setIsVisible(inside)

      frame = requestAnimationFrame(check)
    }

    frame = requestAnimationFrame(check)
    return () => cancelAnimationFrame(frame)
  }, [x, y, getWorldBounds, animate])

  return (
    <g transform={`translate(${x}, ${y})`}>
      <g transform={`rotate(${rotate})`}>
        <g transform={`scale(${scale})`}>
          <g
            className={
              animate
                ? `flower ${isVisible ? 'flower-in' : 'flower-out'}`
                : undefined
            }
          >
            <image
              href={flowerMap[variant]}
              width={40}
              height={40}
              x={-20}
              y={-40}
            />
          </g>
        </g>
      </g>
    </g>
  )
}
