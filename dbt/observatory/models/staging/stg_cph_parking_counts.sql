{{ config(materialized='view') }}

SELECT
    fid                       AS source_fid,
    pkey                      AS source_key,
    taelle_id                 AS parking_count_id,
    vejnavn                   AS street_name,
    straekning                AS street_segment,
    lovlig_p_kl_12            AS legal_spaces_12,
    parkerede_biler_kl_12     AS parked_cars_12,
    belaegning_kl_12_pct      AS occupancy_pct_12,
    lovlig_p_kl_17            AS legal_spaces_17,
    parkerede_biler_kl_17     AS parked_cars_17,
    belaegning_kl_17_pct      AS occupancy_pct_17,
    lovlig_p_kl_22            AS legal_spaces_22,
    parkerede_biler_kl_22     AS parked_cars_22,
    belaegning_kl_22_pct      AS occupancy_pct_22,
    bemaerkning               AS notes,
    kategori                  AS category,
    aar_mnd                   AS year_month,
    vej_id                    AS street_id,
    fra_m                     AS from_meter,
    til_m                     AS to_meter,
    omraade                   AS area,
    id                        AS local_id,
    ogc_fid                   AS ogc_fid,
    wkb_geometry              AS coordinates
FROM {{ source('raw', 'cph_parking_counts_raw') }}

