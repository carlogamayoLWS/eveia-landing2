import { useEffect, useRef, useState } from 'react'

export default function Section5() {
  const sectionRef = useRef(null)
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

  return (
    <section
      ref={sectionRef}
      className={`sec5 ${isVisible ? 'is-visible' : ''}`}
      id="section-5"
    >
      <div className="sec5-container">
        <h2 className="sec5-heading">
          Transform Trusted Knowledge Into Work
          <br />
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
    </section>
  )
}
