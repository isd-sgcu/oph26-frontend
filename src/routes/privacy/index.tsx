import { Button } from '@/components/ui/button'
import { PRIVACY_TEXT } from '@/const/privacy'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/privacy/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <div className="bg-main-light-pink relative flex w-full flex-col">
      {/* Content */}
      <div className="relative z-10 flex h-full w-full flex-col items-center gap-6 px-4 py-8">
        <h1 className="text-center text-3xl font-bold text-white text-shadow-md">
          {t('routes.privacyGroup.title')}
        </h1>

        <p className="text-main-pink rounded-md bg-white px-4 py-6 whitespace-pre-wrap">
          {PRIVACY_TEXT}
        </p>

        <Button
          className="bg-main-beige text-main-pink"
          expanded
          onClick={() => router.navigate({ to: '/' })}
        >
          {t('routes.privacyGroup.back')}
        </Button>
      </div>
    </div>
  )
}
