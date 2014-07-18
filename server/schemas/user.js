var mongoose = require('mongoose');



module.exports = mongoose.model('user', {
	firstname: String,
	lastname: String,
	email: String,
	username: String,
	password: String,
	phone: String,
	birthdate: Date,    
	city: String,
	comments: [{
			commenter: String,
			comment: String
		}]

	saved: [{
			post_id: ObjectId,   
		}]
			

});



