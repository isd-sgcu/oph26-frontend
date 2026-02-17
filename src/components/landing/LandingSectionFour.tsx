import clsx from "clsx";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export default function LandingSectionFour() {
  const faqs = [
    {
      index: "0",
      question: "What is CU Openhouse 2026?",
      answer:
        "CU Openhouse 2026 is an event organized by Chulalongkorn University to showcase our academic programs, campus facilities, and student life to prospective students and their families.",
    },
    {
      index: "1",
      question: "When and where will CU Openhouse 2026 take place?",
      answer:
        "CU Openhouse 2026 will be held on March 28-29, 2026, at Chulalongkorn University's main campus in Bangkok, Thailand.",
    },
    {
      index: "2",
      question: "How can I register for CU Openhouse 2026?",
      answer:
        "You can register for CU Openhouse 2026 through our official website. Registration details will be available closer to the event date.",
    }
  ];

  return (
    <div className="flex flex-col gap-4 px-5 pt-10 pb-20">
      <h1 className="text-shadow-xs font-bold text-white text-4xl text-center">
        FAQs ?
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
                  "overflow-hidden transition-all duration-300 ease-in-out",
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