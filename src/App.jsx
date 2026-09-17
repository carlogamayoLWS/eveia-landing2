import { useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import AppScreenshot from './components/AppScreenshot.jsx'
import TickerSection from './components/TickerSection.jsx'
import DarkSection from './components/DarkSection.jsx'
import Section4 from './components/Section4.jsx'
import Section5 from './components/Section5.jsx'
import Section6 from './components/Section6.jsx'
import Section7 from './components/Section7.jsx'
import Section8 from './components/Section8.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const darkSectionRef = useRef(null)
  const [sectionVisible, setSectionVisible] = useState(false)
  const [skipShotAnimation, setSkipShotAnimation] = useState(false)

  useEffect(() => {
    let isAnimating = false

    const showScreenshot = ({ instant = false } = {}) => {
      if (instant) setSkipShotAnimation(true)
      setSectionVisible(true)
    }

    const revealIfAlreadyPastHero = () => {
      const darkTop = darkSectionRef.current ? darkSectionRef.current.offsetTop : window.innerHeight
      if (window.scrollY >= darkTop - 40) {
        showScreenshot({ instant: true })
      }
    }

    revealIfAlreadyPastHero()
    window.addEventListener('pageshow', revealIfAlreadyPastHero)
    window.addEventListener('load', revealIfAlreadyPastHero)

    const smoothScrollTo = (targetY, duration = 950, onComplete) => {
      const startY = window.scrollY
      const difference = targetY - startY
      const startTime = performance.now()

      // Smooth start + smooth stop — no sudden snap
      const easeInOutCubic = (t) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

      const step = (currentTime) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        const ease = easeInOutCubic(progress)

        window.scrollTo(0, startY + difference * ease)

        if (progress < 1) {
          requestAnimationFrame(step)
        } else if (onComplete) {
          onComplete()
        }
      }

      requestAnimationFrame(step)
    }

    const scrollToDark = () => {
      if (isAnimating) return
      isAnimating = true
      showScreenshot()

      const targetY = darkSectionRef.current ? darkSectionRef.current.offsetTop : window.innerHeight
      smoothScrollTo(targetY, 950, () => {
        isAnimating = false
      })
    }

    const scrollToHero = () => {
      if (isAnimating) return
      isAnimating = true

      smoothScrollTo(0, 850, () => {
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
      <Navbar />
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
