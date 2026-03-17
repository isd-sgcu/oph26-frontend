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
  return <div>Hello "/info/faculty/"!</div>
}
