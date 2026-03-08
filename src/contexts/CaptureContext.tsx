import { createContext, useContext, useState } from 'react'

type CaptureMode = 'normal' | 'capture' | 'show'

interface CaptureContextType {
  mode: CaptureMode
  setMode: (mode: CaptureMode) => void
}

const CaptureContext = createContext<CaptureContextType | null>(null)

export const CaptureProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [mode, setMode] = useState<CaptureMode>('normal')

  return (
    <CaptureContext.Provider value={{ mode, setMode }}>
      {children}
    </CaptureContext.Provider>
  )
}

export const useCapture = () => {
  const context = useContext(CaptureContext)
  if (!context) {
    throw new Error('useCapture must be used inside CaptureProvider')
  }
  return context
}