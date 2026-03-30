import { Link, useParams } from 'react-router-dom'
import { articles } from '../data/articles.js'
import '../styles/article-detail.css'

function ArticleDetailPage() {
  const { slug } = useParams()
  const article = articles.find((item) => item.slug === slug)

  if (!article) {
    return (
      <article className="article-page-shell">
        <section className="article-not-found content-panel">
          <p className="eyebrow">Article</p>
          <h2>Article not found</h2>
          <p>No article matches the slug: {slug}</p>
          <Link className="button primary" to="/articles">
            Back to articles
          </Link>
        </section>
      </article>
    )
  }

  return (
    <article className="article-page-shell">
      <Link className="article-back-link" to="/articles">
        Back to articles
      </Link>

      <header className="article-header">
        <p className="eyebrow">{article.category}</p>
        <h2 className="article-title">{article.title}</h2>
        <p className="article-intro">{article.shortDescription}</p>
        <p className="article-meta">{article.category} · {article.date}</p>
      </header>

      <section
        className={`article-hero cover-${article.coverStyle}`}
        aria-label={`${article.title} cover`}
      >
        <div className="article-hero-image article-card-thumbnail" />
      </section>

      <section className="article-body">
        {article.body.map((paragraph, index) => (
          <p key={`${article.id}-${index}`}>{paragraph}</p>
        ))}
      </section>
    </article>
  )
}

export default ArticleDetailPage
