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

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'CU Openhouse 2026' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', type: 'image/svg+xml', href: '/logo/cu-journey.webp' },
    ],
  }),
  component: RootDocument,
  notFoundComponent: RootNotFound,
})

function RootDocument() {
  return (
    <html lang={i18n.language} suppressHydrationWarning className="bg-black">
      <head>
        <HeadContent />
      </head>
      <body className="flex min-h-screen w-full max-w-(--width-page) flex-col justify-self-center">
        <QueryClientProvider client={queryClient}>
          <Header />
          <main className="flex flex-1 bg-white">
            <Outlet />
          </main>
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
