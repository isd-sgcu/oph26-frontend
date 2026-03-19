import { useTranslation } from 'react-i18next'
import { Button } from '../ui/button'
import { useNavigate } from '@tanstack/react-router'
import { useUser } from '@/contexts/UserContext'
import clsx from 'clsx'

export default function LandingSectionTwo() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const userContext = useUser()
  const role = userContext?.role
  const isRoleStudent = role === 'attendee'

  const handleNavigation = (path: string) => {
    navigate({ to: path })
  }

  return (
    <div className="flex flex-col w-full">
      <div className="relative bg-gradient-pink w-full overflow-hidden">
        {/* Container with aspect ratio */}
        <div className="flex justify-center items-center mx-auto px-5 w-full max-w-sm">
          <div className="relative mx-auto w-full aspect-324/376">
            {/* Start Pin */}
            <button
              className="top-[2%] left-[39%] z-10 absolute"
              aria-label="Start"
            >
              <img src="/landing/pin.svg" alt="" className="w-8.75 h-auto" />
            </button>

            {/* Faculties */}
            <button
              className="top-[6%] left-[2%] z-10 absolute flex flex-col justify-center items-center gap-1"
              aria-label="Faculties"
              onClick={() => handleNavigation('/info/faculty')}
            >
              <img src="/landing/trees.svg" alt="" className="w-15.25 h-auto" />
              <span className="text-shadow-lg font-bold text-white text-base sm:text-lg md:text-xl text-center whitespace-nowrap">
                {t('routes.landingGroup.event.faculty')}
              </span>
            </button>

            {/* Event */}
            <button
              className="top-[11%] right-[10%] z-10 absolute flex flex-col justify-center items-center gap-1"
              aria-label="Flowers"
              onClick={() => handleNavigation('/info/event')}
            >
              <img
                src="/landing/flowers.svg"
                alt=""
                className="w-19.5 h-auto"
              />
              <span className="text-shadow-lg font-bold text-white text-base sm:text-lg md:text-xl text-center">
                {t('routes.landingGroup.event.mainEvent')}
              </span>
            </button>

            {/* Workshop */}
            <button
              className="top-[34%] left-[37%] z-10 absolute flex flex-col justify-center items-center -translate-x-1/2"
              aria-label="Workshop"
              onClick={() => handleNavigation('/info/workshop')}
            >
              <img src="/landing/rocks.svg" alt="" className="w-24.5 h-auto" />
              <span className="text-shadow-lg font-bold text-white text-base sm:text-lg md:text-xl text-center">
                {t('routes.landingGroup.event.facultyWorkshop')}
              </span>
            </button>

            {/* Souvenir */}
            <button
              className="top-[65%] left-[4%] z-10 absolute flex flex-col justify-center items-center"
              aria-label="Souvenir"
              onClick={() => handleNavigation('/info/merchandise')}
            >
              <img src="/landing/bush.svg" alt="" className="w-24.25 h-auto" />
              <span className="text-shadow-lg font-bold text-white text-base sm:text-lg md:text-xl text-center">
                {t('routes.landingGroup.event.merchandise')}
              </span>
            </button>

            {/* Missing Pieces */}
            {isRoleStudent ? (
              <button
                className="top-[53%] left-[56%] z-10 absolute flex flex-col justify-center items-center gap-1"
                aria-label="Missing Pieces"
                onClick={() => handleNavigation('/game/piece')}
                disabled={role === undefined}
              >
                <img
                  src="/landing/jigsaws.svg"
                  alt=""
                  className="w-18 h-auto"
                />
                <span className={clsx("text-shadow-lg font-bold text-base sm:text-lg md:text-xl text-center whitespace-nowrap", role === undefined ? "text-white/60" : "text-white")}>
                  {t('routes.landingGroup.event.missingPiece')}
                </span>
              </button>
            ) : (
              <img
                src="/landing/mountain.svg"
                alt=""
                className="top-[44%] -right-[10%] z-10 absolute w-38 h-auto"
              />
            )}

            {/* Road Background */}
            <img
              src="/landing/road.svg"
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-4 bg-main-pink bg-pink py-8 w-full">
        {
          role === 'attendee' && (
            <Button
              className="bg-main-beige text-main-pink"
              onClick={() => handleNavigation('/auth/profile/ticket')}
            >
              {t('routes.landingGroup.buttonGroup.ticket')}
            </Button>
          )
        }
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
