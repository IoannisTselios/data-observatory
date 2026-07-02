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

function getStatusDescription(dataset) {
  if (dataset.ingestion_status === 'transformed') {
    return 'This dataset is already stored internally and prepared through dbt, so it is the easiest version to build analysis on top of.'
  }

  if (dataset.ingestion_status === 'ingest_planned') {
    return 'This dataset is already selected for the next ingestion batch, but it is not fully prepared inside the observatory yet.'
  }

  if (dataset.ingestion_status === 'registered') {
    return 'This dataset is cataloged in the library, but it is still mainly a source record rather than an internal analysis-ready asset.'
  }

  return 'This dataset is present in the catalog, but its internal processing stage is still evolving.'
}

function getAccessNotes(dataset) {
  if (dataset.storage_status === 'stored_internal') {
    return [
      'Use the public source page if you want to inspect the original publishing context.',
      'Use the internal analytics table if you want the cleaned version prepared inside Data Observatory.',
      'A local notebook or Python script is the simplest way to start exploring it today.',
    ]
  }

  return [
    'The public source page is currently the main access point for this dataset.',
    'The dataset is not yet stored internally, so the external source is still the best place to download or inspect it.',
    'The library entry exists now so the dataset can move into a fuller ingest and analysis workflow later.',
  ]
}

function getPythonSnippet(dataset) {
  if (dataset.storage_status === 'stored_internal' && dataset.mart_model_name) {
    return [
      'import pandas as pd',
      'from sqlalchemy import create_engine',
      '',
      "engine = create_engine('postgresql://postgres:changeme123@localhost/observatory')",
      `df = pd.read_sql('SELECT * FROM ${dataset.mart_model_name} LIMIT 1000', engine)`,
      'print(df.head())',
    ].join('\n')
  }

  return [
    'import pandas as pd',
    '',
    `source_url = '${dataset.source_url}'`,
    '# Open the source page, download the dataset, and load the file locally.',
    "df = pd.read_csv('path/to/downloaded-file.csv')",
    'print(df.head())',
  ].join('\n')
}

function getSqlSnippet(dataset) {
  if (dataset.storage_status === 'stored_internal' && dataset.mart_model_name) {
    return `SELECT *\nFROM ${dataset.mart_model_name}\nLIMIT 25;`
  }

  return '-- Internal SQL is not available yet for this dataset.\n-- Use the external source page first.'
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

      <section className="dataset-status-panel">
        <h3>What this means right now</h3>
        <p>{getStatusDescription(dataset)}</p>
      </section>

      <section className="dataset-notes-panel">
        <h3>Current notes</h3>
        <p>{dataset.source_notes}</p>
      </section>

      <section className="dataset-detail-section">
        <h3>How to use this dataset now</h3>
        <div className="dataset-guidance-grid">
          <div>
            <p className="dataset-guidance-label">Available access</p>
            <ul className="dataset-guidance-list">
              {getAccessNotes(dataset).map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="dataset-guidance-label">Current state</p>
            <ul className="dataset-guidance-list">
              <li>
                Storage status: {dataset.storage_status.replaceAll('_', ' ')}
              </li>
              <li>
                Ingestion status: {dataset.ingestion_status.replaceAll('_', ' ')}
              </li>
              <li>
                Analysis ready: {dataset.analysis_ready ? 'yes' : 'not yet'}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="dataset-detail-section">
        <h3>Starter analysis snippets</h3>
        <p className="dataset-guidance-copy">
          These examples are intentionally simple. They are meant to show the
          easiest local path into the dataset before hosted notebooks exist.
        </p>

        <div className="dataset-code-grid">
          <div className="dataset-code-panel">
            <p className="dataset-guidance-label">Python / pandas</p>
            <pre className="dataset-code-block">
              <code>{getPythonSnippet(dataset)}</code>
            </pre>
          </div>

          <div className="dataset-code-panel">
            <p className="dataset-guidance-label">SQL</p>
            <pre className="dataset-code-block">
              <code>{getSqlSnippet(dataset)}</code>
            </pre>
          </div>
        </div>
      </section>

      <section className="dataset-detail-section">
        <h3>Future connections</h3>
        <p className="dataset-guidance-copy">
          This page is prepared for future notebook links, chart outputs, and
          related article references. For now, the goal is to make the dataset
          understandable and usable before the hosted research workflow exists.
        </p>
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
