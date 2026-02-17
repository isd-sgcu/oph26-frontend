
import { Button } from "../ui/button";
import { useNavigate } from "@tanstack/react-router";
import CountdownTimer from "./CountdownTimer";
import CarouselLanding from "./CarouselLanding";

export default function LandingSectionOne() {
  const navigate = useNavigate();

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
            <img src="/logo/cu-journey.svg" alt="CU Journey" className="mx-auto" loading="eager" />
          </div>
          <p className='bg-black/30 -mt-4 px-3 py-1 rounded-full font-semibold text-[15px] text-white'>28-29 March 2026</p>
        </div>

        {/* Detail */}
        <div className='z-30 flex flex-col justify-center items-center gap-8 w-full'>
          <div className='flex justify-center items-center gap-4'>
            <Button size={'md'} className='bg-main-beige text-main-pink'
              onClick={() => {
                navigate({ to: '/auth/login' })
              }}>Register</Button>
            <Button onClick={() => {
              navigate({ to: '/auth/login' })
            }}>Sign In</Button>
          </div>

          <div className='flex flex-col justify-center items-center gap-4 w-full'>
            <CountdownTimer />
            <CarouselLanding />
          </div>
        </div>
      </div>
    </div>
  );
}