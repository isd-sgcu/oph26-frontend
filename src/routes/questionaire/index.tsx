import CustomModal from '@/components/CustomModal'
import QuestionaireStep1 from '@/components/questionaire/QuestionaireStep1'
import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export interface QuestionaireInterface {
  q1: {
    selected: string[]
    other?: string
  }
  q2: number | null
  q3: number | null
  q4: number | null
  q5: number | null
  q6: string
}

export const Route = createFileRoute('/questionaire/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<QuestionaireInterface>({
    q1: {
      selected: [],
      other: '',
    },
    q2: null,
    q3: null,
    q4: null,
    q5: null,
    q6: '',
  })
  const [canSubmit, setCanSubmit] = useState(false)

  // TODO: Show and Navigate to /certificate when this user is high school student
  const [showInfoPopup, setShowInfoPopup] = useState(true)
  const [shouldNavigateToCertificate, setShouldNavigateToCertificate] =
    useState(false)

  useEffect(() => {
    if (
      isQ1Valid(formData.q1) &&
      formData.q2 &&
      formData.q3 &&
      formData.q4 &&
      formData.q5
    ) {
      setCanSubmit(true)
    } else {
      setCanSubmit(false)
    }
  }, [formData])

  const lastStep = 1

  const isQ1Valid = (q1: QuestionaireInterface['q1']) => {
    if (q1.selected.length === 0) return false

    if (q1.selected.includes('other')) {
      return q1.other !== undefined && q1.other.trim().length > 0
    }

    return true
  }

  return (
    <>
      <div className="to-main-light-pink relative flex min-h-screen flex-1 flex-col overflow-hidden bg-linear-to-b from-[#ECECD2] to-10%">
        {/* Decorations */}
        <img
          src="/questionaire/blue_flower.svg"
          alt="Blue Flower"
          width={50}
          height={50}
          className="absolute top-0 left-0"
        />
        <img
          src="/questionaire/yellow_flower.svg"
          alt="Yellow Flower"
          width={50}
          height={50}
          className="absolute top-0 right-0"
        />

        {/* Content */}
        <div className="relative z-10 flex w-full flex-1 flex-col pt-16">
          <h1 className="mb-8 px-4 text-center text-2xl font-bold wrap-break-word text-white text-shadow-xs">
            <span className="block">{t('routes.questionaireGroup.title')}</span>
            <span className="block">Chula Openhouse 2026</span>
          </h1>

          <div className="flex w-full flex-1 flex-col gap-4 overflow-y-auto rounded-t-xl bg-white px-6 py-6">
            {step === 1 && (
              <QuestionaireStep1
                formData={formData}
                setFormData={setFormData}
              />
            )}

            {/* ฺButtons */}
            <div className="flex items-center justify-between gap-4">
              <Button
                onClick={() => {
                  if (step != 1) {
                    setStep((prev) => prev - 1)
                  }
                }}
                disabled={step == 1}
                size={'sm'}
                className="bg-gradient-beige text-main-pink"
              >
                {t('routes.questionaireGroup.back')}
              </Button>
              <Button
                onClick={() => {
                  if (step != lastStep) {
                    setStep((prev) => prev + 1)
                  }
                }}
                disabled={step == lastStep}
                size={'sm'}
                className={`bg-gradient-purple text-white ${step != lastStep ? 'block' : 'hidden'}`}
              >
                {t('routes.questionaireGroup.next')}
              </Button>
              <Button
                onClick={() => {
                  if (step == lastStep && canSubmit) {
                    // TODO: Send Information
                    console.log(formData)
                  }
                }}
                disabled={!canSubmit}
                size={'sm'}
                className={`bg-gradient-purple text-white ${step == lastStep ? 'block' : 'hidden'}`}
              >
                {t('routes.questionaireGroup.submit')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Info Popup for High School Student */}
      {showInfoPopup && (
        <CustomModal
          open={showInfoPopup}
          onOpenChange={setShowInfoPopup}
          iconName="fi-rr-info"
          title={t('routes.questionaireGroup.infoPopup.title')}
          detail={t('routes.questionaireGroup.infoPopup.detail')}
          buttonText={t('routes.questionaireGroup.accept')}
          onClick={() => {
            setShowInfoPopup(false)
          }}
        />
      )}
    </>
  )
}
