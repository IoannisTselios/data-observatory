import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchDatasetBySlug } from '../lib/datasetsApi.js'
import '../styles/datasets.css'

function DetailRow({ label, value }) {
  return (
    <div className="dataset-detail-row">
      <dt>{label}</dt>
      <dd>{value || 'Not set yet'}</dd>
    </div>
  )
}

function DatasetDetailPage() {
  const { slug } = useParams()
  const [dataset, setDataset] = useState(null)
  const [status, setStatus] = useState('loading')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let isCancelled = false

    async function loadDataset() {
      try {
        const item = await fetchDatasetBySlug(slug)

        if (isCancelled) {
          return
        }

        setDataset(item)
        setStatus('ready')
      } catch (error) {
        if (isCancelled) {
          return
        }

        setErrorMessage(error.message)
        setStatus('error')
      }
    }

    loadDataset()

    return () => {
      isCancelled = true
    }
  }, [slug])

  if (status === 'loading') {
    return (
      <section className="content-panel prose-panel">
        <p className="eyebrow">Dataset</p>
        <h2>Loading dataset details...</h2>
      </section>
    )
  }

  if (status === 'error') {
    return (
      <section className="content-panel prose-panel">
        <p className="eyebrow">Dataset</p>
        <h2>Dataset not available</h2>
        <p>{errorMessage}</p>
        <Link className="button secondary" to="/datasets">
          Back to datasets
        </Link>
      </section>
    )
  }

  return (
    <section className="content-panel dataset-detail-page">
      <div className="dataset-detail-hero">
        <p className="eyebrow">Dataset</p>
        <h2>{dataset.title}</h2>
        <p className="dataset-detail-summary">{dataset.short_description}</p>

        <div className="dataset-detail-badges">
          <span className="status-pill status-neutral">{dataset.topic}</span>
          <span className={`status-pill status-${dataset.ingestion_status}`}>
            {dataset.ingestion_status.replaceAll('_', ' ')}
          </span>
          <span className="status-pill status-neutral">
            {dataset.storage_status.replaceAll('_', ' ')}
          </span>
        </div>
      </div>

      <div className="dataset-detail-grid">
        <section className="dataset-detail-section">
          <h3>Overview</h3>
          <dl className="dataset-detail-list">
            <DetailRow label="Dataset key" value={dataset.dataset_key} />
            <DetailRow label="Geography" value={dataset.geography} />
            <DetailRow label="Source" value={dataset.source_name} />
            <DetailRow label="Source type" value={dataset.source_type} />
            <DetailRow label="Update frequency" value={dataset.update_frequency} />
            <DetailRow label="License" value={dataset.license} />
          </dl>
        </section>

        <section className="dataset-detail-section">
          <h3>Internal state</h3>
          <dl className="dataset-detail-list">
            <DetailRow label="Raw table" value={dataset.raw_table_name} />
            <DetailRow label="Staging model" value={dataset.staging_model_name} />
            <DetailRow label="Analytics model" value={dataset.mart_model_name} />
            <DetailRow
              label="Analysis ready"
              value={dataset.analysis_ready ? 'Yes' : 'Not yet'}
            />
            <DetailRow
              label="Published"
              value={dataset.published ? 'Yes' : 'Not yet'}
            />
          </dl>
        </section>
      </div>

      <section className="dataset-notes-panel">
        <h3>Current notes</h3>
        <p>{dataset.source_notes}</p>
      </section>

      <section className="dataset-links-panel">
        <a
          className="button primary"
          href={dataset.source_url}
          target="_blank"
          rel="noreferrer"
        >
          Open source dataset
        </a>
        <Link className="button secondary" to="/datasets">
          Back to datasets
        </Link>
      </section>
    </section>
  )
}

export default DatasetDetailPage
