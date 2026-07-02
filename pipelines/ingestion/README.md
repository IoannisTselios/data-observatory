# Ingestion

This directory contains dataset-specific ingestion entrypoints.

Each dataset should eventually have one main file here, for example:

- `cph_traffic.py`
- `dk_air_quality.py`

These files should stay focused on the dataset they ingest and reuse helpers
from `pipelines/shared/` when possible.
