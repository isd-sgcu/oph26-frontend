import React from "react"

type AchievementSliderProps = {
  children: React.ReactNode
}

export default function AchievementSlider({ children }: AchievementSliderProps) {
  return (
    <div className="w-full min-w-0 overflow-hidden">
      <div
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
    </div>
  )
}

