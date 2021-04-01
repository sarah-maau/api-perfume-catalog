-- Deploy perfume-catalog:06_upd_functions to pg

BEGIN;

-- create a method to modify intensities
CREATE FUNCTION update_intensity(iId int, iType text) RETURNS intensity AS $$
UPDATE intensity SET type=iType WHERE id=iId
RETURNING *;
$$ LANGUAGE sql;

-- create a method to modify genders
CREATE FUNCTION update_gender(gId int, gType text) RETURNS gender AS $$
UPDATE gender SET type=gType WHERE id=gId
RETURNING *;
$$ LANGUAGE sql;

-- create a method to modify scents
CREATE FUNCTION update_scent(sId int, sNote text) RETURNS scent AS $$
UPDATE scent SET note=sNote WHERE id =sId
RETURNING *;
$$ LANGUAGE sql;

-- create a method to modify tags
CREATE FUNCTION update_tag(tId int, tLabel text, tColor text) RETURNS tag AS $$
UPDATE tag SET label=tLabel, color=tColor WHERE id =tId
RETURNING *;
$$ LANGUAGE sql;

-- create a method to modify perfumes
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
