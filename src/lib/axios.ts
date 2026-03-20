import { env } from '@/env'
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

let isRefreshing = false
let pendingRequests: Array<{
  resolve: (token: string) => void
  reject: (error: unknown) => void
}> = []

Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingRequests.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`
              resolve(Axios(originalRequest))
            },
            reject,
          })
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const { data } = await axios.post(
          `${env.VITE_PUBLIC_API_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        )
        const newToken = data.accessToken
        localStorage.setItem('token', newToken)
        window.dispatchEvent(new Event('tokenChanged'))

        pendingRequests.forEach((req) => req.resolve(newToken))
        pendingRequests = []

        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return Axios(originalRequest)
      } catch (refreshError: any) {
        pendingRequests.forEach((req) => req.reject(refreshError))
        pendingRequests = []

        if (refreshError?.response?.status === 401) {
          localStorage.removeItem('token')
          window.location.href = '/'
        }

        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }
    return Promise.reject(error)
  }
)
