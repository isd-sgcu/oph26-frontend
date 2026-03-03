
import { Button } from "../ui/button";
import { useNavigate } from "@tanstack/react-router";
import CountdownTimer from "./CountdownTimer";
import CarouselLanding from "./CarouselLanding";
import { useTranslation } from "react-i18next";

export default function LandingSectionOne() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className='relative w-full h-screen max-h-fit'>
      <img
        src="/background/background-2.png"
        alt=""
        className='z-0 absolute inset-0 w-full h-full object-bottom object-cover'
        loading="eager"
      />

      {/* Content */}
      <div className='z-30 flex flex-col justify-start items-center gap-9.5 py-20'>
        {/* Logo */}
        <div className='z-30 flex flex-col justify-center items-center w-full'>
          <div className="relative drop-shadow-lg w-full">
            <img src="/logo/cu-journey.webp" alt="CU Journey" className="mx-auto w-75" loading="eager" />
          </div>
          <p className='bg-black/30 -mt-4 px-3 py-1 rounded-full font-semibold text-[15px] text-white'>{t('routes.landingGroup.date')}</p>
        </div>

        {/* Detail */}
        <div className='z-30 flex flex-col justify-center items-center gap-8 w-full'>
          <div className='flex justify-center items-center gap-4'>
            <Button size={'md'} className='bg-main-beige text-main-pink'
              onClick={() => {
                navigate({ to: '/auth/login' })
              }}>{t('routes.landingGroup.buttonGroup.register')}</Button>
            <Button onClick={() => {
              navigate({ to: '/auth/login' })
            }}>{t('routes.landingGroup.buttonGroup.login')}</Button>
          </div>

          <div className='flex flex-col justify-center items-center gap-4 px-5 w-full'>
            <CountdownTimer />
            <iframe
              className="rounded-2xl w-full aspect-video"
              src="https://www.youtube.com/embed/KUd_aWty2cY?autoplay=1&mute=1&rel=0&loop=1&playlist=KUd_aWty2cY"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}