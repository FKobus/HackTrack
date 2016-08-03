var raspi = require('raspi-io'),
	five = require('johnny-five'),
	board = new five.Board({
		io: new raspi()
	}),
	http = require('http');

board.on('ready', function() {
	var motor1 = new five.Motor({
		pins: {
			pwm: 26,
			dir: 21
		}
	});

	var motor2 = new five.Motor({
		pins: {
			pwm: 23,
			dir: 22
		}
	});

	//We need a function which handles requests and send response
	function handleRequest(request, response) {
		console.log(request);
		response.end('It Works!! Path Hit: ' + request.url);
	}

	//Create a server
	var server = http.createServer(handleRequest);

	//Lets start our server
	server.listen(80, function(){
		//Callback triggered when server is successfully listening. Hurray!
		console.log("Server listening on: http://localhost:80");
	});


	// motor1.forward(120);
	// //motor2.forward(120);
	// board.wait(10000, function() {
	// 	motor1.stop();
	// 	//motor2.stop();
	// });
});