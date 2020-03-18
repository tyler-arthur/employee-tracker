class Employee {
    
    constructor(id, firstName, lastName, roleID, managerID) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.roleID = roleID;
        this.managerID = managerID;
    }

    addEmployee(data) {
        console.log(data);
            connection.query(`INSERT INTO department (id, department_name)
            VALUES (${data.id}, ${data.firstName}, ${data.lastName}, ${data.roleID}, ${data.managerID})`,
            (err) => {
                if (err) throw err;
            })    
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
}

module.exports = Employee;
