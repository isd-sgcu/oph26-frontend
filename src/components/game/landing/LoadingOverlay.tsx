// LoadingOverlay.tsx
import cloudImg from '@/assets/game/deco/cloud.svg'

export default function LoadingOverlay() {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-linear-to-b from-main-pink via-[#F6C1DE] to-[#F9B5D0]">
      
      <div className="flex flex-col items-center gap-6">

        {/* Floating Cloud */}
        <div className="animate-float">
          <img
            src={cloudImg}
            alt="loading cloud"
            className="w-32 opacity-90"
          />
        </div>

        {/* Text */}
        <div className="text-center text-white drop-shadow-md">
          <p className="text-2xl font-bold tracking-wide">
            Missing Pieces
          </p>
          <p className="text-sm opacity-90">
            Loading your journey...
          </p>
        </div>

        {/* Soft Dots */}
        <div className="flex gap-2">
          <span className="dot" />
          <span className="dot delay-150" />
          <span className="dot delay-300" />
        </div>
      </div>
    </div>
  )
}