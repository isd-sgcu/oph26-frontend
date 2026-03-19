import { useEffect, useState } from 'react'

import { createFileRoute, useNavigate } from '@tanstack/react-router'
import {
  useForm,
  FormProvider,
  useFormContext,
  Controller,
  useWatch,
} from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/auth/FormCard'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { provinces } from '@/const/province'
import { faculties, facultyEnum } from '@/const/faculty'
import { FormProgress } from '@/components/auth/FormProgress'
import { Checkbox } from '@/components/ui/checkbox'
import { createAttendee } from '@/services/attendee/attendee'
import { AttendeeType, useUser } from '@/contexts/UserContext'
import { PRIVACY_TEXT } from '@/const/privacy'

export const Route = createFileRoute('/auth/onboarding/')({
  component: RouteComponent,
})

type Option = {
  value: string
  label: string
}

const acknowledgedOptions: Option[] = [
  { value: 'Facebook', label: 'Facebook' },
  { value: 'Instagram', label: 'Instagram' },
  { value: 'X', label: 'X' },
  { value: 'Tiktok', label: 'Tiktok' },
  { value: 'Camphub', label: 'Camphub' },
  { value: 'Billboard', label: 'ป้ายโฆษณาต่าง ๆ' },
  { value: 'WordOfMouth', label: 'ผู้ปกครอง/คนรู้จัก' },
  { value: 'other', label: 'อื่น ๆ' },
]

const objectivesOptions: Option[] = [
  {
    value: 'learnaboutfaculties',
    label: 'ศึกษารายละเอียดหลักสูตร การเรียนการสอน และเส้นทางอาชีพของคณะต่าง ๆ',
  },
  {
    value: 'findmyself',
    label: 'ค้นหาตนเองและสำรวจความสนใจของตนเอง',
  },
  {
    value: 'preparefordecision',
    label: 'เตรียมความพร้อมก่อนตัดสินใจเลือกคณะหรือมหาวิทยาลัย',
  },
  {
    value: 'askaboutadmission',
    label: 'สอบถามข้อมูลการสมัครเรียน ทุนการศึกษา และเกณฑ์การคัดเลือก',
  },
  {
    value: 'explorechula',
    label: 'เพื่อเยี่ยมชมบรรยากาศภายในมหาวิทยาลัยและสิ่งอำนวยความสะดวก',
  },
  {
    value: 'talktoteachers',
    label: 'พูดคุยกับอาจารย์ รุ่นพี่ หรือศิษย์เก่าเกี่ยวกับประสบการณ์การเรียน',
  },
  { value: 'other', label: 'อื่น ๆ' },
]

const enumValueToKey = Object.fromEntries(
  Object.entries(facultyEnum).map(([key, value]) => [
    value as string,
    key.toLowerCase(),
  ])
)
const facultyThToCode: Record<string, string> = Object.fromEntries(
  faculties.map((f) => [f.th, enumValueToKey[f.facultyEnum]])
)

const convertStudyLevel = (level: string) => {
  switch (level) {
    case 'ประถมศึกษา':
      return 'elementary'
    case 'มัธยมศึกษาตอนต้น':
      return 'matthayom_ton'
    case 'มัธยมศึกษาตอนปลาย':
      return 'matthayom_plai'
    case 'ปวช.':
      return 'vocational'
    case 'ปวส.':
      return 'high_vocational'
    case 'ปริญญาตรี':
      return 'undergraduate'
    case 'ปริญญาโท':
      return 'master'
    case 'ปริญญาเอก':
      return 'doctor'
    default:
      return 'other'
  }
}

type IRegistrationForm = {
  firstName: string
  lastName: string
  birthDate: string
  status: AttendeeType
  email: string
  province: string
  district: string

  acknowledged: number[]
  objectives: number[]
  transportation: string

  level: string
  school: string

  interestedFaculties0: string
  interestedFaculties1: string
  interestedFaculties2: string
  interestedFaculties3: string

  acceptedTerms: boolean

  acknowledgedOther: string
  objectivesOther: string
}

function getEmailFromToken(): string {
  try {
    const token = localStorage.getItem('token')
    if (!token) return ''
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.email ?? ''
  } catch {
    return ''
  }
}

function RouteComponent() {
  const navigate = useNavigate()
  const [currentFormPage, setCurrentFormPage] = useState<number>(1)
  const userContext = useUser()
  if (!userContext) {
    return null
  }

  const attendee = userContext.attendee
  const user = userContext.user

  useEffect(() => {
    if (attendee || !user || user.role !== 'attendee') {
      navigate({ to: '/' })
    }
  }, [attendee, user, navigate])

  if (attendee || !user || user.role !== 'attendee') {
    return null
  }

  const createAttendeeMutation = useMutation({
    mutationFn: createAttendee,
    onSuccess: () => {
      navigate({ to: '/', reloadDocument: true })
    },
  })

  const form = useForm<IRegistrationForm>({
    mode: 'onChange',
    defaultValues: {
      email: getEmailFromToken(),
      province: 'กรุงเทพมหานคร',
      acknowledged: [],
      objectives: [],
      interestedFaculties0: '',
      interestedFaculties1: '',
      interestedFaculties2: '',
      interestedFaculties3: '',
      acceptedTerms: false,
    },
  })

  const status = useWatch({ control: form.control, name: 'status' })

  const { trigger: triggerValidation, handleSubmit: submitForm } = form

  const nextPage = async () => {
    let fieldsToValidate: (keyof IRegistrationForm)[] = []
    if (currentFormPage === 1) {
      fieldsToValidate = [
        'firstName',
        'lastName',
        'birthDate',
        'status',
        'email',
        'province',
      ]
      if (status === 'student') {
        fieldsToValidate.push('level', 'school')
      }
    } else if (currentFormPage === 2) {
      fieldsToValidate = [
        'interestedFaculties0',
        'interestedFaculties1',
        'interestedFaculties2',
        'interestedFaculties3',
      ]
    } else if (currentFormPage === 3) {
      fieldsToValidate = ['acknowledged', 'objectives', 'transportation']
    } else if (currentFormPage === 5) {
      fieldsToValidate = ['acceptedTerms']
    }
    const isValid = await triggerValidation(fieldsToValidate)
    if (isValid && currentFormPage < 5) {
      if (status !== 'student' && currentFormPage === 1) {
        setCurrentFormPage(3)
        return
      }
      setCurrentFormPage(currentFormPage + 1)
    }
  }

  const prevPage = async () => {
    if (currentFormPage > 1) {
      if (status !== 'student' && currentFormPage === 3) {
        setCurrentFormPage(1)
        return
      }
      setCurrentFormPage(currentFormPage - 1)
    }
  }

  const handleSubmitForm = (data: IRegistrationForm) => {
    const interestedFaculty = [
      data.interestedFaculties0,
      data.interestedFaculties1,
      data.interestedFaculties2,
      data.interestedFaculties3,
    ]
      .filter((f) => f && f !== 'ยังไม่ได้ตัดสินใจเลือก')
      .map((f) => facultyThToCode[f!])
      .filter(Boolean)

    const newsSourceSelected = data.acknowledged
      .map((i) => acknowledgedOptions[i])
      .map((option) => option.value)

    const objectiveSelected = data.objectives
      .map((i) => objectivesOptions[i])
      .map((option) => option.value)

    createAttendeeMutation.mutate({
      firstname: data.firstName,
      surname: data.lastName,
      attendee_type: data.status,
      date_of_birth: data.birthDate,
      province: data.province,
      district: data.district,
      study_level: convertStudyLevel(data.level),
      school_name: data.school,
      news_sources_selected: newsSourceSelected,
      news_sources_other: data.acknowledgedOther,
      objective_selected: objectiveSelected,
      objective_other: data.objectivesOther,
      interested_faculty: interestedFaculty,
      transportation_method: data.transportation,
    })
  }

  const getProgressText = () => {
    switch (currentFormPage) {
      case 1:
        return 'โปรไฟล์'
      case 2:
        return 'คณะ'
      case 3:
        return 'สำรวจ'
      case 4:
      case 5:
        return 'ติดตาม'
    }
    return ''
  }

  return (
    <section className="bg-main-light-pink relative flex h-full min-h-screen w-full flex-col">
      <div className="pt-6">
        <h1 className="px-4 text-4xl font-bold text-white text-shadow-md">
          ลงทะเบียน
        </h1>
      </div>
      <div className="my-4 px-4">
        <FormProgress
          maxPages={status == 'student' ? 5 : 4}
          currentPage={currentFormPage}
          text={getProgressText()}
        />
      </div>
      <FormProvider {...form}>
        <form onSubmit={submitForm(handleSubmitForm)}>
          <div className="px-4">
            {currentFormPage == 1 && <ProfileForm />}
            {currentFormPage == 2 && <FacultiesForm />}
            {currentFormPage == 3 && <SurveyForm />}
            {currentFormPage == 4 && <FollowForm />}
            {currentFormPage == 5 && <NoticeForm />}
          </div>

          <div className="mt-12 mb-8 flex w-full flex-row justify-center gap-6">
            {currentFormPage !== 1 && (
              <Button
                type="button"
                size="sm"
                className="bg-gradient-beige text-main-pink"
                onClick={prevPage}
              >
                ย้อนกลับ
              </Button>
            )}
            {currentFormPage !== 5 && (
              <Button
                type="button"
                size="sm"
                className="bg-gradient-purple"
                onClick={nextPage}
              >
                ถัดไป
              </Button>
            )}
            {currentFormPage === 5 && (
              <Button
                type="submit"
                size="sm"
                className="bg-gradient-purple"
                disabled={createAttendeeMutation.isPending}
              >
                {createAttendeeMutation.isPending ? 'กำลังส่ง...' : 'ลงทะเบียน'}
              </Button>
            )}
          </div>
        </form>
      </FormProvider>
    </section>
  )
}

const ProfileForm = () => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<IRegistrationForm>()
  const status = useWatch({ control, name: 'status' })

  return (
    <FormCard>
      <div>
        <p className="text-main-pink text-lg font-semibold">ข้อมูลส่วนตัว</p>
        <div className="h-px w-full bg-[#AFAFAF]"></div>
      </div>
      <div className="flex flex-col gap-3 text-sm">
        <div>
          <p className="font-semibold">
            ชื่อ - นามสกุล<span className="text-[#ff0000]">*</span>
          </p>
          <div className="flex flex-row gap-2">
            <Input
              placeholder="ชื่อ"
              className="placeholder:text-main-light-pink shadow-none"
              {...register('firstName', { required: 'กรุณาระบุชื่อ' })}
            />
            <Input
              placeholder="นามสกุล"
              className="placeholder:text-main-light-pink shadow-none"
              {...register('lastName', { required: 'กรุณาระบุนามสกุล' })}
            />
          </div>
          {(errors.firstName || errors.lastName) && (
            <p className="mt-0.5 text-xs text-[#ff0000]">
              กรุณากรอกชื่อ - นามสกุล
            </p>
          )}
        </div>
        <div>
          <div className="flex flex-row gap-2">
            <div className="flex-1">
              <p className="font-semibold">
                วันเกิด<span className="text-[#ff0000]">*</span>
              </p>
              <Controller
                name="birthDate"
                control={control}
                rules={{ required: 'กรุณาระบุวันเกิด' }}
                render={({ field }) => (
                  <Input
                    type="date"
                    className="placeholder:text-main-light-pink shadow-none"
                    max={new Date().toISOString().split('T')[0]}
                    {...field}
                  />
                )}
              />
              {errors.birthDate && (
                <p className="mt-0.5 text-xs text-[#ff0000]">
                  กรุณาระบุวันเกิด
                </p>
              )}
            </div>
            <div className="flex-1">
              <p className="font-semibold">
                สถานภาพ<span className="text-[#ff0000]">*</span>
              </p>
              <Controller
                name="status"
                control={control}
                rules={{ required: 'กรุณาเลือกสถานภาพ' }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="data-[placeholder]:text-main-light-pink w-full shadow-none">
                      <SelectValue placeholder="สถานภาพของคุณ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">นักเรียน</SelectItem>
                      <SelectItem value="parent">ผู้ปกครอง</SelectItem>
                      <SelectItem value="educationstaff">
                        บุคลากรทางการศึกษา
                      </SelectItem>
                      <SelectItem value="other">อื่น ๆ</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.status && (
                <p className="mt-0.5 text-xs text-[#ff0000]">
                  กรุณาเลือกสถานภาพ
                </p>
              )}
            </div>
          </div>
        </div>
        <div>
          <p className="font-semibold">อีเมล</p>
          <Input
            type="email"
            className="shadow-none"
            disabled={true}
            {...register('email')}
          />
        </div>
        <div>
          <p className="font-semibold">
            จังหวัดที่เดินทางมา (ที่อยู่อาศัยปัจจุบัน)
            <span className="text-[#ff0000]">*</span>
          </p>
          <Controller
            name="province"
            control={control}
            rules={{ required: 'กรุณาเลือกจังหวัด' }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="data-[placeholder]:text-main-light-pink shadow-none">
                  <SelectValue placeholder="กรุงเทพมหานคร" />
                </SelectTrigger>
                <SelectContent className="max-h-40 overflow-y-auto">
                  {provinces.map((prov) => (
                    <SelectItem key={prov.th} value={prov.th}>
                      {prov.th}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div>
          <p className="font-semibold">
            เขต/อำเภอ<span className="text-[#ff0000]">*</span>
          </p>
          <Input
            placeholder="เขต/อำเภอ"
            className="placeholder:text-main-light-pink shadow-none"
            {...register('district', { required: 'กรุณาระบุเขต/อำเภอ' })}
          />
          {errors.district && (
            <p className="mt-0.5 text-xs text-[#ff0000]">กรุณาระบุเขต/อำเภอ</p>
          )}
        </div>
        {status === 'student' && (
          <>
            <div>
              <p className="text-main-pink mt-3 text-lg font-semibold">
                การศึกษา
              </p>
              <div className="h-px w-full bg-[#AFAFAF]"></div>
            </div>
            <div>
              <p className="font-semibold">
                ระดับชั้น<span className="text-[#ff0000]">*</span>
              </p>
              <Controller
                name="level"
                control={control}
                rules={{ required: 'กรุณาเลือกระดับชั้น' }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="data-[placeholder]:text-main-light-pink w-full shadow-none">
                      <SelectValue placeholder="เลือกระดับชั้น" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ประถมศึกษา">ประถมศึกษา</SelectItem>
                      <SelectItem value="มัธยมศึกษาตอนต้น">
                        มัธยมศึกษาตอนต้น
                      </SelectItem>
                      <SelectItem value="มัธยมศึกษาตอนปลาย">
                        มัธยมศึกษาตอนปลาย
                      </SelectItem>
                      <SelectItem value="ปวช.">ปวช.</SelectItem>
                      <SelectItem value="ปวส.">ปวส.</SelectItem>
                      <SelectItem value="ปริญญาตรี">ปริญญาตรี</SelectItem>
                      <SelectItem value="ปริญญาโท">ปริญญาโท</SelectItem>
                      <SelectItem value="ปริญญาเอก">ปริญญาเอก</SelectItem>
                      <SelectItem value="อื่น ๆ">อื่น ๆ</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.level && (
                <p className="mt-0.5 text-xs text-[#ff0000]">
                  กรุณาเลือกระดับชั้น
                </p>
              )}
            </div>
            <div>
              <p className="font-semibold">
                สถานศึกษา<span className="text-[#ff0000]">*</span>
              </p>
              <Input
                placeholder="สถานศึกษา"
                className="placeholder:text-main-light-pink shadow-none"
                {...register('school', { required: 'กรุณาระบุสถานศึกษา' })}
              />
              {errors.school && (
                <p className="mt-0.5 text-xs text-[#ff0000]">
                  กรุณาระบุสถานศึกษา
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </FormCard>
  )
}

const FacultiesForm = () => {
  const {
    register,
    formState: { errors },
    control,
    setValue,
    watch,
  } = useFormContext<IRegistrationForm>()
  const fieldNames = [
    'interestedFaculties0',
    'interestedFaculties1',
    'interestedFaculties2',
    'interestedFaculties3',
  ] as const

  const handleFacultiesChange = (index: number, value: string) => {
    setValue(fieldNames[index], value)
    if (index === 1 && value === 'ยังไม่ได้ตัดสินใจเลือก') {
      setValue(fieldNames[2], 'ยังไม่ได้ตัดสินใจเลือก')
      setValue(fieldNames[3], 'ยังไม่ได้ตัดสินใจเลือก')
    }
    if (index === 2 && value === 'ยังไม่ได้ตัดสินใจเลือก') {
      setValue(fieldNames[3], 'ยังไม่ได้ตัดสินใจเลือก')
    }
  }
  return (
    <FormCard>
      <div>
        <p className="text-main-pink text-lg font-semibold">
          จัดอันดับคณะที่สนใจ
        </p>
        <div className="h-px w-full bg-[#AFAFAF]"></div>
      </div>

      {fieldNames.map((fieldName, index) => {
        const prevAllSelected = fieldNames.slice(0, index).every((name) => {
          const v = watch(name)
          return v && v !== 'ยังไม่ได้ตัดสินใจเลือก'
        })

        return (
          <div key={index}>
            <p className="font-semibold">
              อันดับ {index + 1}
              <span className="text-[#ff0000]">*</span>
            </p>
            <Controller
              name={fieldName}
              control={control}
              render={({ field }) => {
                const otherValues = fieldNames
                  .filter((name) => name !== fieldName)
                  .map((name) => watch(name))
                  .filter((v) => v && v !== 'ยังไม่ได้ตัดสินใจเลือก')
                const filteredFaculties = faculties.filter(
                  (fac) => !otherValues.includes(fac.th)
                )
                return (
                  <>
                    <input
                      type="hidden"
                      {...register(fieldName, {
                        required: 'กรุณาเลือกคณะที่สนใจ',
                      })}
                      value={field.value}
                    />
                    <Select
                      onValueChange={(value) =>
                        handleFacultiesChange(index, value)
                      }
                      value={field.value}
                      disabled={index > 0 && !prevAllSelected}
                    >
                      <SelectTrigger className="data-placeholder:text-main-light-pink w-full shadow-none">
                        <SelectValue placeholder="เลือกคณะ" />
                      </SelectTrigger>
                      <SelectContent className="max-h-40 max-w-full overflow-y-auto">
                        {index > 0 && (
                          <SelectItem value="ยังไม่ได้ตัดสินใจเลือก">
                            ยังไม่ได้ตัดสินใจเลือก
                          </SelectItem>
                        )}
                        {filteredFaculties.map((fac) => (
                          <SelectItem key={fac.th} value={fac.th}>
                            {fac.th}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors[fieldName] && (
                      <p className="mt-0.5 text-xs text-[#ff0000]">
                        กรุณาเลือกคณะที่สนใจ
                      </p>
                    )}
                  </>
                )
              }}
            />
          </div>
        )
      })}
    </FormCard>
  )
}

const SurveyForm = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<IRegistrationForm>()

  const acknowledgedOtherSelected = useWatch({
    control,
    name: 'acknowledged',
  })?.includes(acknowledgedOptions.length - 1)

  const objectivesOtherSelected = useWatch({
    control,
    name: 'objectives',
  })?.includes(objectivesOptions.length - 1)

  return (
    <FormCard>
      <div>
        <p className="text-main-pink text-lg font-semibold">
          ทราบข่าวประชาสัมพันธ์จากช่องทางใด*
        </p>
        <p className="text-xs text-[#AFAFAF]">(เลือกตอบได้มากกว่า 1 คำตอบ)</p>
      </div>
      <Controller
        name="acknowledged"
        control={control}
        render={({ field }) => (
          <div className="flex flex-col gap-2">
            {acknowledgedOptions.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox
                  id={`acknowledged-${index}`}
                  className="border-main-pink data-[state=checked]:bg-main-pink data-[state=checked]:border-main-pink data-[state=checked]:text-white"
                  checked={field.value.includes(index)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      field.onChange([...field.value, index])
                    } else {
                      field.onChange(field.value.filter((v) => v !== index))
                    }
                  }}
                />
                <label
                  htmlFor={`acknowledged-${index}`}
                  className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        )}
      />
      {acknowledgedOtherSelected && (
        <Input
          placeholder="โปรดระบุช่องทางอื่น ๆ"
          {...register('acknowledgedOther')}
          className="mt-2"
        />
      )}

      <div className="mt-2">
        <p className="text-main-pink text-lg font-semibold">
          จุดประสงค์ในการเข้าร่วม Open House*
        </p>
        <p className="text-xs text-[#AFAFAF]">(เลือกตอบได้มากกว่า 1 คำตอบ)</p>
      </div>
      <Controller
        name="objectives"
        control={control}
        render={({ field }) => (
          <div className="flex flex-col gap-2">
            {objectivesOptions.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox
                  id={`objectives-${index}`}
                  className="border-main-pink data-[state=checked]:bg-main-pink data-[state=checked]:border-main-pink data-[state=checked]:text-white"
                  checked={field.value.includes(index)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      field.onChange([...field.value, index])
                    } else {
                      field.onChange(field.value.filter((v) => v !== index))
                    }
                  }}
                />
                <label
                  htmlFor={`objectives-${index}`}
                  className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        )}
      />
      {objectivesOtherSelected && (
        <Input
          placeholder="โปรดระบุจุดประสงค์อื่น ๆ"
          {...register('objectivesOther')}
          className="mt-2"
        />
      )}

      <div className="mt-2">
        <p className="text-xs font-semibold">
          ท่านเดินทางมา CU Open House 2026 อย่างไร
          <span className="text-[#ff0000]">*</span>
        </p>
        <Controller
          name="transportation"
          control={control}
          rules={{ required: 'กรุณาเลือกวิธีการเดินทาง' }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="data-placeholder:text-main-light-pink w-full shadow-none">
                <SelectValue placeholder="เลือกวิธีการเดินทาง" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="เดิน">เดิน</SelectItem>
                <SelectItem value="รถไฟฟ้าระบบราง">รถไฟฟ้าระบบราง</SelectItem>
                <SelectItem value="รถเมล์">รถเมล์</SelectItem>
                <SelectItem value="รถตู้ประจำทาง">รถตู้ประจำทาง</SelectItem>
                <SelectItem value="จักรยานยนต์">จักรยานยนต์</SelectItem>
                <SelectItem value="รถแท็กซี่">รถแท็กซี่</SelectItem>
                <SelectItem value="รถยนต์ส่วนบุคคล">รถยนต์ส่วนบุคคล</SelectItem>
                <SelectItem value="ยานยนต์ไฟฟ้า">ยานยนต์ไฟฟ้า</SelectItem>
                <SelectItem value="รถ LPG">รถ LPG</SelectItem>
                <SelectItem value="รถไฟดีเซล">รถไฟดีเซล</SelectItem>
                <SelectItem value="อื่น ๆ">อื่น ๆ</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.transportation && (
          <p className="mt-0.5 text-xs text-[#ff0000]">
            กรุณาเลือกวิธีการเดินทาง
          </p>
        )}
      </div>
    </FormCard>
  )
}

const FollowForm = () => {
  return (
    <FormCard>
      <div className="my-3">
        <p className="text-main-pink text-lg font-semibold">
          ติดตามช่องทางประชาสัมพันธ์
        </p>
        <p className="text-xs text-[#AFAFAF]">
          (เพื่อประโยชน์สูงสุดในการเข้าร่วม และจะได้ไม่พลาดข่าวสารจากโครงการ CU
          Open House 2026 เราแนะนำให้ท่านติดตาม)
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-instagram-icon lucide-instagram"
          >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
          <a href="https://www.instagram.com/cuopenhouse/">
            <p className="text-sm font-semibold">@cuopenhouse</p>
          </a>
        </div>
        <div className="flex flex-row items-center gap-1">
          <svg
            width="24"
            height="24"
            viewBox="0 0 16 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.44 2.82C11.7566 2.03953 11.3799 1.0374 11.38 0H8.29V12.4C8.26666 13.0712 7.98352 13.7071 7.50031 14.1735C7.01709 14.6399 6.3716 14.9004 5.7 14.9C4.28 14.9 3.1 13.74 3.1 12.3C3.1 10.58 4.76 9.29 6.47 9.82V6.66C3.02 6.2 0 8.88 0 12.3C0 15.63 2.76 18 5.69 18C8.83 18 11.38 15.45 11.38 12.3V6.01C12.633 6.90985 14.1374 7.39265 15.68 7.39V4.3C15.68 4.3 13.8 4.39 12.44 2.82Z"
              fill="#2A2A2A"
            />
          </svg>
          <p className="text-sm font-semibold">@cu_openhouse</p>
        </div>
      </div>
    </FormCard>
  )
}

const NoticeForm = () => {
  const { control } = useFormContext<IRegistrationForm>()
  return (
    <FormCard>
      <div>
        <p className="text-main-pink text-lg font-semibold">
          ข้อตกลงและเงื่อนไข
        </p>
      </div>
      <p className="max-h-80 overflow-y-auto rounded-md border p-4 whitespace-pre-wrap">
        {PRIVACY_TEXT}
      </p>
      <div className="flex flex-row items-center justify-start gap-2">
        <Controller
          name="acceptedTerms"
          control={control}
          rules={{ required: 'กรุณายอมรับเงื่อนไข' }}
          render={({ field }) => (
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          )}
        />
        <p>
          ข้าพเจ้ายอมรับและตกลงเงื่อนไข<span className="text-[#ff0000]">*</span>
        </p>
      </div>
    </FormCard>
  )
}
