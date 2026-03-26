import { useEffect, useRef, useState } from 'react'
import { captureGameMap } from '@/utils/captureMap'
import { Button } from '../ui/button'
import { FlatIcon } from '../FlatIcon'
import {
  processWatermarkTemplate,
  processFramedTemplate,
} from '@/utils/shareTemplates'
import i18n from '@/lib/i18n'
import { useGame } from '@/contexts/GameContext'
import { useUser } from '@/contexts/UserContext'

type Props = {
  open: boolean
  onClose: () => void
}

const GameSharePopup = ({ open, onClose }: Props) => {
  const [image, setImage] = useState<string[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const userContext = useUser()
  if (!userContext) {
    return null
  }

  const attendee = userContext.attendee

  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const { collectedPieces, fetching } = useGame()

  useEffect(() => {
    if (open && !fetching) {
      setVisible(true)
      generateImage()
      console.log(collectedPieces)
    }
  }, [open, fetching])

  const generateImage = async () => {
    try {
      setLoading(true)

      const { img, img2 } = await captureGameMap(collectedPieces)

      const watermark = await processWatermarkTemplate(
        img,
        '/logo/cu-journey.webp'
      )

      // Determine lang: 0 = th, 1 = en
      const lang = i18n.language === 'th' ? 0 : 1

      const framed = await processFramedTemplate(
        img,
        attendee ? attendee.firstname + ' ' + attendee.surname : 'N/A',
        Object.values(collectedPieces)
          .filter((v) => v > 0)
          .length.toString(),
        '/background/shareTemplate1.svg',
        '/logo/cu-journey.webp',
        lang
      )

      const framed2 = await processFramedTemplate(
        img2,
        attendee ? attendee.firstname + ' ' + attendee.surname : 'N/A',
        Object.values(collectedPieces)
          .filter((v) => v > 0)
          .length.toString(),
        '/background/shareTemplate1.svg',
        '/logo/cu-journey.webp',
        lang
      )

      setImage([framed, framed2, watermark])
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
    const selectedImage = image?.[activeIndex - 1]
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
      if (image) {
        image.forEach((url) => URL.revokeObjectURL(url))
      }
      setImage(null)
      onClose()
    }, 300)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      <div
        className={`bg-main-beige relative flex h-[calc(100dvh-64px)] w-full transform flex-col items-center gap-6 rounded-t-2xl py-8 [box-shadow:inset_1px_1px_5px_0_rgba(0,0,0,0.3)] transition-transform duration-300 ease-out ${visible ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="relative mb-4 flex w-full items-center justify-center">
          <h2 className="text-main-pink text-4xl font-bold">Share</h2>

          <button
            onClick={handleClose}
            className="text-main-pink absolute right-[10%] text-lg font-bold"
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
          <div className="relative flex h-[65dvh] w-full min-w-0 overflow-hidden">
            <div
              className="flex h-full snap-x snap-mandatory flex-nowrap overflow-x-auto"
              ref={scrollRef}
              onScroll={handleScroll}
            >
              {/* {image.map((img, i) => (
                <img key={i} src={img} alt="preview" className="mb-4 rounded" />
            ))} */}
              {/* Left spacer */}
              <div className="w-1/2 shrink-0" />

              <div className="flex shrink-0 snap-center justify-center px-3">
                <img src={image[0]} alt="preview" className="mb-4 rounded" />
              </div>

              <div className="flex shrink-0 snap-center justify-center px-3">
                <img src={image[1]} alt="preview" className="mb-4 rounded" />
              </div>

              <div className="flex snap-center items-center justify-center px-3">
                <div className="aspect-square w-[80vw] max-w-85">
                  <img
                    src={image[2]}
                    alt="preview"
                    className="h-auto w-full rounded object-cover shadow-[1px_5px_5px_rgba(0,0,0,0.3)]"
                  />
                </div>
              </div>

              {/* Right spacer */}
              <div className="w-1/2 shrink-0" />
            </div>
          </div>
        )}

        <Button size="lg" className="bg-gradient-purple" onClick={handleShare}>
          <span className="text-white">
            {i18n.language === 'th' ? 'บันทึกภาพ' : 'Save Image'}
          </span>
          <FlatIcon name="fi-rr-download" className="text-white" size={16} />
        </Button>
      </div>
    </div>
  )
}

export default GameSharePopup
