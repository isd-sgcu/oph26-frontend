import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/info/event/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation()
  return (
    <div className="from-main-light-pink to-main-pink relative flex min-h-screen w-full flex-col bg-linear-to-b">
      {/* Content */}
      <div className="relative z-10 flex h-full w-full flex-col items-center gap-6 px-4 py-8">
        <h1 className="text-center text-3xl font-bold text-white text-shadow-md">
          {t('routes.infoGroup.eventGroup.title')}
        </h1>
      </div>
    </div>
  )
}
