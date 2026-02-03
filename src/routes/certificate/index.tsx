import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/certificate/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation()
  return (
    <div className="to-main-pink relative flex w-full flex-col bg-linear-to-b from-[#ECECD2] to-10%">
      {/* Decorations */}
      <img
        src="/questionaire/blue_flower.png"
        alt="Blue Flower"
        style={{
          width: 50,
          height: 50,
        }}
        className="absolute top-0 left-0"
      />
      <img
        src="/questionaire/yellow_flower.png"
        alt="Yellow Flower"
        style={{
          width: 50,
          height: 50,
        }}
        className="absolute top-0 right-0"
      />

      {/* Left Road */}
      <img
        src="/background/road2.svg"
        alt="Left Road"
        className="absolute"
        style={{
          width: 'clamp(250px, 60vw, 250px)',
          left: 0,
          bottom: 0,
        }}
      />

      {/* Right Road */}
      <img
        src="/background/road2.svg"
        alt="Right Road"
        className="absolute"
        style={{
          width: 'clamp(250px, 60vw, 250px)',
          right: 0,
          bottom: 0,
          transform: 'rotateY(180deg)',
        }}
      />

      {/* Blue Flower */}
      <img
        src="/questionaire/blue_flower.png"
        alt="Blue Flower"
        style={{
          width: 50,
          height: 50,
        }}
        className="absolute bottom-4 left-[35%]"
      />

      {/* Yellow Flower */}
      <img
        src="/questionaire/yellow_flower.png"
        alt="Yellow Flower"
        style={{
          width: 50,
          height: 50,
        }}
        className="absolute right-[35%] bottom-4"
      />

      {/* Blue Tree */}
      <img
        src="/questionaire/blue_tree.png"
        alt="Blue True"
        style={{
          width: 120,
          height: 140,
        }}
        className="absolute right-0 bottom-0"
      />

      {/* Yellow Tree */}
      <img
        src="/questionaire/yellow_tree.png"
        alt="Yellow Tree"
        style={{
          width: 40,
          height: 100,
        }}
        className="absolute bottom-0 left-[10%]"
      />

      {/* Green Bush */}
      <img
        src="/questionaire/green_bush.png"
        alt="Green Bush"
        style={{
          width: 64,
          height: 32,
        }}
        className="absolute bottom-0 left-0"
      />

      {/* Content */}
      <div className="relative z-10 flex h-fit w-full flex-1 flex-col pt-16">
        <h1 className="mb-8 px-4 text-center text-2xl font-bold wrap-break-word text-white text-shadow-xs">
          <span className="block">{t('routes.certificateGroup.title')}</span>
          <span className="block">Chula Openhouse 2026</span>
        </h1>
      </div>
    </div>
  )
}
