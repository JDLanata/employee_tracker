INSERT INTO departments(name)
VALUES("Engineering"),
      ("Finance"),
      ("Sales"),
      ("Legal");



INSERT INTO roles(title,salary,department_id)
VALUES("Sales Lead", 10000, 3),
      ("Finance Manager",10000, 2),
      ("Engineer", 15000, 1),
      ("Lawyer", 20000, 4);



INSERT INTO employees (first_name,last_name,role_id,manager_id)
VALUES("Zwei","Cannon",1,NULL),
      ("Romanof","Agent", 4,4),
      ("John","Doe", 2,NULL),
      ("Midna","Twilight", 4,1),
      ("Link","Knight", 3,NULL);

