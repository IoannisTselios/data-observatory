import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="content-panel prose-panel">
      <p className="eyebrow">404</p>
      <h2>Page not found</h2>
      <p>The page you tried to open does not exist yet.</p>
      <Link className="button primary" to="/">
        Back to home
      </Link>
    </section>
  )
}

export default NotFoundPage
