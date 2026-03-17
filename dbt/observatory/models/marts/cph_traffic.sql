{{ config(materialized='table') }}

SELECT
    id,
    street_name,
    description,
    year,
    avg_daily_cyclists,
    avg_daily_vehicles,
    cyclists_daytime,
    heavy_truck_pct,
    coordinates,
    count_date,
    ROUND(
        (avg_daily_cyclists / NULLIF(avg_daily_vehicles, 0) * 100)::numeric, 2
    ) AS cycling_share_pct
FROM {{ ref('stg_cph_traffic') }}
WHERE year IS NOT NULL
ORDER BY avg_daily_cyclists DESC
