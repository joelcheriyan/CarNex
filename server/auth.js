var UserSchema = require('./schemas/user');

var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
	function(username, password, done) {
		UserSchema.find({username: username, password: password})
		.exec(function(err, posts) 
		{

			console.log(posts);
			if (err) {
				res.status(500).json({status: 'failure'});
			} 
			else 
			{	
				if(posts != "")
				{

					console.log("inside the first one " + username);

					return done(null, {username: username});
				}
				else
				{
					console.log("inside the second one");
					return done(null, false);
				}
			}
		});

		
	}
));
// passport.use(new LocalStrategy(

// UserSchema.find({username: req.body.username, password: req.body.password})
// 		.setOptions({sort: 'startdate'})
// 		.exec(
// 				function(username, password, done) 
// 				{
// 					return done(null, {username: username});	
// 				}
// 			),

// 	done(null, false)

// ));

passport.serializeUser(function(user, done) {
	done(null, user.username);
});

passport.deserializeUser(function(username, done) {
	done(null, {username: username});
});

module.exports = passport;