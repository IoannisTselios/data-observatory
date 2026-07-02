import json
import logging
from io import StringIO

import pandas as pd
import requests
from sqlalchemy import create_engine, text

logger = logging.getLogger(__name__)

DB_URL = "postgresql://postgres:changeme123@127.0.0.1:5432/observatory"


def fetch_csv_dataframe(url):
    response = requests.get(url, timeout=120)
    response.raise_for_status()
    return pd.read_csv(StringIO(response.text))


def fetch_geojson_dataframe(url):
    response = requests.get(url, timeout=120)
    response.raise_for_status()
    payload = response.json()

    records = []
    for feature in payload.get("features", []):
        properties = feature.get("properties", {}).copy()
        geometry = feature.get("geometry") or {}
        properties["geometry_type"] = geometry.get("type")
        properties["geometry_json"] = json.dumps(geometry, ensure_ascii=True)
        records.append(properties)

    return pd.DataFrame(records)


def normalize_columns(df):
    renamed = []
    for column in df.columns:
        normalized = (
            str(column)
            .strip()
            .lower()
            .replace(" ", "_")
            .replace("-", "_")
            .replace("/", "_")
            .replace("(", "")
            .replace(")", "")
            .replace(".", "")
        )
        renamed.append(normalized)

    df.columns = renamed
    return df


def load_dataframe_to_raw(df, raw_table_name):
    engine = create_engine(DB_URL)

    with engine.begin() as conn:
        conn.execute(text(f"DROP TABLE IF EXISTS raw.{raw_table_name}"))

    df.to_sql(raw_table_name, engine, schema="raw", if_exists="replace", index=False)
    logger.info("Loaded %s rows into raw.%s", len(df), raw_table_name)


def ingest_csv_dataset(url, raw_table_name):
    df = fetch_csv_dataframe(url)
    df = normalize_columns(df)
    load_dataframe_to_raw(df, raw_table_name)
    return df


def ingest_geojson_dataset(url, raw_table_name):
    df = fetch_geojson_dataframe(url)
    df = normalize_columns(df)
    load_dataframe_to_raw(df, raw_table_name)
    return df
