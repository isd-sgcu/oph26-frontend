import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

export const Route = createFileRoute('/info/event/')({
  component: RouteComponent,
})

const EVENTS: string[] = [
  '/info/event/event_timetable.jpg',
  '/info/event/event_full.jpg',
  '/info/event/event_map.jpg',
  '/info/event/event_name.jpg',
]

function RouteComponent() {
  const { t } = useTranslation()

  // --------------Carousel-----------------
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return

    setCurrent(api.selectedScrollSnap())

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div className="from-main-light-pink to-main-pink relative flex min-h-screen w-full flex-col items-center bg-linear-to-b">
      {/* Content */}
      <div className="relative z-10 flex h-full w-full flex-col items-center gap-6 px-4 py-8">
        <h1 className="text-center text-3xl font-bold text-white text-shadow-md">
          {t('routes.infoGroup.eventGroup.title')}
        </h1>
      </div>

      <div className="w-[80vw] max-w-[382.5px]">
        <Carousel className="w-full" setApi={setApi}>
          <CarouselContent>
            {EVENTS.map((img, i) => (
              <CarouselItem key={i}>
                <div className="w-full overflow-hidden rounded-xl border-5 border-white bg-white">
                  <img src={img} className="h-full w-full object-cover" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="top-1/2 left-2 h-auto w-auto -translate-y-1/2 border-none bg-transparent p-0 text-white shadow-none" />

          <CarouselNext className="top-1/2 right-2 h-auto w-auto -translate-y-1/2 border-none bg-transparent p-0 text-white shadow-none" />
        </Carousel>
      </div>
    </div>
  )
}
