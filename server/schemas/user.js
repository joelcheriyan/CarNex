var mongoose = require('mongoose');



module.exports = mongoose.model('user', {
	name: String,
	email: String,
	username: {type: String, required: true, unique: true},
	password: String,
	phone: String,
	birthdate: Date,    
	city: String,
	lat: Number,
    lon: Number,
    counts: Number,
    rating: Number,

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




