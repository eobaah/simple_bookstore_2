DROP DATABASE IF EXISTS events;
CREATE DATABASE events;

\c events

DROP TABLE IF EXISTS event;
CREATE TABLE IF NOT EXISTS event(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  venue VARCHAR(255),
  event_date DATE,
  start_time TIMESTAMP,
  price VARCHAR(255),
  details TEXT,
  image_url VARCHAR(2048),
  genre VARCHAR(255));

DROP TABLE IF EXISTS member;
CREATE TABLE IF NOT EXISTS member(
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(10),
  last_name VARCHAR(10),
  username VARCHAR(50) UNIQUE,
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255) UNIQUE,
  role VARCHAR(50));


DROP TABLE IF EXISTS role;
CREATE TABLE IF NOT EXISTS role(
  id INTEGER REFERENCES member(id),
  admin VARCHAR(10) NOT NULL,
  promoter VARCHAR(10) NOT NULL,
  partier VARCHAR(10) NOT NULL,
  guest VARCHAR(10) NOT NULL);

DROP TABLE IF EXISTS member_likes;
CREATE TABLE IF NOT EXISTS member_likes(
  member_id INTEGER REFERENCES member(id),
  event_id INTEGER REFERENCES event(id));

DROP TABLE IF EXISTS session;
CREATE TABLE IF NOT EXISTS "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)

WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
