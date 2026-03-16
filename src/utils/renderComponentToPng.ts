import { createRoot } from 'react-dom/client'
import { flushSync } from 'react-dom'
import { toCanvas } from 'html-to-image'

export async function renderComponentToPng(
  element: React.ReactElement,
  width: number,
  height: number
): Promise<string> {
  const container = document.createElement('div')

  container.style.position = 'fixed'
  container.style.left = '0px'
  container.style.top = '0'
  container.style.width = `${width}px`
  container.style.height = `${height}px`
  container.style.display = 'inline-block'
  container.style.zIndex = '-1'

  document.body.appendChild(container)

  const root = createRoot(container)

  flushSync(() => {
    root.render(element)
  })

  await document.fonts.ready
  await new Promise((r) => setTimeout(r, 100))

  const canvas = await toCanvas(container, {
    pixelRatio: 1.5,
    backgroundColor: 'transparent',
    cacheBust: true,
  })

  const png = canvas.toDataURL('image/png')

  root.unmount()
  container.remove()

  return png
}
