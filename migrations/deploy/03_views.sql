-- Deploy perfume-catalog:03_views to pg

BEGIN;

-- création d'une view qui permet de récupérer toutes les informations d'un parfum 
CREATE VIEW all_from_perfumes AS 
SELECT DISTINCT
	perfume.id,
	perfume.name,
	brand.name brand,
	creator,
	date_part('year' , perfume.year_of_creation),
	score,
	gender.type gender,
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
GROUP BY perfume.id, brand.name, gender.type, intensity.type
ORDER BY brand.name;

-- création d'une vue qui affiche les marques et le nom des parfums associés
CREATE VIEW brands_have_perfumes AS
SELECT DISTINCT brand.id, brand.name brand, 
ARRAY_AGG(DISTINCT perfume.name) perfume 
FROM brand 
    JOIN perfume ON perfume.brand_id = brand.id
GROUP BY brand.id
ORDER BY brand.name;

-- création d'une vue qui affiche les différents genre et les parfums associés
CREATE VIEW perfume_genders AS
SELECT DISTINCT gender.id, gender.type,
ARRAY_AGG(DISTINCT perfume.name) PERFUME
FROM gender
JOIN perfume ON perfume.gender_id = gender.id
GROUP BY gender.id;

COMMIT;
