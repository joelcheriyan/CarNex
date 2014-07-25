
/**
 * Module dependencies.
 */

//module.exports = function (db) {
	var express = require('express');
	var http = require('http');
	var db = require('./db');
	var MongoStore = require('connect-mongo')(express);
	var passport = require('./auth');
	var routes = require('./routes')();
	var path = require('path');
	var app = express();
	var connect = require('connect');
	var io = require('socket.io');
	var chatter = require('chatter');
	


	// all environments
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	//app.set('view engine', 'jade');
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
		res.set('X-Powered-By', 'Flight Tracker');
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




	app.get('/login', routes.login);
	app.post('/login', passport.authenticate('local', {
		failureRedirect: '/login',
		successRedirect: '/dashboard'
	}));

	app.get('/logout',routes.logout);

	
	//app.get('/user', routes.user);




	//our work below 
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



//eq.session.passport.user === undefined
 	// retrieve data from posts database
	app.get('/dashboard', routes.dashboard);
	

	app.post('/postsearch',routes.postsearch);
	app.post('/comment',routes.comment);
	
	app.post('/profile',routes.profile);


	app.get('/personalprofile', routes.personalprofile); 

	app.post('/save', routes.save);
	app.post('/unsave', routes.unsave);	

	app.post('/map', routes.map);

	
	app.get('/settings', routes.settings);
	app.post('/update', routes.update);

	app.post('/delete', routes.deletepost);

	app.post('/rating', routes.rating);
	


	app.get('/*', routes.error);

//	return app;}






var server = http.createServer(app);
//io = io.listen(server);

//var  app2 = connect().use(connect.static('public')).listen(server);
var chat_room = io.listen(server);
chatter.set_sockets(chat_room.sockets);

chat_room.sockets.on('connection', function (socket, req) 
{
	var client = req.session.passport.user;
  	chatter.connect_chatter
  	({
    socket: socket,
    username: client
  	});
});



server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});







