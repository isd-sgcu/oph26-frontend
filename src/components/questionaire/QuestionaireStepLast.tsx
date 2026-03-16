import { useTranslation } from 'react-i18next'

interface QuestionaireStepLastProps {
  isHighSchoolStudent: boolean
}

const QuestionaireStepLast = ({
  isHighSchoolStudent,
}: QuestionaireStepLastProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center gap-4 pb-8 w-full h-fit">
      {/* Logo */}
      <img src="/logo/cu-journey.webp" alt="Logo" width={288.38} height={167.17} />

      {isHighSchoolStudent && (
        <p className="bg-sub-yellow px-3 py-1 rounded-xl w-[80%] font-medium text-red-500 text-base text-center">
          {t('routes.questionaireGroup.partLast.highSchoolInformation')}
        </p>
      )}

      <p className="w-[80%] font-medium text-white text-sm text-center">
        {t('routes.questionaireGroup.partLast.description')}
      </p>
    </div>
  )
}

export default QuestionaireStepLast
