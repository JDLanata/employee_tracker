SELECT  CONCAT(employees.first_name," ",employees.last_name) AS Employees, 
        roles.title AS Titles,
        roles.salary AS Salary,
        departments.name AS Department,
        employees.manager_id AS Manager
FROM employees
JOIN roles ON employees.role_id = roles.id
JOIN departments ON roles.department_id = departments.id ;


SELECT roles.title AS Titles,
        roles.salary AS Salary,
        departments.name AS Department
FROM roles
JOIN departments 
ON roles.department_id = departments.id ;