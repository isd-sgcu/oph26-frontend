import UniMapBg from '@/assets/game/uni-map-bg.png'
import DecorationLayer from './DecorationLayer'
import PieceLayer from './PieceLayer'
// import CountLayer from './CountLayer'
import ZoomZoneLayer from './ZoomZoneLayer'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
// import { useCapture } from '@/contexts/CaptureContext'
import { useCamera } from '@/hooks/useCamera'
import CloudLayer from './CloudLayer'
import { useGame } from '@/contexts/GameContext'

export default function GameMap() {
  const { collectedPieces } = useGame()

  const containerRef = useRef<HTMLDivElement | null>(null)
  const cameraWrapperRef = useRef<HTMLDivElement | null>(null)

  const [baseScale, setBaseScale] = useState(() => {
    if (typeof window === 'undefined') return 1
    return window.innerHeight / 2000
  })

  const { bind, zoomToZone, resetZoom, isZoomed, velocityRef, getWorldBounds } = useCamera(containerRef, cameraWrapperRef, baseScale)

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

  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }, []);

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

            <image href={UniMapBg} x={0} y={0} width={2000} height={2000} />
            <DecorationLayer
              velocityRef={velocityRef}
              getWorldBounds={getWorldBounds}
            />
            <PieceLayer
              pieceCount={collectedPieces}
            />
            <ZoomZoneLayer onZoom={zoomToZone} />

            <CloudLayer />
          </svg>
        )}
      </div>
    </div>
  )
}
