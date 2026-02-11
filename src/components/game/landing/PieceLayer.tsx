import { FacultyType } from '@/components/const/faculty'
import PieceOnMap from '@/components/game/landing/deco/PieceOnMap'

type PieceConfig = {
  x: number
  y: number
  scale?: number
  variant?: 1 | 2 | 4 | 5 | 6
  faculty?: FacultyType
}

const PIECES: PieceConfig[] = [
  { x: 671, y: 1260, scale: 1.2, variant: 1, faculty: 'edu' },
  { x: 621, y: 361, scale: 1.2, variant: 2, faculty: 'psy' },
  { x: 1201, y: 428.3, scale: 1.2, variant: 4, faculty: 'dent' },
  { x: 720, y: 1546.8, scale: 1.2, variant: 5, faculty: 'law' },
  { x: 633.5, y: 1419, scale: 1.2, variant: 6, faculty: 'commarts' },
  { x: 973, y: 1591, scale: 1.2, variant: 1, faculty: 'cbs' },
  { x: 1665, y: 1393, scale: 1.2, variant: 2, faculty: 'md' },
  { x: 960, y: 558, scale: 1.2, variant: 4, faculty: 'pharm' },
  { x: 1248.5, y: 1434.5, scale: 1.2, variant: 5, faculty: 'polsci' },
  { x: 957.15, y: 1275.6, scale: 1.2, variant: 6, faculty: 'sci' },
  { x: 419, y: 584, scale: 1.2, variant: 1, faculty: 'spsc' },
  { x: 1252, y: 1273, scale: 1.2, variant: 2, faculty: 'eng' },
  { x: 1238.5, y: 884.5, scale: 1.05, variant: 4, faculty: 'faa' },
  { x: 1287.8, y: 1585.5, scale: 1.2, variant: 5, faculty: 'econ' },
  { x: 999.7, y: 869, scale: 1.2, variant: 6, faculty: 'arch' },
  { x: 607, y: 576, scale: 0.98, variant: 1, faculty: 'ahs' },
  { x: 1381.5, y: 564.5, scale: 1.2, variant: 2, faculty: 'vet' },
  { x: 1388, y: 805, scale: 1.2, variant: 4, faculty: 'arts' },
  { x: 684.5, y: 717.3, scale: 1.2, variant: 5, faculty: 'scii' },
  { x: 254.8, y: 498.2, scale: 1.2, variant: 6, faculty: 'cusar' },
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
