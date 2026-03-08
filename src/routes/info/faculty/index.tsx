import { FACULTY_DATA } from '@/components/const/faculty'
import { FlatIcon } from '@/components/FlatIcon'
import FacultyCard from '@/components/info/faculty/FacultyCard'
import { Input } from '@/components/ui/input'
import { getFacultyLabel } from '@/utils/function'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/info/faculty/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation()
  const [filteredFaculties, setFilteredFaculties] = useState(FACULTY_DATA)
  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    let filtered = FACULTY_DATA

    if (searchInput) {
      filtered = filtered.filter(
        (faculty) =>
          getFacultyLabel(faculty.id)
            .en.toLowerCase()
            .includes(searchInput.toLowerCase()) ||
          getFacultyLabel(faculty.id).th.includes(searchInput)
      )
    }

    setFilteredFaculties(filtered)
  }, [searchInput])

  return (
    <div className="from-main-light-pink to-main-pink relative flex w-full flex-col bg-linear-to-b">
      {/* Content */}
      <div className="relative z-10 flex h-full w-full flex-col gap-6 px-4 py-8">
        <h1 className="text-center text-3xl font-bold text-white text-shadow-md">
          {t('routes.infoGroup.facultyGroup.title')}
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
              placeholder={t('routes.infoGroup.facultyGroup.inputPlaceholder')}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="bg-white pl-9"
            />
          </div>
        </div>

        {/* Faculties */}
        {filteredFaculties && filteredFaculties.length === 0 ? (
          <div className="text-center text-base font-medium text-white">
            {t('routes.infoGroup.facultyGroup.noData')}
          </div>
        ) : (
          <div className="grid max-h-120 grid-cols-2 gap-4 overflow-y-auto">
            {filteredFaculties.map((faculty) => {
              return <FacultyCard key={faculty.id} faculty={faculty} />
            })}
          </div>
        )}
      </div>
    </div>
  )
}
