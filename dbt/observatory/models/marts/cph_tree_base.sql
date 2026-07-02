{{ config(materialized='table') }}

SELECT *
FROM {{ ref('stg_cph_tree_base') }}
WHERE tree_id IS NOT NULL
