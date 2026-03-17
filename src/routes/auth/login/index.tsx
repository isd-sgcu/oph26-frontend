import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import { useMutation } from '@tanstack/react-query'
import { env } from '@/env'
import { login } from '@/services/auth/auth'
import { getMyAttendee } from '@/services/attendee/attendee'

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
      const attendeeData = await getMyAttendee()
      if (attendeeData != null) {
        // If attendee data exists, navigate to the home page
        router.navigate({ to: '/' })
      } else {
        // If attendee data does not exist, navigate to the onboarding page
        router.navigate({ to: '/auth/onboarding' })
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
          shape: 'pill',
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
    <section className="relative flex flex-col bg-gradient-pink-oval w-full">
      <div className='flex flex-col justify-center items-center gap-10 my-auto pb-10'>
        <div className="flex flex-col justify-center items-center gap-3">
          <img src="/logo/cu-journey.webp" alt="logo" className="w-80" />
          <h1 className="text-shadow-sm font-semibold text-white text-2xl">
            CU Open House 2026
          </h1>
        </div>
        <div ref={googleButtonRef} />
      </div>
    </section>
  )
}
