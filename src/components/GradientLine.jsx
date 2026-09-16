import { useEffect, useRef, useState } from 'react'

export default function GradientLine() {
  const lineRef = useRef(null)
  const [isDrawn, setIsDrawn] = useState(false)

  useEffect(() => {
    const el = lineRef.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsDrawn(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setIsDrawn(true)
        observer.unobserve(el)
      },
      { threshold: 0.4, rootMargin: '0px 0px -5% 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={lineRef}
      className={`gradient-line ${isDrawn ? 'is-drawn' : ''}`}
      aria-hidden="true"
    >
      <span className="gradient-line__bar" />
    </div>
  )
}
