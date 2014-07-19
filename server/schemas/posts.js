var mongoose = require('mongoose');



module.exports = mongoose.model('posts', {
	from: String,
	to: String,
	startdate: Date,
	returndate: Date,
	description: String, 
	username: String,
	sLoc_lat: Number,
	sLoc_lon: Number,
	dest_lat: Number,
	dest_lon: Number
});
