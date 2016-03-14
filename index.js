var express = require('express');
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var app = express();

app.get('/users', function (req, res) {
  res.send({
  	'name' : 'sandeep', 
  	'age' : 25
  });
});

app.post('/users', function (req, res) {
	var url = 'mongodb://localhost:27017/test';
	MongoClient.connect(url, function(err, db) {
	  assert.equal(null, err);
	  console.log("Connected correctly to server.");
	  insertUser(function() {
	  	console.log("Inserted the user in mongoDB");
	  	db.close();
	  })
	});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

var insertUser = function(userObj, callback) {
   db.collection('users').insertOne( {
   		"name" : userObj['name'],
   		"age" : userObj['age']
   }, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the Users collection.");
    callback();
  });
};
