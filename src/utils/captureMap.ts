// src/utils/captureGameMap.ts
import { toPng } from 'html-to-image'

export async function captureGameMap(): Promise<string> {
  const node = document.getElementById('game-map-svg')

  if (!node) {
    throw new Error('Game map not found')
  }

  return toPng(node, {
    cacheBust: true,
    pixelRatio: 2,
  })
}
