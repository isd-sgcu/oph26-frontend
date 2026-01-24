import { useEffect, useState } from 'react'
import { useRouterState } from '@tanstack/react-router'

const SHOW_FOOTER_PATHS = ['/']

export default function Footer() {
  const [mounted, setMounted] = useState(false)
  const { location } = useRouterState()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const shouldShowFooter = SHOW_FOOTER_PATHS.some(
    (path) => location.pathname === path
  )

  if (!shouldShowFooter) return null

  return (
    <footer className="w-full bg-gray-200 p-4">This is the new footer.</footer>
  )
}
