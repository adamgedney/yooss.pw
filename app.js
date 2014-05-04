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
    server          = http.createServer(app),

    io              = require('socket.io').listen(server);

    io.set( 'origins', '*yootunes.com*:*' );
    //Socket.io listen port
    server.listen(3000);













//=======================================================//
//Express setup configurations
//=======================================================//
app.set('port', process.env.PORT || 3001);


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
//Require all event handler files in handlers folder
//=======================================================//
fs.readdirSync('./handlers').forEach(function(file){
    if(file.substr(-3) == '.js'){
        var route = require('./handlers/' + file);
        route.controller(app, io);
    }
});











//=======================================================//
//listen on port
//=======================================================//
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});





module.exports = app;
