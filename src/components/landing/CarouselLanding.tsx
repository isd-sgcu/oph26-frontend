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
      title: "Slide 1",
      description: "This is the first slide",
    },
    {
      id: 2,
      title: "Slide 2",
      description: "This is the second slide",
    },
    {
      id: 3,
      title: "Slide 3",
      description: "This is the third slide",
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
          // plugins={[Autoplay({ delay: 3000, stopOnInteraction: false })]}
          className="w-full"
        >
          <CarouselContent className="ml-0! w-full">
            {
              mock.map((item) => (
                <CarouselItem key={item.id} className="pl-0! basis-full">
                  <div className="bg-[#D9D9D9] p-3 rounded-2xl w-full aspect-video">
                    {item.title}
                  </div>
                </CarouselItem>
              ))
            }
          </CarouselContent>
        </Carousel>
        <button onClick={handlePrevious} className="top-1/2 left-2 absolute"><FlatIcon name="fi-rr-angle-left" size={16} /></button>
        <button onClick={handleNext} className="top-1/2 right-2 absolute"><FlatIcon name="fi-rr-angle-right" size={16} /></button>
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