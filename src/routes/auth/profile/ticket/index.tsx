import { Button } from '@/components/ui/button'
import { createFileRoute, notFound } from '@tanstack/react-router'
import { useNavigate } from '@tanstack/react-router'
import Ticket from '@/components/auth/profile/ticket'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import { getMyAttendee, GetMyAttendeeResponse } from '@/services/attendee/attendee'

export const Route = createFileRoute('/auth/profile/ticket/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [attendee, setAttendee] = useState<GetMyAttendeeResponse | null>(null)

  useEffect(() => {
    const fetchAttendee = async () => {
      try {
        const response = await getMyAttendee()
        if (!response) {
          return notFound()
        }
        setAttendee(response)
      } catch (error) {
        console.error('Error fetching attendee:', error)
      }
    };

    fetchAttendee()
  }, [])

  return (
    <div className="relative p-5 w-full h-full min-h-dvh">
      <img
        src="/background/background-1.webp"
        alt=""
        className="z-0 absolute inset-0 w-full h-full object-cover"
      />
      <div className="z-10 relative flex flex-col justify-center items-center gap-5">
        {/* --- Ticket Container --- */}
        {
          attendee && (
            <Ticket
              id={attendee.ticket_code}
              firstName={attendee.firstname}
              lastName={attendee.surname}
              status={false}
              dreamFaculties={attendee.interested_faculty}
            />
          )
        }

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
