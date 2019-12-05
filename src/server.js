var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var express = require('express');
var cors = require('cors');
var db_url = 'mongodb://localhost';

var app = express();

app.use(cors({origin: "*"}));

app.get('/totalQuentinhas', function (req, res) {
	console.log("in get totalQuentinhas");
	MongoClient.connect(db_url, {useNewUrlParser : true, useUnifiedTopology : true}, function (err, client) {
		const db = client.db('TrashQuentinhaDB');
		var collection = db.collection('users');
		var user_email = req.query['email'];
		var user_UID = req.query['uid'];
		console.log(user_UID);
		console.log(user_email);
		collection.find({UID : user_UID}).toArray( function(err, docs) {
			assert.equal(err, null);
			console.log('Found the following records:');
			console.log(docs);
			res.send({'ans' : docs[0]['totalQuentinhas']});
			client.close();
		});
	});
});

app.post('/depositarQuentinha', function (req, res) {
	MongoClient.connect(db_url, {useNewUrlParser : true, useUnifiedTopology : true}, function (err, client) {
		const db = client.db('TrashQuentinhaDB');
		var collection = db.collection('users');
		var user_email = req.query['email'];
		var user_UID = req.query['uid'];
		collection.updateOne({UID : user_UID}, { $inc: {'totalQuentinhas' : 1} }, function(err, result) {
			assert.equal(err, null);
			console.log("Update was succesfull");
			res.sendStatus(200);
			client.close();
		});
	});
});

app.post('/registrarUsuario', function(req, res) {
	MongoClient.connect(db_url, {useNewUrlParser : true, useUnifiedTopology : true}, function (err, client) {
		const db = client.db('TrashQuentinhaDB');
		var collection = db.collection('users');
		var user_email = req.query['email'];
		var user_UID = req.query['uid'];
		collection.insertOne({'email': user_email, 'UID' : user_UID, 'totalQuentinhas' : 0}, function(err, result) {
			assert.equal(err, null);
			console.log("User was created.");
			res.sendStatus(200);
			client.close();
		});
	});
})

app.post('/deletarUsuario', function(req, res) {
	MongoClient.connect(db_url, {useNewUrlParser : true, useUnifiedTopology : true}, function (err, client) {
		const db = client.db('TrashQuentinhaDB');
		var collection = db.collection('users');
		var user_email = req.query['email'];
		var user_UID = req.query['uid'];
		collection.deleteOne({UID: user_UID}, function(err, result) {
			assert.equal(err, null);
			console.log("User was deleted.");
			res.sendStatus(200);
			client.close();
		});
	});
})

app.post('/coletarRecompensa', function(req, res) {
	MongoClient.connect(db_url, {useNewUrlParser : true, useUnifiedTopology : true}, function (err, client) {
		const db = client.db('TrashQuentinhaDB');
		var collection = db.collection('users');
		var user_email = req.query['email'];
		var user_UID = req.query['uid'];
		collection.updateOne({UID : user_UID}, { $inc: {'totalQuentinhas' : -3} }, function(err, result) {
			assert.equal(err, null);
			console.log("Coleta de recompensa deu bom");
			res.sendStatus(200);
			client.close();
		});
	});
}) 

app.post('/confirmarQuentinha', function(req, res) {
	MongoClient.connect(db_url, {useNewUrlParser : true, useUnifiedTopology : true}, function (err, client) {
		const db = client.db('TrashQuentinhaDB');
		var collection = db.collection('quentinhas');
		var time = new Date().getTime();
		collection.insertOne({'time_stamp': parseInt(time)}, function(err, result) {
			assert.equal(err, null);
			console.log("Confirmação obtida");
			console.log(time);
			res.sendStatus(200);
			client.close();
		});
	});
})

app.get('/ultimaQuentinha', function(req, res) {
	MongoClient.connect(db_url, {useNewUrlParser : true, useUnifiedTopology : true}, function (err, client) {
		const db = client.db('TrashQuentinhaDB');
		var collection = db.collection('quentinhas');
		var time = req.query['time_stamp'];
		collection.find({}).sort({'time_stamp' : -1}).limit(1).toArray( function(err, result) {
			assert.equal(err, null);
			console.log("Ultima quentinha depositada obtida");
			console.log(result);
			res.send({'ans' : result[0]['time_stamp']});
			client.close();
		});
	});	
})

var server = app.listen(3000, function () {
	console.log('Server connected. Waiting for requests.');
});