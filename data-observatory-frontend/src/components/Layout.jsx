import { Outlet } from 'react-router-dom'
import InternalNavbar from './InternalNavbar.jsx'
import SiteFooter from './SiteFooter.jsx'

function Layout({ theme, onToggleTheme }) {
  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="site-header-inner">
          <p className="eyebrow">Data Observatory</p>
          <h1>Editorial archive</h1>
          <p className="section-intro">
            A simple internal layout for articles, project notes, and about
            pages.
          </p>
        </div>
      </header>

      <InternalNavbar theme={theme} onToggleTheme={onToggleTheme} />

      <main className="page-content">
        <Outlet />
      </main>

      <SiteFooter />
    </div>
  )
}

export default Layout
