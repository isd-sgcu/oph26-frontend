import { QuestionaireInterface } from '@/routes/questionaire'

interface QuestionaireStepCertificateProps {
  formData: QuestionaireInterface
  setFormData: (formData: QuestionaireInterface) => void
}

const QuestionaireStepCertificate = ({
  formData,
  setFormData,
}: QuestionaireStepCertificateProps) => {
  return (
    <div className="flex h-fit w-full flex-col gap-4">
      This is Certificate Step
    </div>
  )
}

export default QuestionaireStepCertificate
