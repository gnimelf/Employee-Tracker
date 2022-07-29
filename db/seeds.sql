INSERT INTO department (name)
VALUES ("IT"),
       ("Sales"),
       ("Marketing"),
       ("Development");

INSERT INTO role (title, salary, department_id)
VALUES ('Developer', 130000, 4),
       ('Salesman', 80000, 2),
       ('Tech', 75000, 1),
       ('Marketing analyst', 85000, 3);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES ('John', 'Doe', 1, 1),
       ('Kate', 'Bush', 1, 3),
       ('Kim', 'Due', 2, 2);
 