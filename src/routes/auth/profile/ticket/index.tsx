import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { useNavigate } from '@tanstack/react-router'
import Ticket from '@/components/auth/profile/ticket'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import EvaluationBanner from '@/components/auth/profile/EvaluationBanner'
import { useUser } from '@/contexts/UserContext'
import { getCheckInStatus } from '@/services/checkin/checkin'
import { getEvaluationResponse } from '@/services/questionaire/questionaire'
import { CLOSED_EVALUATION_DATE, RELEASED_EVALUATION_DATE } from '@/utils/const'

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
  const [hasCheckedIn, setHasCheckedIn] = useState(false)
  const [hasSubmittedEvaluation, setHasSubmittedEvaluation] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userAttendee) {
      navigate({ to: '/' })
    }
  }, [userAttendee, navigate])

  useEffect(() => {
    setLoading(true)
    const fetchCheckInStatus = async () => {
      try {
        const checkInStatus = await getCheckInStatus()
        setHasCheckedIn(checkInStatus.status)
      } catch (error) {
        setHasCheckedIn(false)
      }
    }

    const fetchEvaluationResponse = async () => {
      try {
        const evaluationResponse = await getEvaluationResponse()
        setHasSubmittedEvaluation(evaluationResponse.exists)
      } catch (error) {
        setHasSubmittedEvaluation(false)
      }
    }

    fetchEvaluationResponse()
    fetchCheckInStatus()

    setLoading(false)
  }, [])

  useEffect(() => {
    const currentDate = new Date()
    const releasedDate = new Date(RELEASED_EVALUATION_DATE)
    const closedDate = new Date(CLOSED_EVALUATION_DATE)
    const allowedAttendeeLevels = [
      'matthayom_ton',
      'matthayom_plai',
      'vocational',
    ]

    if (!userAttendee) {
      setShowEvaluationBanner(false)
      setHasPermission(false)
      return
    }

    if (currentDate < releasedDate || currentDate > closedDate) {
      // ยังไม่ถึงวันที่ 30 มีนาคม 2026 หรือเกินวันที่ 4 เมษายน 2026
      setShowEvaluationBanner(false)
      setHasPermission(false)
    } else if (hasCheckedIn) {
      // ผู้ใช้เช็คอินแล้ว
      setShowEvaluationBanner(true)
      setHasPermission(true)
    } else {
      // ผู้ใช้ยังไม่ได้เช็คอิน
      setShowEvaluationBanner(true)
      setHasPermission(false)
    }

    if (userAttendee.attendee_type === 'student') {
      setIsHighSchoolStudent(
        allowedAttendeeLevels.includes(userAttendee.study_level || '') || false
      )
    } else {
      setIsHighSchoolStudent(false)
    }

    if (hasSubmittedEvaluation) {
      setShowEvaluationBanner(false)
    }
  }, [hasCheckedIn, userAttendee, hasSubmittedEvaluation])

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
          {userAttendee && (
            <Ticket
              id={userAttendee.ticket_code}
              firstName={userAttendee.firstname}
              lastName={userAttendee.surname}
              hasCheckedIn={hasCheckedIn}
              ticketNumber={userAttendee.ticket_code}
              role={userAttendee.attendee_type}
              dreamFaculties={userAttendee.interested_faculty}
            />
          )}

          {/* --- Footer Buttons --- */}
          <div className="flex w-full flex-wrap items-center justify-center gap-6 pb-5">
            <Button
              size={'lg'}
              className="bg-main-beige text-main-pink"
              onClick={() => {
                navigate({
                  to: '/info/workshop',
                  search: {
                    faculty: 'all',
                  },
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

      {!loading && showEvaluationBanner && !hasSubmittedEvaluation && (
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
