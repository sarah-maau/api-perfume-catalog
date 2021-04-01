-- Revert perfume-catalog:05_insert_functions from pg

BEGIN;

-- drop insert functions
DROP FUNCTION new_perfume;
DROP FUNCTION new_tag;

COMMIT;
