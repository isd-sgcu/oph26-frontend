import { FacultyType } from "@/components/const/faculty"
import PieceOnMap from "@/components/game/landing/deco/PieceOnMap"

type PieceConfig = {
  x: number
  y: number
  scale?: number
  variant?: 1 | 2 | 3 | 4 | 5 | 6
  faculty?: FacultyType
}

const PIECES: PieceConfig[] = [
  { x: 500, y: 500, scale: 1, variant: 1, faculty: 'edu' },
  { x: 800, y: 600, scale: 1, variant: 2, faculty: 'psy' },
  { x: 1200, y: 700, scale: 1, variant: 3, faculty: 'dent' },
  { x: 1600, y: 800, scale: 1, variant: 4, faculty: 'law' },
]

export default function PieceLayer({
  pieceCount,
}: {
  pieceCount: Record<string, number>
}) {
  return (
    <>
      {PIECES.map((config, index) => (
        <PieceOnMap
          key={index}
          x={config.x}
          y={config.y}
          scale={config.scale}
          variant={config.variant}
          faculty={config.faculty}
          count={pieceCount[config.faculty || ''] || 0}
        />
      ))}
    </>
  )
}
