import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export default function QuestionSection() {
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
    <div className="flex flex-col gap-4">
      <p className="text-shadow-xl py-8 font-bold text-white text-4xl">
        FAQs ?
      </p>
      <Accordion type="single" collapsible defaultValue={"1"}>
        {
          faqs.map((faq) => (
            <AccordionItem value={faq.index} key={faq.index}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))
        }
      </Accordion>
    </div>
  );
}