import UniMapBg from '@/assets/game/uni-map-bg.svg'
import DecorationLayer from './DecorationLayer'

export default function GameMap() {
    return (
        <div className="h-full w-full overflow-x-scroll overflow-y-hidden touch-pan-x touch-pan-y">
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

            {/* Decoration layer */}
            <DecorationLayer />

            
          </svg>
        </div>
    )
}