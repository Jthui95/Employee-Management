-- Edit these

INSERT INTO departments (name)
VALUES("Trainee"), ("Coding"), ("Engineer"), ("Management");

INSERT INTO roles (title, salary, department_id)
VALUES("New Hire",50000, 1),("Software Engineer",100000, 2), ("Analog Engineer", 90000, 3), ("Manager", 250000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES("Jonathan", "Smith", 2, 0 ), ("Shirley", "Nguyen", 3 , 0), ("James","Kim", 4, 1 );