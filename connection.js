const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'your_host',
  user: 'root',
  password: 'Root',
  database: 'employee_tracker_db'
});

module.exports = connection;
