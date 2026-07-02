import logging

from pipelines.shared.loaders import ingest_geojson_dataset

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

DATASET_URL = "https://kbhkort.kk.dk/media/airview/CAV_25May2021.geojson"
RAW_TABLE_NAME = "cph_airview_raw"


def main():
    logger.info("Ingesting Copenhagen Air View")
    ingest_geojson_dataset(DATASET_URL, RAW_TABLE_NAME)


if __name__ == "__main__":
    main()
