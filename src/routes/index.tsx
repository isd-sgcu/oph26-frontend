import LandingSectionOne from '@/components/landing/LandingSectionOne'
import LandingSectionThree from '@/components/landing/LandingSectionThree'
import LandingSectionTwo from '@/components/landing/LandingSectionTwo'
import LandingSectionFour from '@/components/landing/LandingSectionFour'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/')({ component: App })

const POPUP_KEY = 'landing_popup_last_seen'
const COOLDOWN = 1000 * 60 * 10 // 10 mins

function App() {
  const [showPopup, setShowPopup] = useState(false)
  useEffect(() => {
    const lastSeen = localStorage.getItem(POPUP_KEY)
    const now = Date.now()

    if (!lastSeen || now - Number(lastSeen) > COOLDOWN) {
      setShowPopup(true)
      localStorage.setItem(POPUP_KEY, now.toString())
    }
  }, [])

  return (
    <main className="bg-gradient-pink flex w-full flex-col items-center justify-start">
      <LandingSectionOne />
      <LandingSectionTwo />
      <LandingSectionThree />
      <LandingSectionFour />

      {showPopup && (
        <div className="fixed inset-0 z-550 flex items-center justify-center bg-white/30 backdrop-blur-md">
          <div className="relative w-fit max-w-(--width-page) rounded-2xl bg-white p-3 shadow-xl">
            <Link to="/info/merchandise">
              <img
                src="/landing/popup/popup1.webp"
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
    </main>
  )
}
