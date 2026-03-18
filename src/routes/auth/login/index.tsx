import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import { useMutation } from '@tanstack/react-query'
import { env } from '@/env'
import { login, refreshToken } from '@/services/auth/auth'
import { getMyAttendee } from '@/services/attendee/attendee'
import { AxiosError } from 'axios'

declare global {
  interface Window {
    google: any
  }
}

export const Route = createFileRoute('/auth/login/')({
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter()
  const googleButtonRef = useRef<HTMLDivElement>(null)

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      localStorage.setItem('token', data.accessToken)
      window.dispatchEvent(new Event('tokenChanged'))
      try {
        await getMyAttendee()
        router.navigate({ to: '/', reloadDocument: true })
      } catch (error) {
        if (
          error instanceof AxiosError &&
          error.response?.status === 404 &&
          error.response?.data?.error ===
            'Attendee data not found for the current user'
        ) {
          try {
            const refreshData = await refreshToken()
            localStorage.setItem('token', refreshData.accessToken)
            window.dispatchEvent(new Event('tokenChanged'))
            try {
              await getMyAttendee()
              router.navigate({ to: '/', reloadDocument: true })
            } catch (error) {
              if (
                error instanceof AxiosError &&
                error.response?.status === 404 &&
                error.response?.data?.error ===
                  'Attendee data not found for the current user'
              ) {
                router.navigate({ to: '/auth/onboarding' })
              }
            }
          } catch (error) {
            router.navigate({ to: '/', reloadDocument: true })
          }
        }
      }
    },
  })

  useEffect(() => {
    const initGoogle = () => {
      window.google.accounts.id.initialize({
        client_id: env.VITE_PUBLIC_GOOGLE_CLIENT_ID,
        callback: (response: any) => {
          loginMutation.mutate({ idToken: response.credential })
        },
      })
      if (googleButtonRef.current) {
        window.google.accounts.id.renderButton(googleButtonRef.current, {
          type: 'standard',
          theme: 'outline',
          size: 'large',
        })
      }
    }

    if (window.google) {
      initGoogle()
    } else {
      const script = document.querySelector(
        'script[src="https://accounts.google.com/gsi/client"]'
      )
      script?.addEventListener('load', initGoogle)
      return () => script?.removeEventListener('load', initGoogle)
    }
  }, [])

  return (
    <section className="bg-main-light-pink relative flex w-full flex-col">
      <div className="flex min-h-screen flex-col items-center justify-center">
        <img src="/logo.svg" alt="logo" className="w-96" />
        <h1 className="text-2xl font-semibold text-white text-shadow-sm">
          CU Open House 2026
        </h1>
        <div ref={googleButtonRef} />
      </div>
    </section>
  )
}
