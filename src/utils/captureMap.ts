import { toPng } from 'html-to-image'

export async function captureGameMap(): Promise<string> {
  const node = document.getElementById('game-map-svg')

  if (!node) {
    throw new Error('Game map not found')
  }

  const dataUrl = await toPng(node, {
    cacheBust: true,
    pixelRatio: 2,
  })

  const res = await fetch(dataUrl)
  const blob = await res.blob()
  return URL.createObjectURL(blob)
}
