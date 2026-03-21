import UniMapBg from '@/assets/game/uni-map-bg.png'
import DecorationLayer from './DecorationLayer'
import PieceLayer from './PieceLayer'
import CountLayer from './CountLayer'
import ZoomZoneLayer from './ZoomZoneLayer'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useCapture } from '@/contexts/CaptureContext'
import { useCamera } from '@/hooks/useCamera'
import CloudLayer from './CloudLayer'
import { getCollectedPieces } from '@/services/pieces/piece'
import { AchievementCollectedPieces } from '@/types/achievement'
import { FACULTY_KEYS } from '@/components/const/faculty'

type PieceCountType = {
  edu: number
  psy: number
  dent: number
  law: number
  commarts: number
  cbs: number
  md: number
  pharm: number
  polsci: number
  sci: number
  spsc: number
  eng: number
  faa: number
  econ: number
  arch: number
  ahs: number
  vet: number
  arts: number
  scii: number
  cusar: number
}

export default function GameMap() {
  const [pieceCount, setPieceCount] = useState<PieceCountType>(
    {} as PieceCountType
  )
  const [binaryPieceCount, setBinaryPieceCount] = useState<
    Record<string, number>
  >({})
  const { mode, setMode } = useCapture()

  const containerRef = useRef<HTMLDivElement | null>(null)
  const cameraWrapperRef = useRef<HTMLDivElement | null>(null)

  const [baseScale, setBaseScale] = useState(() => {
    if (typeof window === 'undefined') return 1
    return window.innerHeight / 2000
  })

  const { bind, zoomToZone, resetZoom, isZoomed, velocityRef, getWorldBounds } =
    useCamera(containerRef, cameraWrapperRef, baseScale)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const handler = (e: TouchEvent) => {
      e.preventDefault()
    }

    el.addEventListener('touchmove', handler, { passive: false })

    return () => {
      el.removeEventListener('touchmove', handler)
    }
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const handler = (e: TouchEvent) => {
      e.preventDefault()
    }

    el.addEventListener('touchmove', handler, { passive: false })

    return () => {
      el.removeEventListener('touchmove', handler)
    }
  }, [])

  // Compute base scale
  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scale = container.clientHeight / 2000
    setBaseScale(scale)

    const handleResize = () => {
      const c = containerRef.current
      if (!c) return
      setBaseScale(c.clientHeight / 2000)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Fake data
  useEffect(() => {
    async function fetchPieces() {
      const collectedPiecesData: PieceCountType = {} as PieceCountType
      try {
        const fetchedCollectedPiecesData = await getCollectedPieces()
        if (fetchedCollectedPiecesData) {
          const allFacultyStats =
            fetchedCollectedPiecesData.stats.collected_by_faculty

          Object.entries(allFacultyStats).forEach(([faculty, value]) => {
            if (
              value &&
              typeof value.count === 'number' &&
              FACULTY_KEYS.includes(faculty as keyof AchievementCollectedPieces)
            ) {
              // @ts-ignore
              collectedPiecesData[faculty as keyof AchievementCollectedPieces] =
                value.count
            }
          })
        }
      } catch {}

      setPieceCount(collectedPiecesData)
    }

    fetchPieces()
  }, [])

  useEffect(() => {
    setBinaryPieceCount(
      Object.fromEntries(
        Object.entries(pieceCount).map(([key, value]) => [
          key,
          value > 0 ? -1 : 0,
        ])
      )
    )
  }, [pieceCount])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'b') setMode('capture')
      if (e.key.toLowerCase() === 'n') setMode('normal')
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // console.log('GameMap render')

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden"
      style={{
        touchAction: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
      }}
      onClick={() => {
        if (isZoomed) resetZoom()
      }}
      {...bind}
    >
      <div
        ref={cameraWrapperRef}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          transformOrigin: '0 0',
          willChange: 'transform',
        }}
      >
        {baseScale !== null && (
          <svg id="game-map-svg" width={2000} height={2000}>
            {/* <defs>
              <filter id="badge-shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow
                  dx="3"
                  dy="3"
                  stdDeviation="3"
                  floodColor="black"
                  floodOpacity="0.4"
                />
              </filter>
            </defs> */}

            <image href={UniMapBg} x={0} y={0} width={2000} height={2000} />
            <DecorationLayer
              velocityRef={velocityRef}
              getWorldBounds={getWorldBounds}
            />
            <PieceLayer
              pieceCount={mode === 'normal' ? pieceCount : binaryPieceCount}
            />
            {mode === 'show' && <CountLayer pieceCount={pieceCount} />}
            <ZoomZoneLayer onZoom={zoomToZone} />

            <CloudLayer />
          </svg>
        )}
      </div>
    </div>
  )
}
