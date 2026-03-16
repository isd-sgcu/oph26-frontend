import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import { useMutation } from '@tanstack/react-query'
import { env } from '@/env'
import { login } from '@/services/auth/auth'

declare global {
  interface Window {
    google: any
  }
}

export const Route = createFileRoute('/auth/login/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const googleButtonRef = useRef<HTMLDivElement>(null)

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem('token', data.accessToken)
      navigate({ to: '/auth/onboarding' })
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
      const script = document.querySelector('script[src="https://accounts.google.com/gsi/client"]')
      script?.addEventListener('load', initGoogle)
      return () => script?.removeEventListener('load', initGoogle)
    }
  }, [])

  return (
    <section className="to-main-pink w-full from-[#ECECD2] to-10% relative flex flex-col bg-linear-to-b">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <img src="/logo.svg" alt="logo" className="w-96" />
        <h1 className="font-semibold text-2xl text-white text-shadow-sm">CU Open House 2026</h1>
        <div ref={googleButtonRef} />
      </div>
    </section>
  )
}
