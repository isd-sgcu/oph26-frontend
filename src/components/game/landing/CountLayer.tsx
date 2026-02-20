import { FacultyType } from '@/components/const/faculty'

type CountConfig = {
  x: number
  y: number
  variant?: 1 | 2 | 4 | 5 | 6
  faculty?: FacultyType
}

const COUNT: CountConfig[] = [
  { x: 690, y: 1160, faculty: 'edu' },
  { x: 605, y: 330, faculty: 'psy' },
  { x: 1180, y: 300, faculty: 'dent' },
  { x: 580, y: 1490, faculty: 'law' },
  { x: 690, y: 1350, faculty: 'commarts' },
  { x: 980, y: 1490, faculty: 'cbs' },
  { x: 1680, y: 1320, faculty: 'md' },
  { x: 990, y: 470, faculty: 'pharm' },
  { x: 1270, y: 1350, faculty: 'polsci' },
  { x: 920, y: 1150, faculty: 'sci' },
  { x: 380, y: 470, faculty: 'spsc' },
  { x: 1270, y: 1180, faculty: 'eng' },
  { x: 1180, y: 760, faculty: 'faa' },
  { x: 1330, y: 1500, faculty: 'econ' },
  { x: 960, y: 760, faculty: 'arch' },
  { x: 607, y: 500, faculty: 'ahs' },
  { x: 1370, y: 480, faculty: 'vet' },
  { x: 1388, y: 720, faculty: 'arts' },
  { x: 490, y: 680, faculty: 'scii' },
  { x: 170, y: 380, faculty: 'cusar' },
]

export default function CountLayer({
  pieceCount,
}: {
  pieceCount: Record<string, number>
}) {
  return (
    <>
      {COUNT.map((config, index) => {
        const facultyKey = config.faculty || ''
        const count = pieceCount[facultyKey] ?? 0

        if (count <= 0) return null

        return (
          <g
            key={index}
            transform={`translate(${config.x}, ${config.y})`}
            filter="url(#badge-shadow)"
          >
            {/* Yellow Circle */}
            <circle
              cx="75"
              cy="25"
              r="30"
              fill="url(#gradient-beige-darker)"
            />

            {/* Number */}
            <text
                x="75"
                y="25"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="30"
                fontWeight="600"
                fill="black"
            >
                {count > 99 ? '99+' : count}
            </text>
          </g>
        )
      })}
    </>
  )
}
