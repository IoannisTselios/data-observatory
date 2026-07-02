{{ config(materialized='view') }}

SELECT
    fid                    AS source_fid,
    uuid,
    id                     AS tree_id,
    kategori               AS category,
    saerligt_trae          AS special_tree_flag,
    type                   AS tree_type,
    element,
    under_element          AS sub_element,
    traeart                AS species_name,
    dansk_navn             AS danish_name,
    planteaar              AS planting_year,
    plantet_halvaar        AS planting_half_year,
    bydelsnavn             AS district_name,
    lokaludvalg            AS local_committee,
    byrumstype             AS urban_space_type,
    underordnet_byrumstype AS sub_urban_space_type,
    wkb_geometry           AS coordinates
FROM {{ source('raw', 'cph_tree_base_raw') }}

