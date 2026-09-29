import { useEffect, useRef, useState } from 'react'
import Hero from '../components/Hero.jsx'
import AppScreenshot from '../components/AppScreenshot.jsx'
import TickerSection from '../components/TickerSection.jsx'
import DarkSection from '../components/DarkSection.jsx'
import Section4 from '../components/Section4.jsx'
import Section5 from '../components/Section5.jsx'
import Section6 from '../components/Section6.jsx'
import Section7 from '../components/Section7.jsx'
import Section8 from '../components/Section8.jsx'
import Footer from '../components/Footer.jsx'

export default function HomePage() {
  const darkSectionRef = useRef(null)
  const [sectionVisible, setSectionVisible] = useState(false)
  const [skipShotAnimation, setSkipShotAnimation] = useState(false)

  useEffect(() => {
    let isAnimating = false

    const showScreenshot = ({ instant = false } = {}) => {
      if (instant) {
        setSkipShotAnimation(true)
      } else {
        setSkipShotAnimation(false)
      }
      setSectionVisible(true)
    }

    const revealIfAlreadyPastHero = () => {
      const darkTop = darkSectionRef.current ? darkSectionRef.current.offsetTop : window.innerHeight
      if (window.scrollY > 300 && window.scrollY >= darkTop - 40) {
        showScreenshot({ instant: true })
      }
    }

    if (window.location.hash) {
      showScreenshot({ instant: true })
    }

    const initialTimer = setTimeout(revealIfAlreadyPastHero, 150)
    window.addEventListener('pageshow', revealIfAlreadyPastHero)
    window.addEventListener('load', revealIfAlreadyPastHero)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          showScreenshot()
        } else if (window.scrollY < 100) {
          setSectionVisible(false)
          setSkipShotAnimation(false)
        }
      },
      { threshold: 0.15 }
    )

    if (darkSectionRef.current) {
      observer.observe(darkSectionRef.current)
    }

    const smoothScrollTo = (targetY, duration = 700, onComplete) => {
      const html = document.documentElement
      const previousBehavior = html.style.scrollBehavior
      html.style.scrollBehavior = 'auto'

      const startY = window.scrollY
      const difference = targetY - startY
      const startTime = performance.now()

      const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

      const finish = () => {
        html.style.scrollBehavior = previousBehavior
        if (onComplete) onComplete()
      }

      const step = (currentTime) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        const ease = easeOutCubic(progress)

        window.scrollTo({ top: startY + difference * ease, left: 0, behavior: 'instant' })

        if (progress < 1) {
          requestAnimationFrame(step)
        } else {
          finish()
        }
      }

      requestAnimationFrame(step)
    }

    const scrollToDark = () => {
      if (isAnimating) return
      isAnimating = true
      showScreenshot()

      const targetY = darkSectionRef.current ? darkSectionRef.current.offsetTop : window.innerHeight
      smoothScrollTo(targetY, 700, () => {
        isAnimating = false
      })
    }

    const scrollToHero = () => {
      if (isAnimating) return
      isAnimating = true

      smoothScrollTo(0, 650, () => {
        isAnimating = false
      })
    }

    const onWheel = (e) => {
      const darkTop = darkSectionRef.current ? darkSectionRef.current.offsetTop : window.innerHeight
      if (window.scrollY < darkTop - 40 && e.deltaY > 0) {
        e.preventDefault()
        scrollToDark()
      } else if (window.scrollY <= darkTop + 40 && window.scrollY > 0 && e.deltaY < 0) {
        e.preventDefault()
        scrollToHero()
      }
    }

    let touchStartY = 0
    const onTouchStart = (e) => {
      touchStartY = e.touches[0].clientY
    }

    const onTouchEnd = (e) => {
      const touchEndY = e.changedTouches[0].clientY
      const diffY = touchStartY - touchEndY
      const darkTop = darkSectionRef.current ? darkSectionRef.current.offsetTop : window.innerHeight

      if (window.scrollY < darkTop - 40 && diffY > 30) {
        scrollToDark()
      } else if (window.scrollY <= darkTop + 40 && window.scrollY > 0 && diffY < -30) {
        scrollToHero()
      }
    }

    const onKeyDown = (e) => {
      const darkTop = darkSectionRef.current ? darkSectionRef.current.offsetTop : window.innerHeight
      if ((e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') && window.scrollY < darkTop - 40) {
        e.preventDefault()
        scrollToDark()
      } else if ((e.key === 'ArrowUp' || e.key === 'PageUp') && window.scrollY <= darkTop + 40 && window.scrollY > 0) {
        e.preventDefault()
        scrollToHero()
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('keydown', onKeyDown)

    return () => {
      clearTimeout(initialTimer)
      observer.disconnect()
      window.removeEventListener('pageshow', revealIfAlreadyPastHero)
      window.removeEventListener('load', revealIfAlreadyPastHero)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  return (
    <>
      <Hero />
      <div ref={darkSectionRef}>
        <DarkSection>
          <AppScreenshot isVisible={sectionVisible} skipAnimation={skipShotAnimation} />
          <TickerSection />
        </DarkSection>
        <Section4 />
        <Section5 />
        <Section6 />
        <Section7 />
        <Section8 />
        <Footer />
      </div>
    </>
  )
}
