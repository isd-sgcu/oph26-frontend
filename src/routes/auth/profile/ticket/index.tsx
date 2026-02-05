import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { useNavigate } from '@tanstack/react-router'
import Ticket from '@/components/auth/profile/ticket'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/auth/profile/ticket/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <div className="relative h-full min-h-dvh w-full p-5">
      <img
        src="/background/ticket-background.png"
        alt=""
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="relative z-10 flex flex-col items-center justify-center gap-5">
        {/* --- Ticket Container --- */}
        <Ticket
          id="1234567890"
          firstName="Phakpong"
          lastName="Thaveepanya"
          status={true}
          dreamFaculties={[]}
        />

        {/* --- Footer Buttons --- */}
        <div className="flex w-full flex-wrap items-center justify-center gap-6">
          <Button
            size={'lg'}
            className="bg-main-beige text-main-pink"
            onClick={() => {
              navigate({ to: '/' })
            }}
          >
            My Workshop
          </Button>
          <Button
            size={'lg'}
            expanded
            className="bg-gradient-purple"
            onClick={() => {
              navigate({ to: '/' })
            }}
          >
            {t('routes.authGroup.profileGroup.ticketGroup.button.home')}
          </Button>
        </div>
      </div>
    </div>
  )
}
