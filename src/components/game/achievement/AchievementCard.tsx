import { useTranslation } from "react-i18next"

type AchievementCardProps = {
  title: string
  description: string
  stat: string | number
  isOverall?: boolean
}

export default function AchievementCard({
    title,
    description,
    stat,
    isOverall = false,
}: AchievementCardProps) {
        const { t } = useTranslation()

    return (
        <div className="relative w-full h-full mx-auto max-w-5xl rounded-2xl bg-white p-8 shadow-sm flex flex-col items-center justify-center">
            <div className="flex flex-col gap-6 text-center">
                <h3 className="text-2xl font-semibold">
                    {t(`achievement.${title}`)}
                </h3>

                {/* Stat Circle */}
                <div className="flex h-64 w-64 items-center justify-center rounded-full bg-gradient-pink outline-4 outline-main-pink">
                    <span className="text-7xl font-bold text-white text-shadow-[2px_2px_0_#CA2791]">
                        {stat}
                    </span>
                </div>

                {
                    !isOverall && (
                    <p className="text-gray-600 text-lg mt-auto">
                        {t(`achievement.${description}`)}
                    </p>
                    )
                }

                {   isOverall && (
                    <p className="text-gray-600 text-lg mt-auto">
                        {t(`achievement.overall${description}`)}
                    </p>
                )}

                {/* Share button */}
                <div className="absolute bottom-4 right-4 flex h-8 w-8 items-center justify-center">

                </div>
                
            </div>
        </div>
    )
}
