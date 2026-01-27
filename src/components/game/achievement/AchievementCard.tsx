import { useTranslation } from "react-i18next"

export default function AchievementCard() {
    const { t } = useTranslation()

    return (
        <div className="relative w-full h-full mx-auto max-w-5xl rounded-2xl bg-white p-8 shadow-sm flex flex-col items-center justify-center">
            <div className="flex flex-col gap-6 text-center">
                <h3 className="text-2xl font-semibold">
                    {t("achievement.title")}
                </h3>

                {/* Stat Circle */}
                <div className="flex h-64 w-64 items-center justify-center rounded-full bg-gradient-pink">
                    <span className="text-4xl font-bold text-white">
                        text
                    </span>
                </div>

                <p className="text-gray-600 text-lg mt-auto">
                    {t("achievement.description")}
                </p>

                {/* Share button */}
                <div className="absolute bottom-4 right-4 flex h-8 w-8 items-center justify-center">

                </div>
                
            </div>
        </div>
    )
}
