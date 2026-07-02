from functools import lru_cache
from pathlib import Path

import yaml


BASE_DIR = Path(__file__).resolve().parents[2]
DATASET_DIR = BASE_DIR / "catalog" / "datasets"
CATALOG_INDEX_PATH = DATASET_DIR / "catalog-index.yaml"


def _load_yaml(path: Path):
    with path.open("r", encoding="utf-8") as handle:
        return yaml.safe_load(handle)


@lru_cache(maxsize=1)
def load_catalog_index():
    return _load_yaml(CATALOG_INDEX_PATH)


def _dataset_file_paths():
    return sorted(
        path
        for path in DATASET_DIR.glob("*.yaml")
        if path.name != "catalog-index.yaml"
    )


@lru_cache(maxsize=1)
def load_dataset_map():
    dataset_map = {}
    for path in _dataset_file_paths():
        dataset = _load_yaml(path)
        dataset_map[dataset["slug"]] = dataset
    return dataset_map


def list_datasets():
    dataset_map = load_dataset_map()
    index = load_catalog_index()
    items = []

    for item in index.get("datasets", []):
        dataset = dataset_map.get(item["slug"])
        if not dataset:
            continue

        merged = dataset.copy()
        merged["priority"] = item.get("priority")
        items.append(merged)

    return items


def get_dataset_by_slug(slug: str):
    for dataset in list_datasets():
        if dataset["slug"] == slug:
            return dataset
    return None
