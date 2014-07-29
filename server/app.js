
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

	var io = require('socket.io');
	var chatter = require('chatter');
	

	var client = "";
	var UserSchema = require('./schemas/user');
	var db = require('./db');
	var chatter = require('chatter');


	//var getName = function() {
	//	var client;
	//	return client;
	//}


	// all environments
	app.set('port', process.env.PORT || 3000);
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
	
	//errors for invaild URL
	app.configure(function () {
    app.use(express.static(__dirname + '/public'));
    app.use(app.router);
	});


	// development only
	if ('development' == app.get('env')) {
	  app.use(express.errorHandler());
	}
	
	//some inner testing work
	app.use(connect.bodyParser());







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

		console.log('sign up ' + req.session.passport.user);
  		res.render('signup.ejs');
	});
   	// stores in database. Post is sent from signup.ejs form
	app.post('/signup', routes.signup);




	//Those are global variables for identifing the socket.io username
	var users = [];
	var i = -1;
	var now = 0;

	app.get('/dashboard', function(req, res) 
	{
		
		var flag = 1;//this is for checking the duplicated input username
		for(var checking = 0; checking < users.length; checking++)
		{
			console.log("ok" + users[checking]);
			if(users[checking] == req.session.passport.user)
			{
				flag = 0;
				console.log("die");
			}
    	
		}


		//get the session array
		if(flag == 1)
		{
			users.push(req.session.passport.user);
    		i++;
    	
		}

			


		//get the index of users
		for(var checking1 = 0; checking1 < users.length; checking1++)
		{
			
			if(users[checking1] == req.session.passport.user)
			{
				//set the index
				now = checking1;
			}
    	
		}

  		

		app.set('username', client);
  			if (req.session.passport.user === undefined){
		 		res.redirect('/login');
			} 
			else{
			UserSchema.find({username: req.session.passport.user})
			.exec(function(err, user) {
			if (err) 
			{
				res.status(500).json({status: 'failure'});
			}
			else
			{
				 res.render('dashboard.ejs',
				 {
					posts: undefined,
					user: user
				});
			}		
		 });
		}					
	}	
	);



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
	

	//for not found URL
	app.get('/*', routes.error);
	






	var server = http.createServer(app);
	
	//socket.io connection
	var chat_room = io.listen(server);
	chatter.set_sockets(chat_room.sockets);


	chat_room.sockets.on('connection', function (socket) 
	{
	
		//indicating the specific socket add into the chat room

  		chatter.connect_chatter
  		({
    		socket: socket,
    		username: users[now]
  		});
	});


server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});




