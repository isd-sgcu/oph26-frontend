import LandingSectionOne from '@/components/landing/LandingSectionOne'
import LandingSectionThree from '@/components/landing/LandingSectionThree'
import LandingSectionTwo from '@/components/landing/LandingSectionTwo'
import LandingSectionFour from '@/components/landing/LandingSectionFour'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <main className='flex flex-col justify-start items-center bg-gradient-pink w-full'>
      <LandingSectionOne />
      <LandingSectionTwo />
      <LandingSectionThree />
      <LandingSectionFour />
    </main >
  )
}
