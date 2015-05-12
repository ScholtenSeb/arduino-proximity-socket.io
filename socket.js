var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var port = 80;

server.listen(port,function(){
	console.log('listening');
});

app.get('/', function(req,res){
	res.sendFile(__dirname + '/index.html');
});

var five = require("johnny-five");
var board = new five.Board();

var distance;

board.on("ready", function() {
  var proximity = new five.Proximity({
    controller: "HCSR04",
    pin: 7
  });
  proximity.on("data", function() {
    distance = this.cm;
  });
});

io.on('connection', function (socket) {
  socket.emit('news', { distance: distance });
  socket.on('returnEvent', function (data) {
      socket.emit('news', { distance: distance });
  });
});
