import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import ArticlesPage from './pages/ArticlesPage.jsx'
import ArticleDetailPage from './pages/ArticleDetailPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ProjectPage from './pages/ProjectPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

function App() {
  const location = useLocation()
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('data-observatory-theme')

    if (savedTheme) {
      return savedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('data-observatory-theme', theme)
  }, [theme])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname])

  function handleToggleTheme() {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
  }

  return (
    <div className="route-fade-shell" key={location.pathname}>
      <Routes location={location}>
        <Route
          path="/"
          element={<HomePage theme={theme} onToggleTheme={handleToggleTheme} />}
        />
        <Route
          element={<Layout theme={theme} onToggleTheme={handleToggleTheme} />}
        >
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:slug" element={<ArticleDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/project" element={<ProjectPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App
