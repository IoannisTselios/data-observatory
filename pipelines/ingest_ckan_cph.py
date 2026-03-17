import requests
import pandas as pd
import logging
from sqlalchemy import create_engine

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

DB_URL = "postgresql://postgres:changeme123@127.0.0.1:5432/observatory"

def main():
    # CKAN API call (your discovery!)
    url = "https://admin.opendata.dk/api/3/action/datastore_search"
    params = {
        'resource_id': '50f7a383-653a-4860-bb4e-306f221a2d2a',
        'limit': 1000  # Get more records
    }
    
    logger.info("🚀 Fetching real Copenhagen data from CKAN API...")
    response = requests.get(url, params=params)
    response.raise_for_status()
    
    data = response.json()
    records = data['result']['records']
    
    logger.info(f"Got {len(records)} records from CKAN")
    
    # Convert to DataFrame
    df = pd.json_normalize(records)
    
    # Save to Postgres
    engine = create_engine(DB_URL)
    df.to_sql('ckan_cph_raw', engine, schema='raw', if_exists='replace', index=False)
    
    logger.info(f"✅ Loaded {len(df)} Copenhagen records to raw.ckan_cph_raw")

if __name__ == '__main__':
    main()
