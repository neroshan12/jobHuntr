const express = require('express');
const bodyParser = require('body-parser'); // to handle reading data from <form>
const app = express();
const MongoClient = require('mongodb').MongoClient; //connect to MongoDB
app.set('view engine', 'ejs'); // setting view engine

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
  // need to render the ejs file when handling the GET request
  const cursor = db // .find() method returns a cursor (Mongo object). Cursor contains jobslist from database
    .collection('jobslist')
    .find() // get jobslist by using find method thats available in the collection method
    .toArray((err, result) => {
      // object contains the toArray method. toArray takes a callback function that allows you to manipulate jobslist
      console.log(result);
      res.render('index.ejs', { jobslist: result }); // use the render object built into the response object render
      // param1 = file you are rendering (places in a views folder), param2 = object that passes data on to view
      // setting the reuslts(an array) as the joblist array used in the index.ejs file
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
