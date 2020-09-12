DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

-- Creating table Departments
CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) UNIQUE NOT NULL,
  PRIMARY KEY(id)
);

-- Creating table Roles
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

-- Creating table Employees
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