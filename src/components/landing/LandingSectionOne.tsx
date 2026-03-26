import { Button } from '../ui/button'
import { useNavigate } from '@tanstack/react-router'
import CountdownTimer from './CountdownTimer'
import CarouselLanding from './CarouselLanding'
import { useTranslation } from 'react-i18next'
import { useUser } from '@/contexts/UserContext'
import { ChevronDown } from 'lucide-react'

export default function LandingSectionOne() {
  const navigate = useNavigate()
  const userContext = useUser()
  if (!userContext) {
    return null
  }

  const role = userContext.role
  const { t } = useTranslation()

  return (
    <div className="relative h-screen min-h-fit w-full">
      <img
        src="/background/background-2.webp"
        alt=""
        className="absolute inset-0 z-0 h-full w-full object-cover object-bottom"
        loading="eager"
      />

      {/* Content */}
      <div className="z-30 flex flex-col items-center justify-start gap-9.5 pt-15 pb-20">
        {/* Logo */}
        <div className="z-30 flex w-full flex-col items-center justify-center">
          <div className="relative w-full drop-shadow-lg">
            <img
              src="/logo/cu-journey.webp"
              alt="CU Journey"
              className="mx-auto w-75"
              loading="eager"
            />
          </div>
          <p className="-mt-4 rounded-full bg-black/30 px-3 py-1 text-[15px] font-semibold text-white">
            {t('routes.landingGroup.date')}
          </p>
        </div>

        {/* Detail */}
        <div className="z-30 flex w-full flex-col items-center justify-center gap-8">
          {role == undefined ? (
            <div className="flex min-h-1 items-center justify-center gap-4">
              <>
                <Button
                  size={'md'}
                  className="bg-main-beige text-main-pink"
                  onClick={() => {
                    navigate({ to: '/auth/login' })
                  }}
                >
                  {t('routes.landingGroup.buttonGroup.register')}
                </Button>
                <Button
                  onClick={() => {
                    navigate({ to: '/auth/login' })
                  }}
                >
                  {t('routes.landingGroup.buttonGroup.login')}
                </Button>
              </>
            </div>
          ) : (
            <div className="h-12 w-full" />
          )}
          <div className="flex w-full flex-col items-center justify-center gap-4 px-5">
            <CountdownTimer />
            <CarouselLanding />
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-8 w-8 text-white/70" />
      </div>
    </div>
  )
}
