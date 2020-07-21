var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "nameis980214",
  database: "fintech",
  port: "3306",
});

connection.connect();

connection.query("SELECT * FROM fintech.user", function (
  error,
  results,
  fields
) {
  if (error) throw error;
  console.log("우리 회원들은 : ", results);
});

connection.end();
