import CustomModal from '@/components/CustomModal'
import { FlatIcon } from '@/components/FlatIcon'
import QuestionaireStep1 from '@/components/questionaire/QuestionaireStep1'
import QuestionaireStepCertificate from '@/components/questionaire/QuestionaireStepCertificate'
import QuestionaireStepLast from '@/components/questionaire/QuestionaireStepLast'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
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
  certificate_firstname: string
  certificate_lastname: string
}

export const Route = createFileRoute('/questionaire/')({
  component: RouteComponent,
})

function RouteComponent() {
  const lastStep = 3
  const highSchool = true

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
    certificate_firstname: '',
    certificate_lastname: '',
  })
  const [canSubmitStep1, setCanSubmitStep1] = useState(false)
  const [canSubmitStepCertificate, setCanSubmitStepCertificate] =
    useState(false)
  const [canSubmit, setCanSubmit] = useState(false)

  const [isHighSchoolStudent, setIsHighSchoolStudent] = useState(false)
  const [openHighSchoolInformationPopup, setOpenHighSchoolInformationPopup] =
    useState(true)
  const [openHighSchoolConfirmationPopup, setOpenHighSchoolConfirmationPopup] =
    useState(false)

  // Check User Information
  useEffect(() => {
    setIsHighSchoolStudent(highSchool)
    setOpenHighSchoolInformationPopup(highSchool)
  }, [])

  // Check Date (Can access after 30 March 2026)
  useEffect(() => {
    const currentDate = new Date()
    const targetDate = new Date('2026-03-30T00:00:00')
    if (currentDate < targetDate) {
      router.navigate({ to: '/' })
    }
  }, [])

  // Check Step 1
  useEffect(() => {
    if (
      isQ1Valid(formData.q1) &&
      formData.q2 &&
      formData.q3 &&
      formData.q4 &&
      formData.q5
    ) {
      setCanSubmitStep1(true)
    } else {
      setCanSubmitStep1(false)
    }
  }, [formData])

  // Check Step Certificate
  useEffect(() => {
    if (
      !isHighSchoolStudent ||
      (isHighSchoolStudent &&
        formData.certificate_firstname &&
        formData.certificate_lastname)
    ) {
      setCanSubmitStepCertificate(true)
    } else {
      setCanSubmitStepCertificate(false)
    }
  }, [formData])

  useEffect(() => {
    if (canSubmitStep1 && canSubmitStepCertificate) {
      setCanSubmit(true)
    } else {
      setCanSubmit(false)
    }
  }, [canSubmitStep1, canSubmitStepCertificate])

  const isQ1Valid = (q1: QuestionaireInterface['q1']) => {
    if (q1.selected.length === 0) return false

    if (q1.selected.includes('other')) {
      return q1.other !== undefined && q1.other.trim().length > 0
    }

    return true
  }

  return (
    <>
      <div className="bg-main-light-pink relative flex w-full flex-col">
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

        {((!isHighSchoolStudent && step == lastStep) ||
          (isHighSchoolStudent &&
            (step == lastStep || step == lastStep - 1))) && (
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
            className={`flex w-full flex-col gap-4 rounded-t-xl ${(isHighSchoolStudent && (step == lastStep || step == lastStep - 1)) || (!isHighSchoolStudent && step == lastStep) ? 'bg-transparent pt-0' : 'bg-white pt-6'} px-6 pb-6`}
          >
            {/* Form Step 1 */}
            {step === 1 && (
              <QuestionaireStep1
                formData={formData}
                setFormData={setFormData}
              />
            )}

            {/* Form Step Certificate */}
            {step == lastStep - 1 && isHighSchoolStudent && (
              <QuestionaireStepCertificate
                formData={formData}
                setFormData={setFormData}
              />
            )}

            {/* Form Last Page */}
            {step === lastStep && (
              <QuestionaireStepLast isHighSchoolStudent={isHighSchoolStudent} />
            )}

            {/* ฺForm Buttons for Normal User */}
            {step < lastStep && !isHighSchoolStudent && (
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
                    if (step == 1 && canSubmitStep1) {
                      setStep((prev) => prev + 1)
                    }
                  }}
                  disabled={step == 1 && !canSubmitStep1}
                  size={'sm'}
                  className={`bg-gradient-purple text-white ${step < lastStep - 2 ? 'block' : 'hidden'}`}
                >
                  {t('routes.questionaireGroup.next')}
                </Button>

                {/* Submit */}
                <Button
                  onClick={() => {
                    if (step == lastStep - 2 && canSubmit) {
                      // TODO: Send Information

                      console.log(formData)
                      setStep(lastStep)
                      window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                      })
                    }
                  }}
                  disabled={!canSubmit}
                  size={'sm'}
                  className={`bg-gradient-purple text-white ${step == lastStep - 2 ? 'block' : 'hidden'}`}
                >
                  {t('routes.questionaireGroup.submit')}
                </Button>
              </div>
            )}

            {/* Form Buttons for High School Student */}
            {step < lastStep && isHighSchoolStudent && (
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
                    if (step == 1 && canSubmitStep1) {
                      setStep((prev) => prev + 1)
                    }
                  }}
                  disabled={step == 1 && !canSubmitStep1}
                  size={'sm'}
                  className={`bg-gradient-purple text-white ${step < lastStep - 1 ? 'block' : 'hidden'}`}
                >
                  {t('routes.questionaireGroup.next')}
                </Button>

                {/* Submit */}
                <Button
                  onClick={() => {
                    if (step == lastStep - 1 && canSubmit) {
                      setOpenHighSchoolConfirmationPopup(true)
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
      {openHighSchoolInformationPopup && (
        <CustomModal
          open={openHighSchoolInformationPopup}
          onOpenChange={setOpenHighSchoolInformationPopup}
          iconName="fi-rr-info"
          title={t('routes.questionaireGroup.infoPopup.title')}
          detail={t('routes.questionaireGroup.infoPopup.detail')}
          buttonText={t('routes.questionaireGroup.accept')}
          onClick={() => {
            setOpenHighSchoolInformationPopup(false)
          }}
        />
      )}

      {/* Confirmation Popup for High School Student */}
      {openHighSchoolConfirmationPopup && (
        <Dialog
          open={openHighSchoolConfirmationPopup}
          onOpenChange={setOpenHighSchoolConfirmationPopup}
        >
          <DialogContent className="flex h-fit w-[90vw] max-w-90 flex-col items-center gap-3 rounded-2xl p-6">
            {/* Icon */}
            <FlatIcon name="fi-rr-info" size={48} className="text-main-pink" />

            {/* Title */}
            <DialogTitle className="mt-2 text-center text-2xl font-bold text-red-500">
              {t('routes.questionaireGroup.partCertificate.confirmation.title')}
            </DialogTitle>

            <p className="text-center text-lg font-medium text-black">
              {t('routes.questionaireGroup.partCertificate.confirmation.body')}
            </p>

            {/* Name */}
            <div className="border-main-pink text-main-pink h-fit min-h-9 w-full max-w-[80%] rounded-md border-2 px-3 py-1 text-center">
              {formData.certificate_firstname +
                ' ' +
                formData.certificate_lastname}
            </div>

            <p className="text-center text-base font-normal text-red-500">
              {t('routes.questionaireGroup.partCertificate.caution')}
            </p>

            {step < lastStep && isHighSchoolStudent && (
              <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
                {/* Back */}
                <Button
                  onClick={() => {
                    if (step == lastStep - 1) {
                      setOpenHighSchoolConfirmationPopup(false)
                    }
                  }}
                  disabled={step != lastStep - 1}
                  size={'sm'}
                  className={`bg-gradient-beige text-main-pink ${step != lastStep - 1 ? 'hidden' : 'block'}`}
                >
                  {t('routes.questionaireGroup.back')}
                </Button>

                {/* Submit */}
                <Button
                  onClick={() => {
                    if (step == lastStep - 1 && canSubmit) {
                      // TODO: Form Submission

                      console.log(formData)
                      setStep((prev) => prev + 1)
                      setOpenHighSchoolConfirmationPopup(false)
                    }
                  }}
                  disabled={step != lastStep - 1 || !canSubmit}
                  size={'sm'}
                  className={`bg-gradient-purple text-white ${step == lastStep - 1 ? 'block' : 'hidden'}`}
                >
                  {t('routes.questionaireGroup.submit')}
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
