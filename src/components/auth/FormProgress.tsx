import { cn } from '@/lib/utils.ts'

interface FormProgressProps {
  currentPage: number
  maxPages: number
  text: string
}

export const FormProgress = ({
  currentPage,
  maxPages,
  text,
}: FormProgressProps) => {
  const getCurrentPage = () => {
    if (maxPages === 5) {
      switch (currentPage) {
        case 1:
          return 0
        case 2:
          return 1
        case 3:
          return 2
        default:
          return 3
      }
    }
    switch (currentPage) {
      case 1:
        return 0
      case 3:
        return 1
      default:
        return 2
    }
  }

  return (
    <div className="flex flex-row gap-1">
      {Array.from({ length: maxPages - 1 }).map((_, index) => (
        <div key={index} className="flex flex-1 flex-col">
          <div
            className={cn(
              'h-2 rounded-md',
              index === getCurrentPage() ? 'bg-sub-blue' : 'bg-main-beige'
            )}
          ></div>
          {index === getCurrentPage() && (
            <p className="mt-1 text-center text-xs text-white">{text}</p>
          )}
        </div>
      ))}
    </div>
  )
}
