import { ZoomZone } from '@/components/game/landing/ZoomZoneLayer'
import { useRef, useState, useEffect } from 'react'

type Camera = {
  x: number
  y: number
  scale: number
}

export function useCamera(
  containerRef: React.RefObject<HTMLDivElement | null>,
  wrapperRef: React.RefObject<HTMLDivElement | null>,
  baseScale: number
) {
  const cameraRef = useRef<Camera>({ x: 0, y: 0, scale: 1 })
  const [isZoomed, setIsZoomed] = useState(false)

  const isDragging = useRef(false)
  const lastPos = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number | null>(null)

  const velocityRef = useRef<number>(0)

  // Apply transform to DOM
  const applyTransform = () => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const { x, y, scale } = cameraRef.current
    const effectiveScale = baseScale * scale

    wrapper.style.transform = `
      translate3d(${x}px, ${y}px, 0)
      scale(${effectiveScale})
    `
  }

  // Re-apply when baseScale changes
  useEffect(() => {
    applyTransform()
  }, [baseScale])

  const getWorldBounds = () => {
    const container = containerRef.current
    if (!container) return null

    const { x, y, scale } = cameraRef.current
    const effectiveScale = baseScale * scale

    const containerWidth = container.clientWidth
    const containerHeight = container.clientHeight

    return {
      left: (0 - x) / effectiveScale,
      right: (containerWidth - x) / effectiveScale,
      top: (0 - y) / effectiveScale,
      bottom: (containerHeight - y) / effectiveScale,
    }
  }

  const onPointerDown = (e: React.PointerEvent) => {
    if (isZoomed) return

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }

    isDragging.current = true
    lastPos.current = { x: e.clientX, y: e.clientY }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || isZoomed) return

    const dx = e.clientX - lastPos.current.x
    velocityRef.current = dx
    lastPos.current = { x: e.clientX, y: e.clientY }

    const container = containerRef.current
    if (!container) return

    const effectiveScale = baseScale * cameraRef.current.scale
    const worldWidth = 2000 * effectiveScale
    const containerWidth = container.clientWidth

    const minX = containerWidth - worldWidth
    const maxX = 0

    let nextX = cameraRef.current.x + dx
    nextX = Math.min(maxX, Math.max(minX, nextX))

    cameraRef.current.x = nextX

    applyTransform()
  }

  const onPointerUp = (e: React.PointerEvent) => {
    isDragging.current = false
    e.currentTarget.releasePointerCapture(e.pointerId)
    velocityRef.current = 0
  }

  const animateTo = (target: Camera) => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }

    const speed = 0.12

    const step = () => {
      const current = cameraRef.current

      const dx = target.x - current.x
      const dy = target.y - current.y
      const ds = target.scale - current.scale

      current.x += dx * speed
      current.y += dy * speed
      current.scale += ds * speed

      applyTransform()

      const done =
        Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5 && Math.abs(ds) < 0.001

      if (!done) {
        animationRef.current = requestAnimationFrame(step)
      } else {
        cameraRef.current = target
        applyTransform()
        animationRef.current = null
      }
    }

    animationRef.current = requestAnimationFrame(step)
  }

  const zoomToZone = (zone: ZoomZone) => {
    if (isZoomed) return

    const container = containerRef.current
    if (!container) return

    const containerWidth = container.clientWidth
    const containerHeight = container.clientHeight

    const newScale = zone.scale
    const effectiveScale = baseScale * newScale

    const centerX = zone.x + zone.width / 2
    const centerY = zone.y + zone.height / 2

    let targetX = containerWidth / 2 - centerX * effectiveScale
    let targetY = containerHeight / 2 - centerY * effectiveScale

    const worldWidth = 2000 * effectiveScale
    const worldHeight = 2000 * effectiveScale

    const minX = containerWidth - worldWidth
    const maxX = 0
    const minY = containerHeight - worldHeight
    const maxY = 0

    targetX = Math.min(maxX, Math.max(minX, targetX))
    targetY = Math.min(maxY, Math.max(minY, targetY))

    animateTo({ x: targetX, y: targetY, scale: newScale })
    setIsZoomed(true)
  }

  const resetZoom = () => {
    const container = containerRef.current
    if (!container) return

    const containerWidth = container.clientWidth
    const current = cameraRef.current

    const currentEffectiveScale = baseScale * current.scale
    const newScale = 1
    const newEffectiveScale = baseScale * newScale

    // 1️⃣ Get current world center
    const screenCenterX = containerWidth / 2
    const worldCenterX = (screenCenterX - current.x) / currentEffectiveScale

    // 2️⃣ Compute new X at scale 1
    let newX = containerWidth / 2 - worldCenterX * newEffectiveScale

    // 3️⃣ Clamp
    const worldWidth = 2000 * newEffectiveScale
    const minX = containerWidth - worldWidth
    const maxX = 0

    newX = Math.min(maxX, Math.max(minX, newX))

    animateTo({
      x: newX,
      y: 0,
      scale: newScale,
    })

    setIsZoomed(false)
  }

  return {
    bind: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerLeave: onPointerUp,
    },
    zoomToZone,
    resetZoom,
    isZoomed,
    velocityRef,
    getWorldBounds,
  }
}
