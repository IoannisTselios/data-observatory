# Dataset Files

Each dataset in the library should have one metadata file in this directory.

Recommended file format:

- one file per dataset
- lowercase kebab-case filename
- YAML for readability

Example:

- `cph-traffic.yaml`

These files describe the dataset, its source, its current lifecycle status,
and which raw/dbt assets belong to it.

The exact metadata rules for these files are defined in
`catalog/datasets/SCHEMA.md`.

## Phase 1 starter catalog

The first catalog set is intentionally curated from the same Open Data DK /
Kobenhavns Kommune ecosystem so the library can grow from a familiar source
pattern before more varied sources are added.

The initial ten datasets are:

- `cph-traffic.yaml`
- `cph-bicycle-data.yaml`
- `cph-parking-counts.yaml`
- `cph-parkomat-transactions.yaml`
- `cph-airview.yaml`
- `cph-air-pollution.yaml`
- `cph-meteorology.yaml`
- `cph-tree-base.yaml`
- `cph-water-quality.yaml`
- `cph-districts.yaml`
