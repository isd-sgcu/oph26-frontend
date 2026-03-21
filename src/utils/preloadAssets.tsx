export function preloadImages(srcList: string[]) {
  return Promise.allSettled(
    srcList.map(
      (src) =>
        new Promise<void>((resolve, reject) => {
          const img = new Image()
          img.src = src
          img.onload = () => resolve()
          img.onerror = reject
        })
    )
  )
}
