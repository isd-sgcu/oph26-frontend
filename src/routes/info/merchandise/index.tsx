import { MERCHANDISE } from '@/components/const/Merchandise'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/info/merchandise/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation()

  return (
  <div className='bg-gradient-pink flex-1 p-5'>
    <div className="h-48.5 self-stretch rounded-2xl mb-6">
      <img src="/info/merchandise/banner.png" alt="banner" className='rounded-2xl shadow-[0_1px_2px_0_rgba(0,0,0,0.5)]'/>
    </div>

    <h1 className='text-white text-2xl font-bold text-shadow-[0_1px_2px_rgba(0,0,0,0.5)] mb-3'>{t('routes.infoGroup.merchandiseGroup.title')}</h1>
    
    <div className="grid grid-cols-2 gap-6">
      {MERCHANDISE.flatMap((item) =>
        item.variant.map((variant) => (
          <Link
            key={`${item.itemId}-${variant.id}`}
            to="/info/merchandise/$itemId"
            params={{ itemId: item.itemId }}
            search={{ variant: variant.id }}
          >
            <div className='flex flex-col w-full gap-2'>
              <div className="w-full aspect-4/5 rounded-2xl bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.5)] mb-2 overflow-hidden">
                <img
                  src={variant.thumbnail}
                  alt={variant.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <span className='text-main-beige font-bold text-xl leading-6 line-clamp-1'>
                {variant.title}
              </span>

              <span className='text-white text-base leading-4.5 font-normal line-clamp-2'>
                {item.name}
              </span>

              <span className='text-main-beige font-bold text-xl leading-6'>
                ฿ {item.price}
              </span>
            </div>
          </Link>
        ))
      )}
    </div>
  </div>
  )
}
