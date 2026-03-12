import { FlatIcon } from '@/components/FlatIcon'
import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/info/map/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation()
  const [selectedMap, setSelectedMap] = useState(0) 
  
  const maps = [
    { id: 0, key: "overview" },
    { id: 1, key: "place1" },
    { id: 2, key: "place2" },
    { id: 3, key: "place3" },
  ];

  const Facils = [
    { id: 0, key: "restroom", icon: "venus-mars" },
    { id: 1, key: "food", icon: "hamburger"},
    { id: 2, key: "park", icon: "car" },
  ]

  return (
  <div className='bg-gradient-pink flex-1 flex flex-col items-center pt-6 pb-15 gap-5'>
    <h1 className='text-white font-bold text-4xl [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]'>
      {t('routes.infoGroup.mapGroup.title')}
    </h1>

    {/* Map image */}
    <div className='w-full px-10'>
      <div className='w-full aspect-4/5 bg-main-beige rounded-4xl'>
        
      </div>
    </div>

    {/* Select map */}
    <div className='flex flex-col gap-2'>
      <h3 className='text-center text-white font-bold text-2xl [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]'>{t('routes.infoGroup.mapGroup.Location.title')}</h3>
      <div className='grid grid-cols-2 w-full gap-3 justify-items-center'>
        {maps.map((map) => (
          <Button
            key={map.id}
            size="md"
            className={`${
              selectedMap === map.id
                ? "bg-gradient-purple text-white"
                : "bg-gradient-beige text-main-pink"
            } w-full`}
            onClick={() => setSelectedMap(map.id)}
          >
            {t(`routes.infoGroup.mapGroup.Location.${map.key}`)}
          </Button>
        ))}
      </div>
    </div>
    
    {/* Point of Interest */}
    <div className='flex flex-col gap-2'>
      <h3 className='text-center text-white font-bold text-2xl [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]'>{t('routes.infoGroup.mapGroup.PoI.title')}</h3>
      <div className='flex flex-row flex-wrap justify-center w-full gap-3'>
        {Facils.map((facil) => (
          <Button
            key={facil.id}
            size="sm"
            className="bg-gradient-purple"
          >
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
