import { Plane } from "lucide-react";
import QRCode from "react-qr-code";
import clsx from "clsx";

interface Props {
  id: string,
  firstName: string,
  lastName: string,
  status: boolean,
  dreamFaculties: string[],
}

export default function Ticket({
  id,
  firstName,
  lastName,
  status,
  dreamFaculties,
}: Props) {
  const isHasDream = dreamFaculties.length > 0;

  return (
    <div className="relative px-5 w-full">
      <div className="top-20 z-30 relative drop-shadow-lg w-full">
        <img src="/logo/cu-journey.svg" alt="CU Journey" className="mx-auto" />
      </div>

      {/* Ticket Body */}
      <div
        className="relative bg-sub-beige shadow-lg px-8 pt-14 pb-8 rounded-[2.5rem] overflow-visible"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% calc(50% - 20px), calc(100% - 1rem) calc(50% - 20px), calc(100% - 1rem) calc(50% + 20px), 100% calc(50% + 20px), 100% 100%, 0 100%, 0 calc(50% + 20px), 1rem calc(50% + 20px), 1rem calc(50% - 20px), 0 calc(50% - 20px))'
        }}
      >
        <div className="flex flex-col gap-3">
          <div className="inline-block px-2 py-1 border border-[#AEAEB2] rounded-full w-fit font-medium text-[#8E8E93] text-sm">
            CU-TICKET
          </div>

          <div className="flex justify-between items-center w-full">
            <div>
              <p className="font-semibold text-sm">28-29</p>
              <p className="font-semibold text-[#8E8E93] text-xs">March 2026</p>
            </div>
            <Plane className="rotate-45" fill="currentColor" size={20} />
            <div className="text-right">
              <p className="font-semibold text-sm">Chulalongkorn</p>
              <p className="font-semibold text-[#8E8E93] text-xs">University</p>
            </div>
          </div>

          <div>
            <p className="font-medium text-[#8E8E93] text-xs/loose">Student</p>
            <h1 className="font-semibold text-xl leading-tight">
              {firstName}<br />{lastName}
            </h1>
          </div>

          <hr className={clsx(isHasDream ? "border-[#AEAEB2]" : "border-transparent")} />

          <div className="flex justify-between items-start w-full">
            <div className={clsx(!isHasDream && "invisible min-h-30")}>
              <p className="font-medium text-[#8E8E93] text-xs/loose">Dream Faculties</p>
              {
                dreamFaculties.map((role) => {
                  return (
                    <p key={role} className="font-semibold text-xs">{role}</p>
                  )
                })
              }
            </div>
            {
              status && (<img src="/auth/profile/ticket/landing/scanned.svg" alt="" className="right-10 absolute w-35" />)
            }
          </div>
        </div>

        {/* Perforated Divider */}
        <div className="relative -mx-10 my-10">
          <div className="border-[#B0B0B0] border-t-2 border-dashed w-full" />
        </div>

        {/* QR Code Section */}
        <div className="flex flex-col items-center gap-2.5 pt-3">
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "300px", width: "90%" }}
            value={id}
            viewBox={`0 0 256 256`}
            bgColor={"#fff8ef"}
            fgColor={"#000"}
            level={"H"}
          />
          <p className="font-medium text-sm">{'ID' + id}</p>
        </div>
      </div>
    </div>
  );
}