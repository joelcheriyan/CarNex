var UserSchema = require('./schemas/user');

var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(

UserSchema.find({username: req.body.username, password: req.body.password})
		.setOptions({sort: 'startdate'})
		.exec(
				function(username, password, done) 
				{
					return done(null, {username: username});	
				}
			),

	done(null, false)

));

passport.serializeUser(function(user, done) {
	done(null, user.username);
});

passport.deserializeUser(function(username, done) {
	done(null, {username: username});
});

module.exports = passport;