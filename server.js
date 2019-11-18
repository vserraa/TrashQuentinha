var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var express = require('express');
var cors = require('cors');
var db_url = 'mongodb://localhost';

var app = express();

app.use(cors());

app.get('/totalQuentinhas', function (req, res) {
	console.log("in get totalQuentinhas");
	MongoClient.connect(db_url, {useNewUrlParser : true, useUnifiedTopology : true}, function (err, client) {
		const db = client.db('TrashQuentinhaDB');
		var collection = db.collection('users');
		var user_email = req.query['email'];
		var user_UID = req.query['uid'];
		collection.find({UID : user_UID}).toArray( function(err, docs) {
			assert.equal(err, null);
			console.log()
			console.log('Found the following records:');
			console.log(docs);
			res.send({'ans' : docs[0]['totalQuentinhas']});
			client.close();
		});
	});
});

app.get('/depositarQuentinha', function (req, res) {
	MongoClient.connect(db_url, {useNewUrlParser : true, useUnifiedTopology : true}, function (err, client) {
		const db = client.db('TrashQuentinhaDB');
		var collection = db.collection('users');
		var user_email = req.query['email'];
		var user_UID = req.query['uid'];
		collection.updateOne({email : user_email}, { $inc: {'totalQuentinhas' : 1} }, function(err, result) {
			assert.equal(err, null);
			console.log("Update was succesfull");
			client.close();
		});
	});
});

var server = app.listen(3000, function () {
	console.log('Server connected. Waiting for requests.');
});