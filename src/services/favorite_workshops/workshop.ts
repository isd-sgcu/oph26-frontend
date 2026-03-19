import { Axios } from '@/lib/axios'
import { AxiosError } from 'axios'

interface FavoriteWorkshops {
  favorite_workshops: string[]
}

export const getFavoriteWorkshops = async (): Promise<FavoriteWorkshops> => {
  try {
    const { data } = await Axios.get('/favorite_workshops/me')
    return data
  } catch (error) {
    throw error as AxiosError
  }
}

export const updateFavoriteWorkshop = async (
  code: string,
  state: boolean
): Promise<void> => {
  try {
    await Axios.put(`/favorite_workshops/me`, {
      code,
      state,
    })
  } catch (error) {
    throw error as AxiosError
  }
}
