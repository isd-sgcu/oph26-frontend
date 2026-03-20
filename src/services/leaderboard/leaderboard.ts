import { Axios } from '@/lib/axios'
import { AxiosError } from 'axios'

export interface Leaderboard {
  is_top: boolean[]
}

export const getMyLeaderboard = async (): Promise<Leaderboard> => {
  try {
    const { data } = await Axios.get(`/leaderboards/me`)
    return data
  } catch (error) {
    throw error as AxiosError
  }
}
