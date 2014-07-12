var mongoose = require('mongoose');

mongoose.connect('mongodb://flights:Richard6@ds051459.mongolab.com:51459/flights');

module.exports = mongoose.connection;