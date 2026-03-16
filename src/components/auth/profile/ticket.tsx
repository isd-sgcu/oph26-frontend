import { Plane } from 'lucide-react'
import QRCode from 'react-qr-code'
import clsx from 'clsx'
import { FACULTIES } from '@/components/const/faculty'
import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'

interface Props {
  id: string
  firstName: string
  lastName: string
  status: boolean
  dreamFaculties: string[]
}

export default function Ticket({
  id,
  firstName,
  lastName,
  status,
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
      const faculty = FACULTIES.find((fac) => fac.value === facultyCode.toLowerCase())
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
    <div className="relative -mt-6 px-5 w-full">
      <div className="top-20 z-30 relative drop-shadow-lg w-full">
        <img src="/logo/cu-journey.webp" alt="CU Journey" className="mx-auto" />
      </div>

      <div className="flex flex-col justify-start items-center mx-auto rounded-xl max-w-80 overflow-visible">
        {/* Ticket Body */}
        <div className="bg-sub-beige shadow-xl -mb-2 px-6 pt-14 rounded-t-xl w-full">
          <div className="flex flex-col gap-3">
            <div className="inline-block px-2 py-1 border border-[#AEAEB2] rounded-full w-fit font-medium text-[#8E8E93] text-sm">
              CU-TICKET
            </div>

            <div className="flex justify-between items-center gap-3 w-full">
              <div className="">
                <p className="font-semibold text-sm">28-29</p>
                <p className="font-semibold text-[#8E8E93] text-xs">
                  {t('routes.authGroup.profileGroup.ticketGroup.month')}
                </p>
              </div>
              <Plane className="rotate-45" fill="currentColor" size={20} />
              <div className="pl-2 w-fit text-right">
                <p className="font-semibold text-sm">
                  {t('routes.authGroup.profileGroup.ticketGroup.chulalongkorn')}
                </p>
                <p className="font-semibold text-[#8E8E93] text-xs">
                  {t('routes.authGroup.profileGroup.ticketGroup.university')}
                </p>
              </div>
            </div>

            <div>
              <p className="font-medium text-[#8E8E93] text-xs/loose">
                {t('routes.authGroup.profileGroup.ticketGroup.student')}
              </p>
              <h1 className="font-semibold text-xl leading-tight">
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

            <div className="flex justify-between items-start mb-6 w-full min-d-62">
              <div className={clsx(!isHasDream && 'invisible min-h-30')}>
                <p className="font-medium text-[#8E8E93] text-xs/loose">
                  {t(
                    'routes.authGroup.profileGroup.ticketGroup.dreamFaculties'
                  )}
                </p>
                {mappedDreamFaculties.map((fac, index) => (
                  <p
                    key={`${fac.code}-${index}`}
                    className="font-semibold text-xs"
                  >
                    {fac.label}
                  </p>
                ))}
              </div>
              {status && (
                <img
                  src="/auth/profile/ticket/landing/scanned.svg"
                  alt=""
                  className="right-10 absolute w-35"
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
        <div className="bg-sub-beige shadow-xl -mt-2 px-6 pt-4 pb-6 rounded-b-xl w-full">
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
            <p className="font-medium text-sm">ID{id}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
