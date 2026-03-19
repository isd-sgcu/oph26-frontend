import { useEffect, useState } from 'react'
import { FlatIcon } from './FlatIcon'
import { useTranslation } from 'react-i18next'
import { useLocation, useRouter } from '@tanstack/react-router'
import { Button } from './ui/button'
import { logout } from '@/services/auth/auth'
import { useUser } from '@/contexts/UserContext'

type NavItem = {
  title: string // Note: Don't forget to concern about i18n
  to: string
  icon: string // Note: fi-rr-*
}

export enum HeaderEnum {
  MAINPINK = 'main-pink',
  MAINLIGHTPINK = 'main-light-pink',
  TRANSPARENT = 'transparent',
  NONE = 'none',
  MAINBEIGE = 'main-beige',
}

const PATHNAME_MAINPINK = ['/game', '/game/achievement']
const PATHNAME_TRANSPARENT = ['/auth/profile/ticket', '/auth/qr', '/auth/login', '']
const PATHNAME_NONE = ['/']
const PATHNAME_MAINBEIGE = ['/info/faculty/']

const headerClass: Record<HeaderEnum, string> = {
  [HeaderEnum.MAINPINK]:
    'bg-linear-to-b from-main-beige from-30% to-90% to-main-pink relative',
  [HeaderEnum.MAINLIGHTPINK]:
    'bg-linear-to-b from-main-beige from-30% to-90% to-main-light-pink relative',
  [HeaderEnum.TRANSPARENT]: 'absolute top-0 left-1/2 -translate-x-1/2',
  [HeaderEnum.NONE]: 'bg-none absolute',
  [HeaderEnum.MAINBEIGE]: 'bg-main-beige relative',
}

const UNAUTHENTICATED_NAV_ITEMS: NavItem[] = [
  { title: 'home', to: '/', icon: 'fi-rr-home' },
  { title: 'faculty', to: '/info/faculty', icon: 'fi-rr-graduation-cap' },
  {
    title: 'facultyWorkshop',
    icon: 'fi-rr-playing-cards',
    to: '/info/workshop',
  },
  // {
  //   title: 'mainEvent',
  //   icon: 'fi-rr-balloons',
  //   to: '/info/event',
  // },
  // {
  //   title: 'map',
  //   icon: 'fi-rr-map-marker',
  //   to: '/info/map',
  // },
  {
    title: 'merchandise',
    icon: 'fi-rr-gift',
    to: '/info/merchandise',
  },
]

const AUTHENTICATED_ATTENDEE_NONSTUDENT_NAV_ITEMS: NavItem[] = [
  { title: 'home', to: '/', icon: 'fi-rr-home' },
  { title: 'faculty', to: '/info/faculty', icon: 'fi-rr-graduation-cap' },
  {
    title: 'facultyWorkshop',
    icon: 'fi-rr-playing-cards',
    to: '/info/workshop',
  },
  // {
  //   title: 'mainEvent',
  //   icon: 'fi-rr-balloons',
  //   to: '/info/event',
  // },
  // {
  //   title: 'map',
  //   icon: 'fi-rr-map-marker',
  //   to: '/info/map',
  // },
  {
    title: 'merchandise',
    icon: 'fi-rr-gift',
    to: '/info/merchandise',
  },
]

const AUTHENTICATED_ATTENDEE_STUDENT_NAV_ITEMS: NavItem[] = [
  { title: 'home', to: '/', icon: 'fi-rr-home' },
  { title: 'faculty', to: '/info/faculty', icon: 'fi-rr-graduation-cap' },
  {
    title: 'facultyWorkshop',
    icon: 'fi-rr-playing-cards',
    to: '/info/workshop',
  },
  // {
  //   title: 'mainEvent',
  //   icon: 'fi-rr-balloons',
  //   to: '/info/event',
  // },
  // {
  //   title: 'map',
  //   icon: 'fi-rr-map-marker',
  //   to: '/info/map',
  // },
  {
    title: 'missingPiece',
    icon: 'fi-rr-layout-fluid',
    to: '/game',
  },
  {
    title: 'merchandise',
    icon: 'fi-rr-gift',
    to: '/info/merchandise',
  },
]

const AUTHENTICATED_STAFF_NAV_ITEMS: NavItem[] = [
  { title: 'home', to: '/', icon: 'fi-rr-home' },
  { title: 'faculty', to: '/info/faculty', icon: 'fi-rr-graduation-cap' },
  {
    title: 'facultyWorkshop',
    icon: 'fi-rr-playing-cards',
    to: '/info/workshop',
  },
  // {
  //   title: 'mainEvent',
  //   icon: 'fi-rr-balloons',
  //   to: '/info/event',
  // },
  // {
  //   title: 'map',
  //   icon: 'fi-rr-map-marker',
  //   to: '/info/map',
  // },
  {
    title: 'merchandise',
    icon: 'fi-rr-gift',
    to: '/info/merchandise',
  },
  {
    title: 'scan',
    icon: 'fi-rr-expand',
    to: '/auth/qr',
  },
]

export default function Header() {
  const { i18n, t } = useTranslation()
  const router = useRouter()
  const location = useLocation()
  const userContext = useUser()
  if (!userContext) {
    return null
  }

  const role = userContext.role
  const attendee = userContext.attendee
  const [openSidebar, setOpenSidebar] = useState(false)
  const [isClosingSidebar, setIsClosingSidebar] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [toColor, setToColor] = useState(HeaderEnum.MAINLIGHTPINK)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const pathname = location.pathname
    if (PATHNAME_NONE.includes(pathname)) {
      setToColor(HeaderEnum.NONE)
    } else if (PATHNAME_MAINPINK.includes(pathname)) {
      setToColor(HeaderEnum.MAINPINK)
    } else if (PATHNAME_TRANSPARENT.includes(pathname)) {
      setToColor(HeaderEnum.TRANSPARENT)
    } else if (PATHNAME_MAINBEIGE.some((path) => pathname.startsWith(path))) {
      setToColor(HeaderEnum.MAINBEIGE)
    } else {
      setToColor(HeaderEnum.MAINLIGHTPINK)
    }
  }, [location.pathname])

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

  const selectedNavItems =
    role == 'attendee' && attendee?.attendee_type == 'student'
      ? AUTHENTICATED_ATTENDEE_STUDENT_NAV_ITEMS
      : role == 'attendee'
        ? AUTHENTICATED_ATTENDEE_NONSTUDENT_NAV_ITEMS
        : role == 'staff'
          ? AUTHENTICATED_STAFF_NAV_ITEMS
          : UNAUTHENTICATED_NAV_ITEMS

  return (
    <>
      <header
        className={`${headerClass[toColor]} z-50 mx-auto flex h-16 w-full max-w-(--width-page) items-center justify-between p-4`}
      >
        {/* Clouds */}
        {toColor === HeaderEnum.TRANSPARENT && (
          <div className="top-0 right-0 left-0 -z-1 absolute bg-linear-to-b from-[#FAFAE6]/95 from-35% to-transparent w-full h-24"></div>
        )}

        {/* Logo */}
        <img
          src="/logo/cu-journey.webp"
          width={74}
          height={48}
          alt="Logo"
          className="cursor-pointer"
          onClick={() => {
            router.navigate({ to: '/' })
          }}
        />

        {/* Right menu */}
        <div className="flex items-center gap-2">
          {/* Lang */}
          <div className="flex shadow-sm rounded-lg overflow-hidden">
            {['th', 'en'].map((lng) => (
              <button
                key={lng}
                onClick={() => i18n.changeLanguage(lng)}
                className={`px-3 py-2 text-sm font-bold transition ${i18n.language === lng
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
              className={`fixed inset-0 z-50 ${isClosingSidebar ? 'animate-fade-out' : 'animate-fade-in'} `}
              onClick={closeSidebar}
            />

            {/* Sidebar Panel */}
            <div
              className={`fixed top-0 z-500 flex h-full min-h-screen w-full max-w-(--width-page) -translate-x-4 flex-col gap-4 overflow-auto bg-white px-4 py-8 shadow-lg ${isClosingSidebar ? 'animate-slide-out-left' : 'animate-slide-in-left'} `}
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
              <nav className="flex flex-col gap-10 mb-10">
                {selectedNavItems.map((item) => (
                  <div
                    key={item.title}
                    onClick={() => {
                      router.navigate({ to: item.to })
                      setOpenSidebar(false)
                    }}
                    className="flex items-center gap-4 w-fit cursor-pointer"
                  >
                    <FlatIcon
                      name={item.icon}
                      size={24}
                      className="text-main-pink"
                    />
                    <span className="font-bold text-xl">
                      {t(`components.header.sidebar.${item.title}`)}
                    </span>
                  </div>
                ))}
              </nav>

              {/* Buttons */}
              <div className="flex flex-col justify-center items-center gap-4 mt-auto">
                {role == undefined ? (
                  <>
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
                  </>
                ) : (
                  <Button
                    size="sm"
                    onClick={async () => {
                      setOpenSidebar(false)
                      await logout()
                      router.navigate({ to: '/', reloadDocument: true })
                    }}
                  >
                    {t('components.header.sidebar.logout')}
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      </header>
    </>
  )
}
