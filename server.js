const express = require('express');
const bodyParser = require('body-parser'); // to handle reading data from <form>
const app = express();
const MongoClient = require('mongodb').MongoClient; //connect to MongoDB

var db;
MongoClient.connect(
  'mongodb://<dbuser>:<dbpassword>@ds247327.mlab.com:47327/joblist',
  (err, database) => {
    if (err) return console.log(err);
    db = database;
    app.listen(3000, () => {
      // moved into connect so servers only start when the database is connected
      console.log('listening on 3000');
    });
  }
);

app.use(bodyParser.urlencoded({ extended: true })); // Express allows 'use' to add middleware to app
// urlencoded withing bodyparser tell body parser to extract data from <form> element and add to the body property of request object

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/joblist', (req, res) => {
  console.log(req.body);
});
