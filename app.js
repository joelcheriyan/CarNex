
/**
 * Module dependencies.
 */

 	//This is the main module for the server side

	var express = require('express');
	var http = require('http');
	var db = require('./db');
	var MongoStore = require('connect-mongo')(express);
	var passport = require('./auth');
	var routes = require('./routes')(app);
	var io = require("socket.io");
	var path = require('path');
	var app = express();
	var connect = require('connect');
	var chatter = require('chatter');
	var xss = require('node-xss').clean;
	

	
	var UserSchema = require('./schemas/user');




	// all environments
	app.set('port', process.env.PORT || 3000);
	//for compressing the files 
	app.use(express.compress());

	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.cookieParser());
	app.use(express.session({
		secret: 'keyboard cat',
		store: new MongoStore({
			mongoose_connection: db
		})
	}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(function (req, res, next) {
		res.set('carnex', 'carnex');
		next();
	});

	//for form submittion security
	app.use(express.csrf());

	app.use(function(req, res, next){
    		res.locals.token = req.csrfToken();
    		next();
  	});




	app.configure(function () {
    app.use(express.static(__dirname + '/public'));
    app.use(app.router);
	});


	// development only
	if ('development' == app.get('env')) {
	  app.use(express.errorHandler());
	}
	



	//detailed functions implementation starts here
	
	app.get('/login', function(req, res) {
	  	res.render('index.ejs');
	});

	app.post('/login', passport.authenticate('local', {
		failureRedirect: '/login',
		successRedirect: '/dashboard'
	}));

	app.get('/logout',routes.logout);

	

	//create a post to posts database
	app.get('/createpost', function(req, res) {
  		res.render('create_post.ejs');

	});
	app.post('/createpost', routes.createpost);


	//registration form to the user database
	app.get('/signup', function(req, res) {

		
  		res.render('signup.ejs');
	});
   	// stores in database. Post is sent from signup.ejs form
	app.post('/signup', routes.signup);




	

	app.get('/dashboard', function(req, res) 
	{
  		if (req.session.passport.user === undefined){
		 		res.redirect('/login');
		} 
		else{
				UserSchema.find({username: req.session.passport.user})
				.exec(function(err, user) {
					if (err) {
						res.status(500).json({status: 'failure'});
					}
					else{
						res.render('dashboard.ejs',{
						posts: undefined,
						user: user
						});
					}		
				});
		}					
	});



	//display the searching results
	app.post('/postsearch',routes.postsearch);

	//the comments used as user feedbacks 
	app.post('/comment',routes.comment);
	
	//for public viewers
	app.post('/profile',routes.profile);

	//for user themselves
	app.get('/personalprofile', routes.personalprofile); 

	app.post('/save', routes.save);
	app.post('/unsave', routes.unsave);	

	//for detailed route information
	app.post('/map', routes.map);

	//for updating the user information
	app.get('/settings', routes.settings);
	app.post('/update', routes.update);

	//for delete the saved posts
	app.post('/delete', routes.deletepost);

	//for the rating system
	app.post('/rating', routes.rating);
	
	
	//to contact the CarNex team
	app.get('/contact', function(req, res) {
	  	res.render('contact.ejs');
	});
	app.post('/contact', routes.contact);
	
	
	app.get('/chat',function(req, res){
		app.set('client', req.session.passport.user);
		app.set('recipient', req.body.chat_user);
		console.log(app.get('client'));
		res.render('chat.ejs');
	});
	

	//for not found URL
	app.get('/*', routes.error);
	
	

	var server = http.createServer(app);
	
	//socket.io connection
	var online = io.listen(server);
	chatter.set_sockets(online.sockets);
	

	online.sockets.on('connection', function (socket) {
		
	
		//indicating the specific socket add into the chat room
		console.log('connected');
		socket.username = app.get('client');
		console.log('ok' + socket.username);
	
		chatter.connect_chatter
  		({
    		socket: socket,
    		username: socket.username
  		});

	});
	
	

  	
	


server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});




