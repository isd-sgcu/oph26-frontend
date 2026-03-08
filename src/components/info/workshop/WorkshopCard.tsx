import { Workshop } from '@/components/const/workshop'
import { useRouter } from '@tanstack/react-router'

interface WorkshopCardProps {
  workshop: Workshop
}

const WorkshopCard = ({ workshop }: WorkshopCardProps) => {
  const router = useRouter()
  return (
    <div
      className="min-h-30 w-full cursor-pointer rounded-md bg-white p-4 shadow-md"
      onClick={() => {
        router.navigate({ to: `/info/workshop/${workshop.id}` })
      }}
    >
      <p className="overflow-hidden text-base font-medium text-ellipsis whitespace-nowrap text-black">
        {workshop.name}
      </p>
    </div>
  )
}

export default WorkshopCard
