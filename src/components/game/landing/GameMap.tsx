import UniMapBg from '@/assets/game/uni-map-bg.svg'
import DecorationLayer from './DecorationLayer'
import PieceLayer from './PieceLayer'
import { useEffect, useRef, useState } from 'react'
import { useCapture } from '@/contexts/CaptureContext'
import CountLayer from './CountLayer'

export default function GameMap() {
  const [pieceCount, setPieceCount] = useState<Record<string, number>>({})
  const [binaryPieceCount, setBinaryPieceCount] = useState<Record<string, number>>({})
  const { mode, setMode } = useCapture()
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const fetchPieceCount = async () => {
      try {
        setPieceCount({
          edu: Math.floor(Math.random() * 6),
          psy: Math.floor(Math.random() * 6),
          dent: Math.floor(Math.random() * 6),
          law: Math.floor(Math.random() * 6),
          commarts: Math.floor(Math.random() * 6),
          cbs: Math.floor(Math.random() * 6),
          md: Math.floor(Math.random() * 6),
          pharm: Math.floor(Math.random() * 6),
          polsci: Math.floor(Math.random() * 6),
          sci: Math.floor(Math.random() * 6),
          spsc: Math.floor(Math.random() * 6),
          eng: Math.floor(Math.random() * 6),
          faa: Math.floor(Math.random() * 6),
          econ: Math.floor(Math.random() * 6),
          arch: Math.floor(Math.random() * 6),
          ahs: Math.floor(Math.random() * 6),
          vet: Math.floor(Math.random() * 6),
          arts: Math.floor(Math.random() * 6),
          scii: Math.floor(Math.random() * 6),
          cusar: Math.floor(Math.random() * 6),
        })
        // setPieceCount({
        //   edu: 0,
        //   psy: 0,
        //   dent: 0,
        //   law: 0,
        //   commarts: 0,
        //   cbs: 0,
        //   md: 0,
        //   pharm: 0,
        //   polsci: 0,
        //   sci: 0,
        //   spsc: 0,
        //   eng: 0,
        //   faa: 0,
        //   econ: 0,
        //   arch: 0,
        //   ahs: 0,
        //   vet: 0,
        //   arts: 0,
        //   scii: 0,
        //   cusar: 0,
        // })
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

  useEffect(() => {
    setBinaryPieceCount(() => {
      return Object.fromEntries(
        Object.entries(pieceCount).map(([key, value]) => [
          key,
          value > 0 ? -1 : 0,
        ])
      )
    })
  }, [pieceCount])

  // Temporary testing key: press 'b' to toggle between pieceCount and binaryPieceCount
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'b') {
        setMode('capture')
      }
      if (e.key.toLowerCase() === 'n') {
        setMode('normal')
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <div
      ref={containerRef}
      className="h-full w-full touch-pan-x touch-pan-y overflow-x-scroll overflow-y-hidden"
    >
      <svg
        id="game-map-svg"
        viewBox="0 0 2000 2000"
        className="h-full w-auto bg-black"
        preserveAspectRatio="xMinYMid meet"
      >
        <defs>
          <filter
            id="badge-shadow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feDropShadow
              dx="3"
              dy="3"
              stdDeviation="3"
              floodColor="black"
              floodOpacity="0.4"
            />
          </filter>
        </defs>


        <image href={UniMapBg} x={0} y={0} width={2000} height={2000} />
        <DecorationLayer />
        <PieceLayer pieceCount={mode === 'normal' ? pieceCount : binaryPieceCount} />
        {
          mode === 'show' && <CountLayer pieceCount={pieceCount} />
        }
      </svg>
    </div>
  )
}
