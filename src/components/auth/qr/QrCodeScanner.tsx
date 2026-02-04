import { IDetectedBarcode, outline, Scanner } from '@yudiel/react-qr-scanner'
import { useState } from 'react'
import CustomModal from '@/components/CustomModal'
import { useTranslation } from 'react-i18next'

export default function QrCodeScanner() {
  const { t } = useTranslation()
  const [scannedData, setScannedData] = useState<string>('')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [title, setTitle] = useState<string | React.ReactNode>('')
  const [subtitle, setSubtitle] = useState<string | React.ReactNode>('')
  const [body, setBody] = useState<string | React.ReactNode>('')
  const [detail, setDetail] = useState<string | React.ReactNode>('')
  const isSuccess = false

  const handleScanQrCode = (data: IDetectedBarcode[]) => {
    try {
      if (!data) {
        throw new Error('No data found in QR code.')
      }

      const now = new Date()
      const scannedValue = data[0].rawValue
      const errorCode = 'error_02'
      // ** TODO ** Fetch data from backend using scannedValue

      if (isSuccess) {
        setTitle(
          <div className="flex flex-col gap-1">
            <p className="text-2xl font-bold">{'John Doe'}</p>
            <p className="text-grey text-sm font-normal">ID : {'12345678'}</p>
          </div>
        )
        setSubtitle(
          <p className="text-center text-xl font-semibold text-pretty">
            {t('routes.authGroup.qrGroup.modal.success.subtitle', {
              Name: 'John Doe',
            })}
          </p>
        )
        setBody(
          <div className="text-center text-pretty">
            {t('routes.authGroup.qrGroup.modal.success.body', {
              StaffName: 'น้องสตาฟ',
              FacultyName: 'คณะวิศวกรรมศาสตร์',
              Date: now.toLocaleDateString('th-TH', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }),
              Time: now.toLocaleTimeString('th-TH', {
                hour: '2-digit',
                minute: '2-digit',
              }),
            })}
          </div>
        )
        setDetail(
          <div className="border-main-pink text-main-pink rounded-2xl border-2 px-3 py-2 text-center text-sm text-pretty">
            {t('routes.authGroup.qrGroup.modal.success.detail')}
          </div>
        )
      } else {
        setTitle(
          <p className="text-error-base text-3xl font-bold">
            {t('routes.authGroup.qrGroup.modal.error.title')}
          </p>
        )

        const errorKey = errorCode === 'error_01' ? 'error_01' : 'error_02'

        setSubtitle(
          <p className="text-center text-xl font-semibold text-pretty">
            {t(`routes.authGroup.qrGroup.modal.error.subtitle.${errorKey}`, {
              Name: 'John Doe',
            })}
          </p>
        )
      }

      setIsModalOpen(true)
    } catch (error: any) {
      setTitle(
        <p className="text-error-base text-3xl font-bold">
          {t('routes.authGroup.qrGroup.modal.error.title')}
        </p>
      )
      setSubtitle(
        <p className="text-center text-xl font-semibold text-pretty">
          {t('routes.authGroup.qrGroup.modal.error.subtitle.error_01')}
        </p>
      )
      setIsModalOpen(true)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setScannedData('')
  }

  return (
    <>
      <div className="bg-primary-bg relative flex aspect-square! w-full max-w-full flex-col items-center justify-center overflow-hidden rounded-2xl md:w-120">
        <Scanner
          onScan={handleScanQrCode}
          onError={() => console.log('Error')}
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
          allowMultiple={true}
          sound={false}
        >
          <div className="pointer-events-none absolute inset-0 p-4">
            <div className="absolute top-12 left-12 h-10 w-10 rounded-xs border-5 border-r-0 border-b-0 border-white" />
            <div className="absolute top-12 right-12 h-10 w-10 rounded-xs border-5 border-b-0 border-l-0 border-white" />
            <div className="absolute bottom-12 left-12 h-10 w-10 rounded-xs border-5 border-t-0 border-r-0 border-white" />
            <div className="absolute right-12 bottom-12 h-10 w-10 rounded-xs border-5 border-t-0 border-l-0 border-white" />
          </div>
        </Scanner>
      </div>
      <CustomModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        iconName={isSuccess ? 'fi-rr-check-circle' : 'fi-rr-cross-circle'}
        title={title}
        subtitle={subtitle}
        body={body}
        detail={detail}
        buttonText={t('routes.authGroup.qrGroup.modal.confirmBtn')}
        onClick={handleCloseModal}
      />
    </>
  )
}
