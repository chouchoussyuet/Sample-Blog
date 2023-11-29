const mysql = require('mysql2');

const dbConn = mysql.createConnection({
  host: 'localhost',
  user: 'chouchoussy',
  password: 'baongoc',
  database: 'myblog'
});

dbConn.connect(function(error) {
  if (error) throw error;
  console.log("Database Connected!");
});

module.exports = dbConn;
