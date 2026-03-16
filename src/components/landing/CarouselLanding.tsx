import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import { FlatIcon } from '../FlatIcon'

export default function CarouselLanding() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }
    setCurrent(api.selectedScrollSnap() + 1)
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  const handleNext = () => {
    if (api) {
      api.scrollNext()
    }
  }

  const handlePrevious = () => {
    if (api) {
      api.scrollPrev()
    }
  }

  const mock = [
    {
      id: 1,
      type: 'video',
      children: (
        <iframe
          className="aspect-video w-full rounded-2xl"
          src="https://www.youtube.com/embed/KUd_aWty2cY?autoplay=1&mute=1&rel=0&loop=1&playlist=KUd_aWty2cY"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      ),
    },
    {
      id: 2,
      type: 'image',
      imageSrc: '/background/background-2.webp',
    },
    {
      id: 3,
      type: 'image',
      imageSrc: '/background/background-1.webp',
    },
  ]

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 px-5">
      <div className="relative flex w-full items-center">
        <Carousel
          opts={{
            loop: true,
            align: 'center',
          }}
          setApi={setApi}
          plugins={[Autoplay({ delay: 15000, stopOnInteraction: false })]}
          className="w-full"
        >
          <CarouselContent className="ml-2! w-full">
            {mock.map((item) => (
              <CarouselItem key={item.id} className="basis-full pr-4 pl-0!">
                {item.type === 'video' ? (
                  item.children
                ) : (
                  <img
                    src={item.imageSrc}
                    alt=""
                    className="aspect-video w-full rounded-2xl object-cover"
                  />
                )}
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <button onClick={handlePrevious} className="absolute top-1/2 left-4">
          <FlatIcon name="fi-rr-angle-left" size={16} />
        </button>
        <button onClick={handleNext} className="absolute top-1/2 right-4">
          <FlatIcon name="fi-rr-angle-right" size={16} />
        </button>
      </div>
      <div className="flex gap-2">
        {mock.map((item) => (
          <div
            key={item.id}
            className={clsx(
              'flex h-2 w-2 flex-col items-center justify-center rounded-full',
              current === item.id ? 'bg-main-pink' : 'bg-[#D9D9D9]'
            )}
          ></div>
        ))}
      </div>
    </div>
  )
}
