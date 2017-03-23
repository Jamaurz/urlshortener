var express = require('express')
var bodyparser = require('body-parser')
var cors = require('cors')
var path = require('path')
var mongodb = require('mongodb')

var MongoClient = mongodb.MongoClient
console.log(process.env.MONGOLAB_URI);
var url = process.env.MONGOLAB_URI
//var url = 'mongodb://localhost:27017/urlshortener'
var APP_URL = process.env.APP_URL
var include = require('./include.js')

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

console.log('process.env.APP_URL', APP_URL);

    app.get('/', function(req, res) {
        res.render('index');
    });

    app.get('/new', function(req, res) {
        res.render('index', {
            err: "Error: Pleas pass a proper url"
        });
    });
    
   include(app, db);
     var site = db.collection('site');

    site.find({}).toArray(function(err, docs) {
        if(err) throw err;
        console.log('docs', docs);
    });
    db.close();
  }
});

var port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log('Example app listening on ' + port)
})