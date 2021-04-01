-- Revert perfume-catalog:01_init from pg

BEGIN;

-- drop tables
DROP TABLE perfume_has_scent, perfume_has_tag, perfume, scent, tag, gender, intensity, brand;
-- drop posint domain
DROP DOMAIN posint;

COMMIT;
