DROP DATABASE IF EXISTS lfassignment;
CREATE DATABASE lfassignment;

\c lfassignment;

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  rate INT
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR,
  password VARCHAR(200)
);
