import { createFileRoute, useRouter } from '@tanstack/react-router'
import { FormCard } from '@/components/auth/FormCard.tsx'
import { Input } from '@/components/ui/input.tsx'
import { useUser } from '@/contexts/UserContext'
import { useEffect } from 'react'

export const Route = createFileRoute('/auth/staff/onboarding/')({
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter()
  const userContext = useUser()
  if (!userContext) {
    return null
  }

  const user = userContext.user
  const role = userContext.role

  useEffect(() => {
    if (!user || role !== 'staff') {
      router.navigate({ to: '/' })
    }
  }, [user, role, router])

  if (!user || role !== 'staff') {
    return null
  }

  return (
    <section className="to-main-pink relative flex w-full flex-col bg-linear-to-b from-[#ECECD2] to-10%">
      <div className="pt-6">
        <h1 className="px-4 text-4xl font-bold text-white text-shadow-md">
          ตรวจสอบข้อมูล
        </h1>
      </div>
      <div className="mt-4 px-4">
        <FormCard>
          <div>
            <p className="text-main-pink text-lg font-semibold">
              ข้อมูลส่วนตัว
            </p>
            <div className="h-[1px] w-full bg-[#AFAFAF]"></div>
          </div>
          <div>
            <p className="font-semibold">
              รหัสนิสิต<span className="text-[#ff0000]">*</span>
            </p>
            <div className="flex flex-row gap-2">
              <Input
                placeholder="รหัสนิสิต"
                className="placeholder:text-main-light-pink shadow-none"
                disabled={true}
                value={1234}
              />
            </div>
          </div>
          <div>
            <p className="font-semibold">
              ชื่อ - นามสกุล<span className="text-[#ff0000]">*</span>
            </p>
            <div className="flex flex-row gap-2">
              <Input
                placeholder="ชื่อ"
                className="placeholder:text-main-light-pink shadow-none"
              />
              <Input
                placeholder="นามสกุล"
                className="placeholder:text-main-light-pink shadow-none"
              />
            </div>
          </div>
          <div>
            <div className="flex flex-row gap-2">
              <div className="flex-1">
                <p className="font-semibold">
                  ชื่อเล่น<span className="text-[#ff0000]">*</span>
                </p>
                <Input
                  placeholder="ชื่อเล่น"
                  className="placeholder:text-main-light-pink shadow-none"
                />
              </div>
              <div className="flex-1">
                <p className="font-semibold">
                  เบอร์โทรติดต่อ<span className="text-[#ff0000]">*</span>
                </p>
                <Input
                  placeholder="เบอร์โทรติดต่อ"
                  className="placeholder:text-main-light-pink shadow-none"
                />
              </div>
            </div>
          </div>
          <div>
            <p className="font-semibold">
              อีเมล<span className="text-[#ff0000]">*</span>
            </p>
            <Input
              type="email"
              placeholder="example@gmail.com"
              className="placeholder:text-main-light-pink shadow-none"
              disabled={true}
            />
          </div>
          <div>
            <p className="font-semibold">
              คณะ<span className="text-[#ff0000]">*</span>
            </p>
            <Input
              placeholder="คณะ"
              className="placeholder:text-main-light-pink shadow-none"
            />
          </div>
          <div>
            <p className="font-semibold">
              ชั้นปี<span className="text-[#ff0000]">*</span>
            </p>
            <Input
              placeholder="ชั้นปี"
              className="placeholder:text-main-light-pink shadow-none"
            />
          </div>
        </FormCard>
      </div>
    </section>
  )
}
