import UniMapBg from '@/assets/game/uni-map-bg.svg'
import DecorationLayer from './DecorationLayer'
import PieceLayer from './PieceLayer'
import { useEffect, useRef, useState } from 'react'

export default function GameMap() {
  const [pieceCount, setPieceCount] = useState<Record<string, number>>({})
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const fetchPieceCount = async () => {
      try {
        setPieceCount({
          edu: 0, psy: 1, dent: 4, law: 2, commarts: 6,
          cbs: 1, md: 2, pharm: 3, polsci: 4, sci: 5,
          spsc: 2, eng: 3, faa: 1, econ: 2, arch: 4,
          ahs: 3, vet: 2, arts: 5, scii: 1, cusar: 2,
        })
      } catch (error) {
        console.error('Error fetching piece count:', error)
      }
    }

    fetchPieceCount()
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const centerX = (el.scrollWidth - el.clientWidth) / 2
    el.scrollLeft = centerX
  }, [])

  return (
    <div
      ref={containerRef}
      className="h-full w-full overflow-x-scroll overflow-y-hidden touch-pan-x touch-pan-y"
    >
      <svg
        viewBox="0 0 2000 2000"
        className="h-full w-auto bg-black"
        preserveAspectRatio="xMinYMid meet"
      >
        <image href={UniMapBg} x={0} y={0} width={2000} height={2000} />
        <DecorationLayer />
        <PieceLayer pieceCount={pieceCount} />
      </svg>
    </div>
  )
}
