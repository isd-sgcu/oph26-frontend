import { useEffect, useRef, useState } from 'react'
import { captureGameMap } from '@/utils/captureMap'
import { Button } from '../ui/button'
import { FlatIcon } from '../FlatIcon'
import { processWatermarkTemplate, processFramedTemplate } from '@/utils/shareTemplates'

type Props = {
  open: boolean
  onClose: () => void
}

const GameSharePopup = ({ open, onClose }: Props) => {
  const [image, setImage] = useState<string[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)

  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement | null>(null)

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
      const framed = await processFramedTemplate(img, 'N\'Jaramed', '8', '/background/shareTemplate1.svg', '/logo.svg')
      setImage([framed, watermark])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleScroll = () => {
    if (!scrollRef.current) return

    const container = scrollRef.current
    const slides = Array.from(container.children)

    const containerCenter = container.scrollLeft + container.offsetWidth / 2

    let closestIndex = 0
    let closestDistance = Infinity

    slides.forEach((slide, index) => {
      const el = slide as HTMLElement
      const slideCenter = el.offsetLeft + el.offsetWidth / 2
      const distance = Math.abs(containerCenter - slideCenter)

      if (distance < closestDistance) {
        closestDistance = distance
        closestIndex = index
      }
    })

    setActiveIndex(closestIndex)
  }

  const handleShare = async () => {
    const selectedImage = image?.[activeIndex-1]
    if (!selectedImage) return

    try {
      const response = await fetch(selectedImage)
      const blob = await response.blob()

      const file = new File([blob], 'game-share.png', {
        type: 'image/png',
      })

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'My Game Result',
        })
      } else {
        downloadImage(selectedImage)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const downloadImage = (url: string) => {
    const a = document.createElement('a')
    a.href = url
    a.download = 'game-share.png'
    a.click()
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
        <div className="flex h-[65dvh] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-pink-400 border-t-transparent" />
        </div>
        )}

        {!loading && image && (
        <div className="flex h-[65dvh] w-full min-w-0 overflow-hidden relative">
          <div 
          className='flex flex-nowrap overflow-x-auto snap-x snap-mandatory h-full'
          ref={scrollRef}
          onScroll={handleScroll}
          >
            {/* {image.map((img, i) => (
                <img key={i} src={img} alt="preview" className="mb-4 rounded" />
            ))} */}
            {/* Left spacer */}
            <div className="shrink-0 w-1/2" />

            <div className='snap-center shrink-0 px-3 flex justify-center'>
              <img src={image[0]} alt="preview" className="mb-4 rounded" />
            </div>

            <div className="snap-center px-3 flex justify-center items-center">
              <div className="w-[80vw] max-w-85 aspect-square">
                <img
                  src={image[1]}
                  alt="preview"
                  className="w-full h-auto object-cover rounded"
                />
              </div>
            </div>
            
            {/* Right spacer */}
            <div className="shrink-0 w-1/2" />
          </div>
        </div>
        )}

        <Button 
        size="lg" className="bg-gradient-purple"
        onClick={handleShare}
        >
          <FlatIcon
          name="fi-rr-plus-small"
          className="text-white"
          size={16}
          />
          <span className="text-white">เลือก {activeIndex}</span>
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
