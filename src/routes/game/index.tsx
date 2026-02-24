import GameMap from '@/components/game/landing/GameMap'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/game/')({
  component: RouteComponent,
})

function RouteComponent() {
  
  return (
    <div className="relative flex-1 overflow-hidden bg-black">
      {/* MAP */}
      <div className="absolute inset-0 top-15 z-0">
        <GameMap />
      </div>

      {/* UI */}
      <div className="pointer-events-none absolute inset-0 z-5">
        {/* Header */}
        <div className="relative py-2 text-center font-bold text-white">
          {/* Background */}
          <div className="absolute inset-0">
            <div className="to-main-pink h-1/4 bg-linear-to-b from-[#F6ACD2] from-0% to-100%" />
            <div className="bg-main-pink h-1/2" />
            <div className="from-main-pink h-2/3 bg-linear-to-b to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 mt-5 flex flex-col items-center justify-center drop-shadow-lg">
            <span className="text-3xl">Missing Pieces</span>
            <span className="text-xl">of my Journey</span>
          </div>
        </div>

      </div>
    </div>
  )
}
