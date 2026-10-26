import { useEffect, useState } from 'react'
import section2 from '../assets/section2.webp'
import section2Sidebar from '../assets/section2-sidebar.webp'
import section2Userchat from '../assets/section2-userchat.webp'
import section2ChatAi from '../assets/section2-chat-ai.webp'

export default function AppScreenshot({ isVisible = false, skipAnimation = false }) {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  const visible = isVisible || reducedMotion
  const instant = skipAnimation || reducedMotion

  return (
    <div className={`app-shot-wrap ${visible ? 'is-visible' : ''} ${instant ? 'is-instant' : ''}`}>
      <div className="shot-glow"></div>
      <div className="app-shot">
        <img className="base base-before" src={section2} alt="" aria-hidden="true" />
        <img className="base base-after" src={section2} alt="" aria-hidden="true" />
        <img className="overlay-sidebar" src={section2Sidebar} alt="" aria-hidden="true" />
        <img className="overlay-user" src={section2Userchat} alt="user message" />
        <img className="overlay-ai" src={section2ChatAi} alt="AI response with Q3 board report" />
      </div>
    </div>
  )
}
