
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
	var i = 0;
	//the login function
	functions.login = function(req, res) 
	{
	
			
		if(i > 0)
		{
			res.render('index.ejs', {error: 'error'
			});
			console.log(i);
		}
		else
		{	
			res.render('index.ejs', {
			error: 'Strat it now'
			});
			console.log(i);	
		}
		i++;
	};


	functions.logout = function(req, res) 
	{

		req.session.passport.user = undefined;
		res.render('index.ejs');
		
	};

	//the login function
	functions.user = function(req, res) {
		if (req.session.passport.user === undefined) {
			res.redirect('/login');
		} else {
			res.render('user', {title: 'Welcome!',
				user: req.user
			});
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
			description: req.body.descript,
			username: req.session.passport.user
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
			city: req.body.city,
			lat: req.body.lat,
			lon: req.body.lon
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
				UserSchema.find({username: req.session.passport.user})
				.exec(function(err, user) {
				if (err) {
				res.status(500).json({status: 'failure'});
				} 
				else {
					res.render('dashboard.ejs', {
					posts:posts,
					firstname: user.firstname,
					username: req.session.passport.user
					
					});					
				}
				});
			}
		});
			
		
	};

	functions.comment = function(req, res) {
	//query user to whom the comment should be sent to

		UserSchema.update({username:req.body.user}, { $addToSet: { comments: {commenter: req.body.first, comment: req.body.comment}}})
		.exec(function(err, user){
			if (err) 
			{
				res.status(500).json({status: 'failure'});
			} else 
			{

				UserSchema.find({username: req.body.user})
				.exec(function(err, user) {
				if (err) {
				res.status(500).json({status: 'failure'});
				} 
				else {
					res.render('profile.ejs', {
					user: user});					
				}
				});
			}
					
			
			});
		
	};


	functions.profile = function(req, res) {
		console.log(req.body.username);	
		if(req.body.username != undefined)
		{
			UserSchema.find({username: req.body.username})
			.exec(function(err, user) {
				if (err) {
				res.status(500).json({status: 'failure'});
				} 
				else {
					res.render('profile.ejs', {
					user: user
					});					
				}
		
				});
		}
	};

	functions.save = function(req, res) {
	//query user to whom the comment should be sent to

		UserSchema.update({username:req.session.passport.user}, { $addToSet: {saved_posts : req.body.post_id, }})
		.exec(function(err, user){
			if (err) 
			{
				res.status(500).json({status: 'failure'});
			} else 
			{

				res.redirect('/dashboard');
			}		
			
		});
		
	};




	return functions;
};
