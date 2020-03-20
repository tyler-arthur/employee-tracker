const mysql = require('mysql');
const inquirer = require('inquirer');
const table = require('console.table');
const Department = require('./lib/Department');
const Role = require('./lib/Role');
const Employee = require('./lib/Employee');
const sqlFunc = require('./sql.js')

// This is how to call functions
// console.log(neatFunctions.readTable())


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
                addSelector();
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

// Open sql connection
connection.connect((err) => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId + '\n');
    sqlFunc.getID('employee_role', 'title', 'Student');
    // console.log(sqlFunc.getID("employee_role", 'Student'))
    mainSelector();
});

// menu options to read a specific table
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
                sqlFunc.readTable('department');
                break;

            case 'Role':
                sqlFunc.readTable('employee_role');
                break;

            case 'Employee':
                sqlFunc.readTable('employee');
                break;

            default:
                mainSelector();
        }
    }).then((res) => {
        sqlFunc.continueOrExit();
    }).catch (err => {
        console.log(err);
        
    })
}

// Menu options to add rows to a specific table
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
                sqlFunc.departmentAdd();
                break;
        
            case 'Role':
                sqlFunc.roleAdd();
                break;
        
            case 'Employee':
                employeeAdd();                
                break;
        
            default:
                sqlFunc.continueOrExit();
                break;
        }
    })
}



// Adds a new employee to the DB
const employeeAdd = () => {
    const roleChoices = [];
    const managerChoices = [];

    sqlFunc.getRoleChoices(roleChoices);

    sqlFunc.getManagerChoices(managerChoices);

    inquirer.prompt([{
        name: 'firstName',
        message: "What is your new employee's first name?"
    }, {
        name: 'lastName',
        message: "What is your new employee's last name?"
    }, {
        type: 'list',
        name: 'role',
        message: "What is your new employee's role?",
        choices: roleChoices
    }, {
        type: 'list',
        name: 'manager',
        message: "Who is your new employee's manager?",
        choices: managerChoices
    }
    ]).then((action) => {
        const empObj = [];
        empObj.push(action.firstName, action.lastName)
        const roleID = sqlFunc.getID("employee_role", 'title', action.role)
        const managerID = sqlFunc.getID("employee", 'last_name', action.manager)
        empObj.push(roleID, managerID);
        
        console.log(empObj)
    }).then(empObj => {
        if (empObj[3] === 'Employee will not be assigned a manager') empObj[3] = NULL;
        newEmp = new Employee(empObj[0], empObj[1], empObj[2], empObj[3]);
        console.log(newEmp)
        // newEmp.addEmployee();
    }).then(() => {
        sqlFunc.continueOrExit();
    }).catch((err) => {
        console.log(err);
    })
}

// function testing area
// 

// 
// function testing area