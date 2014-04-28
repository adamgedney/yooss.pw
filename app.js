//=======================================================//
//Requires
//=======================================================//

var express         = require('express');
    fs              = require('fs'),
    http            = require('http'),
    path            = require('path'),
    favicon         = require('static-favicon'),
    logger          = require('morgan'),
    cookieParser    = require('cookie-parser'),
    bodyParser      = require('body-parser');

//App instance
var app             = express(),
    server          = http.createServer(app);

    io              = require('socket.io');

    //Global server instance
    ioServer        = io.listen(server);

    //Socket.io listen port
    server.listen(41795);


console.log("app loaded", server);











//=======================================================//
//setup configurations
//=======================================================//
app.set('port', process.env.PORT || 41794);


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));














//=======================================================//
//development error handler
//will print stacktrace
//=======================================================//
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}












//=======================================================//
//Require all controllers & run their constructors
//to listen for routes
//=======================================================//
// fs.readdirSync('./controllers').forEach(function(file){
//     if(file.substr(-3) == '.js'){
//         var route = require('./controllers/' + file);
//         route.controller(app);
//     }
// });


    app.get('/', function(req, res){

console.log("socket-events route picked up");
        //When a connection form the client has been established
        ioServer.sockets.on('connection', function (socket) {

            socket.emit('test', "test data connection opened");


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











//=======================================================//
//listen on port 3000
//=======================================================//
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});





module.exports = app;
