import { Link } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle.jsx'
import '../styles/home.css'

function HomePage({ theme, onToggleTheme }) {
  return (
    <main className="home-shell">
      <section className="home-page">
        <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} />

        <div className="home-visual" aria-hidden="true">
          <div className="home-visual-orb home-visual-orb-one" />
          <div className="home-visual-orb home-visual-orb-two" />
          <div className="home-visual-grid" />
        </div>

        <div className="home-overlay" aria-hidden="true" />

        <div className="home-hero-content">
          <h1 className="home-title">Data Observatory</h1>
          <p className="hero-copy">
            A calm editorial space for stories, notes, and public-facing data
            publishing.
          </p>

          <div className="hero-actions">
            <Link className="button primary" to="/articles">
              Explore
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default HomePage
