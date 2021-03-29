-- Revert perfume-catalog:03_views from pg

BEGIN;

-- suppression des vues
DROP VIEW all_from_perfumes;
DROP VIEW brands_have_perfumes;
DROP VIEW perfume_genders;


COMMIT;
