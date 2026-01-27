import AchievementCard from '@/components/game/achievement/AchievementCard'
import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from  "react-i18next"

export const Route = createFileRoute('/game/achievement/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation()

  return (
    <div className="flex-1 flex flex-col items-center bg-gradient-pink-oval px-4 py-6">
      <h2 className="mb-6 text-center text-xl font-bold">
        {t("routes.gameGroup.achievementGroup.titleGroup")}
      </h2>

      {/* Content area that fills remaining space */}
      <div className="w-full flex-1 flex">
        <AchievementCard />
      </div>
    </div>
  )
}
