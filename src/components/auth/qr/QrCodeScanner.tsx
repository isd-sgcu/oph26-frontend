import { IDetectedBarcode, outline, Scanner } from '@yudiel/react-qr-scanner'
import { useState } from 'react'
import CustomModal from '@/components/CustomModal'
import { useTranslation } from 'react-i18next'
import { FACULTIES } from '@/components/const/faculty'

export default function QrCodeScanner() {
  const { t, i18n } = useTranslation()
  const [scannedData, setScannedData] = useState<string>('')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isScanning, setIsScanning] = useState<boolean>(true)
  const [title, setTitle] = useState<string | React.ReactNode>('')
  const [subtitle, setSubtitle] = useState<string | React.ReactNode>('')
  const [body, setBody] = useState<string | React.ReactNode>('')
  const [detail, setDetail] = useState<string | React.ReactNode>('')
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const handleScanQrCode = (data: IDetectedBarcode[]) => {
    if (!isScanning) return

    try {
      if (!data || data.length === 0) {
        throw new Error('No data found in QR code.')
      }

      setIsScanning(false)

      const now = new Date()
      const locale = i18n.language
      const scannedValue = data[0].rawValue
      setScannedData(scannedValue)

      // ** TODO ** Fetch data from backend using scannedValue
      const mockSuccess = false
      const errorCode = 'error_02'
      let facultyName = ''

      setIsSuccess(mockSuccess)

      if (mockSuccess) {
        setTitle(
          <div className="flex flex-col gap-1">
            <p className="text-2xl font-bold">{'John Doe'}</p>
            <p className="text-grey text-sm font-normal">ID : {'12345678'}</p>
          </div>
        )
        setSubtitle(
          <div className="text-center text-xl font-semibold text-pretty">
            <p>{'John Doe'}</p>
            <p>{t('routes.authGroup.qrGroup.modal.success.subtitle')}</p>
            <p>CU OPEN HOUSE 2026</p>
          </div>
        )
        facultyName =
          locale === 'th'
            ? FACULTIES.find((fac) => fac.value === 'eng')?.label?.th || ''
            : FACULTIES.find((fac) => fac.value === 'eng')?.label?.en || ''
        setBody(
          <div
            className="text-center text-sm text-pretty"
            dangerouslySetInnerHTML={{
              __html: t('routes.authGroup.qrGroup.modal.success.body', {
                StaffName: 'น้องสตาฟ ใครเอ่ย',
                FacultyName: facultyName,
                Date: now.toLocaleDateString(
                  locale === 'th' ? 'th-TH' : 'en-US',
                  {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  }
                ),
                Time: now.toLocaleTimeString('th-TH', {
                  hour: '2-digit',
                  minute: '2-digit',
                }),
              }),
            }}
          ></div>
        )
        setDetail(
          <div className="border-main-pink text-main-pink rounded-2xl border-2 px-3 py-2 text-center text-sm text-pretty">
            {t('routes.authGroup.qrGroup.modal.success.detail')}
          </div>
        )
      } else {
        setTitle(
          <p className="text-error-base text-2xl font-bold">
            {t('routes.authGroup.qrGroup.modal.error.title')}
          </p>
        )
        setSubtitle(
          <div className="text-center text-xl font-semibold text-pretty">
            {errorCode === 'error_02' && <p>John Doe</p>}
            <p>
              {t(`routes.authGroup.qrGroup.modal.error.subtitle.${errorCode}`)}
            </p>
          </div>
        )
        setBody('')
        setDetail('')
      }

      setIsModalOpen(true)
    } catch (error: any) {
      setIsSuccess(false)
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
      setBody('')
      setDetail('')
      setIsModalOpen(true)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)

    // Reset all states
    setTimeout(() => {
      setTitle('')
      setSubtitle('')
      setBody('')
      setDetail('')
      setScannedData('')
      setIsSuccess(false)
      setIsScanning(true)
    }, 300)
  }

  const handleModalOpenChange = (open: boolean) => {
    if (!open) {
      handleCloseModal()
    }
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
        onOpenChange={handleModalOpenChange}
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
