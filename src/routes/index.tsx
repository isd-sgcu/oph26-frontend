import { FlatIcon } from '@/components/FlatIcon'
import CountdownTimer from '@/components/landing/CountdownTimer'
import QuestionSection from '@/components/landing/QuestionSection'
import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const navigate = useNavigate()

  return (
    <main className='flex flex-col justify-start items-center gap-1 bg-gradient-pink pt-20'>
      <div className='bg-black/30 px-3 py-1 rounded-full font-semibold text-[15px] text-white'>28-29 March 2026</div>

      <div className='flex flex-col justify-center items-center gap-8'>
        <div className='flex justify-center items-center gap-4'>
          <Button size={'md'} className='bg-main-beige text-main-pink'
            onClick={() => {
              navigate({ to: '/auth/login' })
            }}>Register</Button>
          <Button onClick={() => {
            navigate({ to: '/auth/login' })
          }}>Sign In</Button>
        </div>
        <CountdownTimer />
      </div>

      <div className='flex justify-center items-center bg-pink py-8 w-full'>
        <Button>สูจิบัตร</Button>
      </div>

      <div className='flex justify-center items-center gap-8 bg-gradient-pink-oval py-8 w-full text-white'>
        <div className='flex justify-center items-center gap-2'>
          <img src="/logo/youtube.svg" alt="" />
          <span className='font-bold text-2xl'>: See You AT CU</span>
        </div>
        <FlatIcon
          name="fi-rr-angle-double-right"
          size={16}
        />
      </div>

      {/* <QuestionSection /> */}
    </main>
  )
}
