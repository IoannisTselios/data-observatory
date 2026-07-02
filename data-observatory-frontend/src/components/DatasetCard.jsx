import { Link } from 'react-router-dom'

function DatasetCard({ dataset }) {
  return (
    <article className="dataset-card">
      <div className="dataset-card-header">
        <span className="dataset-card-topic">{dataset.topic}</span>
        <span className={`status-pill status-${dataset.ingestion_status}`}>
          {dataset.ingestion_status.replaceAll('_', ' ')}
        </span>
      </div>

      <div className="dataset-card-content">
        <h3>
          <Link to={`/datasets/${dataset.slug}`}>{dataset.title}</Link>
        </h3>
        <p className="dataset-card-description">{dataset.short_description}</p>
        <p className="dataset-card-meta">
          <span>{dataset.geography}</span>
          <span>{dataset.source_name}</span>
        </p>
      </div>
    </article>
  )
}

export default DatasetCard
