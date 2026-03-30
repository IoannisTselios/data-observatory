import ArticleCard from '../components/ArticleCard.jsx'
import { articles } from '../data/articles.js'
import '../styles/articles.css'

function ArticlesPage() {
  return (
    <section className="content-panel library-page">
      <div className="page-intro">
        <p className="eyebrow">Articles</p>
        <h2>Latest stories</h2>
        <p>
          Browse the current placeholder library for future data-analysis
          stories.
        </p>
      </div>

      <div className="articles-grid">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  )
}

export default ArticlesPage
