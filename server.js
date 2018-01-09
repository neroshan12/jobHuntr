const express = require('express');
const bodyParser = require('body-parser'); // to handle reading data from <form>
const app = express();

app.use(bodyParser.urlencoded({ extended: true })); // Express allows 'use' to add middleware to app
// urlencoded withing bodyparser tell body parser to extract data from <form> element and add to the body property of request object
app.listen(3000, () => {
  console.log('listening on 3000');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/joblist', (req, res) => {
  console.log(req.body);
});
