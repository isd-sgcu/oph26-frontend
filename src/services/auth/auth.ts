import { User } from '@/contexts/UserContext'
import { Axios } from '@/lib/axios'

export type LoginRequest = {
  idToken: string
}

export type TokenResponse = {
  accessToken: string
  refreshToken?: string
}

export const login = async (payload: LoginRequest): Promise<TokenResponse> => {
  const { data } = await Axios.post<TokenResponse>(`/auth/token`, payload)
  return data
}

export const getMe = async (): Promise<User> => {
  const { data } = await Axios.get(`/auth/me`)
  return data
}

export const logout = async (): Promise<void> => {
  await Axios.post(`/auth/signOut`)
  localStorage.removeItem('token')
}
