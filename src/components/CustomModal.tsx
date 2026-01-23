import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { FlatIcon } from './FlatIcon'

interface CustomModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void

  iconName?: string // Note: fi-rr-*
  title: string
  subtitle?: string
  body?: string
  detail?: string

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
  onClick = () => {},
}: CustomModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-fit w-[90vw] max-w-90 flex-col items-center gap-3 rounded-2xl p-6">
        {/* Icon */}
        {iconName && (
          <FlatIcon name={iconName} size={48} className="text-main-pink" />
        )}

        {/* Title */}
        <DialogTitle className="mt-2 text-center text-2xl font-bold text-black">
          {title}
        </DialogTitle>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-grey text-center text-sm font-normal">
            {subtitle}
          </p>
        )}

        {/* Body */}
        {body && (
          <p className="mt-2 text-center text-xl font-semibold text-black">
            {body}
          </p>
        )}

        {/* Detail */}
        {detail && (
          <p className="text-center text-base font-medium text-black">
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
