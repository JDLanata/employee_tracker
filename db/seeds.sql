INSERT INTO departments(name)
VALUES("Engineering"),
      ("Finance"),
      ("Sales"),
      ("Legal");



INSERT INTO roles(title,salary,department_id)
VALUES("Sales Lead", 10000, 3),
      ("Sales Rep", 1000, 3),
      ("Finance Manager",10000, 2),
      ("Engineering Manager", 15000, 1),
      ("Engineering Intern", 1500, 1),
      ("Lawyer", 20000, 4);


INSERT INTO employees (first_name,last_name,role_id,manager_id)
VALUES("Zwei","Cannon",1,NULL),
      ("Romanof","Agent", 3,NULL),
      ("Jane","Doe", 6,NULL),
      ("John","Doe", 6,3),
      ("Cade","Billson", 2,1),
      ("Shirley","Stclair", 2,2),
      ("Barry","Rotter", 2,1),
      ("Jon","Sheasly", 4,3),
      ("Germione","Hranger", 5,2),
      ("Midna","Twilight", 5,2),
      ("Link","Knight", 5,6);
