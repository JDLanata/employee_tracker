SELECT  CONCAT(e.first_name," ",e.last_name) AS Employees, 
        roles.title AS Titles,
        roles.salary AS Salary,
        departments.name AS Department,
        CONCAT(m.first_name," ",m.last_name)AS Manager
FROM employees e
LEFT JOIN employees m ON m.id = e.manager_id
JOIN roles ON e.role_id = roles.id
JOIN departments ON roles.department_id = departments.id ;


SELECT roles.title AS Titles,
        roles.salary AS Salary,
        departments.name AS Department
FROM roles
JOIN departments 
ON roles.department_id = departments.id ;