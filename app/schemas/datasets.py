from pydantic import BaseModel


class DatasetListItem(BaseModel):
    dataset_key: str
    slug: str
    title: str
    short_description: str
    topic: str
    geography: str
    source_name: str
    source_url: str
    source_type: str
    storage_status: str
    ingestion_status: str
    analysis_ready: bool
    published: bool
    priority: str | None = None


class DatasetDetail(DatasetListItem):
    license: str
    update_frequency: str
    raw_table_name: str | None = None
    staging_model_name: str | None = None
    mart_model_name: str | None = None
    source_notes: str
