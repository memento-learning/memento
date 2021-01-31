const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

app.get('/api/hello', (req, res) => {
    res.body('Hello Gathass! - from server');
});
  
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
