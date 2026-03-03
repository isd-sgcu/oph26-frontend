import AchievementCard from '@/components/game/achievement/AchievementCard'
import AchievementSlider from '@/components/game/achievement/AchievementSlider'
import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/game/achievement/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation()

  const achievements = [
    {
      variant: 'var1',
      stat: 12,
    },
    {
      variant: 'var2',
      stat: 'ENG',
      top: 5,
    },
    {
      variant: 'var3',
      stat: '23',
      faculty: 'Engineering',
    },
    {
      variant: 'overall',
      stat: 99,
      miniCard1Faculty: 'Sci',
      miniCard1Count: 42,
      miniCard2Rank: 3,
    },
  ] as const

  return (
    <div className="bg-main-pink relative flex-1 overflow-hidden">
      {/* Content */}
      <div className={`relative z-10 flex w-full flex-col gap-6 px-4 py-8`}>
        {/* Header */}
        <h2 className="text-center text-3xl font-bold text-white text-shadow-[0px_1px_2px_#000000]">
          {t('routes.gameGroup.achievementGroup.titleGroup')}
        </h2>

        {/* Card */}
        <div className="flex w-full min-w-0 flex-1 overflow-hidden">
          <AchievementSlider>
            {achievements.map((item, index) => (
              <AchievementCard key={index} {...item} />
            ))}
          </AchievementSlider>
        </div>
      </div>
    </div>
  )
}
