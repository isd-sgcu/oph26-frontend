import Bush, { BushVariant } from "./deco/Bush";
import Mountain from "./deco/Mountain";
import WavingTree, { type TreeVariant } from "./deco/WavingTree";

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

export default function DecorationLayer() {
  return (
    <>
      {MOUNTAINS.map((m, i) => (
        <Mountain key={i} {...m} />
      ))}

      {TREES.map((t, i) => (
        <WavingTree key={i} {...t} />
      ))}

      {/* That one mountain infront of top left tree */}
      <Mountain x={470} y={250} scale={0.8} flip={true} />

      {BUSHES.map((b, i) => (
        <Bush key={i} {...b} />
      ))}
    </>
  )
}
