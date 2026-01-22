import { useEffect, useState } from 'react'

export default function Footer() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return <footer className="w-full bg-gray-200 p-4">This is the footer.</footer>
}
