module.exports.controller = function(app, io){


	//When a connection form the client has been established
	io.sockets.on('connection', function (socket) {


		console.log("client connected to server");


		//========================================//
		//Receives CREATEROOM event from client emit
		//========================================//
		socket.on('createRoom', function (data) {
		  console.log("createRoom", data);

		  //Stringify userId
		  var room = data + "";

		  //Create a room for this userid
		  socket.room = room;

		  //Add room to list of rooms
		  rooms.push(room);

		  //Broadcast message to listening clients in room
		  socket.broadcast.to(room).emit('roomCreated', room);

		  //Emit wildcard for testing
		  socket.broadcast.to(room).emit('*', data);
		});









		//========================================//
		//Receives JOINROOM event from client emit
		//========================================//
		socket.on('joinRoom', function (data) {
		  console.log("joinRoom", data);

		  //Stringify userId
		  var room = data + "";

		  //Join user this user's room
		  socket.join(room);

		  console.log(io.sockets.manager.rooms, "does room exist?", io.sockets.clients(room), "clients in room");

		  //Broadcast message to listening clients in room
		  socket.broadcast.to(room).emit('roomJoined', data);

		  //Emit wildcard for testing
		  socket.broadcast.to(room).emit('*', data);
		});












		//========================================//
		//Receives PLAY event from client emit
		//========================================//
		socket.on('play', function (data) {
		  console.log("playOn", data);

		  //Stringify userId
		  var room = data.userId + "";

		  //Broadcast message to listening clients in room
		  socket.broadcast.to(room).emit('playOn', data);

		  //Emit wildcard for testing
		  socket.broadcast.to(room).emit('*', data);
		});









		//========================================//
		//Receives PAUSE event from client emit
		//========================================//
		socket.on('pause', function (data) {
		  console.log("pauseOn", data);

		  //Stringify userId
		  var room = data.userId + "";

		  //Broadcast message to listening clients in room
		  socket.broadcast.to(room).emit('pauseOn', data);

		  //Emit wildcard for testing
		  socket.broadcast.to(room).emit('*', data);
		});









		//========================================//
		//Receives VOLUME event from client emit
		//========================================//
		socket.on('volume', function (data) {
		  console.log("volume", data);

		  //Stringify userId
		  var room = data.userId + "";

		  //Broadcast message to listening clients
		  socket.broadcast.to(room).emit('volumeOn', data);

		  //Emit wildcard for testing
		  socket.broadcast.to(room).emit('*', data);
		});









		//========================================//
		//Receives seekUpdate event from client emit
		//========================================//
		socket.on('seekUpdate', function (data) {
		  console.log("seekUpdate", data);

		  //Stringify userId
		  var room = data.userId + "";

		  //Broadcast message to listening clients
		  socket.broadcast.to(room).emit('seekUpdateOn', data);

		  //Emit wildcard for testing
		  socket.broadcast.to(room).emit('*', data);
		});








		//========================================//
		//Receives seekTo event from client emit
		//========================================//
		socket.on('seekTo', function (data) {
		  console.log("seekTo", data);

		  //Stringify userId
		  var room = data.userId + "";

		  //Broadcast message to listening clients
		  socket.broadcast.to(room).emit('seekToOn', data);

		  //Emit wildcard for testing
		  socket.broadcast.to(room).emit('*', data);
		});











		//========================================//
		//Receives DISCONNECT event from client emit
		//========================================//
		socket.on('discon', function (data) {
		  console.log("disconnect", data);

		  //Stringify userId
		  var room = data + "";

		  //Indicated the client was refreshed.
		  //Leave room and re enter
		  socket.leave(room);

		  // io.sockets.in(socket.room).leave(socket.room);
		  //Broadcast message to listening clients
		  // socket.emit('playOn', data);

		  //Emit wildcard for testing
		  socket.broadcast.to(room).emit('*', data);
		});










	});//ioServer
};// module

