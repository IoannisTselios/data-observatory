# Data Observatory Project Foundation

This document defines the first version of the platform architecture, the dataset library concept, the Phase 1 scope, and how to use this project board in practice.

## 1. Product Direction

Data Observatory is moving from a single-dataset prototype into a dataset library and research publishing platform.

The long-term idea is:

1. Curate public datasets
2. Store and standardize them
3. Let users discover and use them
4. Support analysis workflows
5. Make article publishing easy

The first practical version should stay simpler:

1. Build the dataset library
2. Build clean dbt-ready dataset structure
3. Add frontend dataset pages
4. Add download and analysis guidance
5. Add simple article publishing
6. Deploy this stable version
7. Later build hosted notebook sessions

## 2. Platform Layers

The platform is divided into clear layers.

### Dataset Library
This is the catalog of all datasets in the platform.

Its job is to answer:
- What datasets do we have?
- Where did they come from?
- What topic do they belong to?
- Are they ingested yet?
- Are they analysis-ready?
- Are they published yet?

### Ingestion Layer
This brings source data into the system.

Its job is to:
- fetch source data from APIs, CSVs, CKAN, or other public sources
- preserve the raw source shape as much as possible
- write raw tables into Postgres
- record source and ingest metadata

### dbt Transformation Layer
This standardizes raw datasets into clean analysis-ready tables.

Its job is to:
- rename columns
- normalize types
- parse dates
- do objective cleaning only
- create reusable models and documented fields
- add tests and documentation where useful

### Analysis Layer
This is where data is explored.

Its job is to:
- inspect dataset structure
- validate metric meaning
- find patterns and caveats
- generate figures and tables
- support article creation

In early versions, users will do this locally after downloading the data.
In later versions, this can evolve into hosted notebooks or research workspaces.

### Publishing Layer
This is how findings become public-facing content.

Its job is to:
- present articles
- link articles to datasets
- support charts and images
- preserve a simple editorial workflow

## 3. Phase 1 Goal

Phase 1 turns the project into a real dataset library.

The main outcome of Phase 1 is:
- a dataset catalog with at least 10 entries
- a clear metadata model
- a clear status system
- naming conventions
- the first frontend dataset pages planned around that catalog

Phase 1 does not yet include:
- hosted notebook sessions
- full user analysis workspaces
- public code execution in the browser

## 4. Dataset Catalog Schema

Every dataset in the platform should follow one shared structure.

## Required fields

- `dataset_key`
  - short internal identifier
  - example: `cph_traffic`
- `slug`
  - public route slug
  - example: `cph-traffic`
- `title`
  - display title
- `short_description`
  - one or two lines for cards and summaries
- `topic`
  - main topic such as `mobility`, `climate`, `housing`, `economy`
- `geography`
  - country/city/region coverage
- `source_name`
  - organization or platform name
- `source_url`
  - original source page or API landing page
- `source_type`
  - one of `api`, `csv`, `ckan`, `json`, `manual`, `other`
- `license`
  - source license if known
- `update_frequency`
  - for example `daily`, `monthly`, `yearly`, `unknown`
- `storage_status`
  - whether data is only external or stored internally
- `ingestion_status`
  - current lifecycle stage
- `raw_table_name`
  - Postgres raw table if present
- `staging_model_name`
  - dbt staging model if present
- `mart_model_name`
  - dbt mart or analytics model if present
- `analysis_ready`
  - true/false
- `published`
  - true/false

## Optional fields

- `long_description`
- `source_notes`
- `column_notes`
- `time_coverage`
- `spatial_coverage`
- `owner_notes`
- `last_ingested_at`
- `last_transformed_at`
- `last_reviewed_at`
- `download_formats`
- `related_articles`
- `related_notebooks`

## Example entry

```yaml
dataset_key: cph_traffic
slug: cph-traffic
title: Copenhagen Traffic Counts
short_description: Street-level traffic observations with cyclist and vehicle indicators for Copenhagen.
topic: mobility
geography: Copenhagen, Denmark
source_name: Open Data Copenhagen
source_url: https://admin.opendata.dk/
source_type: ckan
license: unknown
update_frequency: unknown
storage_status: stored_internal
ingestion_status: transformed
raw_table_name: raw.ckan_cph_raw
staging_model_name: stg_cph_traffic
mart_model_name: analytics.cph_traffic
analysis_ready: true
published: false
```

## 5. Dataset Lifecycle Statuses

These statuses describe how far a dataset has progressed in the platform.

- `discovered`
  - dataset has been found but not formally registered
- `registered`
  - dataset has been added to the catalog with metadata
- `ingest_planned`
  - there is a plan for collecting it but no raw table yet
- `ingested`
  - raw data has been loaded into Postgres
- `transformed`
  - dbt has produced a clean analytical model
- `analysis_ready`
  - dataset is understandable and usable for analysis
- `published`
  - at least one dataset page or public article is live
- `archived`
  - dataset is no longer maintained but kept for reference

### Practical meaning

A dataset does not need to jump directly from discovered to fully ready.

A healthy catalog can contain:
- datasets that are only ideas
- datasets that are stored but not cleaned
- datasets that are cleaned but not published
- datasets already used in articles

## 6. Naming Conventions

Use one naming system across the whole project.

### Dataset keys
- use lowercase snake_case
- short but descriptive
- examples:
  - `cph_traffic`
  - `dk_air_quality`
  - `eu_city_population`

### Public slugs
- use lowercase kebab-case
- examples:
  - `cph-traffic`
  - `dk-air-quality`

### Raw tables
- schema: `raw`
- name: source or dataset-oriented snake_case
- examples:
  - `raw.ckan_cph_raw`
  - `raw.dk_air_quality_raw`

### dbt staging models
- prefix with `stg_`
- one main staging model per dataset
- examples:
  - `stg_cph_traffic`
  - `stg_dk_air_quality`

### dbt mart or analytics models
- use one consistent convention such as plain dataset name or `fct_` for fact-like models
- examples:
  - `cph_traffic`
  - `fct_cph_traffic`

### Frontend routes
- dataset list: `/datasets`
- dataset detail: `/datasets/:slug`
- article routes can later link back to datasets

## 7. Recommended Database Structure

Use the database with clear responsibilities.

### Schemas
- `raw`
  - source-faithful ingested data
- `analytics`
  - clean analysis-ready tables
- `catalog`
  - dataset metadata and catalog tables

### Early catalog table idea
- `catalog.datasets`
- optional later tables:
  - `catalog.dataset_sources`
  - `catalog.dataset_downloads`
  - `catalog.dataset_articles`

## 8. What dbt Should Do

In this platform, dbt should be responsible for structural dataset preparation.

At minimum dbt should:
- rename unclear source columns
- normalize types
- parse dates
- handle obvious invalid values
- define stable reusable fields
- document models and columns
- add baseline tests where reasonable

What dbt should usually not do:
- article-specific storytelling logic
- subjective analytical interpretation
- one-off notebook exploration

## 9. What Notebooks Or Analysis Should Do

The analysis layer should focus on understanding and interpretation.

It should:
- inspect the cleaned dataset
- explain what metrics mean
- investigate caveats and ambiguity
- test hypotheses carefully
- create useful charts and tables
- support article writing

In the simpler version of the platform, users do this after downloading data.
In a later version, this can become a hosted notebook experience.

## 10. Frontend Scope At This Stage

The frontend does not need a full research workspace yet.

It should first support:
- a dataset library page
- dataset detail pages
- source and metadata display
- download links or export access
- an analysis guide section
- article pages linked to datasets

## 11. Publishing Approach

The recommended first publishing format is Markdown.

### Why Markdown first
- simple to write
- easy to version control
- easy to render in the frontend
- beginner-friendly
- flexible enough for images and charts

### Article minimum structure
- title
- slug
- summary
- related datasets
- author
- publish status
- markdown body

## 12. Phase 1 Deliverables

Phase 1 is complete when:
- dataset catalog schema is defined
- lifecycle statuses are defined
- naming conventions are defined
- current traffic dataset is registered properly
- catalog contains at least 10 dataset entries

## 13. Phase 1 Easy Todo List

1. Define dataset metadata schema
2. Define lifecycle statuses
3. Define naming conventions
4. Register current traffic dataset using the new schema
5. Curate 9 additional dataset entries
6. Decide where the first catalog lives
7. Prepare the frontend to consume catalog entries later

## 14. How To Use The GitHub Issues

The current Phase 1 issues are:
- #1 Define dataset catalog metadata schema
- #2 Define dataset lifecycle and readiness statuses
- #3 Define naming conventions for dataset tables, models, and routes
- #4 Create initial dataset catalog with 10 dataset entries

### Suggested order
1. Do issue #1 first
2. Then do issue #2
3. Then do issue #3
4. Then do issue #4

### Suggested board columns
- `Backlog`
- `Ready`
- `In Progress`
- `Review`
- `Done`

### How to place the current issues
- `#1` -> `In Progress`
- `#2` -> `Ready`
- `#3` -> `Ready`
- `#4` -> `Backlog`

### Why this order
- Issue #1 defines what a dataset is
- Issue #2 defines how a dataset moves through the platform
- Issue #3 keeps naming consistent across layers
- Issue #4 uses the rules from the first three issues

## 15. How To Work With This In Practice

When you want to add a dataset in the future, the workflow should be:

1. Add a dataset entry to the catalog
2. Give it a dataset key and slug
3. Fill in source metadata
4. Set the initial lifecycle status
5. If ready, build ingestion
6. Load raw data into Postgres
7. Create dbt staging and mart models
8. Mark it as transformed or analysis-ready
9. Add dataset page and download guidance
10. Later connect it to analysis outputs or articles

## 16. What Not To Build Yet

Do not build these first:
- browser-based public Python execution
- multi-user hosted notebooks
- full CMS for article editing
- complex user workspace logic

Those are later-stage features and should come after the library foundation is stable.

## 17. Immediate Next Recommendation

The next practical task after this document is to complete Issue #1 by choosing the exact dataset catalog structure and deciding where the first version of the catalog will live.
