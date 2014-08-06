var mongoose = require('mongoose');


module.exports = mongoose.model('report', {
	username: String,
	reporting_name: String
});
