

var mongoose = require('mongoose');
//var ObjectId = mongoose.Schema.Types.ObjectId;


// var uniqueValidator = require('mongoose-unique-validator');
// var plugin = require('plugin');



// var UserSchema = mongoose.Schema({
//     username: { type: String, required: true, unique: true },
//     email: { type: String, unique: true, required: true },
//     password: { type: String, required: true }
// });


// UserSchema.plugin(uniqueValidator);



module.exports = mongoose.model('user', {
	name: String,
	email: String,
	username: String,
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



