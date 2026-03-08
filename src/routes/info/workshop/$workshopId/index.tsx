import { Workshop, WORKSHOP_DATA } from '@/components/const/workshop'
import { Button } from '@/components/ui/button'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/info/workshop/$workshopId/')({
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter()
  const { t } = useTranslation()
  const { workshopId } = Route.useParams()
  const [workshop, setWorkshop] = useState<Workshop | null>(null)

  useEffect(() => {
    const targetWorkshop = WORKSHOP_DATA.find((w) => w.id === workshopId)
    if (!targetWorkshop) {
      return
    }
    setWorkshop(targetWorkshop || null)
  }, [workshopId])

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
    <div className="from-main-light-pink to-main-pink relative flex w-full flex-col bg-linear-to-b">
      {/* Content */}
      <div className="relative z-10 flex h-full w-full flex-col gap-6 px-4 py-8">
        <h1 className="text-center text-3xl font-bold text-white text-shadow-md">
          {t('routes.infoGroup.workshopGroup.title')}
        </h1>

        <div className="flex-center flex min-h-80 w-full flex-col gap-6 rounded-xl bg-white px-6 py-8">
          <h2 className="text-main-pink text-xl font-bold">{workshop.name}</h2>
        </div>
      </div>
    </div>
  )
}
