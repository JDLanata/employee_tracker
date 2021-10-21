DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;


USE employee_db;

CREATE TABLE departments(
    id INT PRIMARY KEY,
    name VARCHAR(30)
);


CREATE TABLE roles(
   id INT PRIMARY KEY,
   title VARCHAR(30) NOT NULL,
   salary DECIMAL,
   department_id INT,
   FOREIGN KEY (department_id)
   REFERENCES departments(id)
);

CREATE TABLE employees(
    id INT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY (role_id)
    REFERENCES roles(id)

);