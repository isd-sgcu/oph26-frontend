import {
  HeadContent,
  Scripts,
  createRootRoute,
  Outlet,
} from '@tanstack/react-router'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

import appCss from '@/styles/app.css?url'
import i18n from '@/lib/i18n'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/queryClient'
import PageNotFound from '@/components/PageNotFound'
import { UserProvider } from '@/contexts/UserContext'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'color-scheme', content: 'light' },
      { title: 'CU Openhouse 2026' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', type: 'image/svg+xml', href: '/logo/cu-journey.webp' },
    ],
    scripts: [
      {
        src: 'https://accounts.google.com/gsi/client',
        async: true,
        defer: true,
      },
    ],
  }),
  component: RootDocument,
  notFoundComponent: RootNotFound,
})

function RootDocument() {
  return (
    <html
      lang={i18n.language}
      translate="no"
      suppressHydrationWarning
      className="bg-black"
    >
      <head>
        <HeadContent />
      </head>
      <body className="flex w-full flex-col items-center justify-start bg-black">
        <QueryClientProvider client={queryClient}>
          <UserProvider>
            <Header />
            <main className="mx-auto min-h-screen w-full max-w-(--width-page) bg-white">
              <Outlet />
            </main>
          </UserProvider>
          <Footer />
        </QueryClientProvider>
        <Scripts />
      </body>
    </html>
  )
}

function RootNotFound() {
  return <PageNotFound />
}
