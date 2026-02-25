import cloudImg from '@/assets/game/deco/cloud.svg'
import { useEffect, useRef, useState } from 'react'

export default function Cloud({
  x,
  y,
  scale = 1,
  rotate = 0,
  driftSpeed = 0.2,
  direction = 1, // 1 = right, -1 = left
  worldWidth = 2000,
}: {
  x: number
  y: number
  scale?: number
  rotate?: number
  driftSpeed?: number
  direction?: 1 | -1
  puffOnClick?: boolean
  worldWidth?: number
}) {
  const driftRef = useRef<SVGGElement | null>(null)
  const position = useRef(x)
  const [puff, setPuff] = useState(false)

  // 🌍 Infinite horizontal drift
  useEffect(() => {
    let frame: number

    const update = () => {
      position.current += driftSpeed * direction

      // wrap logic
      if (direction === 1 && position.current > worldWidth + 200) {
        position.current = -200
      }

      if (direction === -1 && position.current < -200) {
        position.current = worldWidth + 200
      }

      if (driftRef.current) {
        driftRef.current.setAttribute(
          'transform',
          `translate(${position.current - x}, 0)`
        )
      }

      frame = requestAnimationFrame(update)
    }

    frame = requestAnimationFrame(update)
    return () => cancelAnimationFrame(frame)
  }, [driftSpeed, direction, worldWidth, x])

  // 💨 Puff animation trigger
  const handlePuff = () => {
    setPuff(true)

    setTimeout(() => {
      setPuff(false)
    }, 2500)
  }

  return (
    <g transform={`translate(${x}, ${y})`}>
      <g transform={`rotate(${rotate})`}>
        <g transform={`scale(${scale})`}>
          <g ref={driftRef}>
            <g
              onPointerDown={handlePuff}
              className={puff ? 'cloud-puff' : undefined}
            >
              <image
                href={cloudImg}
                width={120}
                height={80}
                x={-60}
                y={-40}
                pointerEvents="bounding-box"
              />
            </g>
          </g>
        </g>
      </g>
    </g>
  )
}