import { FACULTIES } from '@/components/const/faculty'
import AchievementCard from '@/components/game/achievement/AchievementCard'
import AchievementSlider from '@/components/game/achievement/AchievementSlider'
import SharePopup from '@/components/game/achievement/SharePopup'
import LoadingOverlay from '@/components/game/landing/LoadingOverlay'
import { getMyLeaderboard } from '@/services/leaderboard/leaderboard'
import { Achievement } from '@/types/achievement'
import { transformAchievement } from '@/utils/achievementTransformer'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/game/achievement/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t, i18n } = useTranslation()
  const isEnglish = i18n.language.startsWith('en')
  const [loading, setLoading] = useState(true)

  const [achievements, setAchievements] = useState<Achievement[]>([])

  const [isShareOpen, setShareOpen] = useState(false)
  const [selectedAchievement, setSelectedAchievement] = useState<
    (typeof achievements)[number] | null
  >(null)

  useEffect(() => {
    async function fetchAchievements() {
      const data: Achievement[] = []

      // The 'var1' Data

      // The 'var2' Data
      let var2Data: Achievement | null = null
      try {
        const leaderboardData = await getMyLeaderboard()
        const allTopsIndexFromLeaderboard = leaderboardData.is_top
          .map((item, index) => (item === true ? index : -1))
          .filter((index) => index !== -1)
        const allTopsFacultyFromLeaderboard = allTopsIndexFromLeaderboard.map(
          (index) => FACULTIES[index]
        )

        if (allTopsFacultyFromLeaderboard.length > 0) {
          const randomTopFaculty =
            allTopsFacultyFromLeaderboard[
              Math.floor(Math.random() * allTopsFacultyFromLeaderboard.length)
            ]

          var2Data = {
            variant: 'var2',
            stat: randomTopFaculty.value,
            top: 1,
          }
        }
      } catch (error) {
        console.error('Error fetching leaderboard data:', error)
      } finally {
        if (var2Data != null) {
          data.push(var2Data)
        }
      }

      // The 'var3' Data

      // The 'overall' Data

      // The 'collectedPieces' Data

      setAchievements(data)
      setLoading(false)
    }

    fetchAchievements()
  }, [])

  const displayAchievements = achievements.map((a) =>
    transformAchievement(a, isEnglish)
  )

  const handleShare = (achievement: (typeof achievements)[number]) => {
    setSelectedAchievement(achievement)
    setShareOpen(true)
  }

  if (loading) return <LoadingOverlay text="Loading your achievement..." />

  return (
    <div className="bg-main-pink flex flex-1 flex-col items-center overflow-x-hidden pt-6">
      {/* Header */}
      <h2 className="mb-6 text-center text-3xl font-bold text-white text-shadow-[0px_1px_2px_#000000]">
        {t('routes.gameGroup.achievementGroup.titleGroup')}
      </h2>

      {/* Card */}
      <div className="flex w-full min-w-0 flex-1 overflow-hidden pb-6">
        <AchievementSlider>
          {displayAchievements.map((item, index) => (
            <AchievementCard
              key={index}
              props={{ ...item }}
              onShare={() => handleShare(item)}
            />
          ))}
        </AchievementSlider>
      </div>

      {/* Share Popup */}
      {isShareOpen && (
        <div className="relative w-full">
          <SharePopup
            open={isShareOpen}
            achievement={selectedAchievement}
            onClose={() => setShareOpen(false)}
            name={'John Doe'}
          />
        </div>
      )}
    </div>
  )
}
