# Phase 1 Summary

This document summarizes the work completed in the Phase 1 dataset-library
foundation for Data Observatory.

## Goal

Phase 1 was about moving the project from a single-dataset prototype into a
real dataset library foundation that can support many future datasets.

## What was completed

### 1. Dataset catalog foundation

- Added a new `catalog/` area for dataset metadata, guides, and future article
  content.
- Created `catalog/datasets/` as the home for one metadata file per dataset.
- Added `catalog/datasets/catalog-index.yaml` as a quick library overview.

### 2. Dataset schema and validation

- Added `catalog/datasets/SCHEMA.md` to define the Phase 1 metadata schema.
- Added `catalog/validate_catalog.py` to validate dataset entries.
- Added `make validate-catalog` to check the catalog quickly.

### 3. Naming conventions and documentation

- Added `docs/naming-conventions.md` to make naming rules explicit.
- Added `docs/project-structure.md` to explain the repository direction.
- Added dataset and pipeline README files to make the new structure easier to
  understand.

### 4. Initial 10-dataset library

The catalog now contains 10 curated datasets from the Open Data DK /
Kobenhavns Kommune ecosystem:

- `cph_traffic`
- `cph_bicycle_data`
- `cph_parking_counts`
- `cph_parkomat_transactions`
- `cph_airview`
- `cph_air_pollution`
- `cph_meteorology`
- `cph_tree_base`
- `cph_water_quality`
- `cph_districts`

### 5. Multi-dataset ingestion structure

- Added `pipelines/ingestion/` for dataset-specific ingestion entrypoints.
- Added `pipelines/shared/loaders.py` for reusable CSV and GeoJSON ingestion.
- Kept backward compatibility for the existing traffic ingest entrypoint.

### 6. Four new ingested and transformed datasets

The following datasets were ingested into Postgres and prepared in dbt:

- `cph_bicycle_data`
- `cph_parking_counts`
- `cph_airview`
- `cph_tree_base`

Raw tables:

- `raw.cph_bicycle_data_raw`
- `raw.cph_parking_counts_raw`
- `raw.cph_airview_raw`
- `raw.cph_tree_base_raw`

dbt staging models:

- `stg_cph_bicycle_data`
- `stg_cph_parking_counts`
- `stg_cph_airview`
- `stg_cph_tree_base`

dbt analytics tables:

- `analytics.cph_bicycle_data`
- `analytics.cph_parking_counts`
- `analytics.cph_airview`
- `analytics.cph_tree_base`

### 7. Compatibility checks

The current system was kept working while the structure changed.

Validated during Phase 1:

- `make ingest`
- `make dbt`
- `make frontend-build`
- traffic API endpoints still respond
- catalog validation passes for all 10 datasets

## Result

Phase 1 is now complete enough to treat the dataset library foundation as
finished.

The project now has:

- a real dataset catalog
- explicit schema and naming rules
- a reusable ingestion pattern
- five transformed datasets total, including the original traffic dataset

## Suggested Phase 2 direction

The most natural next steps are:

- backend dataset catalog API
- frontend dataset library pages
- dataset detail views driven by the catalog
