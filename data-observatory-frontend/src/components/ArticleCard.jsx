import { Link } from 'react-router-dom'

function ArticleCard({ article }) {
  return (
    <Link
      className={`article-card cover-${article.coverStyle}`}
      to={`/articles/${article.slug}`}
    >
      <div className="article-card-thumbnail" aria-hidden="true">
        <span className="article-card-category">{article.category}</span>
      </div>

      <div className="article-card-content">
        <p className="article-card-meta">
          <span>{article.category}</span>
          <span>{article.date}</span>
        </p>
        <h3>{article.title}</h3>
        <p className="article-card-description">{article.shortDescription}</p>
      </div>
    </Link>
  )
}

export default ArticleCard
