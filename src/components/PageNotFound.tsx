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
    <div className="relative flex-1 bg-linear-to-b from-[#ECECD2] to-10% to-main-pink overflow-hidden">
      {/* Oval background */}
      <div
        className="z-0 absolute bg-gradient-pink-oval opacity-80 blur-xs rounded-full pointer-events-none"
        style={{
          width: 'clamp(var(--width-page), var(--width-page), var(--width-page))',
          aspectRatio: '1 / 1',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Upper Road */}
      <img
        src="/background/road1.svg"
        alt="Upper Road"
        className="absolute"
        style={{
          width: 'clamp(400px, 90vw, 420px)',
          top: '8vh',
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
          width: 'clamp(400px, 90vw, 420px)',
          top: '52vh',
          left: '50%',
          transform: 'translateX(-50%) rotateX(180deg)',
        }}
      />

      {/* Content  */}
      <div className="z-10 relative flex flex-col justify-center items-center px-4 py-6 h-full">
        {/* Logo */}
        <img src="/logo.svg" alt="Logo" width={288.38} height={167.17} />

        {/* Text */}
        <h1 className="text-shadow-xs mb-10 font-bold text-white text-5xl text-center">
          {t('components.pageNotFound.title')}
        </h1>

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
