class Department {
    
    constructor(id, department_name) {
        this.id = id;
        this.department_name = department_name;
    }

    addDepartment(data) {
        console.log(data);
        connection.query(`INSERT INTO department (id, department_name)
        VALUES (${data.id}, ${data.department_name})`,
        (err) => {
            if (err) throw err;
        })    
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
