import {
  HeadContent,
  Scripts,
  createRootRoute,
  Outlet,
} from '@tanstack/react-router'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

import appCss from '@/styles/app.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'CU Openhouse 2026' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' },
    ],
  }),
  component: RootDocument,
  notFoundComponent: RootNotFound,
})

function RootDocument() {
  return (
    <html lang="en" className="bg-black">
      <head>
        <HeadContent />
      </head>
      <body className="flex w-98.25 flex-col justify-self-center">
        <Header />
        <main className="min-h-screen bg-white px-4">
          <Outlet />
        </main>
        <Footer />
        <Scripts />
      </body>
    </html>
  )
}

function RootNotFound() {
  return <div>Global Section: Page Not Found</div>
}
