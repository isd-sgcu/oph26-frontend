import React, { useRef, useState } from 'react'

type AchievementSliderProps = {
  children: React.ReactNode
}

export default function AchievementSlider({
  children,
}: AchievementSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const childCount = React.Children.count(children)

  const handleScroll = () => {
    if (!containerRef.current) return

    const container = containerRef.current
    const center = container.scrollLeft + container.offsetWidth / 2

    const items = Array.from(container.children).slice(1, -1) // ignore spacers

    let closestIndex = 0
    let closestDistance = Infinity

    items.forEach((item, index) => {
      const el = item as HTMLElement
      const itemCenter = el.offsetLeft + el.offsetWidth / 2
      const distance = Math.abs(center - itemCenter)

      if (distance < closestDistance) {
        closestDistance = distance
        closestIndex = index
      }
    })

    setActiveIndex(closestIndex)
  }

  return (
    <div className="relative h-[calc(100%-100px)] w-full min-w-0 overflow-hidden">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex h-full snap-x snap-mandatory flex-nowrap overflow-x-auto"
      >
        {/* Left spacer */}
        <div className="w-1/2 shrink-0" />

        {React.Children.map(children, (child, index) => (
          <div
            key={index}
            className="flex shrink-0 snap-center justify-center px-3"
          >
            {child}
          </div>
        ))}

        {/* Right spacer */}
        <div className="w-1/2 shrink-0" />
      </div>

      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {Array.from({ length: childCount }).map((_, index) => (
          <span
            key={index}
            className={`aspect-square w-1.5 rounded-full transition-all ${
              index === activeIndex ? 'bg-main-pink' : 'bg-[#D9D9D9]'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
