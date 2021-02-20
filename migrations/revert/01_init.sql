-- Revert perfume-catalog:01_init from pg

BEGIN;

-- suppression des tables
DROP TABLE perfume_has_scent, perfume_has_tag, perfume, scent, tag, gender, intensity, brand;
-- suppression du domain posint
DROP DOMAIN posint;

COMMIT;
