import UniMapBg from '@/assets/game/uni-map-bg.svg'
import DecorationLayer from './DecorationLayer'
import PieceLayer from './PieceLayer'
import CountLayer from './CountLayer'
import ZoomZoneLayer from './ZoomZoneLayer'
import { useEffect, useRef, useState } from 'react'
import { useCapture } from '@/contexts/CaptureContext'
import { useCamera } from '@/hooks/useCamera'
import Cloud from './deco/Cloud'

export default function GameMap() {
  const [pieceCount, setPieceCount] = useState<Record<string, number>>({})
  const [binaryPieceCount, setBinaryPieceCount] = useState<Record<string, number>>({})
  const { mode, setMode } = useCapture()

  const containerRef = useRef<HTMLDivElement | null>(null)
  const cameraWrapperRef = useRef<HTMLDivElement | null>(null)

  const [baseScale, setBaseScale] = useState(1)

  const {
    bind,
    zoomToZone,
    resetZoom,
    isZoomed,
    velocityRef,
    getWorldBounds,
  } = useCamera(containerRef, cameraWrapperRef, baseScale)

  // Compute base scale
  useEffect(() => {
    const updateScale = () => {
      const container = containerRef.current
      if (!container) return
      setBaseScale(container.clientHeight / 2000)
    }

    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  // Fake data
  useEffect(() => {
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
        WebkitUserSelect: 'none'
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
          <DecorationLayer velocityRef={velocityRef} getWorldBounds={getWorldBounds} />
          <PieceLayer pieceCount={mode === 'normal' ? pieceCount : binaryPieceCount} />
          {mode === 'show' && <CountLayer pieceCount={pieceCount} />}
          <ZoomZoneLayer onZoom={zoomToZone} />
          
          <Cloud x={500} y={500} />
        </svg>
      </div>
    </div>
  )
}