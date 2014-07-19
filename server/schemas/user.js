var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;


module.exports = mongoose.model('user', {
	name: String,
	email: String,
	username: String,
	password: String,
	phone: String,
	birthdate: Date,    
	city: String,
	comments: [{
			commenter: String,
			comment: String
		}],

	saved_posts: [{
			from: String,
			to: String,
			startdate: Date,
			returndate: Date,
			description: String, 
			poster: String
		}],
	my_posts: [{
			from: String,
			to: String,
			startdate: Date,
			returndate: Date,
			description: String, 
			poster: String
		}],
			

});



