import { FACULTY_DATA } from '@/components/const/faculty'
import { Button } from '@/components/ui/button'
import { getFacultyLabel } from '@/utils/function'
import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/info/faculty/$facultyId/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { facultyId } = Route.useParams()
  const { t } = useTranslation()
  const targetFaculty = FACULTY_DATA.find((faculty) => faculty.id === facultyId)

  if (!targetFaculty) {
    return (
      <div className="bg-main-beige relative flex w-full flex-col">
        <div className="relative z-10 flex h-full w-full flex-col gap-6 px-4 py-8">
          <h1 className="text-center text-3xl font-bold text-white text-shadow-md">
            {t('routes.infoGroup.facultyGroup.noData')}
          </h1>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-main-beige relative flex w-full flex-col">
      {/* Content */}
      <div className="relative z-10 flex h-full w-full flex-col gap-6 px-4 py-8">
        {/* Header */}
        <div>
          <img
            src={targetFaculty.imagePath}
            width={356}
            height={222}
            className="mx-auto mb-4 rounded-xl object-cover"
            alt={getFacultyLabel(targetFaculty.id).th}
          />
          <h1 className="text-center text-xl font-semibold text-black">
            {getFacultyLabel(targetFaculty.id).th}
          </h1>
          <h2 className="text-center text-base text-black">
            {getFacultyLabel(targetFaculty.id).en}
          </h2>
        </div>

        {/* ฺButtons */}
        <div className="flex justify-center gap-4">
          <Button>{t('routes.infoGroup.facultyGroup.buttons.info')}</Button>
          <Button onClick={}>
            {t('routes.infoGroup.facultyGroup.buttons.workshop')}
          </Button>
        </div>
      </div>
    </div>
  )
}
