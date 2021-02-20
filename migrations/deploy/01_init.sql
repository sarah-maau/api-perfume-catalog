-- Deploy perfume-catalog:01_init to pg

BEGIN;

-- création du domaine posint (entier positif)
CREATE DOMAIN posint AS int CHECK (value >= 0);

-- création des tables issues du MLD
CREATE TABLE intensity (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "type" text NOT NULL UNIQUE
);

CREATE TABLE gender (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "type" text NOT NULL UNIQUE
);

CREATE TABLE brand (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" text NOT NULL UNIQUE
);

CREATE TABLE perfume (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" text NOT NULL,
    creator text,
    year_of_creation date NOT NULL DEFAULT CURRENT_DATE,
    score posint NOT NULL,
    brand_id int NOT NULL REFERENCES brand(id) ON DELETE CASCADE,
    intensity_id int NOT NULL REFERENCES intensity(id) ON DELETE CASCADE,
    gender_id int NOT NULL REFERENCES gender(id) ON DELETE CASCADE
);

CREATE TABLE tag (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label text UNIQUE NOT NULL,
    color text DEFAULT '#FF00FF'
);

CREATE TABLE scent (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    note text UNIQUE NOT NULL
);

CREATE TABLE perfume_has_tag (
    id int GENERATED ALWAYS AS IDENTITY,
    perfume_id int NOT NULL REFERENCES perfume(id) ON DELETE CASCADE,
    tag_id int NOT NULL REFERENCES tag(id) ON DELETE CASCADE,
    PRIMARY KEY (perfume_id, tag_id)
);

CREATE TABLE perfume_has_scent (
    id int GENERATED ALWAYS AS IDENTITY,
    perfume_id int NOT NULL REFERENCES perfume(id) ON DELETE CASCADE,
    scent_id int NOT NULL REFERENCES scent(id) ON DELETE CASCADE,
    PRIMARY KEY (perfume_id, scent_id)
);

COMMIT;
