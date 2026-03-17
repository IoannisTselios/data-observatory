{{ config(materialized='view') }}

SELECT
    _id                  AS id,
    vejnavn              AS street_name,
    beskrivelse          AS description,
    aar                  AS year,
    aadt_cykler          AS avg_daily_cyclists,
    aadt_koretojer       AS avg_daily_vehicles,
    cykler_7_19          AS cyclists_daytime,
    tung_pct_real        AS heavy_truck_pct,
    wkb_geometry         AS coordinates,
    taelle_dato          AS count_date
FROM {{ source('raw', 'ckan_cph_raw') }}
WHERE aadt_cykler IS NOT NULL
AND aar IS NOT NULL
