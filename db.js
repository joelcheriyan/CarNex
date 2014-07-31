var mongoose = require('mongoose');


mongoose.connect('mongodb://Jason:123@ds053439.mongolab.com:53439/carnex');

module.exports = mongoose.connection;
