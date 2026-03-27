from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.core.database import get_db
from typing import List, Dict

router = APIRouter()

@router.get("/traffic/summary", response_model=List[Dict])
async def traffic_summary(db: Session = Depends(get_db)):
    result = db.execute(text("""
        SELECT 
            to_char(count_date::bigint::text::date, 'YYYY-MM-DD') as day,
            COUNT(*) as trips,
            ROUND(AVG(cycling_share_pct * 100), 1) as avg_cycling_pct
        FROM analytics.cph_traffic 
        WHERE count_date IS NOT NULL
        GROUP BY day 
        ORDER BY day DESC 
        LIMIT 30
    """)).fetchall()
    
    return [{"day": r[0], "trips": r[1], "avg_cycling_pct": float(r[2])} for r in result]

@router.get("/traffic/latest", response_model=List[Dict])
async def traffic_latest(db: Session = Depends(get_db)):
    result = db.execute(text("""
        SELECT 
            street_name, 
            cycling_share_pct * 100 as cycling_pct,
            (avg_daily_cyclists + avg_daily_vehicles) as total_trips,
            count_date::bigint::text::date as date
        FROM analytics.cph_traffic 
        WHERE count_date IS NOT NULL
        ORDER BY count_date DESC NULLS LAST, total_trips DESC 
        LIMIT 10
    """)).fetchall()
    
    return [{"street": r[0], "cycling_pct": float(r[1]), 
             "total_trips": int(r[2]), "date": str(r[3])} for r in result]

@router.get("/traffic/top-streets")
async def top_streets(db: Session = Depends(get_db)):
    result = db.execute(text("""
        SELECT 
            street_name,
            ROUND(cycling_share_pct * 100, 1) as cycling_pct,
            avg_daily_cyclists,
            count_date::bigint::text::date as date
        FROM analytics.cph_traffic 
        WHERE count_date IS NOT NULL
        ORDER BY cycling_share_pct DESC NULLS LAST
        LIMIT 10
    """)).fetchall()
    
    return [{"street": r[0], "cycling_pct": float(r[1]), 
             "daily_cyclists": int(r[2]), "date": str(r[3])} for r in result]
