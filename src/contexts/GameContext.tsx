import { createContext, useContext, useEffect, useState } from 'react'
import { getCollectedPieces } from '@/services/pieces/piece'
import { AchievementCollectedPieces } from '@/types/achievement'
import { FACULTY_KEYS } from '@/components/const/faculty'

export type PieceCountType = {
  edu: number
  psy: number
  dent: number
  law: number
  commarts: number
  cbs: number
  md: number
  pharm: number
  polsci: number
  sci: number
  spsc: number
  eng: number
  faa: number
  econ: number
  arch: number
  ahs: number
  vet: number
  arts: number
  scii: number
  cusar: number
}

interface GameContextType {
  collectedPieces: PieceCountType
  setCollectedPieces: React.Dispatch<
    React.SetStateAction<PieceCountType>
  >
}

const GameContext = createContext<GameContextType | null>(null)

const initialPieces: PieceCountType = {
  edu: 0,
  psy: 0,
  dent: 0,
  law: 0,
  commarts: 0,
  cbs: 0,
  md: 0,
  pharm: 0,
  polsci: 0,
  sci: 0,
  spsc: 0,
  eng: 0,
  faa: 0,
  econ: 0,
  arch: 0,
  ahs: 0,
  vet: 0,
  arts: 0,
  scii: 0,
  cusar: 0,
}

export const CaptureProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [collectedPieces, setCollectedPieces] =
    useState<PieceCountType>(initialPieces)

  useEffect(() => {
    async function fetchPieces() {
      const collectedPiecesData: PieceCountType = {} as PieceCountType
      const fetchedCollectedPiecesData = await getCollectedPieces()
      if (fetchedCollectedPiecesData) {
        const allFacultyStats =
          fetchedCollectedPiecesData.stats.collected_by_faculty

        Object.entries(allFacultyStats).forEach(([faculty, value]) => {
          if (
            value &&
            typeof value.count === 'number' &&
            FACULTY_KEYS.includes(faculty as keyof AchievementCollectedPieces)
          ) {
            // @ts-ignore
            collectedPiecesData[faculty as keyof AchievementCollectedPieces] =
              value.count
          }
        })
      }

      setCollectedPieces(collectedPiecesData)
      }

    fetchPieces()
  }, [])

  return (
    <GameContext.Provider value={{ collectedPieces, setCollectedPieces }}>
      {children}
    </GameContext.Provider>
  )
}

export const useGame = () => {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used inside CaptureProvider')
  }
  return context
}