// [ mysql 연동 ]
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  port      : 3306,
  user     : 'dbuser',
  password : 's3kreee7',
  database : 'databasename'
});

connection.connect();

export default connection;
