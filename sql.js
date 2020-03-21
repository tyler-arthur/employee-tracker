const mysql = require('mysql');
const inquirer = require('inquirer');
const Department = require('./lib/Department')
const Role = require('./lib/Role')
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

// Reads all data from a selected table
const readTable = (table) => {
    console.log('reading full table...');
    const query = connection.query('SELECT * FROM ' + table, (err, res) => {
        if (err) throw err;
        console.log(res);
    });
}

// Allows users to return to mainSelector or exit the program
const continueOrExit = () =>{
    inquirer.prompt({
        type: 'confirm',
        name: 'action',
        message: 'Do you want to do anything else?'
    }).then((res) => {
        res.action ? mainSelector() : connection.end();
    })
} 

const employeeAssembler = (data) => {
    if (action.manager === 'Employee will not be assigned a manager') action.manager.id = NULL;
    newEmp = new Employee(newID, action.firstName, action.lastName, action.role.id, action.manager.id);
    console.log(newEmp)
    console.log(`Role ID: ${action.role.id}`)
    console.log(`Manager ID: ${action.manager.id}`)
    console.log(`ID: ${newID}`)
    newEmp.addEmployee();
}

const getDepChoices = (array) => {
    connection.query(`SELECT id FROM department`, (err, res) => {
        if (err) throw err;
        res.forEach(e => {
            array.push(JSON.stringify(e.id));
        });
    })
    return array;
}

const getRoleChoices = (array) => {
    connection.query(`SELECT id FROM employee_role`, (err, res) => {
        if (err) throw err;
        res.forEach(e => {
            array.push(JSON.stringify(e.id));
        });
    })
    return array;
}

const getManagerChoices = (array) => {
    connection.query(`SELECT id FROM employee`, (err, res) => {
        if (err) throw err;
        res.forEach(e => {
            array.push(JSON.stringify(e));
        });
        array.unshift("Employee will not be assigned a manager")
    })
    return array;
}

const getID = (table, field, name) => {
    connection.query(`SELECT id FROM ${table} WHERE ${field}='${name}'`, (err, res) => {
        if (err) throw err;
        return res;
    })
}

const departmentAdd = () => {
    const deps = [];
    getDepChoices(deps)

    inquirer.prompt([{
        name: 'id',
        message: 'Type a two digit number for your new department:',
        validate: (name) => {
            if (name.length !== 2) return 'Please enter a 2 digit number:';
            // TODO: validate for existing department id's
            for (const i of deps) {
                if (i === name) return 'That department already exists, please choose a different number:'
                
            }
            return true;
        }
    }, {
        name: 'departmentName',
        message: 'What would you like your department name to be?'
    }
    ]).then((action) => {
        newDep = new Department(action.id, action.departmentName);
        console.log(newDep)
        newDep.addDepartment();
    }).then(() => {continueOrExit()
    }).catch(err => {
        console.log(err);
    })
}

const roleAdd = () => {
    const depChoices = [];
    getDepChoices(depChoices);

    const roles = [];
    getRoleChoices(roles)
    
    inquirer.prompt([{
        name: 'id',
        message: 'Type a two digit number for your new role:',
        validate: (name) => {
            if (name.length !== 2) return 'Please enter a 2 digit number:';
            for (const i of roles) {
                if (i === name) return 'That role already exists, please pick a different number:'
            }
            // TODO: validate for existing department id's
            return true;
        }
    }, {
        name: 'roleName',
        message: 'What would you like your new role name to be?'
    }, {
        name: 'salary',
        message: "What is this role's salary?"
    }, {
        type: 'list',
        name: 'department',
        message: "What department does this role belong to?",
        choices: depChoices
    }
    ]).then((action) => {
        newRole = new Role(JSON.parse(action.id), action.roleName, JSON.parse(action.salary), action.department);
        console.log(newRole)
        newRole.addRole();
    }).then(() => {continueOrExit()
            
    }).catch(err => {
        console.log(err);
    })
}

module.exports = {readTable, continueOrExit, employeeAssembler, getRoleChoices, getManagerChoices, getID, getID, getDepChoices,
departmentAdd, roleAdd, getRoleChoices}