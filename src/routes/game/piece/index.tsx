import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/game/piece/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="to-main-pink relative flex-1 overflow-hidden bg-linear-to-b from-transparent to-10%">
      {/* Content  */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 py-6">
        This is some content
      </div>
    </div>
  )
}
