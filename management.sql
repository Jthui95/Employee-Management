-- Drops the managementDB if it already exists --
DROP DATABASE IF EXISTS managementDB;

-- Created the DB "managementDB" (only works on local connections)
CREATE DATABASE managementDB;

-- Use the managementDB for all the rest of the script
USE managementDB;


CREATE TABLE departments (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(30) NOT NULL,

  PRIMARY KEY(id)
);

CREATE TABLE roles (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) NOT NULL ,
  salary  DECIMAL(10,2) NOT NULL,
  department_id  INT(10) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE employees (
     id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  first_name  VARCHAR(30) NOT NULL, 
  last_name  VARCHAR(30) NOT NULL,
  role_id  INT(30) NOT NULL,
  manager_id  INT(30) NOT NULL,

  PRIMARY KEY(id)
);


