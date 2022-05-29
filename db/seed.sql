INSERT INTO department (department_name)
VALUES ("Smarketing"),
       ("Product Management"),
       ("Software Development"),
       ("Operations");

INSERT INTO roles (title, salary, department_id)
VALUES ("Smarketing Executive", 39000, 1),
       ("Product Manager", 90000, 2),
       ("Software Monkey", 150000, 3),
       ("Software Director", 300000, 3),
       ("Ops Manager", 75000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("David", "Warner", 3, 2),
       ("Roger", "Smith", 4, null),
       ("Sterling", "Archer", 5, 4),
       ("Tony", "Soprano", 1, null);
       ("Eva", "Hammond", 2, 6);
       ("Danna", "Jordan", 2, null);
       ("Tim", "Warnsley", 2, 6);
       ("Samir", "Mammedov", 3, 1);
       ("Matt", "Atiyat", 3, 1);
       ("Science", "Duck", 5, 5);
       ("Bob", "Bobberton", 5, 4);