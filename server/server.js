var http = require('http'),
	flights = require('./data'),
	db = require('./db'),
	app = require('./app')(flights, db);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


var connect = require('connect');
var io = require('socket.io');
var chatter = require('chatter');

	var  app2 = connect().use(connect.static('public')).listen(server);
	var chat_room = io.listen(app2);

	chatter.set_sockets(chat_room.sockets);

	chat_room.sockets.on('connection', function (socket) {
  	chatter.connect_chatter({
    socket: socket,
    username: socket.id
  	});
	});

