import { Link } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle.jsx'
import '../styles/home.css'

function HomePage({ theme, onToggleTheme }) {
  return (
    <main className="home-shell">
      <section className="home-page">
        <div className="hero-panel">
          <div className="hero-header">
            <div>
              <p className="eyebrow">Data Observatory</p>
              <h1 className="home-title">Data Observatory</h1>
              <p className="hero-copy">
                A calm editorial space for stories, notes, and public-facing
                data publishing.
              </p>
            </div>

            <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} />
          </div>

          <div className="hero-actions">
            <Link className="button primary" to="/articles">
              Explore
            </Link>
          </div>
        </div>

        <section className="support-panel content-panel">
          <p className="eyebrow">Inside</p>
          <h2>Thoughtful reporting with a clear reading experience.</h2>
          <p>
            Explore articles, project notes, and supporting context in a clean,
            focused interface designed for reading.
          </p>
        </section>
      </section>
    </main>
  )
}

export default HomePage
