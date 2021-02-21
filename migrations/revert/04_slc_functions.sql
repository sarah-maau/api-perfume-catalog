-- Revert perfume-catalog:04_slc_functions from pg

BEGIN;

-- suppression des fonctions
DROP FUNCTION one_perfume;
DROP FUNCTION one_gender;
DROP FUNCTION one_intensity;
DROP FUNCTION one_tag;
DROP FUNCTION one_scent;

-- suppression des types
DROP TYPE perfume_type;
DROP TYPE gender_type;
DROP TYPE intensity_type;
DROP TYPE tag_type;
DROP TYPE scent_type;

COMMIT;
