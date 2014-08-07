
//module.exports = function(){

// Load the twilio module
var twilio = require('twilio');
// Create a new REST API client to make authenticated requests against the
// twilio back end
var client = new twilio.RestClient('ACadc16280c49b63e42858d56e6f77c5fe', '90e593855e19bed6034db72ff9008b39');
// Pass in parameters to the REST API using an object literal notation. The
// REST client will handle authentication and response serialzation for you.
client.sms.messages.create({
    to:'+14162774212',
    from:'+16475575192',
    body:'Thank you for signing up with CarNex'
}, function(error, message) {
    // The HTTP request to Twilio will run asynchronously. This callback
    // function will be called when a response is received from Twilio
    // The "error" variable will contain error information, if any.
    // If the request was successful, this value will be "falsy"
    if (!error) {
        // The second argument to the callback will contain the information
        // sent back by Twilio for the request. In this case, it is the
        // information about the text messsage you just sent:
        console.log('Success! The SID for this SMS message is:');
        console.log(message.sid);
        console.log('Message sent on:');
        console.log(message.dateCreated);
    } else {
        console.log('Oops! There was an error.');
    }
});
