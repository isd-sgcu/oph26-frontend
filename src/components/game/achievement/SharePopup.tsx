import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { FlatIcon } from '@/components/FlatIcon'
import i18n from '@/lib/i18n'
import { Achievement } from '@/types/achievement'
import {
  achievementShare1,
  achievementShare2,
  achievementShare3,
  achievementShareCollectedPieces,
  achievementShareOverall,
} from '@/utils/achievementShareTemplate.tsx'

type Props = {
  open: boolean
  onClose: () => void
  achievement: Achievement | null
  name: string
}

const SharePopup = ({ open, onClose, achievement, name }: Props) => {
  const [image, setImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)

  const generatingRef = useRef(false)
  const hasGenerated = useRef(false)

  useEffect(() => {
    if (!open || hasGenerated.current) return

    hasGenerated.current = true
    setVisible(true)
    generateImage()
  }, [open])

  const generateImage = async () => {
    if (generatingRef.current) return
    generatingRef.current = true

    try {
      setLoading(true)

      const lang = i18n.language === 'th' ? 0 : 1

      if (achievement?.variant === 'var1') {
        const result = await achievementShare1(name, achievement.stat, lang)
        setImage(result)
      } else if (achievement?.variant === 'var2') {
        const result = await achievementShare2(
          name,
          achievement.stat,
          achievement.top,
          lang
        )
        setImage(result)
      } else if (achievement?.variant === 'var3') {
        const result = await achievementShare3(
          name,
          achievement.stat,
          achievement.faculty,
          lang
        )
        setImage(result)
      } else if (achievement?.variant === 'overall') {
        const result = await achievementShareOverall(
          name,
          achievement.stat,
          achievement.miniCard1Faculty,
          achievement.miniCard1Count,
          achievement.miniCard2Rank,
          lang
        )
        setImage(result)
      } else if (achievement?.variant === 'collectedPieces') {
        const result = await achievementShareCollectedPieces(
          name,
          achievement,
          lang
        )
        setImage(result)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
      generatingRef.current = false
    }
  }

  const handleShare = async () => {
    if (!image) return

    try {
      const blob = await (await fetch(image)).blob()

      const file = new File([blob], 'game-share.png', {
        type: 'image/png',
      })

      // Try native share
      if (
        navigator.share &&
        navigator.canShare &&
        navigator.canShare({ files: [file] })
      ) {
        await navigator.share({
          files: [file],
          title: 'My Game Result',
        })
        return
      }

      // fallback
      downloadImage(image)
    } catch (err) {
      console.error('Share failed:', err)
      downloadImage(image)
    }
  }

  const downloadImage = (url: string) => {
    const a = document.createElement('a')
    a.href = url
    a.download = 'game-share.png'
    a.click()
  }

  const handleClose = () => {
    hasGenerated.current = false
    setVisible(false)

    setTimeout(() => {
      setImage(null)
      onClose()
    }, 300)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      <div
        className={`bg-main-beige relative flex h-[calc(100dvh-64px)] w-full transform flex-col items-center rounded-t-2xl py-8 [box-shadow:inset_1px_1px_5px_0_rgba(0,0,0,0.3)] transition-transform duration-300 ease-out ${visible ? 'translate-y-0' : 'translate-y-full'}`}
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

        <div className="flex w-full flex-1 items-center justify-center overflow-hidden">
          {loading && (
            <div className="flex items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-pink-400 border-t-transparent" />
            </div>
          )}

          {!loading && image && (
            <img
              src={image}
              alt="Achievement Share"
              className="max-h-full max-w-full rounded-lg object-contain shadow-md"
            />
          )}
        </div>

        <div className="mt-5">
          <Button
            size="lg"
            className="bg-gradient-purple"
            onClick={handleShare}
          >
            <span className="text-white">
              {i18n.language === 'th' ? 'บันทึกภาพ' : 'Save Image'}
            </span>
            <FlatIcon name="fi-rr-download" className="text-white" size={16} />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SharePopup
