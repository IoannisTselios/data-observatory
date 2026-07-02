const API_BASE = '/api/datasets'

async function readJson(response) {
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return response.json()
}

export async function fetchDatasets() {
  const response = await fetch(API_BASE)
  return readJson(response)
}

export async function fetchDatasetBySlug(slug) {
  const response = await fetch(`${API_BASE}/${slug}`)
  return readJson(response)
}
