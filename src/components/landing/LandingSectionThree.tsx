import { FlatIcon } from '../FlatIcon'

export default function LandingSectionThree() {
  return (
    <div className="flex justify-center items-center bg-gradient-pink-oval py-8 w-full text-white">
      <a
        href="https://youtube.com/@cu.openhouse?si=q2Z-HK0zN_SL-9dH"
        className="flex justify-center items-center gap-8"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="flex justify-center items-center gap-2">
          <img src="/logo/youtube.svg" alt="" />
          <span className="font-bold text-2xl">: See You AT CU</span>
        </div>
        <FlatIcon name="fi-rr-angle-double-right" size={16} />
      </a>
    </div>
  )
}
