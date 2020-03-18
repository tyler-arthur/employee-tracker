const mysql = require('mysql');
const inquirer = require('inquirer');
const table = require('console.table');
// const readTable = require('./readTable');
// const addToTable = require('./addToTable');
const Employee = require('./lib/Employee')

const connection = mysql.createConnection({
    host: 'localhost',

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: 'root',

    // Your password
    password: 'root',
    database: 'employeesDB'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId + '\n');
    mainSelector();
});

// Adds a row toa selected table
const addToTable = (data) => {
    switch (data.action) {
        case 'department':

            break;
        case 'role':

            break;
        case 'employee':

            break;
        default:
            console.log('what?')
    }
}

const mainSelector = () => {
    inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'Add a department, role, or employee:',
            'View a department, role, or employee:',
            'Update employee role or manager:',
            'Delete a department, role, or employee:',
            'View budget of a department:',
            'Exit:'
        ]
    }).then((res) => {
        if (res.action === 'View a department, role, or employee:') readSelector();
        if (res.action === 'Add a department, role, or employee:') addSelector();
        // console.log(res)
        if (res.action === 'exit') {
            return;
        }
    })
}

const readSelector = () => {
    inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to add?',
        choices: [
            'Department',
            'Role',
            'Employee',
            'Go back:'
        ]
    }).then((res) => {
        switch (res.action) {
            case 'Department':
                readTable('department')
                break;
            case 'Role':
                readTable('role')
                break;
            case 'Employee':
                readTable('employee')
                break;
            case 'Go Back':
                mainSelector();
                break;
            default:
                mainSelector();
        }
    })
}


const addSelector = () => {
    inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to add?',
        choices: [
            'Department',
            'Role',
            'Employee',
            'Go back:'
        ]
    }).then((res) => {
        switch (res.action) {
            case 'Department':
                inquirer.prompt([{
                    type: 'input',
                    name: 'id',
                    message: "Please enter a three digit number for your department's ID:"
                },{
                    type: 'input',
                    name: 'department_name',
                    message: "Please enter a daprtment name:"
                }]).then((answers) => {
                    addEmployee(answers)
                })

                break;
            case 'Role':
    
                break;
            case 'Employee':
    
                break;
            case 'Go Back':
                mainSelector();
                break;
            default:
                mainSelector();
        }
    })
}

