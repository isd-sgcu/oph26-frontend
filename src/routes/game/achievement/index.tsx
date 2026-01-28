import AchievementCard from '@/components/game/achievement/AchievementCard'
import AchievementSlider from '@/components/game/achievement/AchievementSlider'
import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from  "react-i18next"

export const Route = createFileRoute('/game/achievement/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation()

  const achievements = [
    { title: "wins", description: "winsDesc", stat: 12 },
    { title: "streak", description: "streakDesc", stat: 7 },
    { title: "overall", description: "Score", stat: 99, isOverall: true }
  ]

  return (
    <div className="flex-1 flex flex-col items-center bg-gradient-pink-oval py-6 overflow-x-hidden">
      {/* Header */}
      <h2 className="mb-6 text-center text-xl font-bold">
        {t("routes.gameGroup.achievementGroup.titleGroup")}
      </h2>

      {/* Card */}
      <div className="w-full flex-1 flex min-w-0 overflow-hidden">
        <AchievementSlider>
          {achievements.map((item, index) => (
            <AchievementCard key={index} {...item} />
          ))}
        </AchievementSlider>
      </div>
    </div>
  )
}
