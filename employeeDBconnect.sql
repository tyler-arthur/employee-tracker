-- for windows users with SQLworkbench 8
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';

DROP DATABASE IF EXISTS employeesDB;

CREATE database employeesDB;

USE employeesDB;

CREATE TABLE department (
  id INT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL
);

SELECT * FROM department;

CREATE TABLE employee_role (
  id INT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NULL,
  department_id INT NOT NULL
);

SELECT * FROM employee_role;

CREATE TABLE employee (
  id INT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NULL
);

SELECT * FROM employee;
