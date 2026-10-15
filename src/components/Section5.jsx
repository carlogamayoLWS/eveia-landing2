import { useEffect, useRef, useState } from 'react'

const frameModules = import.meta.glob(
  '../assets/homepage-eve-animations/Purple_plushie_waving_hello_*.webp',
  { eager: true, import: 'default' }
)

const FRAMES = Object.entries(frameModules)
  .map(([path, src]) => ({
    n: Number(path.match(/_(\d+)\.webp$/)?.[1] ?? 0),
    src,
  }))
  .sort((a, b) => a.n - b.n)

const SOURCE_FPS = 24
const LOOP_FROM = 10
const LAST_FRAME = FRAMES[FRAMES.length - 1]?.n ?? 0
const STATIC_FRAME = 50
const LOOP_CYCLE = LAST_FRAME - LOOP_FROM + 1

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

function timelineFrame(elapsedFrames) {
  if (elapsedFrames <= LAST_FRAME) return elapsedFrames
  return LOOP_FROM + ((elapsedFrames - LOOP_FROM) % LOOP_CYCLE)
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
  const ctx = canvas.getContext('2d', { alpha: false })
  if (!ctx) return
  const w = bitmap.width
  const h = bitmap.height
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w
    canvas.height = h
  }
  ctx.drawImage(bitmap, 0, 0)
}

export default function Section5() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

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

        let startTime = 0
        let lastIdx = -1

        const tick = (now) => {
          if (!startTime) startTime = now
          const elapsed = ((now - startTime) / 1000) * SOURCE_FPS
          const idx = frameIndexAtOrBefore(timelineFrame(elapsed))
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
    <section
      ref={sectionRef}
      className={`sec5 ${isVisible ? 'is-visible' : ''}`}
      id="what-is-eveia"
    >
      <div className="sec5-card">
        <div className="sec5-eve" aria-hidden="true">
          <canvas className="sec5-eve__img" ref={canvasRef} />
        </div>

        <div className="sec5-container">
          <h2 className="sec5-heading">
            <span className="sec5-heading__line">Transform Trusted Knowledge Into Work</span>
            <span className="sec5-heading__grad">That’s Ready to Use.</span>
          </h2>

          <p className="sec5-desc">
            Whether your team is answering questions, preparing reports, creating
            executive updates or drafting proposals, Eveia.AI helps your team
            complete work faster, so they can spend more time making decisions.
          </p>

          <p className="sec5-callout">
            All within a controlled, organization specific environment.
          </p>
        </div>
      </div>
    </section>
  )
}
