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

  const data = [
    {
      id: 1,
      link: 'https://www.tiktok.com/@gulfspark?is_from_webapp=1&sender_device=pc',
      type: 'image',
      path: 'gulfPic.webp',
    },
    {
      id: 2,
      type: 'youtube',
      path: 'https://www.youtube.com/embed/KUd_aWty2cY',
    },
    {
      id: 3,
      link: 'https://linkbio.co/G-beat',
      type: 'image',
      path: 'gbeat.webp',
    },
    {
      id: 4,
      link: 'https://apps.apple.com/th/app/cu-nex/id1360971254',
      type: 'image',
      path: 'cunex.webp',
    },
    {
      id: 5,
      link: 'https://go.camphub.in.th/cuoph2026',
      type: 'image',
      path: 'camphub.webp',
    },
    {
      id: 6,
      link: 'https://shopee.co.th/taoyeablokofficial',
      type: 'image',
      path: 'เต่าเหยียบโลก.webp',
    },
    {
      id: 7,
      link: 'https://www.tiktok.com/@cherskincare.th?lang=th-TH',
      type: 'image',
      path: 'cher.webp',
    },
    {
      id: 8,
      link: 'https://www.centralretail.com/th/home',
      type: 'image',
      path: 'central.webp',
    },
    {
      id: 9,
      link: 'com.linecorp.linemanth://app/browse?url=https%3A%2F%2Flm-extension.line-website.com%2Flm-store%2Fsubscriptions%2FFOOD-LMVIP-PARTNERSHIP-20250801-GROUP%3FcampaignId%3DLMVIP-EXTERNAL%26locale%3D%257Blocale%257D%26lat%3D%257BdeliveryLat%257D%26lng%3D%257BdeliveryLng%257D&autoCloseWebview=true',
      type: 'image',
      path: 'lineman.webp',
    },
    {
      id: 10,
      link: 'https://lin.ee/k3zoBJb',
      type: 'image',
      path: 'bright.webp',
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
          plugins={[
            Autoplay({
              delay: data[current - 1]?.type === 'youtube' ? 17000 : 3000,
              stopOnInteraction: false,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="ml-2! w-full">
            {data.map((item) => (
              <CarouselItem key={item.id} className="basis-full pr-4 pl-0!">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="aspect-video w-full overflow-hidden rounded-2xl"
                >
                  {item.type === 'youtube' ? (
                    current === item.id ? (
                      <iframe
                        src={`${item.path}?autoplay=1&mute=1&playsinline=1`}
                        className="aspect-video w-full rounded-2xl object-cover"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                      />
                    ) : (
                      // Placeholder when not active
                      <img
                        src={`https://img.youtube.com/vi/KUd_aWty2cY/hqdefault.jpg`}
                        className="aspect-video w-full rounded-2xl object-cover"
                      />
                    )
                  ) : (
                    <img
                      src={`landing/banner/${item.path}`}
                      alt=""
                      className="aspect-video w-full rounded-2xl object-cover"
                    />
                  )}
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <button
          onClick={handlePrevious}
          className="absolute top-1/2 left-4 z-50 cursor-pointer"
        >
          <FlatIcon name="fi-rr-angle-left" size={16} />
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-4 z-50 cursor-pointer"
        >
          <FlatIcon name="fi-rr-angle-right" size={16} />
        </button>
      </div>
      <div className="flex gap-2">
        {data.map((item) => (
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
