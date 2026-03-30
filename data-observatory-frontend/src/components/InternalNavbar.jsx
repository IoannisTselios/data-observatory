import { Link, NavLink } from 'react-router-dom'
import { navigationLinks } from '../data/navigation.js'
import ThemeToggle from './ThemeToggle.jsx'

function InternalNavbar({ theme, onToggleTheme }) {
  return (
    <header className="main-nav-bar">
      <div className="main-nav-bar-inner">
        <Link className="main-nav-brand" to="/articles">
          Data Observatory
        </Link>

        <div className="main-nav-side">
          <nav className="main-nav" aria-label="Internal navigation">
            {navigationLinks.map((link) => (
              <NavLink key={link.to} to={link.to}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} />
        </div>
      </div>
    </header>
  )
}

export default InternalNavbar
