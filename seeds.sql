/* Seeds for SQL table. !!!CHANGE DB NAME IF DIFFERENT!!! */
USE employeesDB;

/* !!!CHANGE COLUMN NAMES IF DIFFERENT!!! */
INSERT INTO department (id, department_name)
VALUES (01, "Intructors");

INSERT INTO department (id, department_name)
VALUES (02, "TA's");

INSERT INTO department (id, department_name)
VALUES (03, "Students");



/* !!!CHANGE COLUMN NAMES IF DIFFERENT!!! */
INSERT INTO employee_role (id, title, salary, department_id)
VALUES ( 10,"Instructor", 100000.00, 01);

INSERT INTO employee_role (id, title, salary, department_id)
VALUES ( 20,"TA", 90000.00, 02);

INSERT INTO employee_role (id, title, salary, department_id)
VALUES ( 30,"Student", 0.00, 03);



/* !!!CHANGE COLUMN NAMES IF DIFFERENT!!! */
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (123, "Harrison", "Schaen", 01);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (456, "Steph", "Huynh", 02, 01);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (789, "Steven", "Landgraf", 02, 01);
