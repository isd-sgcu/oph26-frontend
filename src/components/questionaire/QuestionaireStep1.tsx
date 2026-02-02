import { useTranslation } from 'react-i18next'
import { FlatIcon } from '../FlatIcon'
import BreakLine from './Breakline'
import { QuestionaireInterface } from '@/routes/questionaire'
import { Input } from '../ui/input'
import RedStar from './RedStar'

interface QuestionaireStep1Props {
  formData: QuestionaireInterface
  setFormData: (formData: QuestionaireInterface) => void
}

export type RatingValue = 1 | 2 | 3 | 4 | 5

const QuestionaireStep1 = ({
  formData,
  setFormData,
}: QuestionaireStep1Props) => {
  const { t } = useTranslation()

  const ratingValues: RatingValue[] = [1, 2, 3, 4, 5]

  const ratingIcons = {
    1: 'fi-rr-frown',
    2: 'fi-rr-sad',
    3: 'fi-rr-meh',
    4: 'fi-rr-smile',
    5: 'fi-rr-laugh',
  } as const

  const q1Options = ['social', 'website', 'friends', 'school']

  const toggleQ1 = (value: string) => {
    const selected = formData.q1.selected.includes(value)
      ? formData.q1.selected.filter((v) => v !== value)
      : [...formData.q1.selected, value]

    setFormData({
      ...formData,
      q1: {
        ...formData.q1,
        selected,
      },
    })
  }

  const setRating = (key: 'q2' | 'q3' | 'q4' | 'q5', value: number) => {
    setFormData({
      ...formData,
      [key]: value,
    })
  }

  return (
    <div className="flex w-full flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-4">
        <FlatIcon name="fi-rr-edit" className="text-main-pink" size={24} />
        <h2 className="text-base font-bold">
          <span>{t('routes.questionaireGroup.part1.header')}</span>:{' '}
          <span>{t('routes.questionaireGroup.part1.title')}</span>
        </h2>
      </div>

      <BreakLine />

      <div className="flex flex-col gap-3">
        <p className="font-semibold">
          1. {t('routes.questionaireGroup.part1.q1.question')} <RedStar />
        </p>

        {q1Options.map((opt) => (
          <label key={opt} className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={formData.q1.selected.includes(opt)}
              onChange={() => toggleQ1(opt)}
              className="border-main-pink checked:bg-main-pink checked:border-main-pink relative h-4 w-4 cursor-pointer appearance-none rounded border after:content-[''] checked:after:absolute checked:after:inset-0 checked:after:flex checked:after:items-center checked:after:justify-center checked:after:text-xs checked:after:text-white checked:after:content-['✓']"
            />
            {t(`routes.questionaireGroup.part1.q1.options.${opt}`)}
          </label>
        ))}

        {/* Other */}
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={formData.q1.selected.includes('other')}
            onChange={() => toggleQ1('other')}
            className="border-main-pink checked:bg-main-pink checked:border-main-pink relative h-4 w-4 cursor-pointer appearance-none rounded border after:content-[''] checked:after:absolute checked:after:inset-0 checked:after:flex checked:after:items-center checked:after:justify-center checked:after:text-xs checked:after:text-white checked:after:content-['✓']"
          />
          {t('routes.questionaireGroup.part1.q1.options.other')}
        </label>

        <Input
          placeholder={t('routes.questionaireGroup.part1.q1.placeholder')}
          className="border-main-pink text-main-pink placeholder:text-main-light-pink"
          disabled={!formData.q1.selected.includes('other')}
          value={formData.q1.other}
          onChange={(e) =>
            setFormData({
              ...formData,
              q1: {
                ...formData.q1,
                other: e.target.value,
              },
            })
          }
        />
      </div>

      <BreakLine />

      {(['q2', 'q3', 'q4', 'q5'] as const).map((key, index) => (
        <div key={key} className="flex flex-col gap-2">
          <p className="font-semibold">
            {index + 2}. {t(`routes.questionaireGroup.part1.${key}.question`)}{' '}
            <RedStar />
          </p>

          <div className="flex items-center justify-between">
            {/* Low */}
            <span className="text-sm text-black">
              {t('routes.questionaireGroup.part1.rating.low')}
            </span>

            {/* Rating Icons */}
            <div className="flex w-full justify-between px-4">
              {ratingValues.map((r) => {
                const isActive = formData[key] === r

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
                      name={ratingIcons[r]}
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
      ))}

      <BreakLine />

      <div className="flex flex-col gap-2">
        <p className="font-semibold">
          6. {t('routes.questionaireGroup.part1.q6.question')}
        </p>
        <Input
          placeholder={t('routes.questionaireGroup.part1.q6.placeholder')}
          className="border-main-pink text-main-pink placeholder:text-main-light-pink"
          value={formData.q6}
          onChange={(e) =>
            setFormData({
              ...formData,
              q6: e.target.value,
            })
          }
        />
      </div>

      <BreakLine />
    </div>
  )
}

export default QuestionaireStep1
