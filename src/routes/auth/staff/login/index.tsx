import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import { useMutation } from '@tanstack/react-query'
import { env } from '@/env'
import { login } from '@/services/auth/auth'
import { useUser } from '@/contexts/UserContext'

declare global {
  interface Window {
    google: any
  }
}

export const Route = createFileRoute('/auth/staff/login/')({
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter()
  const googleButtonRef = useRef<HTMLDivElement>(null)
  const userContext = useUser()
  if (!userContext) {
    return null
  }

  const user = userContext.user

  useEffect(() => {
    if (user?.role !== 'staff') {
      router.navigate({ to: '/' })
    }
  }, [user, router])

  if (user?.role !== 'staff') {
    return null
  }

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      localStorage.setItem('token', data.accessToken)
      window.dispatchEvent(new Event('tokenChanged'))
      router.navigate({ to: '/auth/staff/onboarding' })
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
