import { Dialog, DialogContent, DialogTitle } from '../ui/dialog'

interface RedeemCodePopupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const RedeemCodePopup = ({ open, onOpenChange }: RedeemCodePopupProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-fit w-[90vw] max-w-90 flex-col items-center gap-3 rounded-2xl p-6">
        {/* Title */}
        <DialogTitle className="mt-2 text-center text-2xl font-bold text-black">
          Test Test
        </DialogTitle>
      </DialogContent>
    </Dialog>
  )
}

export default RedeemCodePopup
