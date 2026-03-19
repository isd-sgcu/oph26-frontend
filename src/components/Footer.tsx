import { useEffect, useState } from 'react'
import { useRouterState } from '@tanstack/react-router'

const SHOW_FOOTER_PATHS = [
  '/',
  '/info',
  '/info/workshop',
  '/info/workshop/*',
  '/info/faculty',
  '/info/faculty/*',
  '/info/map',
  '/info/merchandise',
]

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

  if (!shouldShowFooter) return null

  return (
    <footer className={`flex h-fit w-full max-w-(--width-page) flex-col`}>
      {/* Content */}
      <div
        className={`bg-gradient-pink flex w-full flex-1 flex-col items-center gap-4 px-8 py-4`}
      >
        <h1
          className={`text-main-beige text-center text-2xl font-bold text-shadow-xs`}
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
        <div className="flex w-full flex-wrap items-center justify-center gap-3">
          <div className="flex w-full items-center justify-center gap-6">
            <img
              src="/logo/sponsor/1_centralretail.webp"
              alt="Central Retail"
              width={100}
              height={40}
              className="w-18 rounded-md object-contain"
            />
            <img
              src="/logo/sponsor/2_Gulf.webp"
              alt="Gulf"
              width={100}
              height={40}
              className="h-4 w-auto rounded-md object-contain"
            />
            <img
              src="/logo/sponsor/3_major.webp"
              alt="Major"
              width={100}
              height={200}
              className="h-8 w-auto rounded-sm object-contain"
            />
          </div>
          <div className="flex w-full items-center justify-center gap-6">
            <img
              src="/logo/sponsor/4_CUNEX.webp"
              alt="CUNex"
              width={100}
              height={40}
              className="h-4 w-auto rounded-sm object-contain"
            />
            <img
              src="/logo/sponsor/5_camphub.webp"
              alt="Camphub"
              width={100}
              height={40}
              className="h-4 w-auto rounded-sm object-contain"
            />
            <img
              src="/logo/sponsor/6_เต่าเหยียบโลก.webp"
              alt="เต่าเหยียบโลก"
              width={100}
              height={40}
              className="aspect-square h-11 w-11 rounded-sm object-contain"
            />
          </div>
          <div className="flex w-full items-center justify-center gap-6">
            <img
              src="/logo/sponsor/7_cher.webp"
              alt="Cher"
              width={100}
              height={40}
              className="aspect-square h-10 w-10 rounded-sm object-contain"
            />
            <img
              src="/logo/sponsor/8_lineman.webp"
              alt="Lineman"
              width={100}
              height={40}
              className="aspect-square h-12 w-12 rounded-sm object-contain"
            />
            <img
              src="/logo/sponsor/9_bright_hair.webp"
              alt="Bright Hair"
              width={100}
              height={40}
              className="h-8 w-auto rounded-sm object-contain"
            />
          </div>
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
