import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import QrCodeScanner from '@/components/auth/qr/QrCodeScanner';
import { useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/qr/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const user = {
    firstName: 'John',
    lastName: 'Doe',
    studentId: '12345678',
    faculty: 'Engineering',
  };

  return (
    <>
      <div className='relative w-full h-full shrink'>
        <div className='flex flex-col justify-center items-center gap-7.5 w-full'>
          <div className='flex flex-col gap-3 p-5 text-white text-center'>
            <h1 className='font-bold text-4xl'>{t('routes.authGroup.qrGroup.greeting')}</h1>
            <div className='font-medium text-xl'>
              <p className='text-pretty'>{user.firstName + " " + user.lastName}</p>
              <p className='text-pretty'>{user.studentId + " | " + user.faculty}</p>
            </div>
          </div>

          {/* <QrCodeScanner /> */}

          <Button
            size="md"
            expanded
            onClick={() => navigate({ to: '/', replace: false })}
            className="bg-gradient-purple">
            {t('routes.authGroup.qrGroup.home')}
          </Button>
        </div>
      </div>
      <div className='bottom-0 left-0 relative w-full'>
        <img
          alt=""
          src="/auth/qr/background.png"
          className='bottom-0 left-0 absolute w-full pointer-events-none select-none'
        />
      </div>
    </>
  );
}
