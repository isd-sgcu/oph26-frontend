import { useTranslation } from 'react-i18next'

type BaseProps = {
  stat: string | number
}

type Var1Props = BaseProps & {
  variant: 'var1'
}

type Var2Props = BaseProps & {
  variant: 'var2'
  top: number
}

type Var3Props = BaseProps & {
  variant: 'var3'
  faculty: string
}

type OverallProps = BaseProps & {
  variant: 'overall'
  miniCard1Count: number
  miniCard2Rank: number
}

type AchievementCardProps = Var1Props | Var2Props | Var3Props | OverallProps

export default function AchievementCard(props: AchievementCardProps) {
  const { i18n, t } = useTranslation()
  const { variant, stat } = props

  return (
    // !!!!!!!!!!!!!!!SET MAX WIDTH TO SYSTEM 80% MAX WIDTH !!!!!!!!!!!!!!!
    <div className="relative mx-auto flex h-full w-[80vw] max-w-84 flex-col items-center justify-center rounded-2xl bg-white p-8 shadow-sm">
      <div className="flex w-full flex-col items-center justify-center gap-5 text-center">
        {/* title */}
        <h3 className="text-2xl font-semibold">
          {t(`routes.gameGroup.achievementGroup.cardGroup.${variant}.title`)}
        </h3>

        {/* Stat Circle */}
        <div className="bg-gradient-pink flex aspect-square w-full max-w-64 items-center justify-center rounded-full">
          <span className="text-7xl font-bold text-white text-shadow-[2px_2px_8px_#CA2791]">
            {stat}
            {variant === 'var3' && '%'}
          </span>
        </div>

        {/* description */}
        {variant !== 'overall' && (
          <p className="mt-auto text-2xl font-medium whitespace-pre-line">
            {variant === 'var2'
              ? t(
                  `routes.gameGroup.achievementGroup.cardGroup.${variant}.description`,
                  { top: props.top }
                )
              : variant === 'var3'
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
        {variant === 'overall' && (
          <div className="mt-auto grid grid-cols-2 grid-rows-[auto_auto_auto] place-items-center gap-x-4 gap-y-2">
            <span className={i18n.language === 'th' ? 'whitespace-nowrap' : ''}>
              {t(
                'routes.gameGroup.achievementGroup.cardGroup.overall.miniCard1.title'
              )}
            </span>

            <span className="">
              {t(
                'routes.gameGroup.achievementGroup.cardGroup.overall.miniCard2.title'
              )}
            </span>

            <div className="bg-gradient-beige flex h-26 w-26 items-center justify-center rounded-full">
              <span className="text-main-pink text-5xl">
                {props.miniCard1Count}
              </span>
            </div>

            <div className="bg-gradient-beige flex h-26 w-26 items-center justify-center rounded-full">
              <span className="text-main-pink text-5xl">
                {props.miniCard2Rank}
              </span>
            </div>

            <span className="">
              {t(
                'routes.gameGroup.achievementGroup.cardGroup.overall.miniCard1.description',
                { count: props.miniCard1Count }
              )}
            </span>

            <span className="">
              {t(
                'routes.gameGroup.achievementGroup.cardGroup.overall.miniCard2.description'
              )}
            </span>
          </div>
        )}

        {/* Share button */}
        <div className="absolute right-4 bottom-4 flex h-8 w-8 items-center justify-center"></div>
      </div>
    </div>
  )
}
