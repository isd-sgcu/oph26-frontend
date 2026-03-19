import { useEffect, useRef } from 'react'
import Bush, { BushVariant } from './deco/Bush'
import Grass, { GrassVariant } from './deco/Grass'
import Mountain from './deco/Mountain'
import WavingTree, { type TreeVariant } from './deco/WavingTree'
import React from 'react'
import Flower, { FlowerVariant } from './deco/Flower'

type MountainConfig = {
  x: number
  y: number
  scale?: number
  flip?: boolean
}[]

type TreeConfig = {
  x: number
  y: number
  scale?: number
  variant?: TreeVariant
  flip?: boolean
}

type BushConfig = {
  x: number
  y: number
  scale?: number
  variant?: BushVariant
  flip?: boolean
}

type GrassConfig = {
  x: number
  y: number
  scale?: number
  variant?: GrassVariant
  flip?: boolean
  renderFirst?: boolean
}

type FlowerConfig = {
  x: number
  y: number
  scale?: number
  rotate?: number
  animate?: boolean
  variant?: FlowerVariant
}

const MOUNTAINS: MountainConfig = [
  { x: 220, y: 220, scale: 1.8, flip: true },
  { x: -100, y: 240, scale: 1.4 },
  { x: 1900, y: 370, scale: 1.8 },
  { x: 1600, y: 400, scale: 1.2 },
]

const TREES: TreeConfig[] = [
  // top left mountain
  { x: 175, y: 250, scale: 1.75, variant: 'green-round' },
  { x: 300, y: 220, scale: 1, variant: 'pink-curly' },
  { x: 350, y: 250, scale: 1.75, variant: 'green-round', flip: true },

  // below mountain
  { x: 460, y: 390, scale: 1.2, variant: 'green-round', flip: true },
  { x: 435, y: 435, scale: 1.5, variant: 'purple-curly' },

  // left of dent
  { x: 890, y: 400, scale: 0.6, variant: 'purple-pointy' },
  { x: 920, y: 395, scale: 0.8, variant: 'pink-pointy' },
  { x: 940, y: 390, scale: 0.55, variant: 'purple-pointy' },

  // 4 trees left of BAScii
  { x: 275, y: 850, scale: 0.8, variant: 'purple-pointy' },
  { x: 400, y: 870, scale: 1, variant: 'purple-pointy' },
  { x: 360, y: 850, scale: 1.2, variant: 'purple-pointy' },
  { x: 330, y: 840, scale: 0.8, variant: 'purple-pointy' },

  // 2 trees below BAScii
  { x: 460, y: 1130, scale: 1.5, variant: 'green-round', flip: true },
  { x: 420, y: 1140, scale: 1.4, variant: 'pink-curly' },

  // 4 trees right of arts
  { x: 1660, y: 1010, scale: 1.4, variant: 'green-round', flip: true },
  { x: 1630, y: 1050, scale: 1.8, variant: 'purple-curly' },
  { x: 1770, y: 1050, scale: 1.4, variant: 'green-round', flip: true },
  { x: 1730, y: 1050, scale: 1.2, variant: 'pink-curly' },

  // 3 trees at left map border
  { x: 40, y: 1500, scale: 2.5, variant: 'purple-curly' },
  { x: 100, y: 1440, scale: 1.2, variant: 'pink-curly' },
  { x: 140, y: 1440, scale: 1.5, variant: 'green-round', flip: true },

  // 2 trees left of law
  { x: 390, y: 1630, scale: 1.2, variant: 'pink-round' },
  { x: 360, y: 1700, scale: 1.8, variant: 'purple-curly', flip: true },

  // 3 trees right of med
  { x: 1870, y: 1480, scale: 1, variant: 'purple-pointy', flip: true },
  { x: 1920, y: 1460, scale: 1.4, variant: 'pink-pointy' },
  { x: 1960, y: 1440, scale: 0.8, variant: 'purple-pointy', flip: true },
]

const BUSHES: BushConfig[] = [
  // top left mountain
  { x: 100, y: 210, scale: 1, variant: 'cluster-2' },

  // left BAScii
  { x: 310, y: 870, scale: 1, variant: 'cluster-1' },
  { x: 430, y: 940, scale: 1, variant: 'cluster-2' },
  { x: 400, y: 1110, scale: 1, variant: 'cluster-1', flip: true },

  // left map border
  { x: 50, y: 1420, scale: 1.2, variant: 'cluster-1', flip: true },

  // left of dent
  { x: 940, y: 405, scale: 0.6, variant: 'cluster-1', flip: true },

  // right of arts
  { x: 1660, y: 1030, scale: 1.3, variant: 'cluster-2', flip: true },

  // right of med
  { x: 1970, y: 1480, scale: 1, variant: 'cluster-3', flip: true },

  //right map border
  { x: 1990, y: 700, scale: 1.5, variant: 'cluster-2' },

  //bottom right corner
  { x: 1900, y: 1780, scale: 3.5, variant: 'cluster-3', flip: true },

  //bottom left corner
  { x: 630, y: 2000, scale: 3.3, variant: 'bush', flip: true },
  { x: 170, y: 2000, scale: 6.3, variant: 'bush' },
]

const GRASSES: GrassConfig[] = [
  // top left panel
  { x: 120, y: 650, scale: 1.5, variant: 'gg' },
  { x: 460, y: 380, scale: 1, variant: 'yg' },
  { x: 440, y: 370, scale: 0.6, variant: 'tgg' },

  // leftest panel
  { x: 0, y: 800, scale: 1.5, variant: 'gg' },
  { x: 80, y: 900, scale: 1.2, variant: 'gg' },
  { x: 50, y: 1000, scale: 0.8, variant: 'gg' },
  { x: 150, y: 1130, scale: 1.2, variant: 'gg' },
  { x: 155, y: 1200, scale: 0.8, variant: 'gg' },
  { x: 50, y: 1270, scale: 1.2, variant: 'gg' },
  { x: 180, y: 1350, scale: 1.2, variant: 'gg', renderFirst: true },
  { x: 200, y: 1480, scale: 0.8, variant: 'gg' },
  { x: 50, y: 1530, scale: 1.2, variant: 'gg' },
  { x: 60, y: 1590, scale: 0.8, variant: 'gg' },
  { x: 140, y: 1720, scale: 1.2, variant: 'gg', renderFirst: true },
  { x: 0, y: 1730, scale: 0.8, variant: 'gg', renderFirst: true },

  //bascii edu panel
  { x: 750, y: 860, scale: 1.5, variant: 'gg' },
  { x: 350, y: 1120, scale: 1.2, variant: 'tyg' },
  { x: 370, y: 1115, scale: 0.8, variant: 'tyg' },
  { x: 385, y: 1115, scale: 0.6, variant: 'tyg' },
  { x: 390, y: 1625, scale: 1, variant: 'gg' },
  { x: 370, y: 1615, scale: 0.8, variant: 'tgg' },

  // commarts, law panel
  { x: 550, y: 1420, scale: 0.8, variant: 'tyg' },
  { x: 535, y: 1437, scale: 0.8, variant: 'gg' },
  { x: 570, y: 1525, scale: 0.8, variant: 'yg' },
  { x: 580, y: 1520, scale: 0.6, variant: 'tgg' },
  { x: 610, y: 1580, scale: 1.2, variant: 'gg' },
  { x: 530, y: 1600, scale: 0.6, variant: 'tgg' },

  //middle panel
  { x: 940, y: 460, scale: 1, variant: 'gg' },
  { x: 1180, y: 750, scale: 1.2, variant: 'gg' },

  // right panel
  { x: 1530, y: 650, scale: 1.5, variant: 'gg' },
  { x: 1750, y: 600, scale: 1.5, variant: 'gg' },
  { x: 1950, y: 550, scale: 1.5, variant: 'gg' },
  { x: 1630, y: 800, scale: 1.5, variant: 'gg' },
  { x: 1800, y: 850, scale: 1.5, variant: 'gg' },
  { x: 1850, y: 1100, scale: 1.5, variant: 'gg' },
  { x: 1950, y: 1200, scale: 1.5, variant: 'gg' },
  { x: 1720, y: 700, scale: 1, variant: 'gg' },
  { x: 1900, y: 600, scale: 1, variant: 'gg' },
  { x: 1600, y: 900, scale: 1, variant: 'gg', renderFirst: true },
  { x: 1920, y: 950, scale: 1, variant: 'gg' },
  { x: 1960, y: 1250, scale: 1, variant: 'gg' },
  { x: 1800, y: 1350, scale: 1, variant: 'gg' },
  { x: 1850, y: 1320, scale: 1, variant: 'gg' },
]

const FLOWERS: FlowerConfig[] = [
  { x: 180, y: 950, scale: 1, variant: 'pink', animate: true },
  { x: 140, y: 1550, scale: 1.5, variant: 'purple', animate: true },
  { x: 1680, y: 500, scale: 1, variant: 'pink', animate: true },
  { x: 1940, y: 780, scale: 1.2, variant: 'purple', animate: true },
  { x: 1650, y: 1120, scale: 1, variant: 'purple', animate: true },
  { x: 1800, y: 1220, scale: 1.5, variant: 'pink', animate: true },
  { x: 1200, y: 1980, scale: 1.5, variant: 'pink', animate: true },
  { x: 1400, y: 1950, scale: 1, variant: 'purple', animate: true },
  { x: 50, y: 1800, scale: 1.5, variant: 'yellow', animate: true },
  { x: 220, y: 1750, scale: 1.4, variant: 'yellow', animate: true },
  { x: 70, y: 1950, scale: 1.6, variant: 'pink', animate: true },
  { x: 170, y: 1860, scale: 1.3, variant: 'pink', animate: true },
  { x: 320, y: 1910, scale: 1.4, variant: 'yellow', animate: true },
  { x: 390, y: 1780, scale: 1.5, variant: 'pink', animate: true },
  { x: 430, y: 1930, scale: 1.4, variant: 'pink', animate: true },
  { x: 600, y: 1930, scale: 1.3, variant: 'pink', animate: true },
  { x: 750, y: 1980, scale: 1.6, variant: 'yellow', animate: true },

  { x: 30, y: 205, scale: 0.3, variant: 'pink' },
  { x: 60, y: 195, scale: 0.3, variant: 'yellow' },
  { x: 100, y: 200, scale: 0.3, variant: 'pink' },
  { x: 130, y: 180, scale: 0.3, variant: 'yellow' },
  { x: 150, y: 170, scale: 0.3, variant: 'yellow' },
  { x: 145, y: 197, scale: 0.3, variant: 'pink' },
  { x: 170, y: 200, scale: 0.3, variant: 'yellow' },

  { x: 265, y: 865, scale: 0.3, variant: 'pink' },
  { x: 325, y: 865, scale: 0.3, variant: 'pink' },
  { x: 300, y: 850, scale: 0.3, variant: 'yellow' },
  { x: 355, y: 860, scale: 0.3, variant: 'yellow' },

  { x: 345, y: 935, scale: 0.3, variant: 'pink' },
  { x: 400, y: 925, scale: 0.3, variant: 'yellow' },
  { x: 450, y: 930, scale: 0.3, variant: 'pink' },
  { x: 475, y: 905, scale: 0.3, variant: 'yellow' },
  { x: 500, y: 925, scale: 0.3, variant: 'yellow' },

  { x: 400, y: 1105, scale: 0.3, variant: 'yellow' },
  { x: 410, y: 1090, scale: 0.3, variant: 'pink' },
  { x: 430, y: 1100, scale: 0.3, variant: 'pink' },
  { x: 450, y: 1100, scale: 0.3, variant: 'yellow' },

  { x: 30, y: 1400, scale: 0.3, variant: 'yellow' },
  { x: 100, y: 1410, scale: 0.3, variant: 'pink' },

  { x: 1870, y: 695, scale: 0.3, variant: 'pink' },
  { x: 1905, y: 685, scale: 0.3, variant: 'yellow' },
  { x: 1950, y: 690, scale: 0.3, variant: 'pink' },
  { x: 1970, y: 670, scale: 0.3, variant: 'yellow' },
  { x: 1990, y: 685, scale: 0.3, variant: 'pink' },

  { x: 1560, y: 1010, scale: 0.3, variant: 'yellow' },
  { x: 1600, y: 980, scale: 0.3, variant: 'yellow' },
  { x: 1640, y: 1015, scale: 0.3, variant: 'pink' },
  { x: 1700, y: 1010, scale: 0.3, variant: 'yellow' },
  { x: 1770, y: 1020, scale: 0.3, variant: 'pink' },

  { x: 1920, y: 1470, scale: 0.3, variant: 'yellow' },
  { x: 1955, y: 1475, scale: 0.3, variant: 'pink' },
  { x: 1975, y: 1455, scale: 0.3, variant: 'yellow' },

  { x: 1670, y: 1760, scale: 1, variant: 'pink' },
  { x: 1800, y: 1730, scale: 1, variant: 'yellow' },
  { x: 1920, y: 1750, scale: 1, variant: 'pink' },
  { x: 1970, y: 1670, scale: 1, variant: 'yellow' },
]

export default function DecorationLayer({
  velocityRef,
  getWorldBounds,
}: {
  velocityRef: React.RefObject<number>
  getWorldBounds: () => {
    left: number
    right: number
    top: number
    bottom: number
  } | null
}) {
  const grassRefs = useRef<(SVGGElement | null)[]>([])
  const flipMultipliers = useRef<number[]>([])
  const rotation = useRef(0)

  useEffect(() => {
    let frame: number

    const update = () => {
      const velocity = velocityRef.current

      const strength = 2.5 // try 1.5–2.5
      const maxTilt = 10 // max degrees

      const targetRotation = Math.max(
        -maxTilt,
        Math.min(maxTilt, velocity * strength)
      )

      rotation.current += (targetRotation - rotation.current) * 0.15

      grassRefs.current.forEach((el, i) => {
        if (!el) return

        const direction = flipMultipliers.current[i] ?? 1

        el.setAttribute(
          'transform',
          `rotate(${rotation.current * direction}, 0, 0)`
        )
      })

      frame = requestAnimationFrame(update)
    }

    frame = requestAnimationFrame(update)
    return () => cancelAnimationFrame(frame)
  }, [velocityRef])

  return (
    <>
      {MOUNTAINS.map((m, i) => (
        <Mountain key={i} {...m} />
      ))}

      {GRASSES.map((g, index) => {
        if (!g.renderFirst) return null

        flipMultipliers.current[index] = g.flip ? -1 : 1

        return (
          <Grass
            key={index}
            {...g}
            innerRef={(el: SVGGElement | null) => {
              grassRefs.current[index] = el
            }}
          />
        )
      })}

      {TREES.map((t, i) => (
        <WavingTree key={i} {...t} />
      ))}

      {/* That one mountain infront of top left tree */}
      <Mountain x={470} y={250} scale={0.8} flip={true} />

      {BUSHES.map((b, i) => (
        <Bush key={i} {...b} />
      ))}

      {GRASSES.map((g, index) => {
        if (g.renderFirst) return null

        flipMultipliers.current[index] = g.flip ? -1 : 1

        return (
          <Grass
            key={index}
            {...g}
            innerRef={(el: SVGGElement | null) => {
              grassRefs.current[index] = el
            }}
          />
        )
      })}

      {FLOWERS.map((f, i) => (
        <Flower key={i} {...f} getWorldBounds={getWorldBounds} />
      ))}
    </>
  )
}
