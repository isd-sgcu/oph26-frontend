import { Plane } from 'lucide-react'
import QRCode from 'react-qr-code'
import clsx from 'clsx'
import { FACULTIES } from '@/components/const/faculty'
import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'
import { AttendeeType } from '@/contexts/UserContext'

interface Props {
  id: string
  firstName: string
  lastName: string
  hasScanned: boolean
  role: AttendeeType
  ticketNumber: string
  dreamFaculties: string[]
}

export default function Ticket({
  id,
  firstName,
  lastName,
  hasScanned,
  role,
  ticketNumber,
  dreamFaculties,
}: Props) {
  const { t, i18n } = useTranslation()
  const locale = i18n.language

  const isHasDream = useMemo(
    () => dreamFaculties.length > 0,
    [dreamFaculties.length]
  )

  const mappedDreamFaculties = useMemo(() => {
    return dreamFaculties.map((facultyCode) => {
      const faculty = FACULTIES.find(
        (fac) => fac.value === facultyCode.toLowerCase()
      )
      const prefix = locale === 'th' ? 'คณะ' : 'Faculty of '
      return {
        code: facultyCode,
        label: faculty
          ? locale === 'th'
            ? faculty.label.th.replace(prefix, '')
            : faculty.label.en.replace(prefix, '')
          : facultyCode,
      }
    })
  }, [dreamFaculties, locale])

  return (
    <div className="relative -mt-6 w-full px-5">
      <div className="relative top-20 z-30 w-full drop-shadow-lg">
        <img src="/logo/cu-journey.webp" alt="CU Journey" className="mx-auto" />
      </div>

      <div className="mx-auto flex max-w-80 flex-col items-center justify-start overflow-visible rounded-xl">
        {/* Ticket Body */}
        <div className="bg-sub-beige -mb-2 w-full rounded-t-xl px-6 pt-14 shadow-xl">
          <div className="flex flex-col gap-3">
            <div className="inline-block w-fit rounded-full border border-[#AEAEB2] px-2 py-1 text-sm font-medium text-[#8E8E93]">
              CU-TICKET
            </div>

            <div className="flex w-full items-center justify-between gap-3">
              <div className="">
                <p className="text-sm font-semibold">28-29</p>
                <p className="text-xs font-semibold text-[#8E8E93]">
                  {t('routes.authGroup.profileGroup.ticketGroup.month')}
                </p>
              </div>
              <Plane className="rotate-45" fill="currentColor" size={20} />
              <div className="w-fit pl-2 text-right">
                <p className="text-sm font-semibold">
                  {t('routes.authGroup.profileGroup.ticketGroup.chulalongkorn')}
                </p>
                <p className="text-xs font-semibold text-[#8E8E93]">
                  {t('routes.authGroup.profileGroup.ticketGroup.university')}
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs/loose font-medium text-[#8E8E93]">
                {t(`routes.authGroup.profileGroup.ticketGroup.${role}`)}
              </p>
              <h1 className="text-xl leading-tight font-semibold">
                {firstName}
                <br />
                {lastName}
              </h1>
            </div>

            <hr
              className={clsx(
                isHasDream ? 'border-[#AEAEB2]' : 'border-transparent'
              )}
            />

            <div className="min-d-62 mb-6 flex w-full items-start justify-between">
              <div className={clsx(!isHasDream && 'invisible min-h-30')}>
                <p className="text-xs/loose font-medium text-[#8E8E93]">
                  {t(
                    'routes.authGroup.profileGroup.ticketGroup.dreamFaculties'
                  )}
                </p>
                {mappedDreamFaculties.map((fac, index) => (
                  <p
                    key={`${fac.code}-${index}`}
                    className="text-xs font-semibold"
                  >
                    {fac.label}
                  </p>
                ))}
              </div>
              {hasScanned && (
                <img
                  src="/auth/profile/ticket/landing/scanned.svg"
                  alt=""
                  className="absolute right-10 w-35"
                  loading="lazy"
                />
              )}
            </div>
          </div>
        </div>

        {/* Perforated Divider */}
        <svg
          width="100%"
          height="50"
          className="block"
          viewBox="0 0 320 50"
          preserveAspectRatio="none"
        >
          <defs>
            <mask id="ticket-cutout">
              <rect width="100%" height="100%" fill="white" />
              <circle cx="0" cy="25" r="15" fill="black" />
              <circle cx="320" cy="25" r="15" fill="black" />
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="#fff8ef"
            mask="url(#ticket-cutout)"
          />
          <line
            x1="15"
            y1="25"
            x2="305"
            y2="25"
            stroke="#B0B0B0"
            strokeWidth="2"
            strokeDasharray="9,8"
          />
        </svg>

        {/* QR Code Section */}
        <div className="bg-sub-beige -mt-2 w-full rounded-b-xl px-6 pt-4 pb-6 shadow-xl">
          <div className="flex flex-col items-center gap-2.5 pt-3">
            <QRCode
              size={256}
              style={{ height: 'auto', maxWidth: '300px', width: '90%' }}
              value={id}
              viewBox={`0 0 256 256`}
              bgColor={'#fff8ef'}
              fgColor={'#000'}
              level={'H'}
            />
            <p className="text-sm font-medium">{ticketNumber}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
