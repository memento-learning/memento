// Single-Time Run

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "memento-databse-instance-1.cbjjdi6uczxr.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "mementodatabase"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE memento", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
con.end();
});