import { GAME_ASSETS, PUBLIC_ASSETS } from '@/components/const/gameAssets'
import GameMap from '@/components/game/landing/GameMap'
import LoadingOverlay from '@/components/game/landing/LoadingOverlay'
import { preloadImages } from '@/utils/preloadAssets'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'

const POPUP_KEY = 'game_popup_last_seen'
const COOLDOWN = 1000 * 60 * 10 // 10 mins

export const Route = createFileRoute('/game/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [ready, setReady] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  
  useEffect(() => {
    const lastSeen = localStorage.getItem(POPUP_KEY)
    const now = Date.now()

    if (!lastSeen || now - Number(lastSeen) > COOLDOWN) {
      setShowPopup(true)
      localStorage.setItem(POPUP_KEY, now.toString())
    }
  }, [])

  useEffect(() => {
    async function load() {
      await preloadImages([...GAME_ASSETS, ...PUBLIC_ASSETS])

      // wait 1 frame to ensure layout complete
      await new Promise((r) => requestAnimationFrame(() => r(null)))

      setReady(true)
    }

    load()
  }, [])

  return (
    <div className="relative flex-1 overflow-hidden bg-black">
      {/* MAP */}
      {!ready && <LoadingOverlay text="Loading your journey..." />}

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
            <div className="bg-main-pink h-1/4" />
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

      {showPopup && (
        <div className="fixed inset-0 z-550 flex items-center justify-center bg-white/30 backdrop-blur-md">
          <div className="relative w-fit max-w-(--width-page) rounded-2xl bg-white p-3 shadow-xl">
            <Link to="/info/merchandise">
              <img
                src="/info/merchandise/popup.webp"
                alt="popup"
                className="w-[80vw] max-w-85 rounded-xl object-cover"
              />
            </Link>

            <button
              onClick={() => setShowPopup(false)}
              className="bg-main-pink absolute -bottom-10 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full text-white shadow-md"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
