import { useTranslation } from "react-i18next"

type BaseProps = {
  stat: string | number
}

type Var1Props = BaseProps & {
  variant: "var1"
}

type Var2Props = BaseProps & {
  variant: "var2"
  top: number
}

type Var3Props = BaseProps & {
  variant: "var3"
  count: number
}

type OverallProps = BaseProps & {
  variant: "overall"
  miniCard1Count: number
  miniCard2Rank: number
}

type AchievementCardProps =
  | Var1Props
  | Var2Props
  | Var3Props
  | OverallProps

export default function AchievementCard(props: AchievementCardProps) {
    const { t } = useTranslation()
    const { variant, stat } = props

    return (
        // !!!!!!!!!!!!!!!SET MAX WIDTH TO SYSTEM 80% MAX WIDTH !!!!!!!!!!!!!!!
        <div className="relative w-[80vw] max-w-84 h-full mx-auto rounded-2xl bg-white p-8 shadow-sm flex flex-col items-center justify-center">
            <div className="flex flex-col gap-[2vw] text-center justify-center items-center">
                {/* title */}
                <h3 className="text-2xl font-semibold">
                    {t(`routes.gameGroup.achievementGroup.cardGroup.${variant}.title`)}
                </h3>

                {/* Stat Circle */}
                <div className="flex w-full max-w-64 aspect-square items-center justify-center rounded-full bg-gradient-pink">
                    <span className="text-7xl font-bold text-white text-shadow-[2px_2px_8px_#CA2791]">
                        {stat}
                    </span>
                </div>

                {/* description */}
                {variant !== "overall" && (
                <p className="font-medium text-2xl mt-auto whitespace-pre-line">
                    {variant === "var2"
                    ? t(
                        `routes.gameGroup.achievementGroup.cardGroup.${variant}.description`,
                        { top: props.top }
                        )
                    : variant === "var3"
                    ? t(
                        `routes.gameGroup.achievementGroup.cardGroup.${variant}.description`,
                        { count: props.count }
                        )
                    : t(
                        `routes.gameGroup.achievementGroup.cardGroup.${variant}.description`
                        )}
                </p>
                )}

                {/* overall view */}
                {variant === "overall" && (
                <div className="grid grid-cols-2 gap-4 mt-auto">
                    {/* Most collected faculty */}
                    <div className="flex flex-col items-center">
                    <div className="flex h-26 w-26 items-center justify-center rounded-full bg-gradient-beige">
                        <span className="text-5xl text-main-pink">
                        {props.miniCard1Count}
                        </span>
                    </div>
                    <span className="text-gray-600">
                        {t(
                        "routes.gameGroup.achievementGroup.cardGroup.overall.miniCard1.title"
                        )}
                    </span>
                    <span className="text-sm text-gray-500">
                        {t(
                        "routes.gameGroup.achievementGroup.cardGroup.overall.miniCard1.description",
                        { count: props.miniCard1Count }
                        )}
                    </span>
                    </div>

                    {/* Completed rank */}
                    <div className="flex flex-col items-center">
                    <div className="flex h-26 w-26 items-center justify-center rounded-full bg-gradient-beige">
                        <span className="text-5xl text-main-pink">
                        {props.miniCard2Rank}
                        </span>
                    </div>
                    <span className="text-gray-600">
                        {t(
                        "routes.gameGroup.achievementGroup.cardGroup.overall.miniCard2.title"
                        )}
                    </span>
                    </div>
                </div>
                )}

                {/* Share button */}
                <div className="absolute bottom-4 right-4 flex h-8 w-8 items-center justify-center">

                </div>
                
            </div>
        </div>
    )
}
