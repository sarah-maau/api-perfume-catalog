-- Revert perfume-catalog:06_upd_functions from pg

BEGIN;

-- suppression des fonctions
DROP FUNCTION update_intensity;
DROP FUNCTION update_gender;
DROP FUNCTION update_scent;
DROP FUNCTION update_tag;
DROP FUNCTION update_perfume;

COMMIT;
