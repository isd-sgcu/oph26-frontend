import { env } from '@/env'
import { refreshToken } from '@/services/auth/auth'
import axios from 'axios'

export const Axios = axios.create({
  baseURL: env.VITE_PUBLIC_API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

Axios.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const refreshData = await refreshToken()
        localStorage.setItem('token', refreshData.accessToken)
        window.dispatchEvent(new Event('tokenChanged'))
      } catch (error) {
        localStorage.removeItem('token')
        window.location.href = '/'
      }
    }
    return Promise.reject(error)
  }
)
