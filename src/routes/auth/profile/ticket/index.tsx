import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { useNavigate } from '@tanstack/react-router'
import Ticket from '@/components/auth/profile/ticket'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import EvaluationBanner from '@/components/auth/profile/EvaluationBanner'
import { useUser } from '@/contexts/UserContext'

export const Route = createFileRoute('/auth/profile/ticket/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const userContext = useUser()
  const userAttendee = userContext ? userContext.attendee || null : undefined
  const [showEvaluationBanner, setShowEvaluationBanner] = useState(false)
  const [hasPermission, setHasPermission] = useState(false)
  const [isHighSchoolStudent, setIsHighSchoolStudent] = useState(false)

  useEffect(() => {
    if (!userAttendee) {
      navigate({ to: '/' })
    }
  }, [userAttendee, navigate])

  useEffect(() => {
    const currentDate = new Date()
    const targetDate = new Date('2026-03-30T00:00:00')
    const allowedAttendeeLevels = ['matthayom_ton', 'matthayom_plai', 'vocational']

    if (!userAttendee) {
      setShowEvaluationBanner(false)
      setHasPermission(false)
      return
    }

    if (currentDate >= targetDate) {
      setShowEvaluationBanner(false)
      setHasPermission(false)
    } else if (userAttendee?.checked_in_at) {
      setShowEvaluationBanner(true)
      setHasPermission(true)
    } else {
      setShowEvaluationBanner(false)
      setHasPermission(true)
    }

    if (userAttendee?.attendee_type === 'student') {
      setIsHighSchoolStudent(allowedAttendeeLevels.includes(userAttendee.study_level || '') || false)
    } else {
      setIsHighSchoolStudent(false)
    }
  }, [])

  return (
    <>
      <div className="relative p-5 w-full h-full min-h-dvh">
        <img
          src="/background/background-1.webp"
          alt=""
          className="z-0 absolute inset-0 w-full h-full object-cover"
        />
        <div className="z-10 relative flex flex-col justify-center items-center gap-5">
          {/* --- Ticket Container --- */}
          {
            userAttendee && (
              <Ticket
                id={userAttendee.ticket_code}
                firstName={userAttendee.firstname}
                lastName={userAttendee.surname}
                status={false}
                dreamFaculties={userAttendee.interested_faculty}
              />
            )
          }

          {/* --- Footer Buttons --- */}
          <div className="flex flex-wrap justify-center items-center gap-6 pb-5 w-full">
            <Button
              size={'lg'}
              className="bg-main-beige text-main-pink"
              onClick={() => {
                navigate({
                  to: '/info/workshop', search: {
                    faculty: 'all',
                  }
                })
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

      {
        showEvaluationBanner && (
          <EvaluationBanner
            open={showEvaluationBanner}
            setOpen={setShowEvaluationBanner}
            hasPermission={hasPermission}
            isHighSchoolStudent={isHighSchoolStudent}
          />
        )
      }
    </>
  )
}
