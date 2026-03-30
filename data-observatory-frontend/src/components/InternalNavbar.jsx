import { NavLink } from 'react-router-dom'
import { navigationLinks } from '../data/navigation.js'
import ThemeToggle from './ThemeToggle.jsx'

function InternalNavbar({ theme, onToggleTheme }) {
  return (
    <div className="main-nav-bar">
      <nav className="main-nav" aria-label="Internal navigation">
        {navigationLinks.map((link) => (
          <NavLink key={link.to} to={link.to}>
            {link.label}
          </NavLink>
        ))}
      </nav>

      <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} />
    </div>
  )
}

export default InternalNavbar
