const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const PORT = 4000;

app.use(cors());
// parse requests of content-type: application/json
app.use(bodyParser.json());

app.get('/api/hello', (req, res) => {
    res.send('Hello Gathass! - from server');
});
  
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
 

var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});