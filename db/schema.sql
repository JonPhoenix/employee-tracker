DROP DATABASE IF EXISTS undecided_db;
CREATE DATABASE undecided_db;

USE undecided_db;

-- Creating table
CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) UNIQUE NOT NULL,
  PRIMARY KEY(id)
);

-- Creating table
CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) UNIQUE NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT,
  PRIMARY KEY(id),
  CONSTRAINT fk_department_id FOREIGN KEY (department_id)
  REFERENCES departments(id)
  ON DELETE CASCADE
);

-- Creating table
CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) UNIQUE NOT NULL,
  last_name VARCHAR(30) UNIQUE NOT NULL,
  role_id INT,
  manager_id INT,
  PRIMARY KEY(id),
  CONSTRAINT fk_role FOREIGN KEY (role_id) 
  REFERENCES roles(id),
  CONSTRAINT fk_manager FOREIGN KEY (role_id) 
  REFERENCES roles(id)
  ON DELETE CASCADE
);