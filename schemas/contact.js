var mongoose = require('mongoose');


module.exports = mongoose.model('contact', {
	name: String,
	email: String,
	message: String
});
