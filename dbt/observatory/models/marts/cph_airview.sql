{{ config(materialized='table') }}

SELECT *
FROM {{ ref('stg_cph_airview') }}
WHERE road_id IS NOT NULL

