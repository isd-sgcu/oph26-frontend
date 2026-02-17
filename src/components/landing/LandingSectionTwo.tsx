import { useTranslation } from "react-i18next";
import { Button } from "../ui/button"

export default function LandingSectionTwo() {
  const { t } = useTranslation();
  const isRoleStudent = true;

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
              <img
                src="/landing/pin.svg"
                alt=""
                className="w-8.75 h-auto"
              />
            </button>

            {/* Faculties */}
            <button
              className="top-[6%] left-[2%] z-10 absolute flex flex-col justify-center items-center gap-1"
              aria-label="Faculties"
            >
              <img
                src="/landing/trees.svg"
                alt=""
                className="w-15.25 h-auto"
              />
              <span className="text-shadow-lg font-bold text-white text-base sm:text-lg md:text-xl text-center whitespace-nowrap">
                {t('routes.landingGroup.event.faculty')}
              </span>
            </button>

            {/* Event */}
            <button
              className="top-[11%] right-[10%] z-10 absolute flex flex-col justify-center items-center gap-1"
              aria-label="Flowers"
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
            >
              <img
                src="/landing/rocks.svg"
                alt=""
                className="w-24.5 h-auto"
              />
              <span className="text-shadow-lg font-bold text-white text-base sm:text-lg md:text-xl text-center">
                {t('routes.landingGroup.event.facultyWorkshop')}
              </span>
            </button>

            {/* Souvenir */}
            <button
              className="top-[65%] left-[4%] z-10 absolute flex flex-col justify-center items-center"
              aria-label="Souvenir"
            >
              <img
                src="/landing/bush.svg"
                alt=""
                className="w-24.25 h-auto"
              />
              <span className="text-shadow-lg font-bold text-white text-base sm:text-lg md:text-xl text-center">
                {t('routes.landingGroup.event.merchandise')}
              </span>
            </button>

            {/* Missing Pieces */}
            {
              isRoleStudent ? (
                <button
                  className="top-[53%] left-[56%] z-10 absolute flex flex-col justify-center items-center gap-1"
                  aria-label="Missing Pieces"
                >
                  <img
                    src="/landing/jigsaws.svg"
                    alt=""
                    className="w-18 h-auto"
                  />
                  <span className="text-shadow-lg font-bold text-white text-base sm:text-lg md:text-xl text-center whitespace-nowrap">
                    {t('routes.landingGroup.event.missingPiece')}
                  </span>
                </button>
              ) : (
                <img
                  src="/landing/mountain.svg"
                  alt=""
                  className="top-[44%] -right-[10%] z-10 absolute w-38 h-auto"
                />
              )
            }

            {/* Road Background */}
            <img
              src="/landing/road.svg"
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

      <div className='flex justify-center items-center bg-main-pink bg-pink py-8 w-full'>
        <Button className='bg-main-beige text-main-pink'>{t('routes.landingGroup.buttonGroup.agenda')}</Button>
      </div>
    </div>
  )
}