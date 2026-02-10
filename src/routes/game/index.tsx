import GameMap from '@/components/game/landing/GameMap'
import { createFileRoute } from '@tanstack/react-router'
import { captureGameMap } from '@/utils/captureMap'

export const Route = createFileRoute('/game/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="relative flex-1 overflow-hidden bg-black">
      {/* MAP */}
      <div className="absolute inset-0 z-0 top-15">
        <GameMap />
      </div>

      {/* UI */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Header */}
        <div className="relative p-5 text-center text-white font-bold ">
          {/* Background */}
          <div className="absolute inset-0">
            <div className="h-1/4 bg-linear-to-t from-main-pink to-[#ECECD2]" />
            <div className="h-1/2 bg-main-pink" />
            <div className="h-2/3 bg-linear-to-b from-main-pink to-transparent" />
          </div>

          {/* Content */}
          <div className="relative mt-5 z-10 flex flex-col items-center justify-center drop-shadow-lg">
            <span className='text-3xl'>Missing Pieces</span>
            <span className='text-xl'>of my Journey</span>
          </div>
        </div>

        <button
          onClick={async () => {
            const dataUrl = await captureGameMap()
            console.log('SUCCESS', dataUrl)
            const img = new Image()
            img.src = dataUrl
            document.body.appendChild(img) // temporary!
          }}
          className="absolute bottom-35 left-1/2 transform -translate-x-1/2 z-10 px-4 py-2 bg-white text-black rounded-md pointer-events-auto"
        >
          TEST SNAPSHOT
        </button>
      </div>
    </div>
  )
}
