import { User } from '@/contexts/UserContext'
import { Axios } from '@/lib/axios'
import { AxiosError } from 'axios'

export type LoginRequest = {
  idToken: string
}

export type TokenResponse = {
  accessToken: string
  refreshToken?: string
}

export const login = async (payload: LoginRequest): Promise<TokenResponse> => {
  try {
    const { data } = await Axios.post<TokenResponse>(`/auth/token`, payload)
    return data
  } catch (error) {
    throw error as AxiosError
  }
}

export const refreshToken = async (): Promise<TokenResponse> => {
  try {
    const { data } = await Axios.post<TokenResponse>(`/auth/refresh`)
    return data
  } catch (error) {
    throw error as AxiosError
  }
}

export const getMe = async (): Promise<User | null> => {
  try {
    const { data } = await Axios.get(`/auth/me`)
    return data
  } catch (error) {
    throw error as AxiosError
  }
}

export const logout = async (): Promise<void> => {
  await Axios.post(`/auth/signOut`)
  localStorage.removeItem('token')
}
