import cloudImg from '@/assets/game/deco/cloud.png'
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
  worldWidth?: number
}) {
  const [offset, setOffset] = useState(0)
  const position = useRef(x)
  const frameRef = useRef<number | null>(null)
  const [puff, setPuff] = useState(false)

  // 🌍 Infinite horizontal drift (React-safe)
  useEffect(() => {
    position.current = x

    const update = () => {
      position.current += driftSpeed * direction

      // Wrap logic
      if (direction === 1 && position.current > worldWidth + 200) {
        position.current = -200
      }

      if (direction === -1 && position.current < -200) {
        position.current = worldWidth + 200
      }

      setOffset(position.current - x)

      frameRef.current = requestAnimationFrame(update)
    }

    frameRef.current = requestAnimationFrame(update)

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [x, driftSpeed, direction, worldWidth])

  // 💨 Puff animation
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
          <g transform={`translate(${offset}, 0)`}>
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
