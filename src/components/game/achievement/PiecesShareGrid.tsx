import { Piece } from "../Piece"
import { CollectedPiecesProps } from "./AchievementCard"


export default function PiecesShareGrid({ props, lang } : { props:CollectedPiecesProps, lang:0|1 }) {
  return (
    <div className="grid grid-cols-4 grid-rows-5 justify-around w-full max-w-3xl mx-auto gap-y-0 gap-x-25">
      {[
        { key: 'edu', label: lang === 0 ? 'ครุศาสตร์' : 'Education' , count: props.edu, variant: 1 },
        { key: 'psy', label: lang === 0 ? 'จิตวิทยา' : 'Psychology' , count: props.psy, variant: 2 },
        { key: 'pharm', label: lang === 0 ? 'เภสัชศาสตร์' : 'Pharmacy' , count: props.pharm, variant: 1 },
        { key: 'dent', label: lang === 0 ? 'ทันตแพทยศาสตร์' : 'Dentistry' , count: props.dent, variant: 5 },
        { key: 'commarts', label: lang === 0 ? 'นิเทศศาสตร์' : 'Communication\nArts' , count: props.commarts, variant: 4 },
        { key: 'ahs', label: lang === 0 ? 'สหเวชศาสตร์' : 'Applied Health\nSciences' , count: props.ahs, variant: 6 },
        { key: 'faa', label: lang === 0 ? 'ศิลปกรรมศาสตร์' : 'Fine and\nApplied Arts' , count: props.faa, variant: 2 },
        { key: 'vet', label: lang === 0 ? 'สัตวแพทยศาสตร์' : 'Veterinary\nMedicine' , count: props.vet, variant: 1 },
        { key: 'law', label: lang === 0 ? 'นิติศาสตร์' : 'Law' , count: props.law, variant: 5 },
        { key: 'arch', label: lang === 0 ? 'สถาปัตยกรรมศาสตร์' : 'Architecture' , count: props.arch, variant: 2 },
        { key: 'eng', label: lang === 0 ? 'วิศวกรรมศาสตร์' : 'Engineering' , count: props.eng, variant: 4 },
        { key: 'arts', label: lang === 0 ? 'อักษรศาสตร์' : 'Arts' , count: props.arts, variant: 6 },
        { key: 'md', label: lang === 0 ? 'แพทยศาสตร์' : 'Medicine' , count: props.md, variant: 1 },
        { key: 'sci', label: lang === 0 ? 'วิทยาศาสตร์' : 'Science' , count: props.sci, variant: 2 },
        { key: 'econ', label: lang === 0 ? 'เศรษฐศาสตร์' : 'Economics' , count: props.econ, variant: 4 },
        { key: 'polsci', label: lang === 0 ? 'รัฐศาสตร์' : 'Political Science' , count: props.polsci, variant: 1 },
        { key: 'cbs', label: lang === 0 ? 'พาณิชยศาสตร์\nและการบัญชี' : 'Commerce and\nAccountancy' , count: props.cbs, variant: 6 },
        { key: 'spsc', label: lang === 0 ? 'วิทยาศาสตร์\nการกีฬา' : 'Sports\nScience' , count: props.spsc, variant: 2 },
        { key: 'cusar', label: lang === 0 ? 'สำนักวิชาทรัพยากร\nการเกษตร' : 'Agricultural\nResources' , count: props.cusar, variant: 5 },
        { key: 'scii', label: lang === 0 ? 'สถาบันนวัตกรรม\nบูรณาการ' : 'Integrated\nInnovation' , count: props.scii, variant: 1 },
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
          <Piece faculty={key as any} count={displayCount} variant={variant as any} size={220} />
          </div>
          <span className="-mt-2 mb-2 text-[20px] font-semibold text-black text-center whitespace-pre leading-tight">
            {label}
          </span>
        </div>
      )})}
    </div>
  )
}