import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { useRouter } from '@tanstack/react-router'
import { Trans, useTranslation } from 'react-i18next'

interface EvaluationBannerProps {
  open: boolean
  setOpen: (open: boolean) => void
  hasPermission: boolean
  isHighSchoolStudent?: boolean
}

const EvaluationBanner = ({
  open,
  setOpen,
  hasPermission,
  isHighSchoolStudent,
}: EvaluationBannerProps) => {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault()
        }}
        className={`${!hasPermission ? 'bg-white' : 'bg-gradient-pink-oval'} flex h-fit w-full max-w-[var(--width-page)] flex-col items-center justify-center gap-4 rounded-none p-6`}
      >
        {!hasPermission ? (
          <>
            <DialogTitle className="text-error-base text-center text-lg font-bold whitespace-pre-line">
              <Trans
                i18nKey="routes.authGroup.profileGroup.ticketGroup.evaluationBanner.titleNoPermission"
                components={{
                  u: <u className="underline" />,
                }}
              />
            </DialogTitle>

            <p className="text-center font-medium text-black">
              {t(
                'routes.authGroup.profileGroup.ticketGroup.evaluationBanner.detailNoPermission'
              )}
            </p>

            <Button
              className="bg-gradient-pink"
              expanded
              onClick={() => {
                // TODO: Navigate to Report Place
                alert('Report!!')
                setOpen(false)
              }}
            >
              {t(
                'routes.authGroup.profileGroup.ticketGroup.evaluationBanner.button.report'
              )}
            </Button>
          </>
        ) : (
          <>
            <DialogTitle className="text-main-beige text-center text-lg font-bold whitespace-pre-line">
              {t(
                'routes.authGroup.profileGroup.ticketGroup.evaluationBanner.titleHasPermission'
              )}
            </DialogTitle>

            <Button
              className="bg-gradient-beige text-main-pink"
              expanded
              onClick={() => {
                router.navigate({ to: '/questionaire' })
                setOpen(false)
              }}
            >
              {isHighSchoolStudent
                ? t(
                    'routes.authGroup.profileGroup.ticketGroup.evaluationBanner.button.certificate'
                  )
                : t(
                    'routes.authGroup.profileGroup.ticketGroup.evaluationBanner.button.questionaire'
                  )}
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default EvaluationBanner
