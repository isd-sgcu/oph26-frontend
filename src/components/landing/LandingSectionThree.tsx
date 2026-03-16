import { FlatIcon } from '../FlatIcon'

export default function LandingSectionThree() {
  return (
    <div className="bg-gradient-pink-oval flex w-full items-center justify-center py-8 text-white">
      <a
        href="https://www.youtube.com/@seeyouatcu8904"
        className="flex items-center justify-center gap-8"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="flex items-center justify-center gap-2">
          <img src="/logo/youtube.svg" alt="" />
          <span className="text-2xl font-bold">: See You AT CU</span>
        </div>
        <FlatIcon name="fi-rr-angle-double-right" size={16} />
      </a>
    </div>
  )
}
