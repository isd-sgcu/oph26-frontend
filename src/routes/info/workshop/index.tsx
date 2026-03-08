import { ALL_FACULTIES } from '@/components/const/faculty'
import { getFacultyLabel, WORKSHOP_DATA } from '@/components/const/workshop'
import { FlatIcon } from '@/components/FlatIcon'
import WorkshopCard from '@/components/info/workshop/WorkshopCard'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/info/workshop/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { i18n, t } = useTranslation()
  const [filteredWorkshops, setFilteredWorkshops] = useState(WORKSHOP_DATA)
  const [searchInput, setSearchInput] = useState('')
  const [selectedFaculty, setSelectedFaculty] = useState<string | undefined>(
    undefined
  )

  useEffect(() => {
    let filtered = WORKSHOP_DATA

    if (searchInput) {
      filtered = filtered.filter((workshop) =>
        workshop.name.toLowerCase().includes(searchInput.toLowerCase())
      )
    }

    if (selectedFaculty && selectedFaculty !== 'all') {
      filtered = filtered.filter(
        (workshop) => workshop.faculty === selectedFaculty
      )
    }
    setFilteredWorkshops(filtered)
  }, [searchInput, selectedFaculty])

  return (
    <div className="from-main-light-pink to-main-pink relative flex w-full flex-col bg-linear-to-b">
      {/* Content */}
      <div className="relative z-10 flex h-full w-full flex-col gap-6 px-4 py-8">
        <h1 className="text-center text-3xl font-bold text-white text-shadow-md">
          {t('routes.infoGroup.workshopGroup.title')}
        </h1>

        {/* Filter */}
        <div className="flex flex-col gap-3">
          <div className="relative">
            <FlatIcon
              name="fi-rr-search"
              size={14}
              className="text-main-pink absolute top-1/2 left-3 -translate-y-1/2"
            />
            <Input
              placeholder={t('routes.infoGroup.workshopGroup.inputPlaceholder')}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="bg-white pl-9"
            />
          </div>
          <Select value={selectedFaculty} onValueChange={setSelectedFaculty}>
            <SelectTrigger className="bg-white">
              <SelectValue
                placeholder={t('routes.infoGroup.workshopGroup.all')}
              />
            </SelectTrigger>
            <SelectContent className="z-50 h-50 overflow-y-auto">
              <SelectItem value="all">
                {t('routes.infoGroup.workshopGroup.all')}
              </SelectItem>
              {ALL_FACULTIES().map((faculty) => (
                <SelectItem key={faculty} value={faculty}>
                  {i18n.language === 'th'
                    ? getFacultyLabel(faculty).th
                    : getFacultyLabel(faculty).en}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Workshops */}
        <div className="flex h-full max-h-120 flex-col gap-2 overflow-y-auto">
          {filteredWorkshops && filteredWorkshops.length === 0 && (
            <div className="text-center text-base font-medium text-white">
              {t('routes.infoGroup.workshopGroup.noData')}
            </div>
          )}
          {filteredWorkshops.map((workshop) => {
            return <WorkshopCard key={workshop.id} workshop={workshop} />
          })}
        </div>
      </div>
    </div>
  )
}
