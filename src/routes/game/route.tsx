import { Outlet, createFileRoute, useRouter } from '@tanstack/react-router'
import GameFooter from '@/components/game/GameFooter'
import PageNotFound from '@/components/PageNotFound'
import { CaptureProvider } from '@/contexts/GameContext'
import { useUser } from '@/contexts/UserContext'
import { useEffect } from 'react'

export const Route = createFileRoute('/game')({
  component: GameLayout,
  notFoundComponent: PageNotFound,
})

function GameLayout() {
  const userContext = useUser()
  if (!userContext) {
    return null
  }

  const router = useRouter()
  const attendee = userContext.attendee

  useEffect(() => {
    if (!attendee || attendee.attendee_type != 'student') {
      router.navigate({ to: '/' })
    }
  }, [attendee, router])

  if (!attendee || attendee.attendee_type != 'student') {
    return null
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <CaptureProvider>
        <div className="flex flex-1">
          <Outlet />
        </div>

        <GameFooter />
      </CaptureProvider>
    </div>
  )
}
