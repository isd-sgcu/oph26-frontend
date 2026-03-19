import { Axios } from '@/lib/axios'

export interface Leaderboard {
  isTop: boolean[]
}

export const getMyLeaderboard = async (): Promise<Leaderboard> => {
  const { data } = await Axios.get(`/leaderboards/me`)
  return data
}
