import {
  getFacultyLabel,
  Workshop,
  WORKSHOP_DATA,
} from '@/components/const/workshop'
import { FlatIcon } from '@/components/FlatIcon'
import BreakLine from '@/components/questionaire/Breakline'
import { Button } from '@/components/ui/button'
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
          <BreakLine variant="pink" />
        </div>
      </div>
    </div>
  )
}
