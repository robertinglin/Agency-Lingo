
var MongoClient = require('mongodb').MongoClient,
	assert = require('assert');

var termsCollection;

// Connection URL
var url = 'mongodb://localhost:27017/Lingo';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {

	assert.equal(null, err);
  
  	termsCollection = db.collection('terms');

  	termsCollection.find().toArray(function(err, docs){

		assert.equal(null, err);

  		console.log( docs[ 0 ].terms );
  	});

});