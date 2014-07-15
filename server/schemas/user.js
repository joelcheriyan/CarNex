var mongoose = require('mongoose');



module.exports = mongoose.model('user', {
	firstname: String,
	lastname: String,
	email: String,
	username: String,
	password: String,
	phone: String,
	birthdate: Date,     //specific date type
	city: String

});



