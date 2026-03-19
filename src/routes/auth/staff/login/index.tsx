import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import { useMutation } from '@tanstack/react-query'
import { env } from '@/env'
import { getMe, login } from '@/services/auth/auth'
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

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      localStorage.setItem('token', data.accessToken)
      window.dispatchEvent(new Event('tokenChanged'))
      try {
        const user = await getMe()
        if (user?.role === 'staff') {
          router.navigate({ to: '/', reloadDocument: true })
        } else {
          router.navigate({ to: '/auth/onboarding', reloadDocument: true })
        }
      } catch (error) { }
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
    <section className="relative flex flex-col bg-main-light-pink w-full">
      <div className="flex flex-col justify-center items-center min-h-screen">
        <img src="/logo/cu-journey.webp" alt="logo" className="w-96" />
        <h1 className="text-shadow-sm font-semibold text-white text-4xl">
          Staff
        </h1>
        <h2 className="text-shadow-sm font-semibold text-white text-xl">
          CU Open House 2026
        </h2>
        <div ref={googleButtonRef} />
      </div>
    </section>
  )
}
