import { FACULTIES } from '@/components/const/faculty'
import AchievementCard from '@/components/game/achievement/AchievementCard'
import AchievementSlider from '@/components/game/achievement/AchievementSlider'
import SharePopup from '@/components/game/achievement/SharePopup'
import LoadingOverlay from '@/components/game/landing/LoadingOverlay'
import { useUser } from '@/contexts/UserContext'
import {
  getMyLeaderboard,
  Leaderboard,
} from '@/services/leaderboard/leaderboard'
import {
  CollectedPiecesResponse,
  getCollectedPieces,
} from '@/services/pieces/piece'
import { Achievement, AchievementCollectedPieces } from '@/types/achievement'
import { transformAchievement } from '@/utils/achievementTransformer'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/game/achievement/')({
  component: RouteComponent,
})

const facultyKeys: Array<keyof AchievementCollectedPieces> = [
  'edu',
  'psy',
  'pharm',
  'dent',
  'commarts',
  'ahs',
  'faa',
  'vet',
  'law',
  'arch',
  'eng',
  'arts',
  'md',
  'sci',
  'econ',
  'polsci',
  'cbs',
  'spsc',
  'scii',
  'cusar',
]

function RouteComponent() {
  const { t, i18n } = useTranslation()
  const isEnglish = i18n.language.startsWith('en')
  const [loading, setLoading] = useState(true)
  const userContext = useUser()
  if (!userContext) return null

  const attendee = userContext.attendee

  const [achievements, setAchievements] = useState<Achievement[]>([])

  const [isShareOpen, setShareOpen] = useState(false)
  const [selectedAchievement, setSelectedAchievement] = useState<
    (typeof achievements)[number] | null
  >(null)

  useEffect(() => {
    async function fetchAchievements() {
      const data: Achievement[] = []
      let fetchedCollectedPiecesData: CollectedPiecesResponse | undefined
      let leaderboardData: Leaderboard | undefined

      try {
        fetchedCollectedPiecesData = await getCollectedPieces()
      } catch (error) {
        console.error('Error fetching collected pieces data:', error)
      }

      try {
        leaderboardData = await getMyLeaderboard()
      } catch (error) {
        console.error('Error fetching leaderboard data:', error)
      }

      // The 'var1' Data

      // The 'var2' Data
      let var2Data: Achievement | null = null

      if (leaderboardData) {
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

        if (var2Data != null) {
          data.push(var2Data)
        }
      }

      // The 'var3' Data

      // The 'overall' Data
      const overallData: Achievement = {
        variant: 'overall',
        stat: 0,
        miniCard1Faculty: 'edu',
        miniCard1Count: 0,
        miniCard2Rank: -1,
      }

      if (fetchedCollectedPiecesData) {
        const allFacultyStats =
          fetchedCollectedPiecesData.stats.collected_by_faculty

        overallData.stat = fetchedCollectedPiecesData.stats.total_collected

        let maxFaculty: keyof AchievementCollectedPieces | null = null
        let maxCount = -1

        facultyKeys.forEach((faculty) => {
          // @ts-ignore
          const value = allFacultyStats[faculty]
          if (value && typeof value.count === 'number') {
            if (value.count > maxCount) {
              maxCount = value.count
              maxFaculty = faculty
            }
          }
        })

        if (maxFaculty) {
          overallData.miniCard1Faculty = maxFaculty
          overallData.miniCard1Count = maxCount
        }
      }

      data.push(overallData)

      // The 'collectedPieces' Data
      const collectedPiecesData: AchievementCollectedPieces = {
        variant: 'collectedPieces',
        stat: 0,
        edu: 0,
        psy: 0,
        pharm: 0,
        dent: 0,
        commarts: 0,
        ahs: 0,
        faa: 0,
        vet: 0,
        law: 0,
        arch: 0,
        eng: 0,
        arts: 0,
        md: 0,
        sci: 0,
        econ: 0,
        polsci: 0,
        cbs: 0,
        spsc: 0,
        scii: 0,
        cusar: 0,
      }

      if (fetchedCollectedPiecesData) {
        const allFacultyStats =
          fetchedCollectedPiecesData.stats.collected_by_faculty
        collectedPiecesData.stat =
          fetchedCollectedPiecesData.stats.total_collected

        Object.entries(allFacultyStats).forEach(([faculty, value]) => {
          if (
            value &&
            typeof value.count === 'number' &&
            facultyKeys.includes(faculty as keyof AchievementCollectedPieces)
          ) {
            // @ts-ignore
            collectedPiecesData[faculty as keyof AchievementCollectedPieces] =
              value.count
          }
        })
      }

      data.push(collectedPiecesData)

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
            name={attendee?.firstname + ' ' + attendee?.surname}
          />
        </div>
      )}
    </div>
  )
}
