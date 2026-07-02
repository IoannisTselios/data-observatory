import logging

from pipelines.shared.loaders import ingest_csv_dataset

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

DATASET_URL = (
    "https://wfs-kbhkort.kk.dk/k101/ows?service=WFS&version=1.0.0"
    "&request=GetFeature&typeName=k101:cykeldata_kk&outputFormat=csv&SRSNAME=EPSG:4326"
)
RAW_TABLE_NAME = "cph_bicycle_data_raw"


def main():
    logger.info("Ingesting Copenhagen bicycle data")
    ingest_csv_dataset(DATASET_URL, RAW_TABLE_NAME)


if __name__ == "__main__":
    main()
