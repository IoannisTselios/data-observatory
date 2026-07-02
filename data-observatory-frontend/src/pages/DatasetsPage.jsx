import { useEffect, useState } from 'react'
import DatasetCard from '../components/DatasetCard.jsx'
import { fetchDatasets } from '../lib/datasetsApi.js'
import '../styles/datasets.css'

function DatasetsPage() {
  const [datasets, setDatasets] = useState([])
  const [status, setStatus] = useState('loading')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let isCancelled = false

    async function loadDatasets() {
      try {
        const items = await fetchDatasets()

        if (isCancelled) {
          return
        }

        setDatasets(items)
        setStatus('ready')
      } catch (error) {
        if (isCancelled) {
          return
        }

        setErrorMessage(error.message)
        setStatus('error')
      }
    }

    loadDatasets()

    return () => {
      isCancelled = true
    }
  }, [])

  return (
    <section className="content-panel datasets-page">
      <div className="page-intro">
        <p className="eyebrow">Dataset Library</p>
        <h2>Browse the current observatory catalog.</h2>
        <p>
          This section is the public-facing library layer of Data Observatory.
          It shows what datasets exist in the platform, what stage they are in,
          and which ones are already prepared internally.
        </p>
      </div>

      {status === 'loading' && (
        <div className="dataset-feedback-panel">
          <p>Loading dataset library...</p>
        </div>
      )}

      {status === 'error' && (
        <div className="dataset-feedback-panel">
          <p>Could not load the dataset library.</p>
          <p className="dataset-feedback-detail">{errorMessage}</p>
        </div>
      )}

      {status === 'ready' && (
        <div className="datasets-grid">
          {datasets.map((dataset) => (
            <DatasetCard key={dataset.slug} dataset={dataset} />
          ))}
        </div>
      )}
    </section>
  )
}

export default DatasetsPage
