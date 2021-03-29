-- Revert perfume-catalog:05_insert_functions from pg

BEGIN;

-- suppression des fonctions INSERT
DROP FUNCTION new_perfume;
DROP FUNCTION new_tag;

COMMIT;
