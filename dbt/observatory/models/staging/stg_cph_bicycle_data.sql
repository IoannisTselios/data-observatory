{{ config(materialized='view') }}

SELECT
    fid              AS source_fid,
    id               AS route_id,
    rute_nr          AS route_number,
    rutenavn         AS route_name,
    status,
    kategori         AS category,
    under_kategori   AS subcategory,
    kommune          AS municipality,
    wkb_geometry     AS coordinates
FROM {{ source('raw', 'cph_bicycle_data_raw') }}

