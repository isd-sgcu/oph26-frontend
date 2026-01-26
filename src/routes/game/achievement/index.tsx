import AchievementCard from '@/components/game/achievement/AchievementCard'
import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from  "react-i18next"

export const Route = createFileRoute('/game/achievement/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation()

  return (
    <div className='w-full flex flex-col items-center'>
      <h2 className="mb-6 text-center text-xl font-bold">
        {t("routes.gameGroup.achievementGroup.titleGroup")}
      </h2>
      <AchievementCard />
    </div>
  )
}
