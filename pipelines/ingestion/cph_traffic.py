import logging

import pandas as pd
import requests
from sqlalchemy import create_engine, text

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

DB_URL = "postgresql://postgres:changeme123@127.0.0.1:5432/observatory"
CKAN_URL = "https://admin.opendata.dk/api/3/action/datastore_search"
RESOURCE_ID = "50f7a383-653a-4860-bb4e-306f221a2d2a"
RAW_TABLE = "raw.ckan_cph_raw"


def fetch_all_ckan_records():
    all_records = []
    offset = 0
    limit = 1000

    while True:
        params = {
            "resource_id": RESOURCE_ID,
            "limit": limit,
            "offset": offset,
        }

        response = requests.get(CKAN_URL, params=params, timeout=60)
        response.raise_for_status()

        payload = response.json()
        result = payload["result"]
        records = result["records"]
        total = result.get("total")

        if not records:
            break

        all_records.extend(records)
        logger.info(
            "Fetched %s records at offset %s (total so far: %s / %s)",
            len(records),
            offset,
            len(all_records),
            total,
        )

        offset += limit

        if len(all_records) >= total:
            break

    return all_records


def load_records(records):
    df = pd.json_normalize(records)
    engine = create_engine(DB_URL)

    with engine.begin() as conn:
        conn.execute(text(f"TRUNCATE TABLE {RAW_TABLE}"))

    df.to_sql("ckan_cph_raw", engine, schema="raw", if_exists="append", index=False)
    logger.info("Loaded %s Copenhagen records to %s", len(df), RAW_TABLE)


def main():
    logger.info("Fetching full Copenhagen traffic data from CKAN API")
    records = fetch_all_ckan_records()
    logger.info("Got %s total records from CKAN", len(records))
    load_records(records)


if __name__ == "__main__":
    main()
