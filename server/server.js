// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var fs 		   = require('fs');
var db 		   = require('./mongo-connection.js');
var assert 	   = require('assert');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(allowCrossDomain);

var port = process.env.PORT || 7777;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});


router.get('/terms', function(req, res){

	db( function( db, callback ){

		termsCollection = db.collection('terms');

		termsCollection.find().toArray(function(err, docs){

			assert.equal(null, err);

			callback( docs );
		});


	}, function( data ){

		res.json( data );
	})

	// res.json()
});

router.get('/terms/:term', function(req, res){
	// console.log( req.params.term );

	db( function( db, callback ){

		termsCollection = db.collection('terms');

		termsCollection.find( { Name: req.params.term } ).toArray(function(err, docs){

			assert.equal(null, err);

			res.json( docs );
		});

	});
	// var term = '{"' + req.params.term  + '":1}'; 
	// res.json( term );
})

router.post('/terms/:term/', function(req, res){
	console.log( req.body );
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);


// var MongoClient = require('mongodb').MongoClient;


// // Connection URL
// var url = 'mongodb://localhost:27017/myproject';


// var runMongo = function( runFunction, callback ) {
// 	MongoClient.connect(url, function(err, db) {

// 		runFunction( db, callback );
// 	}
// }


// var addTermMongo = function( term ) {

// 	var termToAdd = { name: 'Bench', definition: 'On the bench', related: [ 'beach', 'On the bench'] };


// 	var addTermMongo = function( db, callback ) {

// 		var collection = db.collection('documents');

// 		collection.find({ name: termToAdd.name }).toArray(function( err, terms ){

// 			console.log( terms );
// 		})
// 	}	
// }
