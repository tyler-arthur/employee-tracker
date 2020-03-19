const mysql = require('mysql');

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

class Employee {
    
    constructor(id, firstName, lastName, roleID, managerID) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.roleID = roleID;
        this.managerID = managerID;
    }

    addEmployee(data) {
        connection.query(`INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
        VALUES (${this.id}, ${JSON.stringify(this.firstName)}, ${JSON.stringify(this.lastName)}, ${this.roleID}, ${this.managerID})`,
        (err) => {
            if (err) throw err;
        })
        console.log(`${this.firstName} ${this.lastName} Added!`)
    }

    readEmployee() {
        console.log('reading employee table...');
        connection.query('SELECT * FROM employee', (err, res) => {
            if (err) throw err;
            console.log(res);
        });
    }

    deleteEmployee(data) {
        const query = 'DELETE FROM employee WHERE ?';
        connection.query(query, { id: data.id },
        (err) => {
            if(err) throw err;
        })
    }

    // TODO: Add an employee look up function
    updateEmployeeRole(data) {
        const query = `UPDATE employees SET 
            role = ${data.role} 
        WHERE
            id = ${data.id};`
    }
}

module.exports = Employee;
