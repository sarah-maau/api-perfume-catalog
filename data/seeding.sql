--- fichier seeding pour dev

-- delete toutes les données
TRUNCATE TABLE brand, intensity, gender, tag, scent, perfume, perfume_has_tag, perfume_has_scent RESTART IDENTITY;

-- table brand
INSERT INTO brand("name") VALUES
('Chanel'),
('Dior'),
('Guerlain'),
('Calvin Klein'),
('Hermès'),
('Diptyque'),
('Cartier'),
('Paco Rabanne'),
('Lolita Lempicka'),
('IKKS');

-- table intensity
INSERT INTO intensity("type") VALUES
('Parfum'),
('Eau de parfum'),
('Eau de toilette'),
('Eau de cologne'),
('Eau de senteur');

-- table gender
INSERT INTO gender("type") VALUES
('Femme'),
('Homme'),
('Mixte'),
('Fille'),
('Garçon');

-- table perfume
INSERT INTO perfume("name", creator, year_of_creation, score, brand_id, intensity_id, gender_id) VALUES
('Coco Mademoiselle', 'Jacques Polge', '1978-01-01', 4, 1, 2, 1),
('Miss Dior', 'Paul Vacher', '1947-01-01', 4, 2, 1, 1),
('Shalimar', 'Jacques Guerlain', '1921-01-01', 5, 3, 2, 1),
('CK One', 'Alberto Morillas', '1994-01-01', 3, 4, 3, 3),
('Eau de Narcisse Bleu', 'Jean-Claude Ellena', '2013-01-01', 5, 5, 4, 2),
('Eau des Sens', 'Olivier Pescheux', '2016-01-01', 5, 6, 3, 3),
('Déclaration', 'Jean-Claude Ellena', '1998-01-01', 4, 7, 1, 2),
('1 Million', 'Christophe Raynaud', '2008-01-01', 1, 8, 3, 2),
('Mon Petit', 'Maïa Lernout','2020-01-01', 2, 9, 5, 4),
('IKKS Young Man', 'Jennifer Riley', '2003-01-01', 3, 10, 3, 5);

-- table tag
INSERT INTO tag(label, color) VALUES
('Boisé', '#65350F'),
('Floral', '#FBCCD1'),
('Chypré', '#847D75'),
('Oriental', '#B35145'),
('Aromatique', '#AFA4CE'),
('Hespéridée', '#F0C31E'),
('Fougère', '#626733'),
('Frais', '#A6E7FF'),
('Épicé', '#BA904C'),
('Gourmand', '#973866'),
('Poudré', '#EFE7DB');


-- table scent
INSERT INTO scent(note) VALUES
('Bergamote'),
('Rose'),
('Patchouli'),
('Vanille'),
('Mandarine'),
('Jasmin'),
('Muscs blancs'),
('Bois de cèdre'),
('Iris'),
('Cuir'),
('Citron'),
('Sental'),
('Néroli'),
('Vétivier'),
('Cannelle'),
('Ambre'),
('Cardamome'),
('Orange'),
('Menthe poivrée'),
('Gimauve'),
('Tilleul'),
('Anis'),
('Raisin'),
('Lavande');  

-- table perfum_has_tag
INSERT INTO perfume_has_tag(perfume_id, tag_id) VALUES
(1, 2),
(1, 3),
(2, 2),
(2, 3),
(3, 4),
(3, 11),
(4, 5),
(4, 6), 
(5, 11),
(5, 1),
(6, 6),
(6, 11),
(7, 1),
(7, 4),
(8, 1),
(8, 9),
(9, 2),
(9, 10),
(10, 1),
(10, 10);

-- table perfum_has_scent
INSERT INTO perfume_has_scent(perfume_id, scent_id) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 5),
(2, 6),
(2, 7),
(2, 2),
(3, 1),
(3, 6),
(3, 3),
(3, 4),
(4, 1),
(4, 5),
(4, 7),
(4, 17),
(5, 1),
(5, 7),
(5, 9),
(5, 11),
(6, 1),
(6, 3),
(6, 13),
(6, 18),
(7, 5),
(7, 6),
(7, 14),
(7, 17),
(8, 3),
(8, 15),
(8, 16),
(8, 19),
(9, 7),
(9, 20),
(9, 21),
(9, 22),
(10, 6),
(10, 8),
(10, 23),
(10, 24);