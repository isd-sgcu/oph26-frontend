import { Button } from '@/components/ui/button';
import { createFileRoute } from '@tanstack/react-router'
import { useNavigate } from '@tanstack/react-router';
import Ticket from '@/components/auth/profile/ticket';

export const Route = createFileRoute('/auth/profile/ticket/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate();
  return (
    <div className="relative p-5 w-full h-full min-h-dvh">
      <img src="/background/ticket-background.png" alt="" className='z-0 absolute inset-0 w-full h-full object-cover' />
      <div className='z-10 relative flex flex-col justify-center items-center gap-5'>
        {/* --- Ticket Container --- */}
        <Ticket
          id='1234567890'
          firstName='Phakpong'
          lastName='Thaveepanya'
          status={false}
          dreamFaculties={['Computer Engineering and technology digital', 'Dentistry', 'Medicine', 'Business']}
        />

        {/* --- Footer Buttons --- */}
        <div className="flex justify-center items-center gap-6 w-full">
          <Button size={'md'} className="bg-main-beige text-main-pink" onClick={() => { navigate({ to: '/' }) }}>My Workshop</Button>
          <Button size={'md'} expanded className="bg-gradient-purple" onClick={() => { navigate({ to: '/' }) }}>หน้าหลัก</Button>
        </div>
      </div>
    </div>
  );
}
