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
var trycatch   = require('trycatch');

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

var backupDataLocation = '../client/src/data/json/lingo.json';

// Helper functions 
var searchForTerm = function( term, collection, callback ){
	var regex = new RegExp(["^", term.toLowerCase(), "$"].join(""), "i");

	collection.find( { Name: regex } ).toArray(callback);

}

var populateDb = function( force, res  ) {

	db( function( db, callback ){

		termsCollection = db.collection('terms');

		termsCollection.find().toArray(function(err, docs){

			assert.equal(null, err);

			if( force ){

				termsCollection.drop();

			} else if ( docs.length ) {

				return res.status( 409 ).json( { error: 'database already populated' } );
			}

			var obj;

			fs.readFile( backupDataLocation, 'utf8', function (err, data) {

				if (err) throw err;
				obj = JSON.parse(data);

				termsCollection.insertMany( obj ).then( function ( r ) {

					return res.json( { success:true } );
					db.close();
				});
			});

		});

	});
};

var throwInternalError = function( error, res ) {

	res.status( 500 ).json({ error : 'Internal Server Error' } );
	console.log( error, error.stack );
};


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });   
});


router.get('/terms', function(req, res){

	trycatch( function(){

		db( function( db, callback ){

			termsCollection = db.collection('terms');

			termsCollection.find().toArray(function(err, docs){

				assert.equal(null, err);

				callback( docs );

				db.close();
			});


		}, function( data ){

			res.json( data );
		});

	}, function( e ) {

		throwInternalError( e, res );
	});
	// res.json()
});

router.get('/terms/:term', function(req, res){
	// console.log( req.params.term );

	trycatch( function(){

		db( function( db, callback ){

			termsCollection = db.collection('terms');

			searchForTerm( req.params.term, termsCollection, function(err, docs){

				assert.equal(null, err);

				res.json( docs[ 0 ] );


				db.close();
			});

		});

	}, function( e ) {

		throwInternalError( e, res );
	});
});

router.post('/terms/:term/', function(req, res){

	trycatch( function(){

		if( req.body.definition.trim() === '' ) {

			return res.status( 400 ).json({ error : 'no definition defined' } );
		}


		db( function( db, callback ){

			termsCollection = db.collection('terms');

			searchForTerm( req.params.term, termsCollection, function(err, docs){

				assert.equal(null, err);

				if( docs.length ) {

					res.status( 409 ).json({ error : 'Resource already exists. Cannot be duplicated. Use PUT to modify resource' } );

					db.close();

				} else {

					var newTerm = { 
									Name:req.params.term, 
									Definition: req.body.definition
								};

					termsCollection.insert([newTerm], function(err, result) {

						assert.equal(null, err);

						res.json({ success: true });


						db.close();
					});
				}
			});

		});

	}, function( e ) {

		throwInternalError( e, res );
	});

});


router.put('/terms/:term/', function(req, res){

	trycatch( function(){

		if( req.body.definition.trim() === '' ) {

			return res.status( 400 ).json({ error : 'no definition defined' } );
		}


		db( function( db, callback ){

			termsCollection = db.collection('terms');

			searchForTerm( req.params.term, termsCollection, function(err, docs){

				assert.equal(null, err);

				if( docs.length ) {

					termsCollection.update(
					
						docs[ 0 ], 
						{ $set: { Definition: req.body.definition } }, 

					function(err, result) {

						assert.equal(null, err);

						res.json({ success: true });


						db.close();
					});
					
					
				} else {

					res.status( 409 ).json({ error : 'No resource exists to edit' } );
					

					db.close();
				}
			});
		});

	}, function( e ) {

		throwInternalError( e, res );
	});
});

router.delete('/terms/:term/', function(req, res){

	trycatch( function(){

		db( function( db, callback ){

			termsCollection = db.collection('terms');

			searchForTerm( req.params.term, termsCollection, function(err, docs){

				assert.equal(null, err);

				if( docs.length ) {

					termsCollection.remove( docs[ 0 ], function(err, result) {

						assert.equal(err, null);
						assert.equal(1, result.result.n);

						res.json({ success: true });

						db.close();
					});

				} else {
					
					res.status( 409 ).json({ error : 'No resource exists to delete' } );

					db.close();
				}
			});
		});

	}, function( e ) {

		throwInternalError( e, res );
	});
});

router.get( '/populatedb', function( req, res ){

	trycatch( function(){

		populateDb( false, res );

	}, function( e ) {

		throwInternalError( e, res );
	});
});

router.get( '/populatedb-force', function( req, res ) {

	trycatch( function(){

		populateDb( true, res );

	}, function( e ) {

		throwInternalError( e, res );
	});

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
// 		});
// 	}	
// }
