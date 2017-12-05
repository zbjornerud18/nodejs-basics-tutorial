var http = require('http'); // importing some funcionality
var module1 = require('./module1'); //./ signifies same directory
var module2  = require('./module2');
//only need to put http 
//through this variable http we will be able to access the module and then everything inside the module
//split code structure is much easier to work with

function onRequest(request, response) { //onrequest function for creating server
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write(module2.myVariable);
    module2.myFunction(); //need parens because executing it
    response.end();
}

http.createServer(onRequest).listen(8000); //creates a server that listens to port 8000

//this stuff sucls
//perks of node.js is that it is non-blocking and it is event-driven

function myFunction(){
	console.log('Function was called')
}
var myString = 'String!'
module.exports.myFunction = myFunction; //making it available for other files by binding it with module
module.exports.myString = myString;

module.exports = { //exports everything in this: module can import and export content of files
	myFunction: function() {
		console.log('Exported!');
	},
	my variable: 'Exported variable'
}
//anonymous functions don't have a name and are just placed where they are needed because it is not being reused
/////// IDE
// preferences, plugins, Node JS installed
// languages and frameworks, libraries, Node JS Core in library
//download live edit plugin

//For using index.html file and outputing the files
var fs = require('fs');
function onRequest(request, response) { //onrequest function for creating server
    response.writeHead(200, {'Content-Type': 'text/html'}); //have to put html so it knows what format to use
    fs.readFile('./index.html', null, function(error, data)) //reads index file or whatever file name I put
    	if(error) {
    		response.writeHead(404);
    		response.write('File not found');
    	} else {
    		response.write(data);
    	}
    	response.end();
    	});  
}
http.createServer(onrequest)listen(8000);

//ROUTING
//defining what goes in when the function is requested
var url = require('url');
var fs = require('fs');

function renderHtml(path, response) { //same as above but the index.html is replaced with the path
	fs.readFile(path, null, function(error, data)) //reads index file or whatever file name I put
    	if(error) {
    		response.writeHead(404);
    		response.write('File not found');
    	} else {
    		response.write(data);
    	}
    	response.end();
    	});  
}

module.exports = {
	handleRequest: function(request, response) {
		response.writeHead(200, {'Content-Type': 'text/html'});
		var path = url.parse(request.url).pathname;
		switch path(){
			case '/': 
					renderHtml('./index.html', response);
					break;
			case '/login':
					renderHtml('./login.html', response); //this switch case switches when it sees a user login
					break;
			default: // if it is anything else it will return error
					response.writeHead(404);
					response.write('Route not defined');
					response.end();
		}
	}
}
 var http = require('http');
 var app = require('./app');
 http.createServer(app.handleRequest).listen(8000);//this is the final step of implementing the route 


 // EXPRESS
 // with node js we have to write everything ourselves
 //annoying, very easy to make errors
 //express builds on node and adds tools and functionalities that makes writing easier
 //For making express:
 // Type in express folder "express" and then the name of the express folder
 //should install a bunch of files
// inside folder you run: npm install 
//then to run server type: node bin/www
//normalize port parses a string value into an int
//to get express to run nicely it require two different routes
//setup is so the files should be accesable staticly
//use method says use current request
//function that catch 404 and forward to error handler
//you can add subroutes to routes

//layout.jade

//ul
// li then text : this allows you to just add a text
//ul
//same thing but li. 
//block text: allows you enter any number of lines of text
//input (type = 'text') - makes text box
//input (type = 'text').class-name#anyid
//title = title is different than title title
// the = says don't just use text but use the variable of title
//if condition p = true and you can set the condition in the express file to be false
//this will show up if true or not if false because of the condition
//can also set variables with - var condition = true
//- var anyArray = [1,2,3]
//#{title} inserts variable title into text in file


//HANDLEBAR

var hbs = require('express-handlebars')
//engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultlayout: 'layout'}, layoutsDir: __dirname + '/view/layouts/'));
//set view engine to hbs
app.set('view engine', 'hbs')
//create layout folder in view folder
{{}}//makes sure only text is output
{{{ body }}} //three is for different pages or files in server
{{#if condition}}
{{else}}
{{endif}}

{{#if condition}}
{{/if}} /// in handlebar it recognizes this as one block of code
{{# each anyArray as |val key|}}
{{key}}: {{val}}
{{/each}} ///this should do the same thing but with each

//-get-post
router.get('/test/:id', function(req, res, next))
res.render('test', {output: req.params.id}) //will be a parameter available in this file
router.post('/test/submit', function(req, res, next){
	var id = req.body.id
	res.redirect('/test/...');
})
<form action = "/test/submit" method = "post">
	<input type = "text" name = "id">
	<button type = "submit">Submit</button>

///index.js
///-validations-sessions
//npm install --save express-validator
//npm install --save express-session
var expressValidator = require('express-validator');
var expressSession = require('express-session');
app.use(expressValidator());
app.use(expressSession({secret: 'max', saveUninitialized: false, resave:false})); //resave will save our session
//client stored in session id

router.get('/', function(req, res, next){
	res.render('index', {title: 'Form Validation', success: req.session.success, errors: req.session.errors});
	req.session.errors = null;
	req.session.success = null;
})
router.post('/submit', function(req,res,next){
	req.check('email','Invalid email address').isEmail;//check validity of buttons made below
	req.check('password','Invalid password').isLength ({min:4}).equals(req.body.confirmPassword);

	var errors= req.validationErrors();
	if(errors){
		req.session.errors=errors;
		req.session.success=false;
	}
	else{
		req.session.success=true;
	}
	res.redirect('/')
})

//Form index.hbs
{{# if success }}
	<section class="success">
		<h2>Successful Validation!</h2>
		</section>
{{else}}
	{{# if errors}}
		<section class = "errors">
			<ul >
				{{# each errors }}
					<li{{ this.msg }}/li>///
				{{/each}}
<form action= "/submit" method="post">
	<div class="input">
		<label for="email">E-Mail</label>
		<input type="text" id="email" name="email">
	</div>
	<div class = "input">
		<label for ="password">Password</label>
		<input type="password" id="password" name="password">
	</div>
	<div class="input">
		<labelfor ="confirmPassword">confirmPassword</label>
		<input type="password" id="confirmPassword" name="confirmPassword">
	</div>
	<button type="submit"< Sign up</button>
</form>

//past this point is MONGO DB
//MY MONGO DB was not working after I downloaded it
//when I tried to run it it failed on the server and client
//to get it to run server is in terminal mongod
//then to get it to run client is just mongo
//db.data.insert({"username": "zane"}) this will insert one result
//db.data.find() sees all the objects in the database

//in the index.js file
//var mongo = require('mongodb').MongoClient;
//var assert = require('assert');
//var url = 'mongodb://localhost: x/test'; the x is whatever port it says

//router.get('/', function(req, res, next){
	//res.render('index');
//})
//router.get('/get-data', function(req, res, next) {
	//var resultArray = [];
	//mongo.connect(url, function(err, db));
		//assert.equal(null, error);
		//var cursor = db.collection('user-data').find();
		//cursor.forEach(function(doc, err){
			//assert.equal(null, err);
			//resultArray.push(doc); for items that we run
			//}, function(){
				//db.close(); want to close database because it has retrieved all items wanted
				//res.render('index', {items: resultArray})
			//});
//router.post('/insert', function(req, res, next)
// var item = {
	//title: req.body.title,
	//content: req.body.content,
	//author: req.body.author,
//};
// mongo.connect(url, function(){
	//assert.equal(null, err);
	//db.collection('user-data').insertOne(item, function(err,result));    ONE DATABASE MIGHT HAVE MULTIPLE COLLECTIONS
		//assert.equal(null, err);
		//console.log('Item inserted');
		//db.close();
//});
//res.redirect('/');

//NOW FOR UPDATING AND DELETING DATA
////var objectId = require('mongodb').ObjectID;  HAVE TO DO THIS BECAUSE IT IS AN OBJECT IN UPDATE
//});
//router.post('/update', function(req, res, next)
// var item = {
	//title: req.body.title,
	//content: req.body.content,
	//author: req.body.author,
//};
//	var id = req.body.id;
// mongo.connect(url, function(){
	//assert.equal(null, err);
	//db.collection('user-data').updateOne({"_id": objectId(id)}, {$set:item}, function(err,result));  FIRST ARGUMENT IDENTIFIES DATA AND SECOND SETS IT
		//assert.equal(null, err);
		//console.log('Item updated');
		//db.close();
		//})
	//})
//});
//router.post('/delete', function(req, res, next)
//	var id = req.body.id;
// mongo.connect(url, function(){
	//assert.equal(null, err);
	//db.collection('user-data').deleteOne({"_id": objectId(id)}, function(err,result));  FIRST ARGUMENT IDENTIFIES DATA AND SECOND SETS IT
		//assert.equal(null, err);
		//console.log('Item deleted');
		//db.close();
		//})
	//})
//});

//MONGO DB WITH MONK
// MONK CUTS DOWN THE CODE SO YOU DON'T HAVE TO WRITE IT EVERYTIME
//in package you have to change the version 1.4.1 in the .json file
//then just do npm install
//then npm install --save monk

//var express = require('express');
//var router = express.Router();
//var db = require('monk')('localhost:x/test') AGAIN THE X IS WHATEVER NUMBER IT GAVE ME IN THE FIRST MONGO DB
//var userData = db.get('user-data'); WITH THIS WE HAVE DATABASE + CONNECTION TO DATABASE

//router.get('/', function(req, res, next){
	//res.render('index');
//})
//router.get('/get-data', function(req, res, next) {

	//var data = userData.find({}); THIS SERACHES FOR DATA ENTRIES
	//data.on('success', function(docs)) GIVE DOCUMENTS RETRIEVED IF SUCCESS
		//res.render('index', {items: docs});

			//});
//router.post('/insert', function(req, res, next)
// var item = {
	//title: req.body.title,
	//content: req.body.content,
	//author: req.body.author,
//};
	//userData.insert(item); 
//res.redirect('/');


//});


//router.post('/update', function(req, res, next){}
// var item = {
	//title: req.body.title,
	//content: req.body.content,
	//author: req.body.author,
//};
	//userData.update({"_id", db.id(id)}, item); ALLOWS you TO TRANSFER ANY ID INTO an object ID
//or  userData.updateById(id, item);

//};
//	var id = req.body.id;
//});


//router.post('/delete', function(req, res, next)
//	var id = req.body.id;

// userData.removeById(id);

//});


//MONGOOOOOOSE

//first step is to remove mongodb
//then go into folder and "npm install --save mongoose"
//var express = require('express');
//var router = express.Router();
//var mongoose = require('mongoose');
//mongoose.connect('localhost:x/test'); x is direct address of database 
//var Schema = mongoose.Schema; schema is just like the blueprint

//var userDataSchema = new Schema({
	//title: String;
	//content: String;
	//author: String;
//}, {collection: 'user-data'}); this can contain some options

//var userData = mongoose.model('UserData', userDataSchema); CREATING ACTAUL MODEL

//router.get('/', function(req, res, next){
	//res.render('index');
//})

//router.get('/get-data', function(req, res, next) {
	//UserData.find();
		//.then(function(doc)); ONCE DONE
		//res.render('index', {items: doc});

			//});
//router.post('/insert', function(req, res, next)
// var item = {
	//title: req.body.title,
	//content: req.body.content,
	//author: req.body.author,
//};

	//var data = new UserData(item);
	//data.save();
 
//res.redirect('/');

//router.post('/update', function(req, res, next){}
// var item = {
	//title: req.body.title,
	//content: req.body.content,
	//author: req.body.author,

//};
//	var id = req.body.id;

	//UserData.findById(id, function(err, doc){
		//if(err){
			//console.error('error, no entry found');
		//}
		//doc.title = req.body.title;
		//doc.content = req.body.content;
		//doc.author = req.body.author;
		//doc.save();
	//});

	//res.redirect('/');

//});


//router.post('/delete', function(req, res, next)
//	var id = req.body.id;

//UserData.findByIdAndRemove(id). exec();
	//res.redirect('/');


//});























