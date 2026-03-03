import { GAME_ASSETS, PUBLIC_ASSETS } from '@/components/const/gameAssets'
import GameMap from '@/components/game/landing/GameMap'
import LoadingOverlay from '@/components/game/landing/LoadingOverlay'
import { preloadImages } from '@/utils/preloadAssets'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/game/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    async function load() {
      await preloadImages([
        ...GAME_ASSETS,
        ...PUBLIC_ASSETS,
      ])

      // wait 1 frame to ensure layout complete
      await new Promise((r) => requestAnimationFrame(() => r(null)))

      setReady(true)
    }

    load()
  }, [])
  
  return (
    <div className="relative flex-1 overflow-hidden bg-black">
      {/* MAP */}
      {!ready && <LoadingOverlay />}

      {ready && (
        <div className="absolute inset-0 top-15 z-0">
          <GameMap />
        </div>
      )}

      {/* UI */}
      <div className="pointer-events-none absolute inset-0 z-5">
        {/* Header */}
        <div className="relative py-2 text-center font-bold text-white">
          {/* Background */}
          <div className="absolute inset-0">
            <div className="to-main-pink h-1/4 bg-linear-to-b from-[#F6ACD2] from-0% to-100%" />
            <div className="bg-main-pink h-1/2" />
            <div className="from-main-pink h-2/3 bg-linear-to-b to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 mt-5 flex flex-col items-center justify-center drop-shadow-lg">
            <span className="text-3xl">Missing Pieces</span>
            <span className="text-xl">of my Journey</span>
          </div>
        </div>

      </div>
    </div>
  )
}
