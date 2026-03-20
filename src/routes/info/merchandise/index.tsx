import { MERCHANDISE } from '@/components/const/Merchandise'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/info/merchandise/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation()

  return (
    <div className="bg-gradient-pink min-h-screen flex-1 p-5">
      <div className="mb-6 h-48.5 self-stretch rounded-2xl">
        <img
          src="/info/merchandise/banner.png"
          alt="banner"
          className="rounded-2xl shadow-[0_1px_2px_0_rgba(0,0,0,0.5)]"
        />
      </div>

      <h1 className="mb-3 text-2xl font-bold text-white text-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
        {t('routes.infoGroup.merchandiseGroup.title')}
      </h1>

      <div className="grid grid-cols-2 gap-6">
        {MERCHANDISE.flatMap((item) =>
          item.variant.map((variant) => (
            <Link
              key={`${item.itemId}-${variant.id}`}
              to="/info/merchandise/$itemId"
              params={{ itemId: item.itemId }}
              search={{ variant: variant.id }}
            >
              <div className="flex w-full flex-col gap-2">
                <div className="mb-2 aspect-4/5 w-full overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.5)]">
                  <img
                    src={variant.thumbnail}
                    alt={variant.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <span className="text-main-beige line-clamp-1 text-xl leading-6 font-bold">
                  {variant.title}
                </span>

                <span className="line-clamp-2 text-base leading-4.5 font-normal text-white">
                  {item.name}
                </span>

                <span className="text-main-beige text-xl leading-6 font-bold">
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
