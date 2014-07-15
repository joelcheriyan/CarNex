var mongoose = require('mongoose');


//map unsolved
module.exports = mongoose.model('posts', {
	title: String,
	startdate: Date,
	returndate: Date,
	description: String
});
