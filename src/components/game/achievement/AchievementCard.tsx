import { useTranslation } from "react-i18next"

export default function AchievementCard() {
    const { t } = useTranslation()

    return (
        <div className="mx-auto rounded-xl bg-white p-6 shadow-md text-center">
            <h3 className="mb-6 text-xl font-semibold">
                {t("achievement.title")}
            </h3>

            {/* Stat Circle */}
            <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-pink">
                <span className="text-4xl font-bold text-white">
                text
                </span>
            </div>

            <p className="text-gray-600">
                {t("achievement.description")}
            </p>
        </div>

    )
}