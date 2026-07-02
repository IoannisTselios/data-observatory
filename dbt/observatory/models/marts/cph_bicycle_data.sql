{{ config(materialized='table') }}

SELECT *
FROM {{ ref('stg_cph_bicycle_data') }}
WHERE route_id IS NOT NULL

