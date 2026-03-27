import { FlatIcon } from '@/components/FlatIcon'
import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/info/map/')({
  component: RouteComponent,
})

export type MapItem = {
  id: number
  key: string
  imagePath: string
}

function RouteComponent() {
  const { t } = useTranslation()
  const [selectedMap, setSelectedMap] = useState(0)

  const maps: MapItem[] = [
    { id: 0, key: 'overview', imagePath: '/info/map/overall.webp' },
    { id: 1, key: 'siam', imagePath: '/info/map/siam.webp' },
    { id: 2, key: 'samyan', imagePath: '/info/map/samyan.webp' },
    { id: 3, key: 'triamudom', imagePath: '/info/map/triamudom.webp' },
  ]

  const Facils = [
    { id: 0, key: 'restroom', icon: 'venus-mars' },
    { id: 1, key: 'food', icon: 'hamburger' },
    { id: 2, key: 'park', icon: 'car' },
  ]

  return (
    <div className="bg-gradient-pink flex min-h-screen flex-col items-center gap-5 pt-6 pb-15">
      <h1 className="text-4xl font-bold text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
        {t('routes.infoGroup.mapGroup.title')}
      </h1>

      {/* Map image */}
      <div className="w-full px-10">
        <div className="bg-main-beige w-full rounded-4xl p-4">
          <img
            src={maps[selectedMap].imagePath}
            alt={t(
              `routes.infoGroup.mapGroup.Location.${maps[selectedMap].key}`
            )}
            className="h-full w-full rounded-4xl object-cover"
          />
        </div>
      </div>

      {/* Select map */}
      <div className="flex flex-col gap-2">
        <h3 className="text-center text-2xl font-bold text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
          {t('routes.infoGroup.mapGroup.Location.title')}
        </h3>
        <div className="grid w-full grid-cols-2 justify-items-center gap-3">
          {maps.map((map) => (
            <Button
              key={map.id}
              size="md"
              className={`${
                selectedMap === map.id
                  ? 'bg-gradient-purple text-white'
                  : 'bg-gradient-beige text-main-pink'
              } w-full`}
              onClick={() => setSelectedMap(map.id)}
            >
              {t(`routes.infoGroup.mapGroup.Location.${map.key}`)}
            </Button>
          ))}
        </div>
      </div>

      {/* Point of Interest */}
      <div className="flex flex-col gap-2">
        <h3 className="text-center text-2xl font-bold text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
          {t('routes.infoGroup.mapGroup.PoI.title')}
        </h3>
        <div className="flex w-full flex-row flex-wrap justify-center gap-3">
          {Facils.map((facil) => (
            <Button key={facil.id} size="sm" className="bg-gradient-purple">
              <FlatIcon
                name={`fi-rr-${facil.icon}`}
                className="text-white"
                size={16}
              />
              {t(`routes.infoGroup.mapGroup.PoI.${facil.key}`)}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
