
/**
 * Module dependencies.
 */

module.exports = function (flights, db) {
	var express = require('express');
	var MongoStore = require('connect-mongo')(express);
	var passport = require('./auth');
	var routes = require('./routes')(flights);
	var path = require('path');
	var app = express();
	var connect = require('connect');


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
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));

	// development only
	if ('development' == app.get('env')) {
	  app.use(express.errorHandler());
	}
	
	//some inner testing work
	app.use(connect.bodyParser());

	




	app.get('/flight/:number', routes.flight);
	app.put('/flight/:number/arrived', routes.arrived);
	app.get('/list', routes.list);
	app.get('/arrivals', routes.arrivals);




	app.get('/login', routes.login);
	app.post('/login', passport.authenticate('local', {
		failureRedirect: '/login',
		successRedirect: '/dashboard'
	}));

	app.post('/logout',routes.logout);

	
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
	app.get('/dashboard', function(req, res) {
		if (req.session.passport.user === undefined) {
		 	res.redirect('/login');
		} 
		else 
		{	
			res.render('dashboard.ejs', {posts: undefined, username: req.session.passport.user});
		}
  	});
		

	app.post('/dashboard',routes.dashboard);
	app.post('/comment',routes.comment);
	
	app.post('/profile',routes.profile);


	app.get('/personalprofile', routes.personalprofile); 

	app.post('/save', routes.save);	



	

	return app;
}


