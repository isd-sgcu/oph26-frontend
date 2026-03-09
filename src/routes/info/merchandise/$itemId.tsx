import { getMerchandiseById } from '@/components/const/Merchandise'
import { FlatIcon } from '@/components/FlatIcon'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/info/merchandise/$itemId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { itemId } = Route.useParams()

  const merch = getMerchandiseById(itemId)

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
    <div>
      {/* <div>

      </div>
      <div>

      </div> */}
      {/* <Carousel className="w-full">
        <CarouselContent>
          {merch.variant[selectedVariantIndex].imgPath.map((img, i) => (
            <CarouselItem key={i}>
              <img
                src={img}
                className="w-full aspect-square object-cover rounded-xl"
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel> */}
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
