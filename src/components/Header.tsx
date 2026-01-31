import { useEffect, useState } from 'react'
import { FlatIcon } from './FlatIcon'
import { useTranslation } from 'react-i18next'
import { Link, useRouter } from '@tanstack/react-router'
import { Button } from './ui/button'
import CustomModal from './CustomModal'

type NavItem = {
  title: string // Note: Don't forget to concern about i18n
  to: string
  icon: string // Note: fi-rr-*
  params?: Record<string, string>
}

const navItems: NavItem[] = [
  { title: 'home', to: '/', icon: 'fi-rr-home' },
  { title: 'faculty', to: '/info/faculty', icon: 'fi-rr-graduation-cap' },
  {
    title: 'facultyWorkshop',
    icon: 'fi-rr-playing-cards',
    to: '/info/workshop',
  },
  {
    title: 'mainEvent',
    icon: 'fi-rr-balloons',
    to: '',
  },
  {
    title: 'map',
    icon: 'fi-rr-map-marker',
    to: '/info/map',
  },
  {
    title: 'missingPiece',
    icon: 'fi-rr-layout-fluid',
    to: '/game/',
  },
  {
    title: 'merchandise',
    icon: 'fi-rr-gift',
    to: '/info/merchandise',
  },
  {
    title: 'account',
    icon: 'fi-rr-user',
    to: '/auth/profile',
  },
]

export default function Header() {
  const { i18n, t } = useTranslation()
  const router = useRouter()
  const [openSidebar, setOpenSidebar] = useState(false)
  const [isClosingSidebar, setIsClosingSidebar] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [openCustomModal, setOpenCustomModal] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (openSidebar || isClosingSidebar) {
      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'
    } else {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }

    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [openSidebar, isClosingSidebar])

  if (!mounted) return null

  const closeSidebar = () => {
    setIsClosingSidebar(true)
    setTimeout(() => {
      setIsClosingSidebar(false)
      setOpenSidebar(false)
    }, 300)
  }

  return (
    <>
      <header className="relative mx-auto flex h-16 w-full max-w-(--width-page) items-center justify-between bg-linear-to-b from-[#FAFAE6] to-transparent p-4">
        {/* Logo */}
        <img
          src="/logo.svg"
          width={69}
          height={40}
          alt="Logo"
          className="cursor-pointer"
          onClick={() => {
            router.navigate({ to: '/' })
          }}
        />

        {/* Right menu */}
        <div className="flex items-center gap-2">
          {/* Lang */}
          <div className="flex overflow-hidden rounded-lg shadow-sm">
            {['th', 'en'].map((lng) => (
              <button
                key={lng}
                onClick={() => i18n.changeLanguage(lng)}
                className={`px-3 py-2 text-sm font-bold transition ${
                  i18n.language === lng
                    ? 'bg-main-pink cursor-default text-white'
                    : 'bg-main-beige text-grey hover:bg-main-beige/80 cursor-pointer'
                }`}
              >
                {lng.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Burger */}
          <button
            onClick={() => setOpenSidebar(true)}
            className="w-fit cursor-pointer"
          >
            <FlatIcon
              name="fi-rr-menu-burger"
              size={24}
              className="text-main-pink"
            />
          </button>
        </div>

        {/* Sample Sidebar */}
        {(openSidebar || isClosingSidebar) && (
          <>
            {/* Overlay */}
            <div
              className={`fixed inset-0 z-40 bg-black/80 ${isClosingSidebar ? 'animate-fade-out' : 'animate-fade-in'} `}
              onClick={closeSidebar}
            />

            {/* Sidebar Panel */}
            <div
              className={`fixed top-0 z-50 flex h-full min-h-screen w-full max-w-(--width-page) -translate-x-4 flex-col gap-4 overflow-auto bg-white px-4 py-8 shadow-lg ${isClosingSidebar ? 'animate-slide-out-left' : 'animate-slide-in-left'} `}
            >
              {/* Header */}
              <div className="flex items-center">
                {!isClosingSidebar && (
                  <button
                    className="ml-auto w-fit cursor-pointer"
                    onClick={closeSidebar}
                  >
                    <FlatIcon
                      name="fi-rr-menu-burger"
                      size={24}
                      className="text-main-pink"
                    />
                  </button>
                )}
              </div>

              {/* Navigation */}
              <nav className="mb-10 flex flex-col gap-10">
                {navItems.map((item) => (
                  <Link
                    key={item.title}
                    to={item.to}
                    params={item.params}
                    onClick={() => {
                      setOpenSidebar(false)
                    }}
                    className="flex items-center gap-4"
                  >
                    <FlatIcon
                      name={item.icon}
                      size={24}
                      className="text-main-pink"
                    />
                    <span className="text-xl font-bold">
                      {t(`components.header.sidebar.${item.title}`)}
                    </span>
                  </Link>
                ))}
              </nav>

              {/* Buttons */}
              <div className="mt-auto flex flex-col items-center justify-center gap-4">
                <Button
                  size="sm"
                  className="bg-main-beige"
                  onClick={() => {
                    setOpenSidebar(false)
                    router.navigate({ to: '/auth/login' })
                  }}
                >
                  <span className="text-main-pink">
                    {t('components.header.sidebar.register')}
                  </span>
                </Button>

                <Button
                  size="sm"
                  onClick={() => {
                    setOpenSidebar(false)
                    router.navigate({ to: '/auth/login' })
                  }}
                >
                  {t('components.header.sidebar.login')}
                </Button>

                <Button
                  size="sm"
                  onClick={() => {
                    setOpenSidebar(false)
                    setOpenCustomModal(true)
                  }}
                >
                  {t('components.header.sidebar.logout')}
                </Button>
              </div>
            </div>
          </>
        )}
      </header>

      {openCustomModal && (
        <CustomModal
          open={openCustomModal}
          onOpenChange={setOpenCustomModal}
          iconName="fi-rr-map-marker"
          title="Title Title Title Title Title Title"
          subtitle="Subtitle Subtitle Subtitle Subtitle Subtitle Subtitle Subtitle"
          body="Body Body Body Body Body Body Body Body Body Body"
          detail="Detail Detail Detail Detail Detail Detail Detail DetailDetail Detail Detail Detail Detail"
          buttonText="Click"
          onClick={() => {
            alert('Log out')
            setOpenCustomModal(false)
          }}
        />
      )}
    </>
  )
}
