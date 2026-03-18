import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { useNavigate } from '@tanstack/react-router'
import Ticket from '@/components/auth/profile/ticket'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import EvaluationBanner from '@/components/auth/profile/EvaluationBanner'
import { useUser } from '@/contexts/UserContext'

export const Route = createFileRoute('/auth/profile/ticket/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const userContext = useUser()
  const attendee = userContext?.attendee

  useEffect(() => {
    if (!attendee) {
      navigate({ to: '/' })
    }
  }, [attendee, navigate])

  if (!attendee) {
    return null
  }

  const [showEvaluationBanner, setShowEvaluationBanner] = useState(false)
  const [hasPermission, setHasPermission] = useState(false)
  const [isHighSchoolStudent, setIsHighSchoolStudent] = useState(false)

  useEffect(() => {
    const currentDate = new Date()
    const targetDate = new Date('2026-03-30T00:00:00')
    if (currentDate >= targetDate) {
      setShowEvaluationBanner(false)
    } else {
      setShowEvaluationBanner(true)
    }
  }, [])

  useEffect(() => {
    // TODO: Fetch user's attendance data
    const permission = Math.random() < 0.5
    const isHighSchool = Math.random() < 0.5

    setIsHighSchoolStudent(isHighSchool)
    setHasPermission(permission)
  }, [])

  return (
    <>
      <div className="relative h-full min-h-dvh w-full p-5">
        <img
          src="/background/background-1.webp"
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
            dreamFaculties={['ENG', 'SCI', 'edu', 'MD']}
          />

          {/* --- Footer Buttons --- */}
          <div className="flex w-full flex-wrap items-center justify-center gap-6 pb-5">
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

      {showEvaluationBanner && (
        <EvaluationBanner
          open={showEvaluationBanner}
          setOpen={setShowEvaluationBanner}
          hasPermission={hasPermission}
          isHighSchoolStudent={isHighSchoolStudent}
        />
      )}
    </>
  )
}
