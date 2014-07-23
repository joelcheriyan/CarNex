

var mongoose = require('mongoose');

<<<<<<< HEAD
var uniqueValidator = require('mongoose-unique-validator');


// var UserSchema = mongoose.Schema({
//     username: { type: String, required: true, unique: true },
//     email: { type: String, unique: true, required: true },
//     password: { type: String, required: true }
// });



=======
>>>>>>> 36452fd0cceca27e5e6336f6a3859865d59cf9de



module.exports = mongoose.model('user', {
	name: String,
	email: String,
<<<<<<< HEAD
	username: { type: String, required: true, unique: true },
=======
	username:  String,
>>>>>>> 36452fd0cceca27e5e6336f6a3859865d59cf9de
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




