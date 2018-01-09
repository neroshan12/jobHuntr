const express = require('express');
const bodyParser = require('body-parser'); // to handle reading data from <form>
const app = express();
const MongoClient = require('mongodb').MongoClient; //connect to MongoDB
app.set('view engine', 'ejs');
var db;

MongoClient.connect(
  'mongodb://<dbuser>:<dbpassword>@ds247327.mlab.com:47327/joblist',
  (err, client) => {
    // MongoDB >= 3.0 you get a client object containing the database object in the callback
    if (err) return console.log(err);
    db = client.db('joblist');

    app.listen(3000, () => {
      // moved into connect so servers only start when the database is connected
      console.log('listening on 3000');
    });
  }
);

app.use(bodyParser.urlencoded({ extended: true })); // Express allows 'use' to add middleware to app
// urlencoded withing bodyparser tell body parser to extract data from <form> element and add to the body property of request object

app.get('/', (req, res) => {
  const cursor = db
    .collection('jobslist')
    .find()
    .toArray((err, result) => {
      console.log(result);
      res.render('index.ejs', { jobslist: result });
    });
});

app.post('/jobslist', (req, res) => {
  db.collection('jobslist').save(req.body, (err, result) => {
    // collection = named location to store data. String will be name of collection when calling MongoDB's .collection() method
    if (err) return console.log(err);
    console.log('saved to database');
    res.redirect('/');
  });
});
