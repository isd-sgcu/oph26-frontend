import clsx from "clsx";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useTranslation } from "react-i18next";

export default function LandingSectionFour() {
  const { t } = useTranslation();
  const faqs = [
    {
      index: "0",
      question: "งาน CU Open House 2026 จัดขึ้นวันที่เท่าไหร่?",
      answer:
        "28 - 29 มีนาคม 2026 เวลา 08:00 - 16:00 น.",
    },
    {
      index: "1",
      question: "งานจัดที่ไหน?",
      answer:
        "งาน CU Open House 2026 มี 2 ส่วนด้วยกัน \n1. งานกิจกรรมส่วนกลาง @ จัดที่ศาลาพระเกี้ยว มีบูธจากทุกคณะในจุฬาฯ รวมถึงคณะแพทย์ด้วย! สามารถมาปรึกษาพี่ ๆ จาก 19 คณะ 1 สถาบัน และพิเศษ ในปีนี้มีพี่ ๆ จากหอพักนิสิต และชมรมต่าง ๆ มาพูดคุยด้วย อีกทั้งเรายังมีกิจกรรมตามล่าหาแสตมป์ ตาม journey ในจุฬา เพื่อแลกรับของรางวัล กิจกรรมปรึกษาเรื่องความเป็นอยู่ในจุฬาที่บูธกิจกรรมกลาง และเสวนาต่าง ๆ บนเวทีกลางรออยู่! \n 2. กิจกรรมของคณะ @ จัดที่คณะต่าง ๆ ปีนี้คณะต่าง ๆ ภายในจุฬาก็ได้จัดกิจกรรมที่คณะตนเอง รอให้น้อง ๆ จับจองที่นั่งเข้าร่วมอยู่!",
    },
    {
      index: "2",
      question: "ต้องลงทะเบียนหรือไม่?",
      answer:
        "ต้องลงทะเบียนเข้าร่วมงานทุกคน! โดยแบ่งการลงทะเบียนเป็น 2 ส่วน ตามการจัดงานเลย ได้แก่ \n1.ลงทะเบียนส่วนกลาง \n\t1.1. ลงทะเบียนผ่านเว็บไซต์กลาง cuopenhouse2026.com (เว็บไซต์นี้) \n\t1.2.ทุกคนต้องลงทะเบียน เพื่อให้ได้ QR Code ประจำตัว นำไปให้พี่ ๆ แสกนก่อนเข้างานทุกที่ เช่น ก่อนเข้างานที่ศาลาพระเกี้ยว, ก่อนเข้าร่วมงานที่คณะนิติศาสตร์ \n\t1.3. ไม่มีการจำกัดจำนวนเข้าร่วม \n\t1.4.สามารถลงได้เรื่อย ๆ ตั้งแต่วันนี้ จนถึงวันงาน! \n2. ลงทะเบียนเข้าร่วมกิจกรรม \n\t2.1. ติดตามได้ผ่าน ig ของคณะต่าง ๆ หรือ เลือกกิจกรรมคณะที่สนใจ และคลิกลิงก์ได้ ผ่านเว็บไซต์นี้ \n\t2.2. สามารถเลือกลงทะเบียนเข้าร่วมกิจกรรมของคณะที่สนใจ เช่น ห้องเรียนจำลอง, การแสดง, ห้องแล็ป \n\t2.3. สามารถเลือกลงกี่คณะก็ได้ แต่ต้องจัดสรรเวลาให้ไม่ซ้อนกัน",
    },
    {
      index: "3",
      question: "ใครสามารถเข้าร่วมได้บ้าง?",
      answer:
        "ทุกคนสามารถเข้าร่วมงานได้ เพียงแค่ลงทะเบียนผ่านเว็บไซต์นี้ แม้แต่ผู้ปกครองที่ต้องการเข้าร่วมพร้อมน้อง ๆ !",
    },
    {
      index: "4",
      question: "ต้องใส่ชุดอะไร?",
      answer:
        "สามารถเลือกใส่ชุดที่น้อง ๆ มั่นใจได้เลย! โดยอยากให้คำนึงถึงความสะดวกสบาย และสภาพอากาศในเดือนนั้น ๆ",
    },
    {
      index: "5",
      question: "มีที่จอดรถหรือไม่?",
      answer:
        "สามารถเลือกจอดได้ภายในจุฬา เช่น ตึกจามจุรี 9, อาคารรัฐศาสตร์ หรือรอบ ๆ จุฬา เช่น สามย่านมิตรทาวน์, block 28, ใต้หอพัก u-center, สยามสแควร์, mbk และอื่น ๆ",
    },
  ];

  return (
    <div className="flex flex-col gap-4 px-5 pt-10 pb-20">
      <h1 className="text-shadow-xs font-bold text-white text-4xl text-center">
        {t('routes.landingGroup.faq.title')}
      </h1>
      <Accordion type="single" collapsible defaultValue={"1"} className="space-y-4">
        {
          faqs.map((faq) => (
            <AccordionItem value={faq.index} key={faq.index} className="border-0">
              <AccordionTrigger
                className={clsx(
                  "bg-white px-4 py-2 rounded-t-[10px] font-normal text-sm leading-5 transition-all duration-300",
                  "data-[state=closed]:rounded-b-[10px]",
                  "hover:bg-gray-50"
                )}
              >
                {faq.question}
              </AccordionTrigger>
              <AccordionContent
                className={clsx(
                  "bg-main-beige px-4! py-2! rounded-b-[10px] font-normal text-xs leading-4.5 by-1",
                  "overflow-hidden whitespace-pre-line transition-all duration-300 ease-in-out",
                  "data-[state=closed]:animate-accordion-up",
                  "data-[state=open]:animate-accordion-down"
                )}
              >
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))
        }
      </Accordion>
    </div>
  );
}
