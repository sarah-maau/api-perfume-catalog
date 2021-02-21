-- Deploy perfume-catalog:06_upd_functions to pg

BEGIN;

-- création d'une méthode pour modifier les intensités
CREATE FUNCTION update_intensity(iId int, iType text) RETURNS intensity AS $$
UPDATE intensity SET type=iType WHERE id=iId
RETURNING *;
$$ LANGUAGE sql;

-- création d'une méthode pour modifier les genres
CREATE FUNCTION update_gender(gId int, gType text) RETURNS gender AS $$
UPDATE gender SET type=gType WHERE id=gId
RETURNING *;
$$ LANGUAGE sql;

-- création d'une méthode pour modifier les senteurs
CREATE FUNCTION update_scent(sId int, sNote text) RETURNS scent AS $$
UPDATE scent SET note=sNote WHERE id =sId
RETURNING *;
$$ LANGUAGE sql;

-- création d'une méthode pour modifier les tags
CREATE FUNCTION update_tag(tId int, tLabel text, tColor text) RETURNS tag AS $$
UPDATE tag SET label=tLabel, color=tColor WHERE id =tId
RETURNING *;
$$ LANGUAGE sql;

-- création d'une fonction pour modifier les parfums
CREATE FUNCTION update_perfume(
	pid integer,
	pname text,
	pcreator text,
	pyear date,
	pscore posint,
	pbrand integer,
	pintensity integer,
	pgender integer)
RETURNS perfume AS $$
UPDATE perfume SET 
	name=pname, creator=pcreator, 
	year_of_creation=pyear, score=pscore, 
	brand_id=pbrand, intensity_id=pintensity, 
	gender_id=pgender 
	WHERE id=pId
RETURNING *;
$$ LANGUAGE sql;

COMMIT;
