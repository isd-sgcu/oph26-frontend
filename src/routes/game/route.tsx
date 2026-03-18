import { Outlet, createFileRoute, useNavigate } from '@tanstack/react-router'
import GameFooter from '@/components/game/GameFooter'
import PageNotFound from '@/components/PageNotFound'
import { CaptureProvider } from '@/contexts/CaptureContext'
import { useUser } from '@/contexts/UserContext'

export const Route = createFileRoute('/game')({
  component: GameLayout,
  notFoundComponent: PageNotFound,
})

function GameLayout() {
  const userContext = useUser()
  const navigate = useNavigate()
  const attendee = userContext?.attendee

  if (!attendee) {
    navigate({ to: '/' })
    return
  }

  return (
    <div className="flex w-full flex-col">
      <CaptureProvider>
        <div className="flex flex-1">
          <Outlet />
        </div>

        <GameFooter />
      </CaptureProvider>
    </div>
  )
}
