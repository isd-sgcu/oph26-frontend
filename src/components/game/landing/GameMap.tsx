import UniMapBg from '@/assets/game/uni-map-bg.svg'
import WavingTree from './deco/WavingTree'

export default function GameMap() {
    return (
        <div className="h-full w-full overflow-x-scroll overflow-y-hidden touch-pan-x">
          <svg
            viewBox="0 0 2000 2000"
            className="h-full w-auto bg-black"
            preserveAspectRatio="xMinYMid meet"
          >
            {/* Background */}
            <image
              href={UniMapBg}
              x={0}
              y={0}
              width={2000}
              height={2000}
            />

            {/* Later: Trees, cars, puzzle holes */}
            <WavingTree x={330} y={700} scale={1} />
            <WavingTree x={400} y={700} scale={1.2} />
          </svg>
        </div>
    )
}