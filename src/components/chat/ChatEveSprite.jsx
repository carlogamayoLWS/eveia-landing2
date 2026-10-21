import { useEffect, useRef } from 'react'

const frameModules = import.meta.glob(
  '../../assets/evebot/webp/eve-bounce_*.webp',
  { eager: true, import: 'default' }
)

const FRAMES = Object.entries(frameModules)
  .map(([path, src]) => ({
    n: Number(path.match(/_(\d+)\.webp$/)?.[1] ?? 0),
    src,
  }))
  .sort((a, b) => a.n - b.n)

const SOURCE_FPS = 24
const STATIC_FRAME = 1

function frameIndexAtOrBefore(frameNumber) {
  let lo = 0
  let hi = FRAMES.length - 1
  let result = 0
  while (lo <= hi) {
    const mid = (lo + hi) >> 1
    if (FRAMES[mid].n <= frameNumber) {
      result = mid
      lo = mid + 1
    } else {
      hi = mid - 1
    }
  }
  return result
}

async function loadBitmap(src) {
  const img = new Image()
  img.decoding = 'sync'
  img.src = src
  if (typeof img.decode === 'function') {
    await img.decode()
  } else {
    await new Promise((resolve, reject) => {
      img.onload = resolve
      img.onerror = reject
    })
  }
  if (typeof createImageBitmap === 'function') {
    return createImageBitmap(img)
  }
  return img
}

function paintFrame(canvas, bitmap) {
  if (!canvas || !bitmap) return
  const ctx = canvas.getContext('2d', { alpha: true })
  if (!ctx) return
  const w = bitmap.width
  const h = bitmap.height
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w
    canvas.height = h
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(bitmap, 0, 0)
}

export function ChatEveSprite() {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!FRAMES.length) return undefined

    let rafId = 0
    let cancelled = false
    const bitmaps = []

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const run = async () => {
      try {
        const loaded = await Promise.all(FRAMES.map((frame) => loadBitmap(frame.src)))
        if (cancelled) {
          loaded.forEach((bitmap) => bitmap.close?.())
          return
        }
        bitmaps.push(...loaded)

        const canvas = canvasRef.current
        const staticIdx = frameIndexAtOrBefore(STATIC_FRAME)
        paintFrame(canvas, bitmaps[reduceMotion ? staticIdx : 0])

        if (reduceMotion) return

        const lastN = FRAMES[FRAMES.length - 1].n
        let startTime = 0
        let lastIdx = -1

        const tick = (now) => {
          if (!startTime) startTime = now
          const elapsed = ((now - startTime) / 1000) * SOURCE_FPS
          const frameN = (elapsed % (lastN + 1))
          const idx = frameIndexAtOrBefore(frameN)
          if (idx !== lastIdx) {
            lastIdx = idx
            paintFrame(canvasRef.current, bitmaps[idx])
          }
          rafId = requestAnimationFrame(tick)
        }

        rafId = requestAnimationFrame(tick)
      } catch {
        /* keep empty canvas if a frame fails to decode */
      }
    }

    run()

    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
      bitmaps.forEach((bitmap) => bitmap.close?.())
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="chat-widget-launcher-sprite"
      aria-hidden="true"
    />
  )
}
