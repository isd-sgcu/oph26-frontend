import { Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export default function Footer() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <footer className="w-full bg-gray-200 p-4">
      <nav className="flex gap-4">
        <div className="nav-item">
          <Link to="/">Home</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/test">Test Page</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/test/$id" params={{ id: '1' }}>
            Test Page 1
          </Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/test/component">Component Test</Link>
        </div>
      </nav>
    </footer>
  )
}
