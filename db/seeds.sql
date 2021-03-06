USE employees_db;

-- Populating departments
INSERT INTO departments
    (name)

VALUES
    ("Sales"),
    ("Engineering"),
    ("Finance"),
    ("Legal");

-- Populating roles
INSERT INTO roles
    (title, salary, department_id)

VALUES
    ("Sales lead", 100000, 1),
    ("Sales person", 80000, 1),
    ('Lead Engineer', 150000, 2),
    ("Software Engineer", 120000, 2),
    ("Accountant", 125000, 3),
    ("Legal Team Lead", 250000, 4),
    ("Lawyer Standard", 190000, 4);

-- Populating employees
INSERT INTO employees
    (first_name, last_name, role_id, manager_id)

VALUES
    ("John", "Doe", 1, 3),
    ("Mike","Chan", 2, 1),
    ("Ashley", "Rodriguez", 3, NULL),
    ("Kevin", "Tupik", 4, 3),
    ("Malia", "Brown", 5 , NULL),
    ("Sarah", "Lourd", 6, NULL),
    ("Tom", "Allen", 7, 6),
    ("Christian", "Eckenrode", 3, 2);