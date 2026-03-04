import { useTranslation } from 'react-i18next'
import { Piece } from '../Piece'

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
  miniCard1Faculty: string
  miniCard1Count: number
  miniCard2Rank: number
}

type CollectedPiecesProps = {
  variant: 'collectedPieces'
  stat: number
  edu: number
  psy: number
  pharm: number
  dent: number
  commarts: number
  ahs: number
  faa: number
  vet: number
  law: number
  arch: number
  eng: number
  arts: number
  md: number
  sci: number
  econ: number
  polsci: number
  cbs: number
  spsc: number
  scii: number
  cusar: number
}

type AchievementCardProps = Var1Props | Var2Props | Var3Props | OverallProps | CollectedPiecesProps

export default function AchievementCard(props: AchievementCardProps) {
  const { i18n, t } = useTranslation()
  const { variant, stat } = props

  const isEnglish = i18n.language.startsWith('en')
  const isCollected = variant === 'collectedPieces'

  function getOrdinal(n: number) {
    const s = ["th", "st", "nd", "rd"]
    const v = n % 100
    return n + (s[(v - 20) % 10] || s[v] || s[0])
    }

  return (
    // !!!!!!!!!!!!!!!SET MAX WIDTH TO SYSTEM 80% MAX WIDTH !!!!!!!!!!!!!!!
    <div className={`relative mx-auto flex h-full w-[80vw] max-w-84 flex-col 
      tems-center justify-center rounded-2xl bg-white shadow-sm
      ${isCollected ? 'p-4' : 'p-8'}`}>
      <div className="flex w-full flex-col items-center justify-center gap-5 text-center">
        {/* title */}
        <h3 className="text-2xl font-semibold">
          {t(`routes.gameGroup.achievementGroup.cardGroup.${variant}.title`)}
        </h3>

        {/* Stat Circle */}
        { variant !== 'collectedPieces' ? (
            <div className="bg-gradient-pink flex aspect-square w-full max-w-64 items-center justify-center rounded-full">
                <span className="text-7xl font-bold text-white text-shadow-[2px_2px_8px_#CA2791]">
                    {variant === 'var1' && isEnglish && typeof stat === 'number'
                        ? getOrdinal(stat)
                        : stat}
                    {variant === 'var3' && '%'}
                </span>
            </div>
        ) : null}

        {/* description */}
        {variant !== 'overall' && variant !== 'collectedPieces' && (
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
              <span className="text-main-pink text-3xl">
                {props.miniCard1Faculty}
              </span>
            </div>

            <div className="bg-gradient-beige flex h-26 w-26 items-center justify-center rounded-full">
              <span className="text-main-pink text-3xl">
                {isEnglish
                    ? getOrdinal(props.miniCard2Rank)
                    : props.miniCard2Rank}
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

        {/* Collected Pieces */}
        {variant === 'collectedPieces' && (
          <div className="grid grid-cols-4 grid-rows-5 justify-around w-full max-w-3xl mx-auto gap-0">
            {[
              { key: 'edu', label: i18n.language === 'th' ? 'ครุศาสตร์' : 'Education' , count: props.edu, variant: 1 },
              { key: 'psy', label: i18n.language === 'th' ? 'จิตวิทยา' : 'Psychology' , count: props.psy, variant: 2 },
              { key: 'pharm', label: i18n.language === 'th' ? 'เภสัชศาสตร์' : 'Pharmacy' , count: props.pharm, variant: 1 },
              { key: 'dent', label: i18n.language === 'th' ? 'ทันตแพทยศาสตร์' : 'Dentistry' , count: props.dent, variant: 5 },
              { key: 'commarts', label: i18n.language === 'th' ? 'นิเทศศาสตร์' : 'Communication \nArts' , count: props.commarts, variant: 4 },
              { key: 'ahs', label: i18n.language === 'th' ? 'สหเวชศาสตร์' : 'Applied Health Sciences' , count: props.ahs, variant: 6 },
              { key: 'faa', label: i18n.language === 'th' ? 'ศิลปกรรมศาสตร์' : 'Fine and \nApplied Arts' , count: props.faa, variant: 2 },
              { key: 'vet', label: i18n.language === 'th' ? 'สัตวแพทยศาสตร์' : 'Veterinary \nMedicine' , count: props.vet, variant: 1 },
              { key: 'law', label: i18n.language === 'th' ? 'นิติศาสตร์' : 'Law' , count: props.law, variant: 5 },
              { key: 'arch', label: i18n.language === 'th' ? 'สถาปัตยกรรมศาสตร์' : 'Architecture' , count: props.arch, variant: 2 },
              { key: 'eng', label: i18n.language === 'th' ? 'วิศวกรรมศาสตร์' : 'Engineering' , count: props.eng, variant: 4 },
              { key: 'arts', label: i18n.language === 'th' ? 'อักษรศาสตร์' : 'Arts' , count: props.arts, variant: 6 },
              { key: 'md', label: i18n.language === 'th' ? 'แพทยศาสตร์' : 'Medicine' , count: props.md, variant: 1 },
              { key: 'sci', label: i18n.language === 'th' ? 'วิทยาศาสตร์' : 'Science' , count: props.sci, variant: 2 },
              { key: 'econ', label: i18n.language === 'th' ? 'เศรษฐศาสตร์' : 'Economics' , count: props.econ, variant: 4 },
              { key: 'polsci', label: i18n.language === 'th' ? 'รัฐศาสตร์' : 'Political Science' , count: props.polsci, variant: 1 },
              { key: 'cbs', label: i18n.language === 'th' ? 'พาณิชยศาสตร์\nและการบัญชี' : 'Commerce and Accountancy' , count: props.cbs, variant: 6 },
              { key: 'spsc', label: i18n.language === 'th' ? 'วิทยาศาสตร์\nการกีฬา' : 'Sports\nScience' , count: props.spsc, variant: 2 },
              { key: 'cusar', label: i18n.language === 'th' ? 'สำนักวิชาทรัพยากร\nการเกษตร' : 'Agricultural Resources' , count: props.cusar, variant: 5 },
              { key: 'scii', label: i18n.language === 'th' ? 'สถาบันนวัตกรรม\nบูรณาการ' : 'Integrated Innovation' , count: props.scii, variant: 1 },
            ].map(({ key, label, count, variant }) => {
              const isLocked = count === 0
              const displayCount = isLocked ? 1 : count

              return (
              <div key={key} className="flex flex-col items-center justify-center -mx-1 -my-2">
                <div
                  className={`relative -mx-1 -my-1 ${
                    isLocked ? 'grayscale brightness-75 opacity-80' : ''
                  }`}
                >
                <Piece faculty={key as any} count={displayCount} variant={variant as any} size={70} />
                </div>
                <span className="-mt-2 mb-2 text-[8px] font-semibold text-black text-center whitespace-pre-line leading-tight">
                  {label}
                </span>
              </div>
            )})}
          </div>
        )}

        {/* Share button */}
        <div className="absolute right-4 bottom-4 flex h-8 w-8 items-center justify-center"></div>
      </div>
    </div>
  )
}
