// referecec team_profile HW for switch prompts
//recomemend to just write one large file
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');



const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employee_db',
},
    console.log('connected to employee_db database.')
);


const start = () => {
    inquirer.prompt(
        {
            type: 'list',
            name: 'question',
            choices: ['Veiw All Departments', 'Veiw All Roles', 'Veiw All Employees', 'Add A Role', 'Add An Employee', 'Add A Department', 'Update An Employee Role', 'Quit']
        }
    ).then(answers => {
        switch (answers.question) {
            case 'Veiw All Departments':
                console.log('Veiw All Departments');
                viewDepartments();
                break;

            case 'Veiw All Roles':
                console.log('Veiw All Roles');
                viewRoles();
                break;

            case 'Veiw All Employees':
                console.log('Veiw All Employees');
                viewEmployees();
                break;

            case 'Add A Role':
                console.log('Add A Role');
                addRole();
                break;

            case 'Add An Employee':
                console.log('Add An Employee');
                addEmployee();
                break;

            case 'Add A Department':
                console.log('Add A Department');
                addDepartment();
                break;

            case 'Update An Employee Role':
                console.log('Update An Employee Role');
                updateEmployee();
                break;

            default:
                console.log('Goodbye!');
                quit();
                break;

        }//end of switch
    })//end of .then switch case
}//end of start function

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

function viewDepartments() {
    db.query('SELECT * FROM departments', (err, data) => {
        if (err) {
            throw err;
        } else {
            console.table(data)
            start();
        }

    })//end of query
} //end of veiwDepartments

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

function viewRoles() {
    db.query('SELECT * FROM roles', (err, data) => {
        if (err) {
            throw err;
        } else {
            console.table(data)
            start();
        }

    })//end of query
} //end of veiwRoles


///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

function viewEmployees() {
    db.query('SELECT * FROM employees JOIN roles ON employees.role_id = roles.title', (err, data) => {
        if (err) {
            throw err;
        } else {
            console.table(data)
            start();
        }

    })//end of query
} //end of veiwEmployees

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////


function addRole() {
    db.query('SELECT * FROM departments', (err, data) => {
        if (err)
            throw err;

        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the Roles title?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary for the role?'
            },
            {
                type: 'list',
                name: 'department',
                message: "What is the department?",
                choices: function () {
                    const depart = data.map(({ id, name }) => ({
                        name: name,
                        value: id
                    }))
                    return depart;
                }
            }

        ])//end of Inquirer Prompt
            .then((data) => {
                db.query('INSERT INTO roles (title,salary,department_id) VALUES (?,?,?)', [data.title, data.salary, data.department], (err, data) => {
                    if (err) {
                        throw err;
                    } else {
                        // console.log(data)
                        start();
                    }

                })//end of query2
            })//end of .Then
    })//end query1
}//end of addManager

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////


function addEmployee() {

    db.query('SELECT * FROM employees', (err, data1) => {//queryA start
        if (err)
            throw err;

        db.query('SELECT * FROM  roles', (err, data) => {//query1 start
            if (err)
                throw err;


            inquirer.prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: 'What is the Employees first name?'
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: 'What is their last number?'
                },
                {
                    type: 'list',
                    name: 'role',
                    message: "What role id do they have",
                    choices: function () {
                        const role = data.map(({ id, title }) => ({
                            name: title,
                            value: id
                        }))
                        return role;
                    }//end choices function
                },
                {
                    type: 'list',
                    name: 'manager',
                    message: 'Who is their manager?',
                    choices: function () {
                        const lead = data1.map(({ id, first_name,last_name }) => ({
                            name: `${first_name} ${last_name}`,
                            value: id
                        }))
                        return lead;
                    }

                }//end choices function

            ])//end of Inquirer Prompt
                .then((data) => {
                    db.query('INSERT INTO employees (first_name,last_name,role_id,manager_id) VALUES (?,?,?,?)', [data.first_name, data.last_name, data.role, data.manager], (err, data) => {
                        if (err) {
                            throw err;
                        } else {
                            // console.log(data)
                            start();
                        }

                    })//end of query2

                })//end of .Then
        })//end of query1
    })//end of queryA
}//end of addEmployee


////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the Departments name?'
        }
    ])//end of Inquirer Prompt
        .then((data) => {
            db.query('INSERT INTO department ((name) VALUES (?)', data.name, (err, data) => {
                if (err) {
                    throw err;
                } else {
                    console.log(data)
                    start();
                }
            })//end of query
        })//end of .Then

}//end of addDeparment



function updateEmployee() {

    db.query('SELECT * FROM employees', (err, data1) => {//queryA start
        if (err)
            throw err;

        db.query('SELECT * FROM  roles', (err, data) => {//query1 start
            if (err)
                throw err;


            inquirer.prompt([
                {
                    type: 'list',
                    name: 'name',
                    message: `Who's role would you like to update?`,
                    choices: function () {
                        const update = data1.map(({ id, first_name,last_name }) => ({
                            name: `${first_name} ${last_name}`,
                            value: id
                        }))
                        return update;
                    }//end choices function
                },
                {
                    type: 'list',
                    name: 'role',
                    message: "What is their new role?",
                    choices: function () {
                        const role = data.map(({ id, title }) => ({
                            name: title,
                            value: id
                        }))
                        return role;
                    }//end choices function
                }
                

            ])//end of Inquirer Prompt
                .then((data) => {
                    db.query('UPDATE employees SET role_id=? WHERE employees.id=? ', [data.role,data.name], (err, data) => {
                        if (err) {
                            throw err;
                        } else {
                            // console.log(data)
                            start();
                        }

                    })//end of query2

                })//end of .Then
        })//end of query1
    })//end of queryA

}//end of updateEmployee



function quit() {
    console.log('Have a good day!')
    db.end();

}//end of quit


start();



