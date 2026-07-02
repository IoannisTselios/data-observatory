# Naming Conventions

This document makes the Phase 1 naming rules explicit so the dataset library,
ingestion layer, dbt models, and future frontend routes all stay aligned.

## Dataset keys

- format: lowercase `snake_case`
- purpose: internal identifier
- examples:
  - `cph_traffic`
  - `cph_bicycle_data`
  - `cph_tree_base`

## Public slugs

- format: lowercase `kebab-case`
- purpose: frontend routes and public references
- examples:
  - `cph-traffic`
  - `cph-bicycle-data`
  - `cph-tree-base`

## Metadata filenames

- format: same as slug, with `.yaml`
- directory: `catalog/datasets/`
- examples:
  - `catalog/datasets/cph-traffic.yaml`
  - `catalog/datasets/cph-bicycle-data.yaml`

## Raw table names

- format: `raw.<dataset_key>_raw`
- examples:
  - `raw.ckan_cph_raw`
  - `raw.cph_bicycle_data_raw`
  - `raw.cph_tree_base_raw`

Note:
- the current traffic dataset keeps `raw.ckan_cph_raw` for backward
  compatibility with the original ingest flow

## dbt staging model names

- format: `stg_<dataset_key>`
- examples:
  - `stg_cph_traffic`
  - `stg_cph_bicycle_data`
  - `stg_cph_tree_base`

## dbt mart model names

- format: `<dataset_key>`
- schema target: `analytics`
- examples:
  - `analytics.cph_traffic`
  - `analytics.cph_bicycle_data`
  - `analytics.cph_tree_base`

## Ingestion module names

- format: `pipelines/ingestion/<dataset_key>.py`
- examples:
  - `pipelines/ingestion/cph_traffic.py`
  - `pipelines/ingestion/cph_bicycle_data.py`
  - `pipelines/ingestion/cph_tree_base.py`

## Route pattern for future dataset pages

- list route: `/datasets`
- detail route: `/datasets/:slug`

## Phase 1 rule

If a new dataset is added, the following should be inferable from one another:

- metadata filename
- dataset key
- public slug
- ingestion module name
- staging model name
- mart model name

That predictability is the core naming goal.
