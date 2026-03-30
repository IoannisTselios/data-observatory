import { Outlet } from 'react-router-dom'
import InternalNavbar from './InternalNavbar.jsx'
import SiteFooter from './SiteFooter.jsx'

function Layout({ theme, onToggleTheme }) {
  return (
    <div className="app-shell">
      <InternalNavbar theme={theme} onToggleTheme={onToggleTheme} />

      <main className="page-content">
        <Outlet />
      </main>

      <SiteFooter />
    </div>
  )
}

export default Layout
