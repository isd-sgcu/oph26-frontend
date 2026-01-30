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
  {
    variant: "var1",
    stat: 12,
  },
  {
    variant: "var2",
    stat: "ENG",
    top: 5,
  },
  {
    variant: "var3",
    stat: "23",
    faculty: "Engineering",
  },
  {
    variant: "overall",
    stat: 99,
    miniCard1Count: 42,
    miniCard2Rank: 3,
  },
] as const


  return (
    <div className="flex-1 flex flex-col items-center bg-gradient-pink-oval py-6 overflow-x-hidden">
      {/* Header */}
      <h2 className="mb-6 text-center text-3xl font-bold text-white text-shadow-[0px_1px_2px_#000000]">
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
