// referecec team_profile HW for switch prompts
//recomemend to just write one large file
const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = mysql.createConnection({
    host: 'localhost',

    user: 'root',

    password: 'password',
    database: 'employee_db',
},
    console.log('connected to employee_db database.')
);


const start = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'question',
            choices: ['Veiw All Departments', 'Veiw All Roles', 'Veiw all Employees', 'Add A Role', 'Add An Employee', 'Add A Department', 'Update An Employee Role', 'Quit']
        }
    ]).then(answers => {
        switch (answers.question) {
            case 'Veiw All Departments':
                console.log('Veiw All Departments');
                viewDepartments();
                break;
            case 'Veiw All Roles':
                console.log('Veiw All Roles');
                viewRoles();
                break;
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


function viewDepartments() {
    db.query('SELECT * FROM departments', (err, data) => {
        if (err) {
            throw err;
        } else {
            console.log(data)
            start();
        }

    })//end of query
} //end of veiwDepartments
function viewRoles() {
    db.query('SELECT * FROM roles', (err, data) => {
        if (err) {
            throw err;
        } else {
            console.log(data)
            start();
        }

    })//end of query
} //end of veiwRoles
function viewEmployees() {
    db.query('SELECT * FROM employees', (err, data) => {
        if (err) {
            throw err;
        } else {
            console.log(data)
            start();
        }

    })//end of query
} //end of veiwEmployees






function addRole() {
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
            type: 'input',
            name: 'department',
            message: "What is the department?",
        }
    ])//end of Inquirer Prompt
        .then((data) => {
            db.query('INSERT INTO roles (title,salary,department_id) VALUES (?,?,?)', [data.title, data.salary, data.department], (err, data) => {
                if (err) {
                    throw err;
                } else {
                    console.log(data)
                    start();
                }

            })//end of query
        })//end of .Then
}//end of addManager

function addEmployee() {
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
            type: 'input',
            name: 'role',
            message: "What role id do they have",
        },
        {
            type: 'input',
            name: 'manager',
            message: 'Who is ther manager?'
        }
    ])//end of Inquirer Prompt
        .then((data) => {
            db.query('INSERT INTO employees ((first_name,last_name,role_id,manager_id) VALUES (?,?,?,?)', [data.first_name, data.last_name, data.role, data.manager], (err, data) => {
                if (err) {
                    throw err;
                } else {
                    console.log(data)
                    start();
                }

            })//end of query

        })//end of .Then

}//end of addEmployee

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

function quit() {
    console.log('Have a good day!')
    db.end();

}//end of quit


start();



