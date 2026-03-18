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

  const attendee = userContext.attendee
  const role = userContext.role

  useEffect(() => {
    if (!attendee || role !== 'staff') {
      navigate({ to: '/' })
    }
  }, [attendee, role, navigate])

  if (!attendee || role !== 'staff') {
    return null
  }

  const user = {
    firstName: 'John',
    lastName: 'Doe',
    studentId: '12345678',
    faculty: 'Engineering',
  }

  return (
    <div className="bg-gradient-pink relative flex h-full min-h-dvh w-full flex-col pt-20">
      <div className="z-10 flex w-full flex-1 flex-col items-center justify-start gap-7.5 p-5">
        <div className="flex flex-col gap-3 text-center text-white">
          <h1 className="text-4xl font-bold">
            {t('routes.authGroup.qrGroup.greeting')}
          </h1>
          <div className="text-xl font-medium">
            <p className="text-pretty">
              {user.firstName + ' ' + user.lastName}
            </p>
            <p className="text-pretty">
              {user.studentId + ' | ' + user.faculty}
            </p>
          </div>
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
