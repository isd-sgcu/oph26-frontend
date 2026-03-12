import { getMerchandiseById } from '@/components/const/Merchandise'
import { FlatIcon } from '@/components/FlatIcon'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
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

  const merch = getMerchandiseById(itemId)

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

  //-----------------------------------------

  // Variant
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0)

  return (
  <div className='bg-gradient-pink flex-1 p-5'>
    {/* Header */}
    <div className="relative flex items-center justify-center">
      <FlatIcon
        name="fi-rr-angle-left"
        className="absolute left-0 text-white"
        onClick={() => navigate({ to: '/info/merchandise' })}
      />

      <span className="text-white text-3xl font-bold text-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
        {t('routes.infoGroup.merchandiseGroup.itemTitle')}
      </span>
    </div>

    {/* Image */}
    <div className='my-5'>
      <Carousel className="w-full" setApi={setApi}>
        <CarouselContent>
          {merch.variant[selectedVariantIndex].imgPath.map((img, i) => (
            <CarouselItem key={i}>
              <div className="w-full aspect-square bg-white rounded-xl overflow-hidden">
                <img
                  src={img}
                  className="w-full h-full object-contain"
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
        {merch.name}
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
              onClick={() => setSelectedVariantIndex(index)}
            >
              {variant.title}
            </Button>
          ))
        }
      </div>
    </div>

    {/* Details */}
    <div className='text-white mt-5'>
      {merch.detail}
    </div>

    {/* Shop link */}
    <div className='text-main-beige font-semibold text-lg my-5'>
        {t('routes.infoGroup.merchandiseGroup.store')} {merch.shopName}
    </div>

    {/* Buy button */}
    <Button
      size="lg"
      className='w-full bg-gradient-purple text-white font-semibold text-xl'
      // onClick={()}
    >
      {t('routes.infoGroup.merchandiseGroup.buy')}
    </Button>
  </div>
  )
}
