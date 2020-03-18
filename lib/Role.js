class Role {
    
    constructor(id, title, salary, departmentID) {
        this.id = id;
        this.title = title;
        this.salary = salary;
        this.departmentID = departmentID
    }

    addRole(data) {
        console.log(data);
        connection.query(`INSERT INTO department (id, title, salary, departmentID)
        VALUES (${data.id}, ${data.title}, ${data.salary}, ${data.departmentID})`,
        (err) => {
            if (err) throw err;
        })    
    }

    readRole() {
        console.log('reading role table...');
        connection.query('SELECT * FROM role', (err, res) => {
            if (err) throw err;
            console.log(res);
        });
    }

    deleteRole(data) {
        const query = 'DELETE FROM role WHERE ?';
        connection.query(query, { id: data.id },
        (err) => {
            if(err) throw err;
        })
    }
}

module.exports = Role;
