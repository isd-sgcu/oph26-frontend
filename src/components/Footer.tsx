import { useEffect, useState } from 'react'
import { useRouterState } from '@tanstack/react-router'

const BEIGE_FOOTER_PATHS = [
  '/info',
  '/info/workshop',
  '/info/workshop/*',
  '/info/faculty',
  '/info/faculty/*',
  '/info/map',
  '/info/merchandise',
]

const SHOW_FOOTER_PATHS = ['/', ...BEIGE_FOOTER_PATHS]

function matchPath(pathname: string, rule: string) {
  if (rule.endsWith('/*')) {
    const base = rule.replace('/*', '')
    return pathname === base || pathname.startsWith(`${base}/`)
  }
  return pathname === rule
}

export default function Footer() {
  const [mounted, setMounted] = useState(false)

  const { location, matches } = useRouterState({
    select: (state) => ({
      location: state.location,
      matches: state.matches,
    }),
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isNotFound = matches.length === 1 && matches[0].routeId === '__root__'

  if (isNotFound) return null

  const pathname = location.pathname

  const shouldShowFooter = SHOW_FOOTER_PATHS.some((rule) =>
    matchPath(pathname, rule)
  )

  const beBeigeFooter = BEIGE_FOOTER_PATHS.some((rule) =>
    matchPath(pathname, rule)
  )

  if (!shouldShowFooter) return null

  return (
    <footer className={`flex h-fit max-h-80 w-full flex-col`}>
      {/* Content */}
      <div
        className={`flex w-full flex-1 flex-col items-center gap-4 px-8 py-4 ${beBeigeFooter ? 'bg-gradient-beige' : 'bg-gradient-pink'}`}
      >
        <h1
          className={`${beBeigeFooter ? 'text-main-pink' : 'text-main-beige'} text-center text-2xl font-bold text-shadow-xs`}
        >
          CU OPEN HOUSE 2026
        </h1>

        {/* Contact */}
        <div className="flex flex-wrap justify-center gap-4">
          <a
            target="_blank"
            className="flex flex-col items-center gap-1"
            href="https://www.instagram.com/cuopenhouse"
          >
            <img
              src="/logo/instagram.svg"
              alt="Instagram"
              width={40}
              height={40}
            />
            <p className="text-xs font-semibold text-black underline">
              Instagram
            </p>
          </a>
          <a
            target="_blank"
            className="flex flex-col items-center gap-1"
            href="https://www.facebook.com/cuopenhouse2021"
          >
            <img
              src="/logo/facebook.svg"
              alt="Facebook"
              width={40}
              height={40}
            />
            <p className="text-xs font-semibold text-black underline">
              Facebook
            </p>
          </a>
          <a
            target="_blank"
            className="flex flex-col items-center gap-1"
            href="https://www.tiktok.com/@cu_openhouse"
          >
            <img src="/logo/tiktok.svg" alt="Tiktok" width={40} height={40} />
            <p className="text-xs font-semibold text-black underline">Tiktok</p>
          </a>
        </div>

        {/* Sponsors */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <div className="h-12 w-12 rounded-full bg-[#d9d9d9]"></div>
          <div className="h-12 w-12 rounded-full bg-[#d9d9d9]"></div>
          <div className="h-12 w-12 rounded-full bg-[#d9d9d9]"></div>
          <div className="h-12 w-12 rounded-full bg-[#d9d9d9]"></div>
          <div className="h-12 w-12 rounded-full bg-[#d9d9d9]"></div>
          <div className="h-12 w-12 rounded-full bg-[#d9d9d9]"></div>
          <div className="h-12 w-12 rounded-full bg-[#d9d9d9]"></div>
          <div className="h-12 w-12 rounded-full bg-[#d9d9d9]"></div>
          <div className="h-12 w-12 rounded-full bg-[#d9d9d9]"></div>
          <div className="h-12 w-12 rounded-full bg-[#d9d9d9]"></div>
        </div>
      </div>

      {/* Authors */}
      <div className="flex h-fit w-full items-center justify-center gap-4 bg-[#1C1B1F] px-8 py-2">
        <img alt="ISD Logo" src="/logo/isd.svg" width={40} height={20} />
        <img
          alt="AORBORJOR Logo"
          src="/logo/aorborjor.svg"
          width={26}
          height={26}
        />
      </div>
    </footer>
  )
}
