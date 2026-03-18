import { FACULTIES } from '@/components/const/faculty'
import { FlatIcon } from '@/components/FlatIcon'
import { Piece } from '@/components/game/Piece'
import { Button } from '@/components/ui/button'
import { useUser } from '@/contexts/UserContext'
import { getMyPiece, MyPiece } from '@/services/pieces/piece'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/game/piece/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { i18n, t } = useTranslation()
  const copyTimeoutRef = useRef<number | null>(null)
  const router = useRouter()
  const userContext = useUser()
  if (!userContext) {
    return null
  }

  const [openMyCode, setOpenMyCode] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [piece, setPiece] = useState<MyPiece | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMyPiece() {
      setLoading(true)
      try {
        const myPiece = await getMyPiece()
        if (myPiece) {
          setPiece(myPiece)
          if (!localStorage.getItem(`showPieceCode_${myPiece.id}`)) {
            localStorage.setItem(`showPieceCode_${myPiece.id}`, 'false')
          }
        }
      } catch (error) {
        router.navigate({ to: '/' })
        return
      } finally {
        setLoading(false)
      }
    }

    fetchMyPiece()
  }, [])

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current)
      }
    }
  }, [])

  function formatDateTime(date: string | undefined) {
    if (!date) return ''
    let d = new Date(date)
    const months = {
      th: [
        'ม.ค.',
        'ก.พ.',
        'มี.ค.',
        'เม.ย.',
        'พ.ค.',
        'มิ.ย.',
        'ก.ค.',
        'ส.ค.',
        'ก.ย.',
        'ต.ค.',
        'พ.ย.',
        'ธ.ค.',
      ],
      en: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    }

    const lang = i18n.language as 'th' | 'en'

    const day = d.getDate()
    const month = months[lang][d.getMonth()]
    const year = lang === 'th' ? d.getFullYear() + 543 : d.getFullYear()

    const hour = d.getHours().toString().padStart(2, '0')
    const minute = d.getMinutes().toString().padStart(2, '0')

    return lang === 'th'
      ? `${day} ${month} ${year} ${hour}.${minute} น.`
      : `${day} ${month} ${year} ${hour}.${minute}`
  }

  if (loading) {
    return (
      <div className="bg-main-light-pink relative flex-1 overflow-hidden">
        <p>Loading...</p>
      </div>
    )
  }

  const selectedFaculty = FACULTIES.find((f) => f.value == piece?.faculty)

  return (
    <div className="bg-main-light-pink relative flex-1 overflow-hidden">
      {/* Content  */}
      <div className={`relative z-10 flex w-full flex-col px-4 py-8`}>
        <h1 className="text-center text-3xl font-bold text-white text-shadow-md">
          My Piece
        </h1>

        {/* Content */}
        <div
          className={`bg-main-beige mt-4 mb-24 flex h-full w-full flex-col items-center rounded-xl px-4 py-8`}
        >
          {/* Header */}
          <h2 className="text-main-pink mb-3 text-center text-2xl font-semibold break-all">
            {selectedFaculty?.label[i18n.language as 'th' | 'en'] ?? ''}
          </h2>

          {/* My Piece */}
          <Piece
            faculty={selectedFaculty?.value}
            variant={selectedFaculty?.variant}
            count={1}
            size={245}
          />

          {openMyCode ? (
            <>
              {/* Code */}
              <p className="text-main-pink mt-3 text-xl font-semibold">Code</p>
              <button
                className="my-1 flex h-16 w-full items-center rounded-full bg-white shadow-md"
                onClick={() => {
                  navigator.clipboard.writeText(piece?.piece_code ?? '')
                  setIsCopied(true)
                  if (copyTimeoutRef.current) {
                    clearTimeout(copyTimeoutRef.current)
                  }

                  copyTimeoutRef.current = window.setTimeout(() => {
                    setIsCopied(false)
                    copyTimeoutRef.current = null
                  }, 3000)
                }}
              >
                <span className="text-main-pink flex-1 px-2 text-center text-2xl font-medium">
                  {piece?.piece_code ?? ''}
                </span>
                <span className="bg-gradient-purple flex h-full cursor-pointer items-center rounded-r-full px-5 py-2">
                  <FlatIcon
                    className="px-0 text-white"
                    name="fi-rr-copy"
                    size={20}
                  />
                </span>
              </button>
              <p className="mt-2 text-center text-base font-medium text-black">
                {isCopied
                  ? t('routes.gameGroup.pieceGroup.codeCopied')
                  : t('routes.gameGroup.pieceGroup.codeExpired') +
                    ' ' +
                    formatDateTime(piece?.expire_date)}
              </p>
            </>
          ) : (
            <Button
              className="bg-gradient-purple mt-3"
              size={'lg'}
              onClick={() => {
                setOpenMyCode(true)
                localStorage.setItem(`showPieceCode_${piece?.id}`, 'true')
              }}
            >
              {t('routes.gameGroup.pieceGroup.codeCreate')}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
