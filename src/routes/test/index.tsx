import { FlatIcon } from '@/components/FlatIcon'
import { Piece } from '@/components/game/Piece'
import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/test/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col flex-wrap gap-8 overflow-auto px-8 pt-8 pb-16">
      {/* Color */}
      <div>
        <h1 className="text-2xl font-semibold">{t('test.color')}</h1>
        <div className="mt-2 flex flex-wrap">
          <div className="bg-main-pink h-16 w-16"></div>
          <div className="bg-main-light-pink h-16 w-16"></div>
          <div className="bg-main-beige h-16 w-16"></div>
          <div className="bg-sub-yellow h-16 w-16"></div>
          <div className="bg-sub-blue h-16 w-16"></div>
          <div className="bg-sub-purple h-16 w-16"></div>
          <div className="bg-sub-light-green h-16 w-16"></div>
          <div className="bg-sub-green h-16 w-16"></div>
          <div className="h-16 w-16 bg-black"></div>
          <div className="bg-grey h-16 w-16"></div>
          <div className="h-16 w-16 bg-white"></div>
          <div className="bg-gradient-pink h-16 w-16"></div>
          <div className="bg-gradient-pink-oval h-16 w-16"></div>
          <div className="bg-gradient-beige h-16 w-16"></div>
          <div className="bg-gradient-purple h-16 w-16"></div>
          <div className="bg-gradient-green h-16 w-16"></div>
          <div className="bg-gradient-blue h-16 w-16"></div>
          <div className="bg-gradient-beige-darker h-16 w-16"></div>
        </div>
        <div className="flex flex-wrap bg-black">
          <p className="text-main-pink p-2">
            โดยที่ประชาชนแห่งสหประชาชาติได้ยืนยันอีกครั้งไว้ในกฎบัตรถึงศรัทธาในสิทธิมนุษยชนขั้นพื้นฐาน
          </p>
          <p className="text-main-light-pink p-2">
            โดยที่ประชาชนแห่งสหประชาชาติได้ยืนยันอีกครั้งไว้ในกฎบัตรถึงศรัทธาในสิทธิมนุษยชนขั้นพื้นฐาน
          </p>
          <p className="text-main-beige p-2">
            โดยที่ประชาชนแห่งสหประชาชาติได้ยืนยันอีกครั้งไว้ในกฎบัตรถึงศรัทธาในสิทธิมนุษยชนขั้นพื้นฐาน
          </p>
          <p className="text-sub-yellow p-2">
            โดยที่ประชาชนแห่งสหประชาชาติได้ยืนยันอีกครั้งไว้ในกฎบัตรถึงศรัทธาในสิทธิมนุษยชนขั้นพื้นฐาน
          </p>
          <p className="text-sub-blue p-2">
            โดยที่ประชาชนแห่งสหประชาชาติได้ยืนยันอีกครั้งไว้ในกฎบัตรถึงศรัทธาในสิทธิมนุษยชนขั้นพื้นฐาน
          </p>
          <p className="text-sub-purple p-2">
            โดยที่ประชาชนแห่งสหประชาชาติได้ยืนยันอีกครั้งไว้ในกฎบัตรถึงศรัทธาในสิทธิมนุษยชนขั้นพื้นฐาน
          </p>
          <p className="text-sub-light-green p-2">
            โดยที่ประชาชนแห่งสหประชาชาติได้ยืนยันอีกครั้งไว้ในกฎบัตรถึงศรัทธาในสิทธิมนุษยชนขั้นพื้นฐาน
          </p>
          <p className="text-sub-green p-2">
            โดยที่ประชาชนแห่งสหประชาชาติได้ยืนยันอีกครั้งไว้ในกฎบัตรถึงศรัทธาในสิทธิมนุษยชนขั้นพื้นฐาน
          </p>
          <p className="bg-white p-2 text-black">
            โดยที่ประชาชนแห่งสหประชาชาติได้ยืนยันอีกครั้งไว้ในกฎบัตรถึงศรัทธาในสิทธิมนุษยชนขั้นพื้นฐาน
          </p>
          <p className="text-grey p-2">
            โดยที่ประชาชนแห่งสหประชาชาติได้ยืนยันอีกครั้งไว้ในกฎบัตรถึงศรัทธาในสิทธิมนุษยชนขั้นพื้นฐาน
          </p>
          <p className="p-2 text-white">
            โดยที่ประชาชนแห่งสหประชาชาติได้ยืนยันอีกครั้งไว้ในกฎบัตรถึงศรัทธาในสิทธิมนุษยชนขั้นพื้นฐาน
          </p>
        </div>
      </div>

      {/* Icons */}
      <div>
        <h1 className="text-2xl font-semibold">{t('test.icon')}</h1>
        <p className="mt-2">
          See more:{' '}
          <a
            href="https://www.flaticon.com/uicons/interface-icons"
            className="text-medium text-main-pink"
          >
            Flaticon
          </a>
        </p>
        <div className="mt-2 flex flex-wrap space-y-4 space-x-6">
          <FlatIcon name="fi-rr-add" />
          <FlatIcon name="fi-rr-add" className="text-main-pink" />
          <FlatIcon name="fi-rr-add" className="text-main-pink" size={32} />
          <FlatIcon
            name="fi-rr-add"
            className="text-main-pink cursor-pointer"
            size={32}
            onClick={() => {
              alert('Hello!')
            }}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex w-full flex-col">
        <h1 className="text-2xl font-semibold">{t('test.button')}</h1>
        {/* Solid Background */}
        <div className="mt-2 flex flex-wrap gap-4">
          <Button size="sm" showBorder borderClassName="bg-main-pink">
            <FlatIcon name="fi-rr-plus-small" size={16} />
            <span>เลือก</span>
            <FlatIcon name="fi-rr-plus-small" size={16} />
          </Button>
          <Button size="md" showBorder borderClassName="bg-main-pink">
            <FlatIcon name="fi-rr-plus-small" size={16} />
            <span>เลือก</span>
            <FlatIcon name="fi-rr-plus-small" size={16} />
          </Button>
          <Button size="lg" showBorder borderClassName="bg-main-pink">
            <FlatIcon name="fi-rr-plus-small" size={16} />
            <span>เลือก</span>
            <FlatIcon name="fi-rr-plus-small" size={16} />
          </Button>
          <Button size="sm" className="bg-main-beige">
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-main-pink"
              size={16}
            />
            <span className="text-main-pink">เลือก</span>
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-main-pink"
              size={16}
            />
          </Button>
          <Button size="md" className="bg-main-beige">
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-main-pink"
              size={16}
            />
            <span className="text-main-pink">เลือก</span>
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-main-pink"
              size={16}
            />
          </Button>
          <Button size="lg" className="bg-main-beige">
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-main-pink"
              size={16}
            />
            <span className="text-main-pink">เลือก</span>
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-main-pink"
              size={16}
            />
          </Button>
          <Button size="sm" className="bg-sub-purple">
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-white"
              size={16}
            />
            <span className="text-white">เลือก</span>
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-white"
              size={16}
            />
          </Button>
          <Button size="md" className="bg-sub-purple">
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-white"
              size={16}
            />
            <span className="text-white">เลือก</span>
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-white"
              size={16}
            />
          </Button>
          <Button size="lg" className="bg-sub-purple">
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-white"
              size={16}
            />
            <span className="text-white">เลือก</span>
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-white"
              size={16}
            />
          </Button>
        </div>

        {/* Solid Background + Expanded */}
        <div className="mt-2 flex flex-wrap gap-4">
          <Button size="sm" showBorder expanded borderClassName="bg-main-pink">
            <FlatIcon name="fi-rr-plus-small" size={16} />
            <span>Sign In With Google</span>
            <FlatIcon name="fi-rr-plus-small" size={16} />
          </Button>
          <Button size="md" showBorder expanded borderClassName="bg-main-pink">
            <FlatIcon name="fi-rr-plus-small" size={16} />
            <span>Sign In With Google</span>
            <FlatIcon name="fi-rr-plus-small" size={16} />
          </Button>
          <Button size="lg" showBorder expanded borderClassName="bg-main-pink">
            <FlatIcon name="fi-rr-plus-small" size={16} />
            <span>Sign In With Google</span>
            <FlatIcon name="fi-rr-plus-small" size={16} />
          </Button>
          <Button size="sm" expanded className="bg-main-beige">
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-main-pink"
              size={16}
            />
            <span className="text-main-pink">Sign In With Google</span>
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-main-pink"
              size={16}
            />
          </Button>
          <Button size="md" expanded className="bg-main-beige">
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-main-pink"
              size={16}
            />
            <span className="text-main-pink">Sign In With Google</span>
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-main-pink"
              size={16}
            />
          </Button>
          <Button size="lg" expanded className="bg-main-beige">
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-main-pink"
              size={16}
            />
            <span className="text-main-pink">Sign In With Google</span>
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-main-pink"
              size={16}
            />
          </Button>
          <Button size="sm" expanded className="bg-sub-purple">
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-white"
              size={16}
            />
            <span className="text-white">Sign In With Google</span>
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-white"
              size={16}
            />
          </Button>
          <Button size="md" expanded className="bg-sub-purple">
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-white"
              size={16}
            />
            <span className="text-white">Sign In With Google</span>
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-white"
              size={16}
            />
          </Button>
          <Button size="lg" expanded className="bg-sub-purple">
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-white"
              size={16}
            />
            <span className="text-white">Sign In With Google</span>
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-white"
              size={16}
            />
          </Button>
        </div>

        {/* Solid Background + Expanded */}
        <div className="mt-2 flex flex-wrap gap-4">
          <Button
            size="sm"
            showBorder
            expanded
            disabled
            borderClassName="bg-main-pink"
          >
            <FlatIcon name="fi-rr-plus-small" size={16} />
            <span>Sign In With Google</span>
            <FlatIcon name="fi-rr-plus-small" size={16} />
          </Button>
          <Button
            size="md"
            showBorder
            expanded
            disabled
            borderClassName="bg-main-pink"
          >
            <FlatIcon name="fi-rr-plus-small" size={16} />
            <span>Sign In With Google</span>
            <FlatIcon name="fi-rr-plus-small" size={16} />
          </Button>
          <Button
            size="lg"
            showBorder
            expanded
            disabled
            borderClassName="bg-main-pink"
          >
            <FlatIcon name="fi-rr-plus-small" size={16} />
            <span>Sign In With Google</span>
            <FlatIcon name="fi-rr-plus-small" size={16} />
          </Button>
          <Button size="sm" expanded disabled className="bg-main-beige">
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-main-pink"
              size={16}
            />
            <span className="text-main-pink">Sign In With Google</span>
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-main-pink"
              size={16}
            />
          </Button>
          <Button size="md" expanded disabled className="bg-main-beige">
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-main-pink"
              size={16}
            />
            <span className="text-main-pink">Sign In With Google</span>
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-main-pink"
              size={16}
            />
          </Button>
          <Button size="lg" expanded disabled className="bg-main-beige">
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-main-pink"
              size={16}
            />
            <span className="text-main-pink">Sign In With Google</span>
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-main-pink"
              size={16}
            />
          </Button>
          <Button size="sm" expanded disabled className="bg-sub-purple">
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-white"
              size={16}
            />
            <span className="text-white">Sign In With Google</span>
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-white"
              size={16}
            />
          </Button>
          <Button size="md" expanded disabled className="bg-sub-purple">
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-white"
              size={16}
            />
            <span className="text-white">Sign In With Google</span>
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-white"
              size={16}
            />
          </Button>
          <Button size="lg" expanded disabled className="bg-sub-purple">
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-white"
              size={16}
            />
            <span className="text-white">Sign In With Google</span>
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-white"
              size={16}
            />
          </Button>
        </div>

        {/* Gradient Background */}
        <div className="mt-2 flex flex-wrap gap-4">
          <Button size="sm" showBorder borderClassName="bg-main-light-pink">
            <FlatIcon name="fi-rr-plus-small" size={16} />
            <span>เลือก</span>
            <FlatIcon name="fi-rr-plus-small" size={16} />
          </Button>
          <Button size="md" showBorder borderClassName="bg-main-light-pink">
            <FlatIcon name="fi-rr-plus-small" size={16} />
            <span>เลือก</span>
            <FlatIcon name="fi-rr-plus-small" size={16} />
          </Button>
          <Button size="lg" showBorder borderClassName="bg-main-light-pink">
            <FlatIcon name="fi-rr-plus-small" size={16} />
            <span>เลือก</span>
            <FlatIcon name="fi-rr-plus-small" size={16} />
          </Button>
          <Button size="sm" className="bg-gradient-beige">
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-main-pink"
              size={16}
            />
            <span className="text-main-pink">เลือก</span>
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-main-pink"
              size={16}
            />
          </Button>
          <Button size="md" className="bg-gradient-beige">
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-main-pink"
              size={16}
            />
            <span className="text-main-pink">เลือก</span>
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-main-pink"
              size={16}
            />
          </Button>
          <Button size="lg" className="bg-gradient-beige">
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-main-pink"
              size={16}
            />
            <span className="text-main-pink">เลือก</span>
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-main-pink"
              size={16}
            />
          </Button>
          <Button size="sm" className="bg-gradient-purple">
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-white"
              size={16}
            />
            <span className="text-white">เลือก</span>
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-white"
              size={16}
            />
          </Button>
          <Button size="md" className="bg-gradient-purple">
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-white"
              size={16}
            />
            <span className="text-white">เลือก</span>
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-white"
              size={16}
            />
          </Button>
          <Button size="lg" className="bg-gradient-purple">
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-white"
              size={16}
            />
            <span className="text-white">เลือก</span>
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-white"
              size={16}
            />
          </Button>
        </div>

        {/* Gradient Background + Expanded */}
        <div className="mt-2 flex flex-wrap gap-4">
          <Button
            size="sm"
            showBorder
            expanded
            borderClassName="bg-main-light-pink"
          >
            <FlatIcon name="fi-rr-plus-small" size={16} />
            <span>Sign In With Google</span>
            <FlatIcon name="fi-rr-plus-small" size={16} />
          </Button>
          <Button
            size="md"
            showBorder
            expanded
            borderClassName="bg-main-light-pink"
          >
            <FlatIcon name="fi-rr-plus-small" size={16} />
            <span>Sign In With Google</span>
            <FlatIcon name="fi-rr-plus-small" size={16} />
          </Button>
          <Button
            size="lg"
            showBorder
            expanded
            borderClassName="bg-main-light-pink"
          >
            <FlatIcon name="fi-rr-plus-small" size={16} />
            <span>Sign In With Google</span>
            <FlatIcon name="fi-rr-plus-small" size={16} />
          </Button>
          <Button size="sm" expanded className="bg-gradient-beige">
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-main-pink"
              size={16}
            />
            <span className="text-main-pink">Sign In With Google</span>
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-main-pink"
              size={16}
            />
          </Button>
          <Button size="md" expanded className="bg-gradient-beige">
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-main-pink"
              size={16}
            />
            <span className="text-main-pink">Sign In With Google</span>
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-main-pink"
              size={16}
            />
          </Button>
          <Button size="lg" expanded className="bg-gradient-beige">
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-main-pink"
              size={16}
            />
            <span className="text-main-pink">Sign In With Google</span>
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-main-pink"
              size={16}
            />
          </Button>
          <Button size="sm" expanded className="bg-gradient-purple">
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-white"
              size={16}
            />
            <span className="text-white">Sign In With Google</span>
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-white"
              size={16}
            />
          </Button>
          <Button size="md" expanded className="bg-gradient-purple">
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-white"
              size={16}
            />
            <span className="text-white">Sign In With Google</span>
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-white"
              size={16}
            />
          </Button>
          <Button size="lg" expanded className="bg-gradient-purple">
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-white"
              size={16}
            />
            <span className="text-white">Sign In With Google</span>
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-white"
              size={16}
            />
          </Button>
        </div>

        {/* Gradient Background + Expanded + Disabled */}
        <div className="mt-2 flex flex-wrap gap-4">
          <Button
            size="sm"
            showBorder
            expanded
            disabled
            borderClassName="bg-main-light-pink"
          >
            <FlatIcon name="fi-rr-plus-small" size={16} />
            <span>Sign In With Google</span>
            <FlatIcon name="fi-rr-plus-small" size={16} />
          </Button>
          <Button
            size="md"
            showBorder
            expanded
            disabled
            borderClassName="bg-main-light-pink"
          >
            <FlatIcon name="fi-rr-plus-small" size={16} />
            <span>Sign In With Google</span>
            <FlatIcon name="fi-rr-plus-small" size={16} />
          </Button>
          <Button
            size="lg"
            showBorder
            expanded
            disabled
            borderClassName="bg-main-light-pink"
          >
            <FlatIcon name="fi-rr-plus-small" size={16} />
            <span>Sign In With Google</span>
            <FlatIcon name="fi-rr-plus-small" size={16} />
          </Button>
          <Button size="sm" expanded disabled className="bg-gradient-beige">
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-main-pink"
              size={16}
            />
            <span className="text-main-pink">Sign In With Google</span>
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-main-pink"
              size={16}
            />
          </Button>
          <Button size="md" expanded disabled className="bg-gradient-beige">
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-main-pink"
              size={16}
            />
            <span className="text-main-pink">Sign In With Google</span>
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-main-pink"
              size={16}
            />
          </Button>
          <Button size="lg" expanded disabled className="bg-gradient-beige">
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-main-pink"
              size={16}
            />
            <span className="text-main-pink">Sign In With Google</span>
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-main-pink"
              size={16}
            />
          </Button>
          <Button size="sm" expanded disabled className="bg-gradient-purple">
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-white"
              size={16}
            />
            <span className="text-white">Sign In With Google</span>
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-white"
              size={16}
            />
          </Button>
          <Button size="md" expanded disabled className="bg-gradient-purple">
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-white"
              size={16}
            />
            <span className="text-white">Sign In With Google</span>
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-white"
              size={16}
            />
          </Button>
          <Button size="lg" expanded disabled className="bg-gradient-purple">
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-white"
              size={16}
            />
            <span className="text-white">Sign In With Google</span>
            <FlatIcon
              name="fi-rr-plus-small"
              className="text-white"
              size={16}
            />
          </Button>
        </div>

        {/* Play Lab */}
        <div className="mt-8 flex flex-wrap gap-4">
          <Button
            size="sm"
            showBorder
            expanded
            borderWidth={20}
            className="bg-gradient-beige"
            borderClassName="bg-gradient-pink"
            onClick={() => {
              alert('Test Test')
            }}
          >
            <FlatIcon name="fi-rr-plus-small text-main-pink" size={16} />
            <span className="text-main-pink">Sign In With Google</span>
            <FlatIcon name="fi-rr-plus-small text-main-pink" size={16} />
          </Button>
          <Button
            size="sm"
            showBorder
            expanded
            borderWidth={5}
            className="bg-gradient-beige"
            borderClassName="bg-gradient-purple"
            onClick={() => {
              alert('Test Test')
            }}
          >
            <FlatIcon name="fi-rr-plus-small text-main-pink" size={16} />
            <span className="text-main-pink">Sign In With Google</span>
            <FlatIcon name="fi-rr-plus-small text-main-pink" size={16} />
          </Button>
        </div>
      </div>

      <div className="">
        <h1 className="text-2xl font-semibold">{t('test.piece')}</h1>

        <Piece variant={1} size={120} count={1} />
        <Piece variant={2} size={120} count={1} />
        {/* <Piece variant={3} size={120} count={1} /> */}
        <Piece variant={4} size={120} count={1} />
        <Piece variant={5} size={120} count={1} />
        <Piece variant={6} size={120} count={1} />

        <Piece variant={1} size={120} />
        <Piece variant={2} size={120} />
        {/* <Piece variant={3} size={120} /> */}
        <Piece variant={4} size={120} />
        <Piece variant={5} size={120} />
        <Piece variant={6} size={120} />
      </div>
    </div>
  )
}