const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(express.static('public')); // built in middleware to make folder public

var db;

MongoClient.connect('INSERT MONGODB URI HERE', (err, client) => {
  if (err) return console.log(err);
  db = client.db('joblist');
  const cursor = db
    .collection('jobslist')
    .find()
    .toArray();
  console.log(cursor);

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

app.put('/jobslist', (req, res) => {
  db.collection('jobslist').findOneAndUpdate(
    { company: 'Makers Academy' },
    {
      $set: {
        company: req.body.company,
        role: req.body.role
      }
    },
    {
      sort: { _id: -1 },
      upsert: true
    },
    (err, result) => {
      if (err) return res.send(err);
      res.send(result);
      console.log('database updated', result);
    }
  );
});

app.delete('/jobslist', (req, res) => {
  console.log(req.body);
  db
    .collection('jobslist')
    .findOneAndDelete(
      { company: req.body.company, role: req.body.role },
      (err, result) => {
        if (err) return res.send(500, err);
        res.send({ message: 'Delete' });
      }
    );
});
