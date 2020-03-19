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

class Department {
    
    constructor(id, department_name) {
        this.id = id;
        this.department_name = department_name;
    }

    addDepartment() {
        connection.query(`INSERT INTO department (id, department_name)
        VALUES (${this.id}, ${JSON.stringify(this.department_name)})`,
        (err) => {
            if (err) throw err;
        })
        console.log(`${this.department_name} Added!`)
    }

    readDepartment() {
        console.log('reading department table...');
        connection.query('SELECT * FROM department', (err, res) => {
            if (err) throw err;
            console.log(res);
        });
    }

    deleteDepartment(data) {
        const query = 'DELETE FROM department WHERE ?';
        connection.query(query, { id: data.id },
        (err) => {
            if(err) throw err;
        })
    }
}

module.exports = Department;
