import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/questionaire/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="to-main-pink relative flex-1 overflow-hidden bg-linear-to-b from-[#ECECD2] to-10%">
      {/* Content  */}
      <div className={`relative z-10 flex w-full flex-col px-4 py-8`}>
        <h1 className="text-center text-3xl font-bold text-white text-shadow-md">
          Hello, Questionaire!
        </h1>
      </div>
    </div>
  )
}
