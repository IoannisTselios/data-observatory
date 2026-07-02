from fastapi import APIRouter, HTTPException

from app.schemas.datasets import DatasetDetail, DatasetListItem
from app.services.catalog import get_dataset_by_slug, list_datasets

router = APIRouter()


@router.get("/datasets", response_model=list[DatasetListItem])
async def dataset_list():
    return list_datasets()


@router.get("/datasets/{slug}", response_model=DatasetDetail)
async def dataset_detail(slug: str):
    dataset = get_dataset_by_slug(slug)

    if dataset is None:
        raise HTTPException(status_code=404, detail="Dataset not found")

    return dataset
