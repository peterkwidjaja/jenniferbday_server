var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');

var requestTime = function(req, res, next) {
  req.requestTime = Date.now();
  next();
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(requestTime);

var wishList = [];

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.get('/wishes', function(req, res) {
  res.send('GET WISHES');
});

app.post('/wishes', function(req, res) {
  console.log(req.body);
  var newWish = {
    id: wishList.length,
    name: req.body.name,
    message: req.body.message,
    datetime: req.requestTime
  };
  console.log('wish', newWish);
  wishList.push(newWish);
  res.sendStatus(201);
});

app.delete('/wishes', function(req, res) {
  res.send('DELETE WISHES');
});

app.listen(3000, function() {
  console.log('EXAMPLE LOG PORT 3000!');
});
