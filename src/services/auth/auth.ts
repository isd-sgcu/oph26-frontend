import { Axios } from '@/lib/axios'

export type LoginRequest = {
  idToken: string
}

export type TokenResponse = {
  accessToken: string
  refreshToken?: string
}

export const login = async (payload: LoginRequest): Promise<TokenResponse> => {
  const { data } = await Axios.post<TokenResponse>('/api/auth/token', payload)
  return data
}
