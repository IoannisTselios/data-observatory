{{ config(materialized='table') }}

SELECT *
FROM {{ ref('stg_cph_parking_counts') }}
WHERE parking_count_id IS NOT NULL

