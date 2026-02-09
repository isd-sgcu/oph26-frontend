import { QuestionaireInterface } from '@/routes/questionaire'
import { useTranslation } from 'react-i18next'
import { Input } from '../ui/input'

interface QuestionaireStepCertificateProps {
  formData: QuestionaireInterface
  setFormData: (formData: QuestionaireInterface) => void
}

const nameRegex = /^[A-Za-zก-๙\s-]+$/

const QuestionaireStepCertificate = ({
  formData,
  setFormData,
}: QuestionaireStepCertificateProps) => {
  const { t } = useTranslation()
  return (
    <div className="mb-4 flex h-fit w-full flex-col gap-6 rounded-2xl bg-white px-6 py-6">
      <h2 className="text-center text-base font-medium text-black">
        {t('routes.questionaireGroup.partCertificate.description')}
      </h2>

      {/* Inputs */}
      <div className="flex flex-col items-center gap-3">
        <Input
          placeholder={t(
            'routes.questionaireGroup.partCertificate.firstNamePlaceholder'
          )}
          className="placeholder:text-grey w-[80%] border-black text-black"
          value={formData.certificate_firstname}
          onChange={(e) => {
            const value = e.target.value
            if (value === '' || nameRegex.test(value)) {
              setFormData({
                ...formData,
                certificate_firstname: value,
              })
            }
          }}
        />
        <Input
          placeholder={t(
            'routes.questionaireGroup.partCertificate.lastNamePlaceholder'
          )}
          className="placeholder:text-grey w-[80%] border-black text-black"
          value={formData.certificate_lastname}
          onChange={(e) => {
            const value = e.target.value
            if (value === '' || nameRegex.test(value)) {
              setFormData({
                ...formData,
                certificate_lastname: value,
              })
            }
          }}
        />
      </div>

      {/* Information and Caution */}
      <div className="flex flex-col items-center gap-3">
        <p className="border-main-pink rounded-xl border-2 px-4 py-2 text-center text-base font-semibold text-red-500">
          {t('routes.questionaireGroup.partCertificate.information')}
        </p>
        <p className="text-center text-base font-normal text-red-500">
          {t('routes.questionaireGroup.partCertificate.caution')}
        </p>
      </div>
    </div>
  )
}

export default QuestionaireStepCertificate
