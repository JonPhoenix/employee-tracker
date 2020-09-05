DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) UNIQUE NOT NULL,
  salary INT NOT NULL,
  department_id INT UNSIGNED NOT NULL,
  INDEX department_id (department_id),
  CONSTRAINT fk_department_id FOREIGN KEY (department_id)
  REFERENCES department(id)
);

CREATE TABLE employee (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) UNIQUE NOT NULL,
  last_name VARCHAR(30) UNIQUE NOT NULL,
  role_id INT UNSIGNED NOT NULL,
  manager_id INT UNSIGNED NOT NULL,
  INDEX role_id (role_id),
  CONSTRAINT fk_role FOREIGN KEY (role_id) 
  REFERENCES role(id),
  CONSTRAINT fk_manager FOREIGN KEY (role_id) 
  REFERENCES role(id)
);