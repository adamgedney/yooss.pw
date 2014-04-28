module.exports.controller = function(app, io){

	//Main SERVER ROUTE
	app.get('/', function(req, res){

		var rooms = [];


		console.log("server route picked up");
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
			});




			//========================================//
			//Receives JOINROOM event from client emit
			//========================================//
			socket.on('joinRoom', function (data) {
			  console.log("joinRoom", data);

			  //Stringify userId
			  var room = data + "";

			  //Join user this user's room
			  var join = socket.join(room);

			  console.log( socket.rooms, "does room exist?");

			  //Broadcast message to listening clients in room
			  // socket.broadcast.to(room).emit('roomJoined', join);
			});










			//========================================//
			//Receives PLAY event from client emit
			//========================================//
			socket.on('play', function (data) {
			  console.log("playOn", data);

			  //Broadcast message to listening clients in room
			  socket.broadcast.to(data.userId).emit('playOn', data);
			});









			//========================================//
			//Receives PAUSE event from client emit
			//========================================//
			socket.on('pause', function (data) {
			  console.log("pauseOn", data);

			  //Broadcast message to listening clients in room
			  socket.broadcast.to(data.userId).emit('pauseOn', data);
			});









			//========================================//
			//Receives VOLUME event from client emit
			//========================================//
			socket.on('volume', function (data) {
			  console.log("pauseOn", data);

			  //Broadcast message to listening clients
			  socket.broadcast.emit('volumeOn', data);
			});









			//========================================//
			//Receives DISCONNECT event from client emit
			//========================================//
			socket.on('discon', function (data) {
			  console.log("disconnect", data);

			  socket.leave(data);

			  // io.sockets.in(socket.room).leave(socket.room);
			  //Broadcast message to listening clients
			  // socket.emit('playOn', data);
			});










		});//ioServer
	});//.get
};// module

