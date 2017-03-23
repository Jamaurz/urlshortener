var express = require('express')
var bodyparser = require('body-parser')
var cors = require('cors')
var path = require('path')
var mongodb = require('mongodb')

var MongoClient = mongodb.MongoClient
var url = process.env.MONGOLAB_URI;
var incl = require('./include.js');

var app = express()

app.use(cors())
app.use(bodyparser.json())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);


    app.get('/', function(req, res) {
        res.render('index');
    });

    app.get('/new', function(req, res) {
        res.render('index', {
            err: "Error: Pleas pass a proper url"
        });
    });
     incl(app, db);
    
    //db.close();
  }

});

app.listen(process.env.PORT || 8080, function () {
  console.log('Example app listening')
})