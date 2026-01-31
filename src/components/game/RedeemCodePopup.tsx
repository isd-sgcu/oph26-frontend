import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog'
import { FlatIcon } from '../FlatIcon'
import { useTranslation } from 'react-i18next'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FACULTIES, FacultyType } from '../const/faculty'
import { Piece } from './Piece'

interface RedeemCodePopupProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const RedeemCodePopup = ({ open, setOpen }: RedeemCodePopupProps) => {
  const { i18n, t } = useTranslation()
  const [step, setStep] = useState(1)
  const [code, setCode] = useState('')
  const [success, setSuccess] = useState(false)
  const [validCode, setValidCode] = useState(false)
  const [facultyPiece, setFacultyPiece] = useState<FacultyType>()

  useEffect(() => {
    if (code.length == 6) {
      setValidCode(true)
    } else {
      setValidCode(false)
    }
  }, [code])

  const selectedFaculty = FACULTIES.find((f) => f.value === facultyPiece)

  return (
    <>
      {step == 1 ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="flex h-fit w-[90vw] max-w-90 flex-col items-center gap-3 rounded-2xl p-6 pb-4">
            <FlatIcon
              name={'fi-rr-password'}
              size={48}
              className="text-main-pink"
            />

            {/* Title */}
            <DialogTitle className="mt-2 text-center text-2xl font-bold text-black">
              {t('components.gameGroup.redeemCodePopup.title1')}
            </DialogTitle>

            {/* Body */}
            <p className="text-center text-base font-medium text-black">
              {t('components.gameGroup.redeemCodePopup.body1')}
            </p>

            {/* Input */}
            <Input
              value={code}
              onChange={(e) => {
                const value = e.target.value.toUpperCase()
                if (/^[A-Z0-9]*$/.test(value)) {
                  setCode(value)
                }
              }}
              maxLength={6}
              className="border-main-pink text-main-pink placeholder:text-main-light-pink mt-2 h-9 max-w-56.25 rounded-lg border text-center font-medium"
              placeholder="XXXXXX"
            />

            {/* Buttons */}
            <div className="mt-6 flex h-fit w-full flex-wrap justify-center gap-x-8 gap-y-4">
              <Button
                className="bg-gradient-beige text-main-pink justify-self-center"
                size={'sm'}
                onClick={() => {
                  setOpen(false)
                }}
              >
                {t('components.gameGroup.redeemCodePopup.cancel')}
              </Button>
              <Button
                className="bg-gradient-pink text-main-beige justify-self-center"
                size={'sm'}
                onClick={() => {
                  if (!validCode) {
                    setSuccess(false)
                  } else {
                    try {
                      // TODO: Send Code using API

                      // MOCK: Faculty
                      setFacultyPiece('arch')

                      setSuccess(true)
                    } catch (error) {
                      setSuccess(false)
                    }
                  }
                  setStep(2)
                }}
              >
                {t('components.gameGroup.redeemCodePopup.submit')}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      ) : step == 2 ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="flex h-fit w-[90vw] max-w-90 flex-col items-center gap-3 rounded-2xl p-6 pb-4">
            <FlatIcon
              name={success ? 'fi-rr-check' : 'fi-rr-exclamation'}
              size={48}
              className="text-main-pink"
            />

            {/* Title */}
            <DialogTitle className="mt-2 text-center text-2xl font-bold text-black">
              {success
                ? t('components.gameGroup.redeemCodePopup.title2Success')
                : validCode
                  ? t('components.gameGroup.redeemCodePopup.title2ExpiredCode')
                  : t('components.gameGroup.redeemCodePopup.title2InvalidCode')}
            </DialogTitle>

            {/* Body */}
            <p className="text-center text-sm text-black">
              {success
                ? `${t('components.gameGroup.redeemCodePopup.body2Success')} ${
                    selectedFaculty?.label[i18n.language as 'th' | 'en'] ?? ''
                  }`
                : validCode
                  ? t('components.gameGroup.redeemCodePopup.body2ExpiredCode')
                  : t('components.gameGroup.redeemCodePopup.body2InvalidCode')}
            </p>

            {/* Piece */}
            {success && (
              <Piece faculty={facultyPiece} variant={2} count={1} size={120} />
            )}

            {/* Button */}
            <Button
              className="bg-gradient-purple mt-6 text-white"
              size="sm"
              onClick={() => {
                success ? setOpen(false) : setStep(1)
              }}
            >
              {t('components.gameGroup.redeemCodePopup.confirm')}
            </Button>
          </DialogContent>
        </Dialog>
      ) : null}
    </>
  )
}

export default RedeemCodePopup
