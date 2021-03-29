-- Deploy perfume-catalog:02_constraints to pg

BEGIN;

-- ajout de la contrainte pour la couleur (elle doit respecter la forme hexadécimale)
ALTER TABLE tag ADD CONSTRAINT color_format CHECK (color ~* '^#[a-fA-F0-9]{2}[a-fA-F0-9]{2}[a-fA-F0-9]{2}$');

-- ajout de la contrainte sur la date de création (l'année de création doit être antérieure à celle en cours)
ALTER TABLE perfume ADD CONSTRAINT valid_year CHECK (year_of_creation <= CURRENT_DATE);

-- ajout de la contrainte sur les scores (doivent être compris entre 0 et 5 inclus)
ALTER TABLE perfume ADD CONSTRAINT valid_score CHECK (score <= 5);

--  ajout d'une contrainte sur toutes les strings (interdire les valeurs incohérentes comme simple espace, chaîne vide)

ALTER TABLE perfume ADD CONSTRAINT valid_perfume_name CHECK (char_length(trim(both from "name")) >= 2);
ALTER TABLE perfume ADD CONSTRAINT valid_creator CHECK (char_length(trim(both from creator)) >= 5);
ALTER TABLE intensity ADD CONSTRAINT valid_intensity_type CHECK (char_length(trim(both from "type")) >= 5);
ALTER TABLE gender ADD CONSTRAINT valid_gender_type CHECK (char_length(trim(both from "type")) >= 5);
ALTER TABLE brand ADD CONSTRAINT valid_brand_name CHECK (char_length(trim(both from "name")) >= 2);
ALTER TABLE tag ADD CONSTRAINT valid_label CHECK (char_length(trim(both from label)) >= 2);
ALTER TABLE scent ADD CONSTRAINT valid_note CHECK (char_length(trim(both from note)) >= 2);

COMMIT;
