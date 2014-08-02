var mongoose = require('mongoose');

mongoose.connect('mongodb://lichuanr:Richard6@ds061199.mongolab.com:61199/carnex');


module.exports = mongoose.connection;
