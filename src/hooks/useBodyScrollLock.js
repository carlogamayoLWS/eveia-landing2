import { useEffect } from 'react'

export function useBodyScrollLock(active) {
  useEffect(() => {
    if (!active) return
    if (typeof document === 'undefined') return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [active])
}
