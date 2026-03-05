import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi
} from "@/components/ui/carousel";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { FlatIcon } from "../FlatIcon";

export default function CarouselLanding() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }
    setCurrent(api.selectedScrollSnap() + 1)
    api.on("select", () => {
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
      type: "video",
      children: (
        <iframe
          className="rounded-2xl w-full aspect-video"
          src="https://www.youtube.com/embed/KUd_aWty2cY?autoplay=1&mute=1&rel=0&loop=1&playlist=KUd_aWty2cY"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      )
    },
    {
      id: 2,
      type: "image",
      imageSrc: "/background/background-2.webp",
    },
    {
      id: 3,
      type: "image",
      imageSrc: "/background/background-1.webp",
    },
  ];

  return (
    <div className='flex flex-col justify-center items-center gap-4 px-5 w-full'>
      <div className="relative flex items-center w-full">
        <Carousel
          opts={{
            loop: true,
            align: "center",
          }}
          setApi={setApi}
          plugins={[Autoplay({ delay: 15000, stopOnInteraction: false })]}
          className="w-full"
        >
          <CarouselContent className="ml-2! w-full">
            {
              mock.map((item) => (
                <CarouselItem key={item.id} className="pr-4 pl-0! basis-full">
                  {
                    item.type === "video" ? item.children : (
                      <img
                        src={item.imageSrc}
                        alt=""
                        className="rounded-2xl w-full object-cover aspect-video"
                      />
                    )
                  }
                </CarouselItem>
              ))
            }
          </CarouselContent>
        </Carousel>
        <button onClick={handlePrevious} className="top-1/2 left-4 absolute"><FlatIcon name="fi-rr-angle-left" size={16} /></button>
        <button onClick={handleNext} className="top-1/2 right-4 absolute"><FlatIcon name="fi-rr-angle-right" size={16} /></button>
      </div>
      <div className="flex gap-2">
        {
          mock.map((item) => (
            <div key={item.id} className={clsx('flex flex-col justify-center items-center rounded-full w-2 h-2',
              current === item.id ? 'bg-main-pink' : 'bg-[#D9D9D9]'
            )}></div>
          ))
        }
      </div>
    </div>
  );
}