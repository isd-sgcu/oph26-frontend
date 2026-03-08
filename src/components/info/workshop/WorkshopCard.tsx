import { getFacultyLabel, Workshop } from '@/components/const/workshop'
import { FlatIcon } from '@/components/FlatIcon'
import { Button } from '@/components/ui/button'
import { useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface WorkshopCardProps {
  workshop: Workshop
}

const WorkshopCard = ({ workshop }: WorkshopCardProps) => {
  const router = useRouter()
  const { i18n, t } = useTranslation()
  const [isFavourite, setIsFavourite] = useState(false)

  const facultyLabel = getFacultyLabel(workshop.faculty)

  return (
    <div className="flex-center flex w-full flex-col items-center justify-center gap-6 rounded-xl bg-white p-4">
      {/* Content */}
      <div className="flex w-full flex-col gap-1">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <p className="overflow-hidden text-base font-medium text-ellipsis whitespace-nowrap text-black">
            {workshop.name}
          </p>

          <FlatIcon
            name={isFavourite ? 'fi-sr-heart' : 'fi-rr-heart'}
            size={16}
            className="text-main-pink cursor-pointer"
            onClick={(e) => {
              e.stopPropagation()
              setIsFavourite((prev) => !prev)
            }}
          />
        </div>

        {/* Information */}
        <div className="flex w-full gap-8">
          {/* Left */}
          <div className="flex flex-col gap-1">
            {/* Faculty */}
            <div className="flex items-center gap-1">
              <FlatIcon
                name="fi-rr-graduation-cap"
                size={12}
                className="text-main-pink"
              />
              <span className="text-sm font-semibold">
                {t('routes.infoGroup.workshopGroup.faculty')}
              </span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-1">
              <FlatIcon
                name="fi-rr-map-marker"
                size={12}
                className="text-main-pink"
              />
              <span className="text-sm font-semibold">
                {t('routes.infoGroup.workshopGroup.location')}
              </span>
            </div>

            {/* Time */}
            <div className="flex items-center gap-1">
              <FlatIcon
                name="fi-rr-clock"
                size={12}
                className="text-main-pink"
              />
              <span className="text-sm font-semibold">
                {t('routes.infoGroup.workshopGroup.time')}
              </span>
            </div>
          </div>

          {/* Right */}
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            {/* Faculty */}
            <p className="overflow-hidden text-sm text-ellipsis whitespace-nowrap text-gray-500">
              {i18n.language == 'th' ? facultyLabel.th : facultyLabel.en}
            </p>

            {/* Location */}
            <p className="overflow-hidden text-sm text-ellipsis whitespace-nowrap text-gray-500">
              {workshop.locationName ? workshop.locationName : '-'}
            </p>

            {/* Time */}
            <p className="overflow-hidden text-sm text-ellipsis whitespace-nowrap text-gray-500">
              {workshop.timeSlot ? workshop.timeSlot.split('/')[0] : '-'}
            </p>
          </div>
        </div>
      </div>

      {/* View Details */}
      <Button
        onClick={() => {
          router.navigate({ to: `/info/workshop/${workshop.id}` })
        }}
        size="sm"
        expanded
      >
        {t('routes.infoGroup.workshopGroup.viewDetails')}
      </Button>
    </div>
  )
}

export default WorkshopCard
