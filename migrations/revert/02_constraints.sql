-- Revert perfume-catalog:02_constraints from pg

BEGIN;

-- drop the constraints on the tag table 
ALTER TABLE tag 
    DROP CONSTRAINT color_format,
    DROP CONSTRAINT valid_label;

-- drop the constraints on the perfume table 
ALTER TABLE perfume 
    DROP CONSTRAINT valid_year,
    DROP CONSTRAINT valid_score,
    DROP CONSTRAINT valid_perfume_name,
    DROP CONSTRAINT valid_creator;

-- drop the constraints on the intensity table 
ALTER TABLE intensity DROP CONSTRAINT valid_intensity_type;

-- drop the constraints on the gender table 
ALTER TABLE gender DROP CONSTRAINT valid_gender_type;

-- drop the constraints on the brand table 
ALTER TABLE brand DROP CONSTRAINT valid_brand_name;

-- drop the constraints on the scent table 
ALTER TABLE scent DROP CONSTRAINT valid_note;

COMMIT;
