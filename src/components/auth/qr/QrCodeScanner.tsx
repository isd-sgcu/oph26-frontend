import { IDetectedBarcode, outline, Scanner } from '@yudiel/react-qr-scanner'
import { useRef, useState } from 'react'
import CustomModal from '@/components/CustomModal'
import { useTranslation } from 'react-i18next'
import { useUser } from '@/contexts/UserContext'
import { useNavigate } from '@tanstack/react-router'
import {
  checkIn,
  CheckInErrorResponse,
  CheckInResponse,
} from '@/services/checkin/checkin'
import { FACULTIES } from '@/components/const/faculty'
// import { facultyEnum } from '@/const/faculty'

export default function QrCodeScanner() {
  const { t, i18n } = useTranslation()
  const userContext = useUser()
  const navigate = useNavigate()

  if (!userContext) {
    navigate({ to: '/' })
    return null
  }

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isScanning, setIsScanning] = useState(true)
  const scanLockRef = useRef(false)
  const [modalContent, setModalContent] = useState<{
    title: React.ReactNode
    subtitle: React.ReactNode
    body: React.ReactNode
    detail: React.ReactNode
    isSuccess: boolean
  }>({
    title: '',
    subtitle: '',
    body: '',
    detail: '',
    isSuccess: false,
  })

  const handleScanQrCode = async (data: IDetectedBarcode[]) => {
    if (scanLockRef.current || !isScanning || !data || data.length === 0) return
    scanLockRef.current = true

    setIsScanning(false)

    try {
      const scannedValue = data[0].rawValue
      const response = await checkIn({ ticket_code: scannedValue })

      if (response.success) {
        // Handle success response
        handleSuccessResponse(response as CheckInResponse)
      } else {
        // Handle error response
        handleErrorResponse(response as CheckInErrorResponse)
      }
    } catch (error) {
      console.error('Unexpected error during check-in:', error)
      handleUnexpectedError()
    } finally {
      setIsModalOpen(true)
    }
  }

  const handleSuccessResponse = (response: CheckInResponse) => {
    const now = new Date()
    const locale = i18n.language
    const data = response.data
    const faculty = FACULTIES.find((f) => f.value === data.faculty)

    setModalContent({
      isSuccess: true,
      title: (
        <div className="flex flex-col gap-1">
          <p className="text-2xl font-bold">{`${data.firstname} ${data.surname}`}</p>
          <p className="text-grey text-sm font-normal">
            ID: {data.ticket_code}
          </p>
        </div>
      ),
      subtitle: (
        <div className="text-center text-xl font-semibold text-pretty">
          <p>
            {t('routes.authGroup.qrGroup.modal.success.subtitle', {
              faculty: locale === 'th' ? faculty?.label.th : faculty?.label.en,
            })}
          </p>
        </div>
      ),
      body: (
        <div
          className="text-center text-sm text-pretty"
          dangerouslySetInnerHTML={{
            __html: t('routes.authGroup.qrGroup.modal.success.body', {
              date: new Date(data.check_in_at).toLocaleDateString(
                locale === 'th' ? 'th-TH' : 'en-US',
                { year: 'numeric', month: 'short', day: 'numeric' }
              ),
              time: now.toLocaleTimeString(locale, {
                hour: '2-digit',
                minute: '2-digit',
              }),
            }),
          }}
        ></div>
      ),
      detail: (
        <div className="border-main-pink text-main-pink rounded-2xl border-2 px-3 py-2 text-center text-sm text-pretty">
          {t('routes.authGroup.qrGroup.modal.success.detail')}
        </div>
      ),
    })
  }

  // Handle error response
  const handleErrorResponse = (response: CheckInErrorResponse) => {
    const status = response.status
    const data = response.data

    // 409 = already checked in — treat as success (green) not error (red)
    if (status === 409) {
      const locale = i18n.language
      const faculty = FACULTIES.find((f) => f.value === data.faculty)
      const checkedInAt = data.checked_in_at ? new Date(data.checked_in_at) : new Date()
      setModalContent({
        isSuccess: true,
        title: (
          <div className="flex flex-col gap-1">
            <p className="text-2xl font-bold">{`${data.firstname} ${data.surname}`}</p>
            {data.ticket_code && (
              <p className="text-grey text-sm font-normal">
                ID: {data.ticket_code}
              </p>
            )}
          </div>
        ),
        subtitle: (
          <div className="text-center text-xl font-semibold text-pretty">
            <p>
              {t('routes.authGroup.qrGroup.modal.success.subtitle', {
                faculty: locale === 'th' ? faculty?.label.th : faculty?.label.en,
              })}
            </p>
          </div>
        ),
        body: (
          <div
            className="text-center text-sm text-pretty"
            dangerouslySetInnerHTML={{
              __html: t('routes.authGroup.qrGroup.modal.success.body', {
                date: checkedInAt.toLocaleDateString(
                  locale === 'th' ? 'th-TH' : 'en-US',
                  { year: 'numeric', month: 'short', day: 'numeric' }
                ),
                time: checkedInAt.toLocaleTimeString(locale, {
                  hour: '2-digit',
                  minute: '2-digit',
                }),
              }),
            }}
          ></div>
        ),
        detail: (
          <div className="border-main-pink text-main-pink rounded-2xl border-2 px-3 py-2 text-center text-sm text-pretty">
            {t('routes.authGroup.qrGroup.modal.success.detail')}
          </div>
        ),
      })
      return
    }

    setModalContent({
      isSuccess: false,
      title: (
        <p className="text-error-base text-2xl font-bold">
          {t('routes.authGroup.qrGroup.modal.error.title')}
        </p>
      ),
      subtitle: (
        <div className="text-center text-xl font-semibold text-pretty">
          <p>{t(`routes.authGroup.qrGroup.modal.error.subtitle.${status}`)}</p>
        </div>
      ),
      body: '',
      detail: '',
    })
  }

  const handleUnexpectedError = () => {
    setModalContent({
      isSuccess: false,
      title: (
        <p className="text-error-base text-2xl font-bold">
          {t('routes.authGroup.qrGroup.modal.error.title')}
        </p>
      ),
      subtitle: (
        <div className="text-center text-xl font-semibold text-pretty">
          <p>{t('routes.authGroup.qrGroup.modal.error.subtitle.400')}</p>
        </div>
      ),
      body: '',
      detail: '',
    })
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => {
      setModalContent({
        title: '',
        subtitle: '',
        body: '',
        detail: '',
        isSuccess: false,
      })
      scanLockRef.current = false
      setIsScanning(true)
    }, 300)
  }

  return (
    <>
      <div className="bg-primary-bg relative flex aspect-square! w-full max-w-full flex-col items-center justify-center overflow-hidden rounded-2xl md:w-120">
        <Scanner
          onScan={handleScanQrCode}
          onError={() => console.error('Scanner error')}
          components={{
            onOff: false,
            torch: true,
            zoom: true,
            finder: false,
            tracker: outline,
          }}
          styles={{
            container: {
              width: '100%',
              maxWidth: '400px',
              height: 'auto',
              aspectRatio: '1 / 1',
              padding: '16px',
              border: '0px none',
            },
            video: {
              borderRadius: 10,
              aspectRatio: '1 / 1',
              width: '100%',
              height: '100%',
              border: '0px none',
            },
          }}
          scanDelay={2000}
          allowMultiple={false}
          sound={false}
        />
      </div>
      <CustomModal
        open={isModalOpen}
        onOpenChange={(open) => !open && handleCloseModal()}
        iconName={
          modalContent.isSuccess ? 'fi-rr-check-circle' : 'fi-rr-cross-circle'
        }
        title={modalContent.title}
        subtitle={modalContent.subtitle}
        body={modalContent.body}
        detail={modalContent.detail}
        buttonText={t('routes.authGroup.qrGroup.modal.confirmBtn')}
        onClick={handleCloseModal}
      />
    </>
  )
}
