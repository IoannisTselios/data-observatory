{{ config(materialized='view') }}

SELECT
    fid            AS source_fid,
    shape_leng     AS shape_length,
    road_fid       AS road_id,
    mixed_no2,
    mixed_ufp,
    mixed_bc,
    geometry_type,
    geometry_json
FROM {{ source('raw', 'cph_airview_raw') }}

