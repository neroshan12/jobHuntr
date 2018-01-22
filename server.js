const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
app.set('view engine', 'ejs');

var db;

MongoClient.connect('INSERT MONGODB URI HERE', (err, client) => {
  if (err) return console.log(err);
  db = client.db('joblist');

  app.listen(3000, () => {
    console.log('listening on 3000');
  });
});

app.use(bodyParser.urlencoded({ extended: true }));
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
    if (err) return console.log(err);
    console.log('saved to database');
    res.redirect('/');
  });
});
