import React, { useRef, useState } from "react"

type AchievementSliderProps = {
  children: React.ReactNode
}

export default function AchievementSlider({ children }: AchievementSliderProps) {
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
    <div className="w-full min-w-0 overflow-hidden relative">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory h-full"
        >
        {/* Left spacer */}
        <div className="shrink-0 w-1/2" />

        {React.Children.map(children, (child, index) => (
          <div
          key={index}
          className="snap-center shrink-0 px-3 flex justify-center"
          >
            {child}
          </div>
        ))}

        {/* Right spacer */}
        <div className="shrink-0 w-1/2" />
      </div>


      <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {Array.from({ length: childCount }).map((_, index) => (
          <span
            key={index}
            className={`w-1.5 aspect-square rounded-full transition-all ${
              index === activeIndex
                ? "bg-main-pink"
                : "bg-[#D9D9D9]"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

