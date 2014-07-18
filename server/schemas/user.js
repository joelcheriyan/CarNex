var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;


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
		}],

	saved_posts: [ObjectId],
	my_posts: [ObjectId]
			

});



