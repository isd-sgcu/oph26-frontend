import { Outlet, createFileRoute, useRouter } from '@tanstack/react-router'
import GameFooter from '@/components/game/GameFooter'
import PageNotFound from '@/components/PageNotFound'
import { CaptureProvider } from '@/contexts/CaptureContext'
import { useUser } from '@/contexts/UserContext'
import { useEffect } from 'react'

export const Route = createFileRoute('/game')({
  component: GameLayout,
  notFoundComponent: PageNotFound,
})

function GameLayout() {
  const userContext = useUser()
  const router = useRouter()
  const attendee = userContext?.attendee

  useEffect(() => {
    if (!attendee) {
      router.navigate({ to: '/' })
    }
  }, [attendee, router])

  if (!attendee) {
    return null
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
