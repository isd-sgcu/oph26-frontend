import { useState } from 'react'

import { createFileRoute } from '@tanstack/react-router'
import { useForm, FormProvider, useFormContext } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { FormCard } from "@/components/auth/FormCard.tsx";
import { Input } from "@/components/ui/input.tsx";

export const Route = createFileRoute('/auth/onboarding/')({
  component: RouteComponent,
})

type IRegistrationForm = {
  firstName: string;
  lastName: string;
  age: number;
  status: 'student' | 'parent';
  email: string;
  province: string;

  interestedFaculties: string[];

  acknowledged: number[];
  objectives: number[];

  level?: string;
  school?: string;
}

function RouteComponent() {
  const [currentFormPage, setCurrentFormPage] = useState<number>(1);

  const form = useForm<IRegistrationForm>({
    mode: "onChange"
  });

  const {trigger: triggerValidation, handleSubmit: submitForm } = form;

  const nextPage = async() => {
    const isValid = await triggerValidation();
    if(isValid) {
      setCurrentFormPage(currentFormPage + 1);
    }
  };

  const prevPage = () => setCurrentFormPage(currentFormPage - 1);

  const handleSubmitForm = (e: any) => {
    console.log('Form submitted:', e);
  }

  return (
    <section className="to-main-pink w-full from-[#ECECD2] to-10% relative flex flex-col bg-linear-to-b">
      <div>
        <h1>ลงทะเบียน</h1>
        <div>
          { /* TOO LAZY */ }
        </div>
      </div>
      <FormProvider {...form}>
        <form onSubmit={submitForm(handleSubmitForm)}>
          <div className="px-3">
            { currentFormPage == 1 && <ProfileForm /> }
            { currentFormPage == 2 && <>Page 2</> }
            { currentFormPage == 3 && <>Page 3</> }
            { currentFormPage == 4 && <>Page 4</> }
            { currentFormPage == 5 && <>Page 5</> }
          </div>

          <div className="fixed bottom-5 left-0 right-0 flex flex-row justify-center w-full gap-6">
            {currentFormPage !== 1 && <Button size="sm" className="bg-gradient-purple" onClick={prevPage}>ย้อนกลับ</Button>}
            {currentFormPage !== 5 && <Button size="sm" className="bg-gradient-purple" onClick={nextPage}>ถัดไป</Button>}
          </div>
        </form>
      </FormProvider>
    </section>
  )
}

const ProfileForm = () => {
  const {register, formState: { errors }} = useFormContext<IRegistrationForm>();

  return (
    <FormCard>
      <div>
        <p className="text-main-pink text-lg font-semibold">ข้อมูลส่วนตัว</p>
        <div className="bg-[#AFAFAF] h-[1px] w-full"></div>
      </div>
      <div className="flex flex-col gap-3 text-sm">
        <div>
          <p>ชื่อ - นามสกุล</p>
          <div className="flex flex-row gap-2">
            <Input placeholder="ชื่อ" className="placeholder:text-main-light-pink shadow-none" {...register('firstName', {required: 'กรุณาระบุชื่อ'})} />
            <Input placeholder="นามสกุล" className="placeholder:text-main-light-pink shadow-none" {...register('lastName', {required: 'กรุณาระบุนามสกุล'})}/>
          </div>
        </div>
        <div>
          <div className="flex flex-row gap-2">
            <div>
              <p>อายุ</p>
              <Input placeholder="อายุ (ระุบเป็นตัวเลข)" className="placeholder:text-main-light-pink shadow-none"/>
            </div>
            <div>
              <p>สถานภาพ</p>
              <Input placeholder="สถานภาพ" className="placeholder:text-main-light-pink shadow-none"/>
            </div>
          </div>
        </div>
        <div>
          <p>อีเมล</p>
          <Input type="email" placeholder="example@gmail.com" className="placeholder:text-main-light-pink shadow-none"/>
        </div>
        <div>
          <p>จังหวัดที่อาศัยอยู่</p>
          <Input placeholder="กรุงเทพมหานคร" className="placeholder:text-main-light-pink shadow-none"/>
        </div>
      </div>
    </FormCard>
  )
}
