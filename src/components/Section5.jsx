import { useEffect, useRef, useState } from 'react'

const frameModules = import.meta.glob(
  '../assets/homepage-eve-animations/Purple_plushie_waving_hello_*.png',
  { eager: true, import: 'default' }
)

const FRAMES = Object.entries(frameModules)
  .map(([path, src]) => ({
    n: Number(path.match(/_(\d+)\.png$/)?.[1] ?? 0),
    src,
  }))
  .sort((a, b) => a.n - b.n)

const SOURCE_FPS = 24
const LOOP_FROM = 10
const LAST_FRAME = FRAMES[FRAMES.length - 1]?.n ?? 0
const STATIC_FRAME = 50

function pickFrame(frameNumber) {
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
  return FRAMES[result]
}

export default function Section5() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [frameSrc, setFrameSrc] = useState(
    () => pickFrame(STATIC_FRAME).src || FRAMES[0]?.src || ''
  )

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
    FRAMES.forEach((frame) => {
      const img = new Image()
      img.src = frame.src
    })
  }, [])

  useEffect(() => {
    if (!FRAMES.length) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setFrameSrc(pickFrame(STATIC_FRAME).src)
      return undefined
    }

    let rafId = 0
    let startTime = 0
    let lastSrc = ''

    const tick = (now) => {
      if (!startTime) startTime = now
      const elapsedFrames = Math.floor(((now - startTime) / 1000) * SOURCE_FPS)
      const cycle = LAST_FRAME - LOOP_FROM + 1
      let frameNumber = elapsedFrames
      if (elapsedFrames > LAST_FRAME) {
        frameNumber = LOOP_FROM + ((elapsedFrames - LOOP_FROM) % cycle)
      }
      const nextSrc = pickFrame(frameNumber).src
      if (nextSrc !== lastSrc) {
        lastSrc = nextSrc
        setFrameSrc(nextSrc)
      }
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`sec5 ${isVisible ? 'is-visible' : ''}`}
      id="what-is-eveia"
    >
      <div className="sec5-card">
        <div className="sec5-eve" aria-hidden="true">
          {frameSrc ? (
            <img
              className="sec5-eve__img"
              src={frameSrc}
              alt=""
            />
          ) : null}
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
