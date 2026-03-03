import { useTranslation } from 'react-i18next'
import { Button } from './ui/button'
import { useEffect, useState } from 'react'
import { useRouter } from '@tanstack/react-router'

const PageNotFound = () => {
  const { t } = useTranslation()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative flex-1 bg-gradient-pink-oval h-screen overflow-hidden">
      {/* Upper Road */}
      <img
        src="/background/road1.svg"
        alt="Upper Road"
        className="absolute"
        style={{
          width: 'clamp(var(--width-page), 90vw, var(--width-page))',
          top: '10vh',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />

      {/* Lower Road */}
      <img
        src="/background/road1.svg"
        alt="Lower Road"
        className="absolute"
        style={{
          width: 'clamp(var(--width-page), 90vw, var(--width-page))',
          top: '54vh',
          left: '50%',
          transform: 'translateX(-50%) rotateX(180deg)',
        }}
      />

      {/* Content  */}
      <div className="z-10 relative flex flex-col justify-center items-center gap-10 px-4 py-6 w-full h-full">
        <div className='flex flex-col justify-center items-center gap-7 w-full'>
          {/* Logo */}
          <img src="/logo/cu-journey.webp" alt="Logo" width={297} height={194} />

          {/* Text */}
          <h1 className="text-shadow-xs mb-10 font-bold text-white text-5xl text-center">
            {t('components.pageNotFound.title')}
          </h1>
        </div>

        {/* Button */}
        <Button
          className="bg-main-beige"
          size="md"
          expanded
          onClick={() => {
            router.navigate({ to: '/' })
          }}
        >
          <span className="text-main-pink">
            {t('components.pageNotFound.back')}
          </span>
        </Button>
      </div>
    </div>
  )
}

export default PageNotFound
