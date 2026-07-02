# Dataset Schema v1

This document defines the Phase 1 metadata schema for dataset catalog entries.

Each dataset file in this directory should contain the same top-level fields in
the same general order so the catalog stays easy to read and easy to parse
later.

## Required fields

- `dataset_key`
  - internal identifier
  - format: lowercase `snake_case`
  - example: `cph_traffic`
- `slug`
  - public identifier
  - format: lowercase `kebab-case`
  - example: `cph-traffic`
- `title`
  - human-readable dataset title
- `short_description`
  - one-sentence summary for cards or detail pages
- `topic`
  - high-level subject area
- `geography`
  - plain-language coverage area
- `source_name`
  - publishing body or source family name
- `source_url`
  - canonical public dataset page
- `source_type`
  - how the dataset is exposed
- `license`
  - current known license, or `unknown`
- `update_frequency`
  - current known update cadence, or `unknown`
- `storage_status`
  - whether the platform stores the data yet
- `ingestion_status`
  - lifecycle position in the platform
- `raw_table_name`
  - Postgres raw table name, or `null`
- `staging_model_name`
  - dbt staging model name, or `null`
- `mart_model_name`
  - dbt mart/analytics model name, or `null`
- `analysis_ready`
  - boolean
- `published`
  - boolean
- `source_notes`
  - short practical note about how the dataset fits the platform

## Controlled values

### `source_type`

Allowed Phase 1 values:

- `ckan`
- `api`
- `csv`
- `json`
- `geojson`
- `xlsx`
- `mixed`
- `unknown`

Use `ckan` when the dataset is primarily cataloged through CKAN even if the
resources behind it include CSV or GeoJSON downloads.

### `storage_status`

Allowed Phase 1 values:

- `external_only`
- `stored_internal`

Meaning:

- `external_only`: cataloged, but not yet loaded into our own database
- `stored_internal`: raw data is already ingested into our own database

### `ingestion_status`

Allowed Phase 1 values:

- `discovered`
- `registered`
- `ingest_planned`
- `ingested`
- `transformed`
- `analysis_ready`
- `published`
- `archived`

Meaning:

- `discovered`: found, but not yet turned into a catalog record
- `registered`: catalog metadata exists, but no internal ingest yet
- `ingest_planned`: chosen as an upcoming ingest target
- `ingested`: raw data is loaded internally
- `transformed`: dbt-ready analytical layer exists
- `analysis_ready`: sufficiently clean and understandable for analysis
- `published`: already connected to a public-facing output
- `archived`: retained for reference, not actively maintained

### `topic`

Allowed Phase 1 values:

- `mobility`
- `environment`
- `geography`

This can expand later, but keeping it small now helps the catalog stay tidy.

### `priority`

This field currently appears in `catalog-index.yaml` and is used as a planning
layer on top of `ingestion_status`.

Allowed Phase 1 values:

- `active_now`
- `next_up`
- `planned_later`
- `catalog_only`
- `support_dataset`

Meaning:

- `active_now`: already implemented enough to use as the current working example
- `next_up`: chosen as one of the immediate follow-on implementation targets
- `planned_later`: still planned, but not in the first small implementation batch
- `catalog_only`: listed in the library, but not prioritized for near-term ingest
- `support_dataset`: useful reference dataset for joins, context, or mapping

## Null handling

Use `null` for:

- `raw_table_name`
- `staging_model_name`
- `mart_model_name`

when a dataset has not yet been ingested or transformed.

## Phase 1 rule

In Phase 1, a dataset entry is considered valid when:

- all required fields are present
- controlled-value fields use one of the allowed values above
- `dataset_key` and `slug` match the naming rules
- internal table/model names are either valid identifiers or `null`
