import { useTranslation } from 'react-i18next'
import { FlatIcon } from '../FlatIcon'
import BreakLine from './Breakline'
import { QuestionaireInterface } from '@/routes/questionaire'
import { Input } from '../ui/input'
import RedStar from './RedStar'
import { RATING_ICONS, RATING_VALUES } from '@/types/questionaire'

interface QuestionaireStep1Props {
  formData: QuestionaireInterface
  setFormData: (formData: QuestionaireInterface) => void
}

const QuestionaireStep1 = ({
  formData,
  setFormData,
}: QuestionaireStep1Props) => {
  const { t } = useTranslation()

  const setRating = (key: 'q1' | 'q2' | 'q3' | 'q4', value: number) => {
    setFormData({
      ...formData,
      part1: {
        ...formData.part1,
        [key]: value,
      },
    })
  }

  return (
    <div className="flex h-fit w-full flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-4">
        <FlatIcon name="fi-rr-edit" className="text-main-pink" size={24} />
        <h2 className="text-base font-bold">
          <span>{t('routes.questionaireGroup.part1.header')}</span>:{' '}
          <span>{t('routes.questionaireGroup.part1.title')}</span>
        </h2>
      </div>

      <BreakLine />

      {/* Q1 - Q4: Rating */}
      {(['q1', 'q2', 'q3', 'q4'] as const).map((key, index) => (
        <>
          <div key={key} className="flex flex-col gap-2">
            <p className="font-semibold">
              {index + 1}. {t(`routes.questionaireGroup.part1.${key}.question`)}{' '}
              <RedStar />
            </p>

            <div className="flex items-center justify-between">
              {/* Low */}
              <span className="text-sm text-black">
                {t('routes.questionaireGroup.part1.rating.low')}
              </span>

              {/* Rating Icons */}
              <div className="flex w-full justify-between px-4">
                {RATING_VALUES.map((r) => {
                  const isActive = formData.part1[key] === r

                  return (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRating(key, r)}
                      className={`flex h-fit w-fit cursor-pointer items-center justify-center rounded-full transition ${
                        isActive ? 'bg-main-pink' : 'bg-white'
                      } `}
                    >
                      <FlatIcon
                        name={RATING_ICONS[r]}
                        size={24}
                        className={isActive ? 'text-white' : 'text-main-pink'}
                      />
                    </button>
                  )
                })}
              </div>

              {/* High */}
              <span className="text-sm text-black">
                {t('routes.questionaireGroup.part1.rating.high')}
              </span>
            </div>
          </div>
          <BreakLine />
        </>
      ))}

      {/* Q5: Short Answer */}
      <div className="flex flex-col gap-2">
        <p className="font-semibold">
          5. {t('routes.questionaireGroup.part1.q5.question')}
        </p>
        <Input
          placeholder={t('routes.questionaireGroup.part1.q5.placeholder')}
          className="border-main-pink text-main-pink placeholder:text-main-light-pink"
          value={formData.part1.q5}
          onChange={(e) =>
            setFormData({
              ...formData,
              part1: {
                ...formData.part1,
                q5: e.target.value,
              },
            })
          }
        />
      </div>

      <BreakLine />
    </div>
  )
}

export default QuestionaireStep1
