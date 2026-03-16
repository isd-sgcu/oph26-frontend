import LandingSectionOne from '@/components/landing/LandingSectionOne'
import LandingSectionThree from '@/components/landing/LandingSectionThree'
import LandingSectionTwo from '@/components/landing/LandingSectionTwo'
import LandingSectionFour from '@/components/landing/LandingSectionFour'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <main className="bg-gradient-pink flex w-full flex-col items-center justify-start">
      <LandingSectionOne />
      <LandingSectionTwo />
      <LandingSectionThree />
      <LandingSectionFour />
    </main>
  )
}
