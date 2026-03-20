import { getMerchandiseById } from '@/components/const/Merchandise'
import { FlatIcon } from '@/components/FlatIcon'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/info/merchandise/$itemId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { itemId } = Route.useParams()
  const { variant } = Route.useSearch() as { variant?: number }
  
  const merch = getMerchandiseById(itemId)
  
  const initialIndex = merch.variant.findIndex(
  (v) => v.id === Number(variant)
)

// Variant
const [selectedVariantIndex, setSelectedVariantIndex] = useState(
  initialIndex >= 0 ? initialIndex : 0
)

// --------------Carousel-----------------
const [api, setApi] = useState<CarouselApi>()
const [current, setCurrent] = useState(0)

useEffect(() => {
  if (!api) return
  
  setCurrent(api.selectedScrollSnap())
  
  api.on("select", () => {
    setCurrent(api.selectedScrollSnap())
  })
}, [api])

useEffect(() => {
  if (!api) return

  api.scrollTo(0, true)
  setCurrent(0)
}, [selectedVariantIndex, api])

useEffect(() => {
  merch.variant.forEach((variant) => {
    variant.imgPath.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  })
}, [merch])

//-----------------------------------------

  return (
    <div className="bg-gradient-pink min-h-screen flex-1 p-5">
      {/* Header */}
      <div className="relative flex items-center justify-center">
        <FlatIcon
          name="fi-rr-angle-left"
          className="absolute left-0 text-white"
          onClick={() => navigate({ to: '/info/merchandise' })}
        />

        <span className="text-3xl font-bold text-white text-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
          {t('routes.infoGroup.merchandiseGroup.itemTitle')}
        </span>
      </div>

    {/* Image */}
    <div className='my-5'>
      <Carousel className="w-full" setApi={setApi}>
        <CarouselContent>
          {merch.variant[selectedVariantIndex].imgPath.map((img, i) => (
            <CarouselItem key={i}>
              <div className="w-full aspect-3/2 bg-white rounded-xl overflow-hidden">
                <img
                  src={img}
                  className="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious
          className="left-2 top-1/2 -translate-y-1/2 h-auto w-auto p-0 bg-transparent border-none shadow-none text-main-pink"
        />

        <CarouselNext
          className="right-2 top-1/2 -translate-y-1/2 h-auto w-auto p-0 bg-transparent border-none shadow-none text-main-pink"
        />
        <div className="absolute bottom-4 left-0 w-full flex justify-center">
          <div className="flex gap-2">
            {merch.variant[selectedVariantIndex].imgPath.map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                className={`
                  w-1.5 h-1.5 rounded-full
                  ${current === i ? "bg-main-pink" : "bg-[#D9D9D9]"}
                `}
              />
            ))}
          </div>
        </div>
      </Carousel>

      <div className="flex gap-2 mt-3 px-6">
        {merch.variant[selectedVariantIndex].imgPath.map((img, i) => (
          <div key={i} className="flex-1 aspect-square">
            <img
              src={img}
              onClick={() => api?.scrollTo(i)}
              className={`
                w-full h-full object-cover rounded-md cursor-pointer
                border-2
                ${current === i ? "border-white" : "border-transparent opacity-60"}
              `}
            />
          </div>
        ))}
      </div>
    </div>

    {/* Details */}
    <div className='flex flex-row justify-between text-main-beige'>
      <div className='font-semibold text-xl'>
        {merch.name} {merch.variant[selectedVariantIndex].title}
      </div>
      <div className='flex flex-col text-right'>
        <span className='font-semibold text-xl'>฿ {merch.price}</span>
        <div className='flex flex-row gap-2 items-center'>
          <FlatIcon name="fi-rr-shopping-cart" className="text-white" size={18}/> 
          <span className='whitespace-nowrap text-white'>
            {t('routes.infoGroup.merchandiseGroup.freeShipping')}
          </span>
        </div>
      </div>
    </div>

    {/* Variant */}
    <div className='flex flex-col gap-2'>
      <span className='text-main-beige font-semibold text-lg'>{t('routes.infoGroup.merchandiseGroup.variantSelect')}</span>
      <div className='flex flex-row gap-4'>
        {
          merch.variant.map((variant, index) => (
            <Button
              key={variant.title}
              size="sm"
              expanded
              className={
                selectedVariantIndex === index
                  ? "bg-gradient-purple text-white"
                  : "bg-gradient-beige text-main-pink"
              }
              onClick={() => {
                setSelectedVariantIndex(index)

                navigate({
                  to: "/info/merchandise/$itemId",
                  params: { itemId },
                  search: { variant: variant.id },
                  replace: true, // prevents history spam
                })
              }}
            >
              {variant.title}
            </Button>
          ))
        }
      </div>
    </div>

    {/* Details */}
    <div className='text-white mt-5'>
      {merch.variant[selectedVariantIndex].detail}
    </div>

    {/* Shop link */}
    <div className='text-main-beige font-semibold text-lg my-5 flex items-center gap-2'>
      <span>{t('routes.infoGroup.merchandiseGroup.store')}</span>

      <a
        href="https://www.instagram.com/cu.item/"
        target="_blank"
        className="flex items-center gap-1 whitespace-nowrap text-main-beige"
      >
        <FlatIcon name="fi-brands-instagram" size={18} />
        <span className="underline">cu.item</span>
      </a>
    </div>

    {/* Buy button */}
    <Button
      size="lg"
      className='w-full bg-gradient-purple text-white font-semibold text-xl'
      asChild
    >
      <a
        href="https://cuitem.shop/"
        target="_blank"
        rel="noopener noreferrer"
      >
        {t('routes.infoGroup.merchandiseGroup.buy')}
      </a>
    </Button>
  </div>
  )
}
