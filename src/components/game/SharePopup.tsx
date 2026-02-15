import { useEffect, useState } from 'react'
import { captureGameMap } from '@/utils/captureMap'
import { Button } from '../ui/button'
import { FlatIcon } from '../FlatIcon'
import { processWatermarkTemplate } from '@/utils/shareTemplates'

type Props = {
  open: boolean
  onClose: () => void
}

const GameSharePopup = ({ open, onClose }: Props) => {
  const [image, setImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (open) {
      setVisible(true)
      generateImage()
    }
  }, [open])

  const generateImage = async () => {
    try {
      setLoading(true)
      const img = await captureGameMap()
      const watermark = await processWatermarkTemplate(
        img,
        '/logo.svg'
        )
      setImage(watermark)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setVisible(false)
    setTimeout(() => {
      setImage(null)
      onClose()
    }, 300) // match animation duration
  }

  if (!open) return null

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end">
        <div
            className={`relative w-full rounded-t-2xl bg-main-beige py-8
            flex flex-col items-center gap-6
            [box-shadow:inset_1px_1px_5px_0_rgba(0,0,0,0.3)]
            transform transition-transform duration-300 ease-out
            ${visible ? 'translate-y-0' : 'translate-y-full'}`}
        >
            <div className="relative w-full mb-4 flex items-center justify-center">
                <h2 className="text-4xl font-bold text-main-pink">
                    Share
                </h2>

                <button
                    onClick={handleClose}
                    className="absolute right-[10%] font-bold text-lg text-main-pink"
                >
                    ✕
                </button>
            </div>

            {loading && (
            <div className="flex h-50 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-pink-400 border-t-transparent" />
            </div>
            )}

            {!loading && image && (
            <>
                <img src={image} alt="preview" className="mb-4 rounded" />
            </>
            )}

            <Button 
            size="lg" className="bg-gradient-purple"
            
            >
                <FlatIcon
                name="fi-rr-plus-small"
                className="text-white"
                size={16}
                />
                <span className="text-white">เลือก</span>
                <FlatIcon
                name="fi-rr-plus-small"
                className="text-white"
                size={16}
                />
          </Button>
        </div>
    </div>
  )
}

export default GameSharePopup
