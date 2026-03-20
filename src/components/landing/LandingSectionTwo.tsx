import { useTranslation } from 'react-i18next'
import { Button } from '../ui/button'
import { useNavigate } from '@tanstack/react-router'
import { useUser } from '@/contexts/UserContext'
import clsx from 'clsx'

export default function LandingSectionTwo() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const userContext = useUser()
  if (!userContext) {
    return null
  }

  const role = userContext.role
  const attendee = userContext.attendee

  const handleNavigation = (path: string) => {
    navigate({ to: path })
  }

  return (
    <div className="flex w-full flex-col">
      <div className="bg-gradient-pink relative w-full overflow-hidden">
        {/* Container with aspect ratio */}
        <div className="mx-auto flex w-full max-w-sm items-center justify-center px-5">
          <div className="relative mx-auto aspect-324/376 w-full">
            {/* Start Pin */}
            <button
              className="absolute top-[2%] left-[39%] z-10"
              aria-label="Start"
            >
              <img src="/landing/pin.svg" alt="" className="h-auto w-8.75" />
            </button>

            {/* Faculties */}
            <button
              className="absolute top-[6%] left-[2%] z-10 flex flex-col items-center justify-center gap-1"
              aria-label="Faculties"
              onClick={() => handleNavigation('/info/faculty')}
            >
              <img src="/landing/trees.svg" alt="" className="h-auto w-15.25" />
              <span className="text-center text-base font-bold whitespace-nowrap text-white text-shadow-lg sm:text-lg md:text-xl">
                {t('routes.landingGroup.event.faculty')}
              </span>
            </button>

            {/* Event */}
            <button
              className="absolute top-[11%] right-[10%] z-10 flex flex-col items-center justify-center gap-1"
              aria-label="Flowers"
              onClick={() => handleNavigation('/info/event')}
            >
              <img
                src="/landing/flowers.svg"
                alt=""
                className="h-auto w-19.5"
              />
              <span className="text-center text-base font-bold text-white text-shadow-lg sm:text-lg md:text-xl">
                {t('routes.landingGroup.event.mainEvent')}
              </span>
            </button>

            {/* Workshop */}
            <button
              className="absolute top-[34%] left-[37%] z-10 flex -translate-x-1/2 flex-col items-center justify-center"
              aria-label="Workshop"
              onClick={() => handleNavigation('/info/workshop')}
            >
              <img src="/landing/rocks.svg" alt="" className="h-auto w-24.5" />
              <span className="text-center text-base font-bold text-white text-shadow-lg sm:text-lg md:text-xl">
                {t('routes.landingGroup.event.facultyWorkshop')}
              </span>
            </button>

            {/* Souvenir */}
            <button
              className="absolute top-[65%] left-[4%] z-10 flex flex-col items-center justify-center"
              aria-label="Souvenir"
              onClick={() => handleNavigation('/info/merchandise')}
            >
              <img src="/landing/bush.svg" alt="" className="h-auto w-24.25" />
              <span className="text-center text-base font-bold text-white text-shadow-lg sm:text-lg md:text-xl">
                {t('routes.landingGroup.event.merchandise')}
              </span>
            </button>

            {/* Missing Pieces */}
            {role === 'attendee' && attendee?.attendee_type === 'student' ? (
              <button
                className="absolute top-[53%] left-[56%] z-10 flex flex-col items-center justify-center gap-1"
                aria-label="Missing Pieces"
                onClick={() => handleNavigation('/game/piece')}
                disabled={role === undefined}
              >
                <img
                  src="/landing/jigsaws.svg"
                  alt=""
                  className="h-auto w-18"
                />
                <span
                  className={clsx(
                    'text-center text-base font-bold whitespace-nowrap text-shadow-lg sm:text-lg md:text-xl',
                    role === undefined ? 'text-white/60' : 'text-white'
                  )}
                >
                  {t('routes.landingGroup.event.missingPiece')}
                </span>
              </button>
            ) : (
              <img
                src="/landing/mountain.svg"
                alt=""
                className="absolute top-[44%] -right-[10%] z-10 h-auto w-38"
              />
            )}

            {/* Road Background */}
            <img
              src="/landing/road.svg"
              alt=""
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      </div>

      <div className="bg-main-pink bg-pink flex w-full flex-col items-center justify-center gap-4 py-8">
        {role === 'attendee' && (
          <Button
            className="bg-main-beige text-main-pink"
            onClick={() => handleNavigation('/auth/profile/ticket')}
          >
            {t('routes.landingGroup.buttonGroup.ticket')}
          </Button>
        )}
        <Button
          expanded
          className="bg-main-beige text-main-pink"
          onClick={() => handleNavigation('/privacy')}
        >
          {t('routes.landingGroup.buttonGroup.privacy')}
        </Button>
      </div>
    </div>
  )
}
