import { NavLink } from 'react-router-dom'
import { navigationLinks } from '../data/navigation.js'

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-grid">
        <section className="site-footer-section">
          <h2 className="site-footer-title">Data Observatory</h2>
          <p className="site-footer-note">
            A calm editorial space for stories, notes, and public-facing data
            publishing.
          </p>
        </section>

        <section className="site-footer-section">
          <h2 className="site-footer-heading">Navigation</h2>
          <nav className="site-footer-links" aria-label="Footer navigation">
            {navigationLinks.map((link) => (
              <NavLink key={link.to} to={link.to}>
                {link.label}
              </NavLink>
            ))}
          </nav>
        </section>

        <section className="site-footer-section">
          <h2 className="site-footer-heading">Reach out</h2>
          <div className="site-footer-links">
            <a href="mailto:your-email@example.com">your-email@example.com</a>
            <a href="tel:+4500000000">+45 00 00 00 00</a>
            <a
              href="https://www.linkedin.com/in/your-linkedin/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </section>
      </div>
    </footer>
  )
}

export default SiteFooter
