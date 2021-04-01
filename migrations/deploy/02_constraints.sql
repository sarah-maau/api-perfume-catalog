-- Deploy perfume-catalog:02_constraints to pg

BEGIN;

-- color constraint: it must respect the hexadecimal form
ALTER TABLE tag ADD CONSTRAINT color_format CHECK (color ~* '^#[a-fA-F0-9]{2}[a-fA-F0-9]{2}[a-fA-F0-9]{2}$');

-- date constraint: can't be later than today
ALTER TABLE perfume ADD CONSTRAINT valid_year CHECK (year_of_creation <= CURRENT_DATE);

-- score constraint: must be between 0 and 5 (included)
ALTER TABLE perfume ADD CONSTRAINT valid_score CHECK (score <= 5);

-- strings constraint: forbid inconsistent values like blank space or empty string
ALTER TABLE perfume ADD CONSTRAINT valid_perfume_name CHECK (char_length(trim(both from "name")) >= 2);
ALTER TABLE perfume ADD CONSTRAINT valid_creator CHECK (char_length(trim(both from creator)) >= 5);
ALTER TABLE intensity ADD CONSTRAINT valid_intensity_type CHECK (char_length(trim(both from "type")) >= 5);
ALTER TABLE gender ADD CONSTRAINT valid_gender_type CHECK (char_length(trim(both from "type")) >= 5);
ALTER TABLE brand ADD CONSTRAINT valid_brand_name CHECK (char_length(trim(both from "name")) >= 2);
ALTER TABLE tag ADD CONSTRAINT valid_label CHECK (char_length(trim(both from label)) >= 2);
ALTER TABLE scent ADD CONSTRAINT valid_note CHECK (char_length(trim(both from note)) >= 2);

COMMIT;
