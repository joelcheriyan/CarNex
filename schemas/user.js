

var mongoose = require('mongoose');


//var uniqueValidator = require('mongoose-unique-validator');





module.exports = mongoose.model('user', {
	name: String,
	email: String,
	username:  {type: String, index: true, unique: true},
	password: String,
	phone: String,
	birthdate: Date,    
	city: String,
	lat: Number,
    lon: Number,
    counts: Number,
    rating: Number,
    result: Number,
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




