module.exports.controller = function(app){

	//Main SERVER ROUTE
	app.get('/socket-events', function(req, res){

console.log("socket-events route picked up");
		//When a connection form the client has been established
		ioServer.sockets.on('connection', function (socket) {

			console.log("connection established from client", socket);
			//========================================//
			//Receives PLAY command from client emit
			//========================================//
			socket.on('play', function (data) {
			  console.log("playOn", data);

			  //Broadcast message to listening clients
			  socket.emit('playOn', data);
			});









			//========================================//
			//Receives PAUSE command from client emit
			//========================================//
			socket.on('pause', function (data) {
			  console.log("pauseOn", data);

			  //Broadcast message to listening clients
			  socket.emit('pauseOn', data);
			});









			//========================================//
			//Receives VOLUME commands from client emit
			//========================================//
			socket.on('volume', function (data) {
			  console.log("pauseOn", data);

			  //Broadcast message to listening clients
			  socket.emit('volumeOn', data);
			});










		});//ioServer
	});//.get
};// module

