import { Outlet, createFileRoute } from '@tanstack/react-router'
import GameFooter from '@/components/game/GameFooter'
import PageNotFound from '@/components/PageNotFound'

export const Route = createFileRoute('/game')({
  component: GameLayout,
  notFoundComponent: PageNotFound,
})

function GameLayout() {
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-1">
        <Outlet />
      </div>

      <GameFooter />
    </div>
  )
}
