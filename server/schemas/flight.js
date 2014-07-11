var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
	
	UserID: Number,
	username: String,
	password: String,
	name: String,
	email: String,
	phonenumber: String,
	//picture:
	//Saved post:
	rating: Number
});


//module.exports = mongoose.model('posting', {
//	
//}
//posting 
//(postingID, userID, title, description, start date, end date, posting date, start location, end location, map, space left)
//
//comments (commentID, posterID, driverID, rating, description)