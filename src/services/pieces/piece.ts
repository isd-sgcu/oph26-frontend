import { FacultyType } from '@/components/const/faculty'
import { Axios } from '@/lib/axios'
import { AxiosError } from 'axios'

export interface CollectedPiece {
  id: string
  user_id: string
  faculty: FacultyType
  collected_at: string
}

export interface MyPiece {
  id: string
  user_id: string
  faculty: FacultyType
  piece_code: string
  expire_date: string
}

export const getMyPiece = async (): Promise<MyPiece | null> => {
  try {
    const { data } = await Axios.get(`/pieces/me`)
    return data
  } catch (error) {
    return null
  }
}

export interface AttendeePiecesStats {
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

export interface CollectedPiecesResponse {
  collected_pieces: CollectedPiece[]
  stats: AttendeePiecesStats
}

export const getCollectedPieces =
  async (): Promise<CollectedPiecesResponse> => {
    const { data } = await Axios.get(`/pieces/me/collected`)
    return data
  }

export interface CollectFriendPieceResponse {
  ok: boolean
  collected_piece: CollectedPiece
}

export const collectFriendPiece = async (
  piece_code: string
): Promise<CollectFriendPieceResponse> => {
  try {
    const { data } = await Axios.post(`/pieces/me/collected`, {
      piece_code,
    })
    return data
  } catch (error) {
    throw error as AxiosError
  }
}
