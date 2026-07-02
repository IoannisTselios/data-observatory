# Project Structure

The repository is being reorganized around a dataset-library workflow.

## Main areas

- `catalog/`
  - file-based dataset metadata, guides, and future article content
  - includes a schema and validator for the Phase 1 dataset catalog
- `pipelines/ingestion/`
  - dataset-specific ingestion entrypoints
- `pipelines/shared/`
  - reusable helpers for source fetching and loading
- `dbt/observatory/`
  - staging and mart models that standardize datasets
- `notebooks/`
  - exploratory analysis work; future dataset notebooks should live under
    `notebooks/datasets/`
- `app/`
  - backend API and future dataset-library services
- `data-observatory-frontend/`
  - frontend application and eventual dataset library pages

## Current compatibility rule

The repo keeps the current traffic example running while the structure is
refined. Existing commands should keep working during this phase.
