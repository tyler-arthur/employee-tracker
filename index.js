const mysql = require('mysql');
const inquirer = require('inquirer');
const table = require('console.table');
const Department = require('./lib/Department');
const Role = require('./lib/Role');
const Employee = require('./lib/Employee');

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


// Main menu of app
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
        switch (res.action) {
            case 'Add a department, role, or employee:':
                // TODO: Add inquirer prompt to handle adding to tables
                break;
                
            case 'View a department, role, or employee:':      
                // DONE: Add inquirer prompt to handle viewing tables
                readSelector();
                break;
                
            case 'Update employee role or manager:':
                // TODO: Add inquirer prompt to handle updating itmes in tables
                break;
                
            case 'Delete a department, role, or employee:':
                // TODO: Add inquirer prompt to handle deleting itmes in tables
                break;
                
            case 'View budget of a department:':
                // TODO: Add inquirer prompt to view budget for department
                break;
        
            default:
                // TODO: cleanly exit the program
                connection.end();
                break;
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
                readTable('department');
                break;

            case 'Role':
                readTable('employee_role');
                break;

            case 'Employee':
                readTable('employee');
                break;

            default:
                mainSelector();
        }
    }).then((res) => {
        continueOrExit();
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
                
                break;
        
            case 'Role':
                
                break;
        
            case 'Employee':
                
                break;
        
            default:
                mainSelector();
                break;
        }
    })
}

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

// Reads all data from a selected table
const readTable = (table) => {
    console.log('reading full table...');
    const query = connection.query('SELECT * FROM ' + table, (err, res) => {
        if (err) throw err;
        console.log(res);
    });
}

const continueOrExit = () =>{
    inquirer.prompt({
        type: 'confirm',
        name: 'action',
        message: 'Do you want to do anything else?'
    }).then((res) => {
        res.action ? mainSelector() : connection.end();
    })
} 