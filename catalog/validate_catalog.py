from __future__ import annotations

from pathlib import Path
import sys

import yaml


ROOT = Path(__file__).resolve().parent
DATASET_DIR = ROOT / "datasets"
SCHEMA_DOC = DATASET_DIR / "SCHEMA.md"

REQUIRED_FIELDS = {
    "dataset_key",
    "slug",
    "title",
    "short_description",
    "topic",
    "geography",
    "source_name",
    "source_url",
    "source_type",
    "license",
    "update_frequency",
    "storage_status",
    "ingestion_status",
    "raw_table_name",
    "staging_model_name",
    "mart_model_name",
    "analysis_ready",
    "published",
    "source_notes",
}

ALLOWED_SOURCE_TYPES = {
    "ckan",
    "api",
    "csv",
    "json",
    "geojson",
    "xlsx",
    "mixed",
    "unknown",
}

ALLOWED_STORAGE_STATUS = {"external_only", "stored_internal"}

ALLOWED_INGESTION_STATUS = {
    "discovered",
    "registered",
    "ingest_planned",
    "ingested",
    "transformed",
    "analysis_ready",
    "published",
    "archived",
}

ALLOWED_TOPICS = {"mobility", "environment", "geography"}


def load_yaml(path: Path):
    with path.open("r", encoding="utf-8") as handle:
        return yaml.safe_load(handle)


def validate_dataset_file(path: Path):
    errors = []
    data = load_yaml(path)

    if not isinstance(data, dict):
        return [f"{path.name}: file must contain a top-level mapping"]

    missing = REQUIRED_FIELDS - set(data)
    if missing:
        errors.append(f"{path.name}: missing required fields: {sorted(missing)}")

    if data.get("source_type") not in ALLOWED_SOURCE_TYPES:
        errors.append(f"{path.name}: invalid source_type '{data.get('source_type')}'")

    if data.get("storage_status") not in ALLOWED_STORAGE_STATUS:
        errors.append(
            f"{path.name}: invalid storage_status '{data.get('storage_status')}'"
        )

    if data.get("ingestion_status") not in ALLOWED_INGESTION_STATUS:
        errors.append(
            f"{path.name}: invalid ingestion_status '{data.get('ingestion_status')}'"
        )

    if data.get("topic") not in ALLOWED_TOPICS:
        errors.append(f"{path.name}: invalid topic '{data.get('topic')}'")

    if not isinstance(data.get("analysis_ready"), bool):
        errors.append(f"{path.name}: analysis_ready must be a boolean")

    if not isinstance(data.get("published"), bool):
        errors.append(f"{path.name}: published must be a boolean")

    expected_filename = f"{data.get('slug')}.yaml"
    if path.name != expected_filename:
        errors.append(
            f"{path.name}: filename should match slug and be '{expected_filename}'"
        )

    return errors


def main():
    dataset_paths = sorted(
        path
        for path in DATASET_DIR.glob("*.yaml")
        if path.name != "catalog-index.yaml"
    )
    errors = []
    dataset_keys = set()
    slugs = set()

    for path in dataset_paths:
        data = load_yaml(path)
        errors.extend(validate_dataset_file(path))

        dataset_key = data.get("dataset_key")
        slug = data.get("slug")

        if dataset_key in dataset_keys:
            errors.append(f"{path.name}: duplicate dataset_key '{dataset_key}'")
        dataset_keys.add(dataset_key)

        if slug in slugs:
            errors.append(f"{path.name}: duplicate slug '{slug}'")
        slugs.add(slug)

    if errors:
        print("Catalog validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print(f"Catalog validation passed for {len(dataset_paths)} dataset files.")
    print(f"Schema reference: {SCHEMA_DOC}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
