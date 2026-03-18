import { FACULTY_DATA } from '@/components/const/faculty'
import { FlatIcon } from '@/components/FlatIcon'
import MajorAccordion from '@/components/info/faculty/MajorAccordion'
import BreakLine from '@/components/questionaire/Breakline'
import { Button } from '@/components/ui/button'
import { getFacultyLabel } from '@/utils/function'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/info/faculty/$facultyId/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { facultyId } = Route.useParams()
  const router = useRouter()
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
      <div className="relative z-10 flex h-full w-full flex-col items-center gap-6 px-8 py-8">
        {/* Header */}
        <div>
          <img
            src={targetFaculty.imagePath}
            height={222}
            className="mx-auto mb-4 rounded-xl object-cover"
            alt={getFacultyLabel(targetFaculty.id).th}
          />
          <h1 className="text-center text-2xl font-semibold text-black">
            {getFacultyLabel(targetFaculty.id).th}
          </h1>
          <h2 className="text-center text-base text-black">
            {getFacultyLabel(targetFaculty.id).en}
          </h2>
        </div>

        {/* ฺButtons */}
        <div className="flex justify-center gap-4">
          <Button
            className="bg-gradient-purple"
            onClick={() => {
              router.navigate({
                to: '/info/workshop',
                search: {
                  faculty: targetFaculty.id,
                },
              })
            }}
          >
            {t('routes.infoGroup.facultyGroup.workshopButton')}
          </Button>
        </div>

        <BreakLine width={350} variant="purple" />

        {/* Location */}
        <div className="flex w-full items-center gap-4">
          <p className="text-base text-black">
            {t('routes.infoGroup.facultyGroup.location')}
          </p>
          <Button
            size="sm"
            expanded
            className="text-white"
            onClick={() => {
              window.open(targetFaculty.location, '_blank')
            }}
          >
            <span className="text-white">Google Map</span>
            <FlatIcon name="fi-rr-map" size={16} />
          </Button>
        </div>

        <BreakLine width={350} variant="purple" />

        {/* Majors */}
        <div className="flex w-full flex-col gap-4">
          <h2 className="text-xl font-semibold text-black">
            {t('routes.infoGroup.facultyGroup.major')}
          </h2>
          {targetFaculty.majors.map((major) => (
            <MajorAccordion key={major.id} major={major} />
          ))}
        </div>
      </div>
    </div>
  )
}
