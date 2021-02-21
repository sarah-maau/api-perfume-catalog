-- Deploy perfume-catalog:05_insert_functions to pg

BEGIN;

-- création d'une fonction mono param permettant de créer un nouveau parfum
CREATE FUNCTION new_perfume(perfume json) RETURNS perfume AS $$
INSERT INTO perfume(
	"name",
	creator,
	year_of_creation,
	score,
	brand_id,
	intensity_id,
	gender_id
) VALUES
(
	perfume->>'name', perfume->>'creator',
	(perfume->>'yearOfCreation')::date, (perfume->>'score')::int,
	(perfume->>'brandId')::int, (perfume->>'intensityId')::int,
	(perfume->>'genderId')::int
)
RETURNING *;
$$ LANGUAGE sql;

-- création d'une fonction mono param permettant de créer un nouveau tag
CREATE FUNCTION new_tag(tag json) RETURNS tag AS $$
INSERT INTO tag (
	label,
	"color"
) VALUES
(
	tag->>'label', tag->>'color'
)
RETURNING *;
$$ LANGUAGE sql;

COMMIT;
