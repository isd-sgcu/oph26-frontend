import AchievementCard from '@/components/game/achievement/AchievementCard'
import AchievementSlider from '@/components/game/achievement/AchievementSlider'
import SharePopup from '@/components/game/achievement/SharePopup'
import { Achievement } from '@/types/achievement'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useTranslation } from  "react-i18next"

export const Route = createFileRoute('/game/achievement/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation()

  const achievements: Achievement[] = [
    {
      variant: "var1",
      stat: 1000,
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
      miniCard1Faculty: "Sci",
      miniCard1Count: 42,
      miniCard2Rank: -1,
    },
    {
      variant: "collectedPieces",
      stat: 120,
      edu: 10,
      psy: 1,
      pharm: 1,
      dent: 1,
      commarts: 1,
      ahs: 0,
      faa: 1,
      vet: 1,
      law: 1,
      arch: 1,
      eng: 1,
      arts: 1,
      md: 1,
      sci: 1,
      econ: 1,
      polsci: 1,
      cbs: 1,
      spsc: 1,
      scii: 1,
      cusar: 1,
    }
  ] as const

  const [isShareOpen, setShareOpen] = useState(false)
  const [selectedAchievement, setSelectedAchievement] = useState<
    (typeof achievements)[number] | null
  >(null)

  const handleShare = (achievement: (typeof achievements)[number]) => {
    setSelectedAchievement(achievement)
    setShareOpen(true)
  }

  return (
    <div className="flex-1 flex flex-col items-center bg-main-pink pt-6 overflow-x-hidden">
      {/* Header */}
      <h2 className="mb-6 text-center text-3xl font-bold text-white text-shadow-[0px_1px_2px_#000000]">
        {t("routes.gameGroup.achievementGroup.titleGroup")}
      </h2>

      {/* Card */}
      <div className="w-full flex-1 flex min-w-0 pb-6 overflow-hidden">
        <AchievementSlider>
          {achievements.map((item, index) => (
            <AchievementCard key={index} props={{...item}} onShare={() => handleShare(item)}/>
          ))}
        </AchievementSlider>
      </div>

      {/* Share Popup */}
      { isShareOpen && 
        <div className="relative w-full">
          <SharePopup open={isShareOpen} achievement={selectedAchievement} onClose={() => setShareOpen(false)} name={'John Doe'} /> 
        </div>
      }
    </div>
  )
}