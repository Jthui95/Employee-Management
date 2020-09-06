-- Edit these

INSERT INTO department (name)
VALUES("Coding"), ("Engineer"), ("Tester");

INSERT INTO role (title, salary, department_id)
VALUES("Software Engineer",100000, 1), ("Analog Engineer", 90000, 2), ("", 50000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Jonathan", "Smith",10, 1), ("Shirley", "Nguyen",11, 1), ("James","Kim", 12, 1);