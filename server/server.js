var http = require('http'),
	flights = require('./data'),
	db = require('./db'),
	app = require('./app')(flights, db);
var connect = require('connect');
var io = require('socket.io');
var chatter = require('chatter');



var server = http.createServer(app);
//io = io.listen(server);

//var  app2 = connect().use(connect.static('public')).listen(server);
var chat_room = io.listen(server);
chatter.set_sockets(chat_room.sockets);


console.log(app.get('username'));
chat_room.sockets.on('connection', function (socket) 
{
  	chatter.connect_chatter
  	({
    socket: socket,
    username: app.get('username')
  	});
});



server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});






