import CustomModal from '@/components/CustomModal'
import QuestionaireStep1 from '@/components/questionaire/QuestionaireStep1'
import QuestionaireStepLast from '@/components/questionaire/QuestionaireStepLast'
import { Button } from '@/components/ui/button'
import { createFileRoute, useRouter } from '@tanstack/react-router'
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
  const lastStep = 2

  const { t } = useTranslation()
  const router = useRouter()
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

  // Check User Information
  useEffect(() => {
    setShowInfoPopup(true)
    setShouldNavigateToCertificate(false)
  }, [])

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

  const isQ1Valid = (q1: QuestionaireInterface['q1']) => {
    if (q1.selected.length === 0) return false

    if (q1.selected.includes('other')) {
      return q1.other !== undefined && q1.other.trim().length > 0
    }

    return true
  }

  return (
    <>
      <div className="to-main-pink relative flex flex-col bg-linear-to-b from-[#ECECD2] to-10%">
        {/* Decorations */}
        <img
          src="/questionaire/blue_flower.png"
          alt="Blue Flower"
          style={{
            width: 50,
            height: 50,
          }}
          className="absolute top-0 left-0"
        />
        <img
          src="/questionaire/yellow_flower.png"
          alt="Yellow Flower"
          style={{
            width: 50,
            height: 50,
          }}
          className="absolute top-0 right-0"
        />

        {step == lastStep && (
          <>
            {/* Left Road */}
            <img
              src="/background/road2.svg"
              alt="Left Road"
              className="absolute"
              style={{
                width: 'clamp(250px, 60vw, 250px)',
                left: 0,
                bottom: 0,
              }}
            />

            {/* Right Road */}
            <img
              src="/background/road2.svg"
              alt="Right Road"
              className="absolute"
              style={{
                width: 'clamp(250px, 60vw, 250px)',
                right: 0,
                bottom: 0,
                transform: 'rotateY(180deg)',
              }}
            />

            {/* Blue Flower */}
            <img
              src="/questionaire/blue_flower.png"
              alt="Blue Flower"
              style={{
                width: 50,
                height: 50,
              }}
              className="absolute bottom-4 left-[35%]"
            />

            {/* Yellow Flower */}
            <img
              src="/questionaire/yellow_flower.png"
              alt="Yellow Flower"
              style={{
                width: 50,
                height: 50,
              }}
              className="absolute right-[35%] bottom-4"
            />

            {/* Blue Tree */}
            <img
              src="/questionaire/blue_tree.png"
              alt="Blue True"
              style={{
                width: 120,
                height: 140,
              }}
              className="absolute right-0 bottom-0"
            />

            {/* Yellow Tree */}
            <img
              src="/questionaire/yellow_tree.png"
              alt="Yellow Tree"
              style={{
                width: 40,
                height: 100,
              }}
              className="absolute bottom-0 left-[10%]"
            />

            {/* Green Bush */}
            <img
              src="/questionaire/green_bush.png"
              alt="Green Bush"
              style={{
                width: 64,
                height: 32,
              }}
              className="absolute bottom-0 left-0"
            />
          </>
        )}

        {/* Content */}
        <div className="relative z-10 flex h-fit w-full flex-1 flex-col pt-16">
          <h1 className="mb-8 px-4 text-center text-2xl font-bold wrap-break-word text-white text-shadow-xs">
            <span className="block">{t('routes.questionaireGroup.title')}</span>
            <span className="block">Chula Openhouse 2026</span>
          </h1>

          <div
            className={`flex w-full flex-col gap-4 rounded-t-xl ${step != lastStep ? 'bg-white pt-6' : 'bg-transparent pt-0'} px-6 pb-6`}
          >
            {/* Form Step 1 */}
            {step === 1 && (
              <QuestionaireStep1
                formData={formData}
                setFormData={setFormData}
              />
            )}

            {/* Form Last Page */}
            {step === lastStep && <QuestionaireStepLast />}

            {/* ฺForm Buttons */}
            {step < lastStep && (
              <div className="flex items-center justify-between gap-4">
                {/* Back */}
                <Button
                  onClick={() => {
                    if (step != 1) {
                      setStep((prev) => prev - 1)
                    }
                  }}
                  disabled={step == 1}
                  size={'sm'}
                  className={`bg-gradient-beige text-main-pink ${step == lastStep ? 'hidden' : 'block'}`}
                >
                  {t('routes.questionaireGroup.back')}
                </Button>

                {/* Next */}
                <Button
                  onClick={() => {
                    if (step < lastStep - 1) {
                      setStep((prev) => prev + 1)
                    }
                  }}
                  disabled={step == lastStep - 1}
                  size={'sm'}
                  className={`bg-gradient-purple text-white ${step < lastStep - 1 ? 'block' : 'hidden'}`}
                >
                  {t('routes.questionaireGroup.next')}
                </Button>

                {/* Submit */}
                <Button
                  onClick={() => {
                    if (step == lastStep - 1 && canSubmit) {
                      // TODO: Send Information

                      console.log(formData)
                      if (step == lastStep - 1) {
                        if (shouldNavigateToCertificate) {
                          router.navigate({ to: '/certificate' })
                        } else {
                          setStep((prev) => prev + 1)
                        }
                        window.scrollTo({
                          top: 0,
                          behavior: 'smooth',
                        })
                      }
                    }
                  }}
                  disabled={!canSubmit}
                  size={'sm'}
                  className={`bg-gradient-purple text-white ${step == lastStep - 1 ? 'block' : 'hidden'}`}
                >
                  {t('routes.questionaireGroup.submit')}
                </Button>
              </div>
            )}

            {/* Form Last Page Button */}
            {step == lastStep && (
              <div className="flex items-center justify-center gap-4">
                {/* Home */}
                <Button
                  onClick={() => {
                    if (step == lastStep) {
                      router.navigate({ to: '/' })
                    }
                  }}
                  size={'sm'}
                  className={`bg-gradient-purple justify-self-center text-white ${step == lastStep ? 'block' : 'hidden'}`}
                >
                  {t('routes.questionaireGroup.home')}
                </Button>
              </div>
            )}
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
