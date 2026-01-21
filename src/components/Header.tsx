import { useEffect, useState } from 'react'
import { FlatIcon } from './FlatIcon'
import { useTranslation } from 'react-i18next'

export default function Header() {
  const { i18n } = useTranslation()

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const toggleLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  return (
    <header className="flex h-16 w-full items-center justify-between gap-4 bg-linear-to-b from-[#FAFAE6] to-[#ECECD2]/0 p-4">
      {/* Logo */}
      <img src="/logo.svg" width={69} height={40} alt="Logo" />

      {/* Menu */}
      <div className="flex items-center gap-2">
        {/* Lang Switch */}
        <div className="flex items-center overflow-hidden rounded-lg shadow-sm">
          <button
            onClick={() => {
              if (i18n.language != 'th') toggleLanguage('th')
            }}
            className={`px-3 py-2 text-sm font-bold transition-all duration-300 ${
              i18n.language === 'th'
                ? 'bg-main-pink cursor-default text-white'
                : 'bg-main-beige text-grey hover:bg-main-beige/80 cursor-pointer'
            }`}
          >
            TH
          </button>
          <button
            onClick={() => {
              if (i18n.language != 'en') toggleLanguage('en')
            }}
            className={`px-3 py-2 text-sm font-bold transition-all duration-300 ${
              i18n.language === 'en'
                ? 'bg-main-pink cursor-default text-white'
                : 'bg-main-beige text-grey hover:bg-main-beige/80 cursor-pointer'
            }`}
          >
            EN
          </button>
        </div>

        {/* Burger */}
        <button className="flex items-center justify-center">
          <FlatIcon
            name="fi-rr-menu-burger"
            size={24}
            className="text-main-pink"
          />
        </button>
      </div>
    </header>
  )
}
