import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { FlatIcon } from './FlatIcon'

interface CustomModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void

  iconName?: string // Note: fi-rr-*
  title: string | React.ReactNode
  subtitle?: string | React.ReactNode
  body?: string | React.ReactNode
  detail?: string | React.ReactNode

  buttonText: string
  onClick: () => void
}

const CustomModal = ({
  open,
  onOpenChange,
  iconName,
  title,
  subtitle,
  body,
  detail,
  buttonText,
  onClick = () => { },
}: CustomModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col items-center gap-3 p-6 rounded-2xl w-[90vw] max-w-90 h-fit">
        {/* Icon */}
        {iconName && (
          <FlatIcon name={iconName} size={48} className="text-main-pink" />
        )}

        {/* Title */}
        <DialogTitle className="mt-2 font-bold text-black text-2xl text-center">
          {title}
        </DialogTitle>

        {/* Subtitle */}
        {subtitle && (
          <p className="font-normal text-grey text-sm text-center">
            {subtitle}
          </p>
        )}

        {/* Body */}
        {body && (
          <p className="mt-2 font-semibold text-black text-xl text-center">
            {body}
          </p>
        )}

        {/* Detail */}
        {detail && (
          <p className="font-medium text-black text-base text-center">
            {detail}
          </p>
        )}

        {/* Button */}
        <Button
          className="bg-gradient-purple mt-6 text-white"
          size="sm"
          onClick={onClick}
        >
          {buttonText}
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default CustomModal
