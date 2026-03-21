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
    <div className="bg-gradient-pink relative flex h-full min-h-dvh w-full flex-col pt-20">
      <div className="z-10 flex w-full flex-1 flex-col items-center justify-center gap-7.5 p-5 pb-15">
        <div className="flex flex-col gap-3 text-center text-white">
          <h1 className="text-4xl font-bold">
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
        className="pointer-events-none absolute bottom-0 left-0 w-full select-none"
      />
    </div>
  )
}
