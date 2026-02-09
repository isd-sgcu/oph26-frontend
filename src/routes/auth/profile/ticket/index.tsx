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
    <div className="relative p-5 w-full h-full min-h-dvh">
      <img
        src="/background/ticket-background.png"
        alt=""
        className="z-0 absolute inset-0 w-full h-full object-cover"
      />
      <div className="z-10 relative flex flex-col justify-center items-center gap-5">
        {/* --- Ticket Container --- */}
        <Ticket
          id="1234567890"
          firstName="Phakpong"
          lastName="Thaveepanya"
          status={true}
          dreamFaculties={['ENG', 'SCI', 'edu', 'MD']}
        />

        {/* --- Footer Buttons --- */}
        <div className="flex flex-wrap justify-center items-center gap-6 pb-5 w-full">
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
