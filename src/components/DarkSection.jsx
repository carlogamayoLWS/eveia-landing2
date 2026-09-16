import GradientLine from './GradientLine.jsx'

export default function DarkSection({ children }) {
  return (
    <section className="dark">
      {children}
      <h2 className="dark-heading">Every Organization Wants to<br /><span className="grad">Move Forward.</span></h2>
      <p className="dark-desc">Organizations make hundreds of decisions to keep work moving. Before those decisions can be made, teams spend hours searching for information, consolidating updates, verifying details and preparing reports.</p>
      <p className="dark-callout">The challenge isn't making decisions.<br />It's the time it takes to prepare for them.</p>
      <GradientLine />
    </section>
  )
}
