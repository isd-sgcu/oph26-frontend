import GameFooter from '@/components/game/GameFooter'
import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/game')({
  component: GameLayout,
})

function GameLayout() {
  return (
    <div className="flex min-h-screen flex-col justify-center">
      <div className="flex-1">
        <Outlet />
      </div>

      <GameFooter />
    </div>
  )
}
