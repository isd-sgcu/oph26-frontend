import React from 'react'
import { FacultyType } from '../const/faculty'

export type PieceVariant = 1 | 2 | 4 | 5 | 6

export interface PieceProps {
  faculty?: FacultyType
  variant?: PieceVariant
  count?: number
  size?: number
  bgClassName?: string
}

const FACULTY_IMAGE: Record<FacultyType, string> = {
  edu: '/faculty/edu.PNG',
  psy: '/faculty/psy.PNG',
  dent: '/faculty/dent.PNG',
  law: '/faculty/law.PNG',
  commarts: '/faculty/commarts.PNG',
  cbs: '/faculty/cbs.PNG',
  md: '/faculty/md.PNG',
  pharm: '/faculty/pharm.PNG',
  polsci: '/faculty/polsci.PNG',
  sci: '/faculty/sci.PNG',
  spsc: '/faculty/spsc.PNG',
  eng: '/faculty/eng.PNG',
  faa: '/faculty/faa.PNG',
  econ: '/faculty/econ.PNG',
  arch: '/faculty/arch.PNG',
  ahs: '/faculty/ahs.PNG',
  vet: '/faculty/vet.PNG',
  arts: '/faculty/arts.PNG',
  scii: '/faculty/scii.PNG',
  cusar: '/faculty/cusar.PNG',
  dorm: '',
}

const JIGSAW_PATH: Record<PieceVariant, string> = {
  1: `M10 10 H40 C42 0,58 0,60 10 H90
    V40 C78 42,78 58,90 60 V90 
    H10 
    Z`,
  2: `M10 10 H40 C42 20,58 20,60 10 H90
    V40 C100 42,100 58,90 60 V90 
    H10
    V60 C0 58,0 42,10 40 Z`,
  4: `M10 10 H40 C42 20,58 20,60 10 H90
    V40 C100 42,100 58,90 60 V90  
    H60 C58 100,42 100,40 90 H10 
    Z`,
  5: `M10 10 H40 C42 0,58 0,60 10 H90
    V40 C78 42,78 58,90 60 V90
    H60 C58 100,42 100,40 90 H10 
    V60 C22 58,22 42,10 40 Z`,
  6: `M10 10 H40 C42 0,58 0,60 10 H90
    V40 C78 42,78 58,90 60 V90
    H60 C58 100,42 100,40 90 H10 
    V60 C0 58,0 42,10 40 Z`,
}

export const Piece: React.FC<PieceProps> = ({
  faculty,
  variant = 1,
  count = 0,
  size = 120,
}) => {
  const clipId = `piece-${faculty ?? 'none'}-${variant}`
  const imageSrc = faculty ? FACULTY_IMAGE[faculty] : undefined
  const path = JIGSAW_PATH[variant]

  return (
    <div
      className={`inline-flex items-center justify-center ${count > 0 ? 'drop-shadow-[4px_4px_4px_rgba(0,0,0,0.35)]' : ''}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="-20 -20 140 140"
        className="block h-full w-full overflow-visible"
      >
        <defs>
          <clipPath id={clipId}>
            <path d={path} />
          </clipPath>
          <linearGradient
            id="gradient-beige-darker"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor="#fafae6" />
            <stop offset="100%" stopColor="#ffd285" />
          </linearGradient>
        </defs>

        {(!imageSrc || count == 0) && (
          <image
            href={`/game/piece/blank${variant}.png`}
            width="100"
            height="100"
            preserveAspectRatio="xMidYMid"
          />
        )}

        {imageSrc && count != 0 && (
          <image
            href={imageSrc}
            width="100"
            height="100"
            preserveAspectRatio="xMidYMid slice"
            clipPath={`url(#${clipId})`}
          />
        )}

        {count > 1 && (
          <g transform="translate(16 -16)">
            <circle cx="75" cy="25" r="20" fill="url(#gradient-beige-darker)" />
            <text
              x="75"
              y="25"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-black text-base font-bold"
            >
              {count > 99 ? '99+' : count}
            </text>
          </g>
        )}
      </svg>
    </div>
  )
}
