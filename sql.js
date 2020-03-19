const mysql = require('mysql');

const addToTable = (data) => {
    switch (data) {
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

