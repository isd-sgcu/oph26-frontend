import { Faculty } from '@/components/const/faculty'
import { getFacultyLabel } from '@/utils/function'
import { useRouter } from '@tanstack/react-router'

interface FacultyCardProps {
  faculty: Faculty
}

const FacultyCard = ({ faculty }: FacultyCardProps) => {
  const router = useRouter()
  return (
    <div
      className="bg-main-beige flex w-full cursor-pointer flex-col gap-1 rounded-xl p-2 pb-4 shadow-sm"
      onClick={() => {
        router.navigate({ to: `/info/faculty/${faculty.id}` })
      }}
    >
      <img
        src={faculty.imagePath}
        alt={faculty.name}
        className="h-36 w-full rounded-xl object-cover"
      />
      <p className="text-main-pink text-sm font-semibold">
        {getFacultyLabel(faculty.id).th}
      </p>
      <p className="text-sm text-black">{getFacultyLabel(faculty.id).en}</p>
    </div>
  )
}

export default FacultyCard
