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
    <div className="to-main-pink relative flex-1 overflow-hidden bg-linear-to-b from-[#ECECD2] to-10%">
      {/* Oval background */}
      <div
        className="bg-gradient-pink-oval pointer-events-none absolute z-0 rounded-full opacity-80 blur-xs"
        style={{
          width: 'clamp(425px, 425px, 425px)',
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
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 py-6">
        {/* Logo */}
        <img src="/logo.svg" alt="Logo" width={288.38} height={167.17} />

        {/* Text */}
        <h1 className="mb-10 text-center text-5xl font-bold text-white text-shadow-xs">
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
