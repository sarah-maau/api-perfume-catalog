-- Revert perfume-catalog:02_constraints from pg

BEGIN;

-- suppression des contraintes sur la table tag
ALTER TABLE tag 
    DROP CONSTRAINT color_format,
    DROP CONSTRAINT valid_label;

-- suppression des contraintes sur la table perfume
ALTER TABLE perfume 
    DROP CONSTRAINT valid_year,
    DROP CONSTRAINT valid_score,
    DROP CONSTRAINT valid_perfume_name,
    DROP CONSTRAINT valid_creator;

-- suppression des contraintes sur la table intensity
ALTER TABLE intensity DROP CONSTRAINT valid_intensity_type;

-- suppression des contraintes sur la table gender
ALTER TABLE gender DROP CONSTRAINT valid_gender_type;

-- suppression des contraintes sur la table brand
ALTER TABLE brand DROP CONSTRAINT valid_brand_name;

-- suppression des contraintes sur la table scent
ALTER TABLE scent DROP CONSTRAINT valid_note;

COMMIT;
