import { FacultyType } from '@/components/const/faculty'
import { Axios } from '@/lib/axios'

export type CollectedPiece = {
  id: string
  user_id: string | null
  faculty: FacultyType | null
  collected_at: string
}

export type MyPiece = {
  id: string
  user_id: string | null
  faculty: FacultyType | null
  piece_code: string | null
  expire_date: string
}

export const getMyPiece = async (): Promise<MyPiece> => {
  const { data } = await Axios.get(`/pieces/me`)
  return data
}

export type AttendeePiecesStats = {
  collected_by_faculty: {
    value: {
      [faculty in FacultyType]?: {
        count: number
        is_top_1: boolean
      }
    }
  }
  total_collected: number
}

export type CollectedPiecesResponse = {
  collected_pieces: CollectedPiece[]
  stats: AttendeePiecesStats
}

export const getCollectedPieces =
  async (): Promise<CollectedPiecesResponse> => {
    const { data } = await Axios.get(
      `/pieces/me/collected`
    )
    return data
  }

export type CollectFriendPieceResponse = {
  ok: boolean
  collected_piece: CollectedPiece
}

export const collectFriendPiece = async (
  piece_code: string
): Promise<CollectedPiece> => {
  const { data } = await Axios.post(
    `/pieces/me/collected`,
    {
      piece_code,
    }
  )
  return data
}
