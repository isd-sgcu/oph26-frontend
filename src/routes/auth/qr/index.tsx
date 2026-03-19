import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'
import QrCodeScanner from '@/components/auth/qr/QrCodeScanner'
import { useNavigate } from '@tanstack/react-router'
import { useUser } from '@/contexts/UserContext'
import { useEffect } from 'react'

export const Route = createFileRoute('/auth/qr/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const userContext = useUser()
  if (!userContext) {
    return null
  }

  const user = userContext.user
  const role = userContext.role

  useEffect(() => {
    if (!user || role !== 'staff') {
      navigate({ to: '/' })
    }
  }, [user, role, navigate])

  if (!user || role !== 'staff') {
    return null
  }

  return (
    <div className="relative flex flex-col bg-gradient-pink pt-20 w-full h-full min-h-dvh">
      <div className="z-10 flex flex-col flex-1 justify-center items-center gap-7.5 p-5 pb-15 w-full">
        <div className="flex flex-col gap-3 text-white text-center">
          <h1 className="font-bold text-4xl">
            {t('routes.authGroup.qrGroup.greeting')}
          </h1>
        </div>

        <QrCodeScanner />

        <Button
          size="md"
          expanded
          onClick={() => navigate({ to: '/', replace: false })}
          className="bg-gradient-purple"
        >
          {t('routes.authGroup.qrGroup.home')}
        </Button>
      </div>
      <img
        alt=""
        src="/auth/qr/decoration.webp"
        className="bottom-0 left-0 absolute w-full pointer-events-none select-none"
      />
    </div>
  )
}
