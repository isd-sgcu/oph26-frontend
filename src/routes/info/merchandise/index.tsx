import { MERCHANDISE } from '@/components/const/Merchandise'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/info/merchandise/')({
  component: RouteComponent,
})

const POPUP_KEY = 'merch_popup_last_seen'
const COOLDOWN = 1000 * 60 * 10 // 10 mins

function RouteComponent() {
  const { t } = useTranslation()
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    const lastSeen = localStorage.getItem(POPUP_KEY)
    const now = Date.now()

    if (!lastSeen || now - Number(lastSeen) > COOLDOWN) {
      setShowPopup(true)
      localStorage.setItem(POPUP_KEY, now.toString())
    }
  }, [])

  return (
  <div className='bg-gradient-pink flex-1 p-5 flex flex-col gap-5'>
      
    <img src="/info/merchandise/banner.png" alt="banner" className='rounded-2xl shadow-[0_1px_2px_0_rgba(0,0,0,0.5)]'/>

    <h1 className='text-white text-2xl font-bold text-shadow-[0_1px_2px_rgba(0,0,0,0.5)]'>{t('routes.infoGroup.merchandiseGroup.title')}</h1>
    
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

    {showPopup && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="relative bg-white rounded-2xl p-3 shadow-xl">
          
          <img
            src="/info/merchandise/popup.png"
            alt="popup"
            className="w-[90vw] rounded-xl object-contain"
          />

          <button
            onClick={() => setShowPopup(false)}
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-main-pink text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md"
          >
            ✕
          </button>
          
        </div>
      </div>
    )}
  </div>
  )
}
