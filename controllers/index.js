module.exports.controller = function(app, io){

	//Main SERVER ROUTE
	app.get('/', function(req, res){


		//Display message in popup window on client
		// res.render('index', { title: 'Please do not close this window' });


		console.log("server route picked up", io);
		//When a connection form the client has been established
		io.sockets.on('connection', function (socket) {


			console.log("client connected to server", socket);

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

