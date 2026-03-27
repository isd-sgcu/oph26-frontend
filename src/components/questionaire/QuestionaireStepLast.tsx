import { useTranslation } from 'react-i18next'

interface QuestionaireStepLastProps {
  isHighSchoolStudent: boolean
}

const QuestionaireStepLast = ({
  isHighSchoolStudent,
}: QuestionaireStepLastProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex h-fit w-full flex-col items-center gap-4 pb-8">
      {/* Logo */}
      <img
        src="/logo/cu-journey.webp"
        alt="Logo"
        width={288.38}
        height={167.17}
      />

      {isHighSchoolStudent && (
        <p className="bg-sub-yellow w-[80%] rounded-xl px-3 py-1 text-center text-base font-medium text-red-500">
          {t('routes.questionaireGroup.partLast.highSchoolInformation')}
        </p>
      )}

      <p className="w-[80%] text-center text-sm font-medium whitespace-pre-wrap text-white">
        {t('routes.questionaireGroup.partLast.description')}
      </p>
    </div>
  )
}

export default QuestionaireStepLast
