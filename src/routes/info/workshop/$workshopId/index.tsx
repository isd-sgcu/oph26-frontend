import { Workshop, WORKSHOP_DATA } from '@/components/const/workshop'
import { FlatIcon } from '@/components/FlatIcon'
import BreakLine from '@/components/questionaire/Breakline'
import { Button } from '@/components/ui/button'
import { getFacultyLabel } from '@/utils/function'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/info/workshop/$workshopId/')({
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter()
  const { i18n, t } = useTranslation()
  const { workshopId } = Route.useParams()
  const [workshop, setWorkshop] = useState<Workshop | null>(null)

  useEffect(() => {
    const targetWorkshop = WORKSHOP_DATA.find((w) => w.id === workshopId)
    if (!targetWorkshop) {
      return
    }
    setWorkshop(targetWorkshop || null)
  }, [workshopId])

  const facultyLabel = workshop ? getFacultyLabel(workshop.faculty) : null

  if (!workshop) {
    return (
      <div className="from-main-light-pink to-main-pink relative flex w-full flex-col bg-linear-to-b">
        {/* Content */}
        <div className="relative z-10 flex h-full w-full flex-col items-center gap-6 px-4 py-8">
          <h1 className="text-center text-3xl font-bold text-white text-shadow-md">
            {t('routes.infoGroup.workshopGroup.title')}
          </h1>

          <div className="flex w-full flex-1 flex-col items-center justify-center gap-6 rounded-xl bg-white p-4">
            <p className="text-main-pink text-center text-3xl font-bold">
              {t('routes.infoGroup.workshopGroup.notFound')}
            </p>

            <Button
              className="bg-main-pink"
              size="md"
              expanded
              onClick={() => {
                router.navigate({ to: '/info/workshop' })
              }}
            >
              <span className="text-white">
                {t('routes.infoGroup.workshopGroup.back')}
              </span>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="from-main-light-pink to-main-pink flex w-full flex-col bg-linear-to-b">
      {/* Content */}

      <div className="relative z-10 flex h-full w-full flex-col gap-6 px-4 py-8">
        <h1 className="relative text-center text-3xl font-bold text-white text-shadow-md">
          <span
            onClick={() => {
              router.navigate({ to: '/info/workshop' })
            }}
            className="absolute left-0 -translate-y-0.5 cursor-pointer text-4xl font-semibold text-white"
          >
            {'<'}
          </span>
          <span>{t('routes.infoGroup.workshopGroup.title')}</span>
        </h1>

        <div className="flex-center flex min-h-80 w-full flex-col gap-6 rounded-xl bg-white px-6 py-8">
          <h2 className="text-main-pink text-xl font-bold">{workshop.name}</h2>
          {/* Detail */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <FlatIcon
                name="fi-rr-info"
                size={20}
                className="text-main-pink"
              />
              <h3 className="text-base font-semibold text-black">
                {t('routes.infoGroup.workshopGroup.details')}
              </h3>
            </div>
            <p className="pl-7 text-sm">{workshop.description}</p>
          </div>

          <BreakLine variant="pink" />

          {/* Faculty */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <FlatIcon
                name="fi-rr-graduation-cap"
                size={20}
                className="text-main-pink"
              />
              <h3 className="text-base font-semibold text-black">
                {t('routes.infoGroup.workshopGroup.faculty')}
              </h3>
            </div>
            <p className="pl-7 text-sm">
              {i18n.language == 'th' ? facultyLabel?.th : facultyLabel?.en}
            </p>
          </div>

          {/* Owner */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <FlatIcon
                name="fi-rr-comment-user"
                size={20}
                className="text-main-pink"
              />
              <h3 className="text-base font-semibold text-black">
                {t('routes.infoGroup.workshopGroup.owner')}
              </h3>
            </div>
            <p className="pl-7 text-sm">
              {workshop.owner ??
                (i18n.language === 'th' ? facultyLabel?.th : facultyLabel?.en)}
            </p>
          </div>

          <BreakLine variant="pink" />

          {/* How To Participate */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <FlatIcon
                name="fi-rr-document"
                size={20}
                className="text-main-pink"
              />
              <h3 className="text-base font-semibold text-black">
                {t('routes.infoGroup.workshopGroup.howToParticipate')}
              </h3>
            </div>
            <p className="pl-7 text-sm">
              {workshop.hasPreregistered
                ? t('routes.infoGroup.workshopGroup.preregistered')
                : t('routes.infoGroup.workshopGroup.walkin')}
            </p>
          </div>

          <BreakLine variant="pink" />

          {/* Time */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <FlatIcon
                name="fi-rr-clock"
                size={20}
                className="text-main-pink"
              />
              <h3 className="text-base font-semibold text-black">
                {t('routes.infoGroup.workshopGroup.time')}
              </h3>
            </div>
            <ul className="pl-7 text-sm">
              {workshop.timeSlot ? (
                workshop.timeSlot
                  ?.split(' / ')
                  .map((time, index) => <li key={index}>{time}</li>)
              ) : (
                <li>-</li>
              )}
            </ul>
          </div>

          {/* Participant Limit */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <FlatIcon
                name="fi-rr-user"
                size={20}
                className="text-main-pink"
              />
              <h3 className="text-base font-semibold text-black">
                {t('routes.infoGroup.workshopGroup.participantLimit')}
              </h3>
            </div>
            <p className="pl-7 text-sm">
              {workshop.hasLimitParticipants
                ? t('routes.infoGroup.workshopGroup.hasLimitParticipants')
                : t('routes.infoGroup.workshopGroup.noLimitParticipants')}
            </p>
          </div>

          {/* Number of Rounds */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <FlatIcon
                name="fi-rr-calendar"
                size={20}
                className="text-main-pink"
              />
              <h3 className="text-base font-semibold text-black">
                {t('routes.infoGroup.workshopGroup.numRoundsPerDay')}
              </h3>
            </div>
            <p className="pl-7 text-sm">
              {workshop.timeSlot ? workshop.timeSlot?.split(' / ').length : '-'}
            </p>
          </div>

          <BreakLine variant="pink" />

          {/* Location */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <FlatIcon name="fi-rr-map" size={20} className="text-main-pink" />
              <h3 className="text-base font-semibold text-black">
                {t('routes.infoGroup.workshopGroup.location')}
              </h3>
            </div>
            <p className="pl-7 text-sm">{workshop.locationName ?? '-'}</p>
          </div>

          {/* Location Button */}
          {workshop.locationURL && (
            <Button
              size="lg"
              className="mx-auto text-white"
              onClick={() => {
                window.open(workshop.locationURL, '_blank')
              }}
            >
              <span className="text-white">Google Map</span>
              <FlatIcon name="fi-rr-map" size={16} />
            </Button>
          )}

          <BreakLine variant="pink" />

          {/* Contact */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <FlatIcon
                name="fi-rr-edit"
                size={20}
                className="text-main-pink"
              />
              <h3 className="text-base font-semibold text-black">
                {t('routes.infoGroup.workshopGroup.contact')}
              </h3>
            </div>
            <Button
              size="lg"
              className="bg-gradient-purple mx-auto"
              onClick={() => {
                window.open(workshop.url, '_blank')
              }}
            >
              <span className="text-white">
                {t('routes.infoGroup.workshopGroup.register')}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
