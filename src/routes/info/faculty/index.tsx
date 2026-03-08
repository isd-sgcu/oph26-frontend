import { FACULTY_DATA } from '@/components/const/faculty'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/info/faculty/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { i18n, t } = useTranslation()
  const [filteredFaculties, setFilteredFaculties] = useState(FACULTY_DATA)
  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    let filtered = FACULTY_DATA

    if (searchInput) {
      filtered = filtered.filter((faculty) =>
        faculty.name.toLowerCase().includes(searchInput.toLowerCase())
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
      </div>
    </div>
  )
}
