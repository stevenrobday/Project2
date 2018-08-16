DROP DATABASE IF EXISTS user_db;

CREATE DATABASE user_db;

USE user_db;

CREATE TABLE "user"
(
id int NOT NULL AUTO_INCREMENT,
user_name VARCHAR(20) NOT NULL,
user_password VARCHAR(20) NOT NULL,
user_email VARCHAR(20) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE "comments"
(
    id int NOT NULL AUTO_INCREMENT,
    body VARCHAR (500) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE "favorites"
(
    id int NOT NULL AUTO_INCREMENT,
    favorite_show VARCHAR(140),
    user_id INT(4) NOT NULL,
    PRIMARY KEY (id)
);