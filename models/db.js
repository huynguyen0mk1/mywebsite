"user strict";

var mysql = require("mysql");

//local mysql db connection
var connection = mysql.createConnection({
  host: process.env.HOST_NAME,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DATABASE_PORT,
});
// connect to database
// connection.connect(function (err) {
//   if (err) throw err;
//   console.log("connect ok!!!");
// });

module.exports = connection;
