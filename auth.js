var UserSchema = require('./schemas/user');
var bcrypt = require('bcrypt');
var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy(
	function(username, password, done) {
			
			
			UserSchema.find({username: username})
			.exec(function(err, users) 
			{
				if (err) {
				res.status(500).json({status: 'failure'});
				} 

				if(users != ""){
						if((bcrypt.compareSync(password, users[0].password))== true){
							
							return done(null, {username: username});
						}
					
						else{
							return done(null, false);
						}
				}
				else{
					return done(null, false);
				}
				
			});			
		
	}
));


passport.serializeUser(function(user, done) {
	done(null, user.username);
});

passport.deserializeUser(function(username, done) {
	done(null, {username: username});
});

module.exports = passport;
