import GameMap from '@/components/game/landing/GameMap'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/game/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="relative flex-1 overflow-hidden bg-black">
      {/* MAP */}
      <div className="absolute inset-0 z-0">
        <GameMap />
      </div>

      {/* UI */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="p-4 text-white text-lg">
          🧩 0 / 5 pieces collected
        </div>
      </div>
    </div>
  )
}
