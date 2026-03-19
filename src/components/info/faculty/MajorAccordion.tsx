import { Major } from '@/components/const/faculty'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useTranslation } from 'react-i18next'

interface MajorAccordionProps {
  major: Major
}

const MajorAccordion = ({ major }: MajorAccordionProps) => {
  const { id, name, description, fieldDescription } = major
  const { t } = useTranslation()
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={id}
      className="border-main-pink rounded-md border"
    >
      <AccordionItem value={id}>
        <AccordionTrigger className="bg-main-pink rounded-t-md p-3 text-white">
          {name}
        </AccordionTrigger>
        <AccordionContent className="px-3 py-4">
          {description &&
            description.trim() !== '' &&
            description.trim() != '-' && (
              <div>
                <p className="text-sm font-semibold text-black">
                  {t('routes.infoGroup.facultyGroup.major')}
                </p>
                <span className="text-xs text-black">{description}</span>
              </div>
            )}

          {fieldDescription &&
            fieldDescription.trim() !== '' &&
            fieldDescription.trim() != '-' && (
              <>
                <br />
                <div>
                  <p className="text-sm font-semibold text-black">
                    {t('routes.infoGroup.facultyGroup.fields')}
                  </p>
                  <span className="text-xs text-black">{fieldDescription}</span>
                </div>
              </>
            )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default MajorAccordion
