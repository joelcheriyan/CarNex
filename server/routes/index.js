
/*
 * GET home page.
 */

var FlightSchema = require('../schemas/flight');
var UserSchema = require('../schemas/user');
var PostsSchema = require('../schemas/posts');


module.exports = function (flights) {
	var flight = require('../flight');

	for(var number in flights) {
		flights[number] = flight(flights[number]);
	}

	var functions = {};//this cannot be removed

	functions.flight = function(req, res){
		var number = req.param('number');

		req.session.lastNumber = number;//the login function

		if (typeof flights[number] === 'undefined') {
			res.status(404).json({status: 'error'});
		} else {
			res.json(flights[number].getInformation());
		}
	};

	functions.arrived = function (req, res) {
		var number = req.param('number');

		if (typeof flights[number] === 'undefined') {
			res.status(404).json({status: 'error'});
		} else {
			flights[number].triggerArrive();

			var record = new FlightSchema(
				flights[number].getInformation()
			);

			record.save(function(err) {
				if (err) {
					console.log(err);
					res.status(500).json({status: 'failure'});
				} else {
					res.json({status: 'success'});
				}
			});

			res.json({status: 'done'});
		}
	};

	functions.list = function (req, res) {
		res.render('list', {
			title: 'All Flights', 
			flights: flights});
	};

	functions.arrivals = function(req, res) {
		FlightSchema.find()
		.setOptions({sort: 'actualArrive'})
		.exec(function(err, arrivals) {
			if (err) {
				res.status(500).json({status: 'failure'});
			} else {
				res.render('arrivals', {
					title: 'Arrivals',
					arrivals: arrivals,
					lastNumber: req.session.lastNumber//the login function
				});
			}
		});
	};

	//the login function
	functions.login = function(req, res) {
		res.render('login', {title: 'Log in'});
	};

	//the login function
	functions.user = function(req, res) {
		if (req.session.passport.user === undefined) {
			res.redirect('/login');
		} else {
			res.render('user', {title: 'Welcome!',
				user: req.user
			})
		}
	};


	//our work starts here
	//create a post page
	functions.createpost = function(req, res) {
  	
  		var record = new PostsSchema({
			from: req.body.from,
			to: req.body.to,
			startdate: req.body.startdate,
			returndate: req.body.returndate,
			description: req.body.descript
		});
  		
			//save the records into the user database
			record.save(function(err) {
				if (err) {
					console.log(err);
					res.status(500).json({status: 'failure'});
				}else {
					res.json({status: 'success'});
				} 
			});
};


	//signup page 
	functions.signup = function(req, res) {
		var record = new UserSchema({
			firstname: req.body.firstname, 
			lastname: req.body.lastname,
			email: req.body.email,
			username: req.body.username,
			password: req.body.password,
			phone: req.body.phone,
			birthdate: req.body.birthdate,     
			city: req.body.city
		});

			//save the records into the user database
			record.save(function(err) {
				if (err) {
					console.log(err);
					res.status(500).json({status: 'failure'});
				} 
			});

};



	//dashboard page
	functions.dashboard = function(req, res) {
		//this is the condition that we have for query: starting point, destination and date

		var current_date = new Date();

		PostsSchema.find({from: req.body.from, to: req.body.to, returndate: { $gt: current_date} })
		.setOptions({sort: 'startdate'})
		.exec(function(err, posts) {
			if (err) {
				res.status(500).json({status: 'failure'});
			} else {

				res.render('dashboard.ejs', {
					posts: posts
					
				});
			}
		});
	};


	//setting file, we can do tmr



	return functions;
};
