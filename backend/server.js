const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const PORT = 4000;

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'memento',
});

con.connect(function(err) {
  if (err) throw err;
  console.log('Connected!');
});

app.use(cors());
// parse requests of content-type: application/json
app.use(bodyParser.json());

app.get('/api/hello', (req, res) => {
  con.query('SELECT message FROM test LIMIT 1', function(err, result, fields) {
    if (err) throw err;
    res.send(result[0].message + ' and server');
  });
});

app.listen(PORT, function() {
  console.log('Server is running on Port: ' + PORT);
});
