import React from 'react'
import { FacultyType } from '../const/faculty'

export type PieceVariant = 1 | 2 | 3 | 4 | 5 | 6

interface PieceProps {
  faculty?: FacultyType
  variant?: PieceVariant
  count: number
  size?: number
  bgClassName?: string
}

const FACULTY_IMAGE: Record<FacultyType, string> = {
  edu: '/faculty/edu.png',
  psy: '/faculty/psy.png',
  dent: '/faculty/dent.png',
  law: '/faculty/law.png',
  commarts: '/faculty/commarts.png',
  cbs: '/faculty/cbs.png',
  md: '/faculty/md.png',
  pharm: '/faculty/pharm.png',
  polsci: '/faculty/polsci.png',
  sci: '/faculty/sci.png',
  spsc: '/faculty/spsc.png',
  eng: '/faculty/eng.png',
  faa: '/faculty/faa.png',
  econ: '/faculty/econ.png',
  arch: '/faculty/arch.png',
  ahs: '/faculty/ahs.png',
  vet: '/faculty/vet.png',
  arts: '/faculty/arts.png',
  scii: '/faculty/scii.png',
  cusar: '/faculty/cusar.png',
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
  3: `M10 10 H40 C42 0,58 0,60 10 H90
    V40 C78 42,78 58,90 60 V90
    H60 C58 78,42 78,40 90 H10 
    V60 C22 58,22 42,10 40 Z`,
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
  count,
  size = 120,
  bgClassName = 'bg-slate-300',
}) => {
  const clipId = `piece-${faculty ?? 'none'}-${variant}`
  const imageSrc = faculty ? FACULTY_IMAGE[faculty] : undefined
  const path = JIGSAW_PATH[variant]

  return (
    <div
      className="inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 100 100" className="block h-full w-full">
        <defs>
          <clipPath id={clipId}>
            <path d={path} />
          </clipPath>
        </defs>

        {!imageSrc && (
          <foreignObject width="100" height="100" clipPath={`url(#${clipId})`}>
            <div className={`h-full w-full ${bgClassName}`} />
          </foreignObject>
        )}

        {imageSrc && (
          <image
            href={imageSrc}
            width="100"
            height="100"
            preserveAspectRatio="xMidYMid slice"
            clipPath={`url(#${clipId})`}
          />
        )}

        {count > 1 && (
          <text
            x="50"
            y="54"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-white text-3xl font-bold drop-shadow-md"
          >
            {count}
          </text>
        )}
      </svg>
    </div>
  )
}
