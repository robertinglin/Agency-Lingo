

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

module.exports = function( callforward, callback ){

	// Connection URL
	var url = 'mongodb://localhost:27017/Lingo';
	// Use connect method to connect to the Server
	MongoClient.connect(url, function(err, db) {

		callforward( db, callback );
	});

}