import { useLocation, useRouter } from '@tanstack/react-router'
import { Button } from '../ui/button'
import { FlatIcon } from '../FlatIcon'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import RedeemCodePopup from './RedeemCodePopup'

const GameFooter = () => {
  const location = useLocation()
  const router = useRouter()
  const { t } = useTranslation()

  const [openRedeemCodePopup, setOpenRedeemCodePopup] = useState(false)
  const [isWrap, setIsWrap] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsWrap(window.innerWidth < 375)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <footer
        className={`fixed bottom-8 left-1/2 z-50 flex max-w-(--page-width) -translate-x-1/2 ${isWrap && 'scale-75'} flex-col gap-2 px-6`}
      >
        {/* Share */}
        <Button
          className={` ${location.pathname !== '/game' ? 'hidden' : ''} bg-gradient-pink absolute right-6 bottom-20`}
          size="icon"
          onClick={() => {
            router.navigate({ to: '/game/share' })
          }}
        >
          <FlatIcon name="fi-rr-share" size={20} className="text-white" />
        </Button>

        {/* Navigation */}
        <div
          className={`bg-gradient-beige flex justify-center gap-2 rounded-full px-6 py-4`}
        >
          <div className="flex items-center justify-center gap-2">
            <Button
              className={`${location.pathname == '/game' ? 'bg-gradient-purple cursor-default' : 'bg-gradient-pink cursor-pointer'}`}
              size={'icon'}
              onClick={() => {
                router.navigate({ to: '/game' })
              }}
            >
              <FlatIcon
                name={'fi-rr-layout-fluid'}
                size={20}
                className="text-white"
              />
            </Button>
            <Button
              className={`${location.pathname == '/game/piece' ? 'bg-gradient-purple cursor-default' : 'bg-gradient-pink cursor-pointer'}`}
              size={'sm'}
              onClick={() => {
                router.navigate({ to: '/game/piece' })
              }}
            >
              <p className="text-white">
                {t('components.gameGroup.gameFooter.myPiece')}
              </p>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2">
            <Button
              className={`bg-gradient-pink cursor-pointer`}
              size={'sm'}
              onClick={() => {
                setOpenRedeemCodePopup(true)
              }}
            >
              <p className="text-white">
                {t('components.gameGroup.gameFooter.redeemCode')}
              </p>
            </Button>
            <Button
              className={`${location.pathname == '/game/achievement' ? 'bg-gradient-purple cursor-default' : 'bg-gradient-pink cursor-pointer'}`}
              size={'icon'}
              onClick={() => {
                router.navigate({ to: '/game/achievement' })
              }}
            >
              <FlatIcon name={'fi-br-stats'} size={20} className="text-white" />
            </Button>
          </div>
        </div>
      </footer>

      {openRedeemCodePopup && (
        <RedeemCodePopup
          open={openRedeemCodePopup}
          setOpen={setOpenRedeemCodePopup}
        />
      )}
    </>
  )
}

export default GameFooter
