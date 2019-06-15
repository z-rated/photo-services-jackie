-- postgres command for copying 
-- copy photo_table from '/Users/jackieye/csv-file/csv.csv' DELIMITER ',' CSV HEADER;

CREATE DATABASE photos;

-- CREATE TABLE for photos
CREATE TABLE photo_table (
   photoid int PRIMARY KEY,
   date VARCHAR (255),
   photourl VARCHAR (255),
   restaurantid int
);
--CREATE TABLE for restuarants
CREATE TABLE rest_table (
   restuarantid int PRIMARY KEY,
   restaurantname VARCHAR (255)
)
ALTER TABLE photo_table ADD FOREIGN KEY (restaurantid) REFERENCES rest_table (restaurantid);
CREATE SEQUENCE pho_id_seq MINVALUE 70000001;
 ALTER TABLE photo_table ALTER photoid SET DEFAULT nextval('pho_id_seq');
 ALTER SEQUENCE pho_id_seq OWNED BY photo_table.photoid;