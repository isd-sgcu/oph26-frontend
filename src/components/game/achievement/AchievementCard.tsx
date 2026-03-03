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
  faculty: string
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
    const { i18n, t } = useTranslation()
    const { variant, stat } = props

    return (
        // !!!!!!!!!!!!!!!SET MAX WIDTH TO SYSTEM 80% MAX WIDTH !!!!!!!!!!!!!!!
        <div className="relative w-[80vw] max-w-84 h-full mx-auto rounded-2xl bg-white p-8 shadow-sm flex flex-col items-center justify-center">
            <div className="flex flex-col w-full gap-5 text-center justify-center items-center">
                {/* title */}
                <h3 className="text-2xl font-semibold">
                    {t(`routes.gameGroup.achievementGroup.cardGroup.${variant}.title`)}
                </h3>

                {/* Stat Circle */}
                <div className="flex w-full max-w-64 aspect-square items-center justify-center rounded-full bg-gradient-pink">
                    <span className="text-7xl font-bold text-white text-shadow-[2px_2px_8px_#CA2791]">
                        {stat}
                        {variant === "var3" && "%"}
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
                        { faculty: props.faculty }
                        )
                    : t(
                        `routes.gameGroup.achievementGroup.cardGroup.${variant}.description`
                        )}
                </p>
                )}

                {/* overall view */}
                {variant === "overall" && (
                <div className="grid grid-cols-2 grid-rows-[auto_auto_auto] place-items-center gap-x-4 gap-y-2 mt-auto">
                    
                    <span className={i18n.language === "th" ? "whitespace-nowrap" : ""}>
                        {t(
                        "routes.gameGroup.achievementGroup.cardGroup.overall.miniCard1.title"
                        )}
                    </span>

                    <span className="">
                        {t(
                        "routes.gameGroup.achievementGroup.cardGroup.overall.miniCard2.title"
                        )}
                    </span>

                    <div className="flex h-26 w-26 items-center justify-center rounded-full bg-gradient-beige">
                        <span className="text-5xl text-main-pink">
                        {props.miniCard1Count}
                        </span>
                    </div>

                    <div className="flex h-26 w-26 items-center justify-center rounded-full bg-gradient-beige">
                        <span className="text-5xl text-main-pink">
                        {props.miniCard2Rank}
                        </span>
                    </div>

                    <span className="">
                        {t(
                        "routes.gameGroup.achievementGroup.cardGroup.overall.miniCard1.description",
                        { count: props.miniCard1Count }
                        )}
                    </span>
                    
                    <span className="">
                        {t(
                        "routes.gameGroup.achievementGroup.cardGroup.overall.miniCard2.description",
                        )}
                    </span>

                </div>
                )}

                {/* Share button */}
                <div className="absolute bottom-4 right-4 flex h-8 w-8 items-center justify-center">

                </div>
                
            </div>
        </div>
    )
}
