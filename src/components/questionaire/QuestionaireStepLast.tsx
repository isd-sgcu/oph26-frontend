import { useTranslation } from 'react-i18next'

const QuestionaireStepLast = () => {
  const { t } = useTranslation()

  return (
    <div className="flex h-fit w-full flex-col items-center gap-4 pb-8">
      {/* Logo */}
      <img src="/logo.svg" alt="Logo" width={288.38} height={167.17} />

      <p className="w-[80%] text-center text-sm font-medium text-white">
        {t('routes.questionaireGroup.partLast.description')}
      </p>
    </div>
  )
}

export default QuestionaireStepLast
