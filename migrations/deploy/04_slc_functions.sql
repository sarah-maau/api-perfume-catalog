-- Deploy perfume-catalog:04_slc_functions to pg

BEGIN;

--  création d’un type perfume
CREATE TYPE perfume_type AS (
	id int,
	"name" text,
	brand_id int,
	brand text,
	creator text,
	year_of_creation date,
	score int,
	gender_id int,
	gender text,
	intensity_id int,
	intensity text, 
	tag text[],
	scent text[]
);

-- création d'un type gender
CREATE type gender_type AS (
	id int,
	gender text,
	perfume text[]
);

-- création d'un type intensity
CREATE type intensity_type AS (
	id int,
	intensity text,
	perfume text[]
);

-- création d'un type tag
CREATE type tag_type AS (
	id int,
	label text,
	color text,
	perfume text[]
);

-- création d'un type scent
CREATE type scent_type AS (
	id int,
	note text,
	perfume text[]
);

-- création d’une fonction qui renvoie un parfum selon son id (param)
CREATE FUNCTION one_perfume (perfumeId int) RETURNS SETOF perfume_type AS $$
	SELECT DISTINCT perfume.id,
	perfume.name,
	brand_id brandId,
	brand.name brand,
	creator,
	year_of_creation,
	score,
	gender_id genderId,
	gender.type gender,
	intensity_id intensityId,
	intensity.type intensity,
	ARRAY_AGG (DISTINCT tag.label) tag,
	ARRAY_AGG (DISTINCT scent.note ORDER BY scent.note) scent
	FROM perfume
		LEFT JOIN brand ON perfume.brand_id = brand.id
		LEFT JOIN intensity ON perfume.intensity_id = intensity.id
		LEFT JOIN gender ON perfume.gender_id = gender.id
		LEFT JOIN perfume_has_scent ON perfume.id = perfume_has_scent.perfume_id
		LEFT JOIN scent ON perfume_has_scent.scent_id = scent.id
		LEFT JOIN perfume_has_tag ON perfume.id = perfume_has_tag.perfume_id
		LEFT JOIN tag ON perfume_has_tag.tag_id = tag.id
WHERE perfume.id = perfumeId
GROUP BY perfume.id, brand.name, gender.type, intensity.type
$$ LANGUAGE sql STRICT;


-- création d’une fonction qui renvoie un le nom des parfums selon l'id du gender
CREATE FUNCTION one_gender(genderId int) RETURNS SETOF gender_type AS $$
	SELECT gender.*, 
	ARRAY_AGG(DISTINCT perfume.name)
	FROM gender
		JOIN perfume ON perfume.gender_id = gender.id
	WHERE gender.id=genderId
	GROUP BY gender.id 
$$ LANGUAGE sql STRICT;


-- création d’une fonction qui renvoie un le nom des parfums selon l'id de l'intensité
CREATE FUNCTION one_intensity(intensityId int) RETURNS SETOF intensity_type AS $$
	SELECT intensity.*, 
	ARRAY_AGG(DISTINCT perfume.name)
	FROM intensity
		JOIN perfume ON perfume.intensity_id = intensity.id
	WHERE intensity.id=intensityId
	GROUP BY intensity.id 
$$ LANGUAGE sql STRICT;


-- création d’une fonction qui renvoie un le nom des parfums selon l'id du tag
CREATE FUNCTION one_tag(tagId int) RETURNS SETOF tag_type AS $$
	SELECT tag.*, 
	ARRAY_AGG(DISTINCT perfume.name)
	FROM tag
		JOIN perfume_has_tag ON perfume_has_tag.tag_id = tag.id
		JOIN perfume ON perfume_has_tag.perfume_id = perfume.id
	WHERE tag.id = tagId
	GROUP BY tag.id 
$$ LANGUAGE sql STRICT;

-- création d’une fonction qui renvoie un le nom des parfums selon l'id de la senteur
CREATE FUNCTION one_scent(scentId int) RETURNS SETOF scent_type AS $$
	SELECT scent.*, 
	ARRAY_AGG(DISTINCT perfume.name)
	FROM scent
		JOIN perfume_has_scent ON perfume_has_scent.scent_id = scent.id
		JOIN perfume ON perfume_has_scent.perfume_id = perfume.id
	WHERE scent.id = scentId
	GROUP BY scent.id 
$$ LANGUAGE sql STRICT;

COMMIT;
