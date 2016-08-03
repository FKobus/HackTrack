var raspi = require('raspi-io'),
	five = require('johnny-five'),
	board = new five.Board({
		io: new raspi()
	}),
	http = require('http');

board.on('ready', function() {
	var motor1 = new five.Motor({pins:{pwm:26,dir:21}}),
		motor2 = new five.Motor({pins:{pwm:23,dir:22}});

	http.createServer(function(request, response) {
		var headers = request.headers,
			method = request.method,
			url = request.url,
			body = [];
		
		request.on('error', function(err) {
			console.error(err);
		}).on('data', function(chunk) {
			body.push(chunk);
		}).on('end', function() {
			// At this point, we have the headers, method, url and body, and can now
			// do whatever we need to in order to respond to this request.
			body = Buffer.concat(body).toString();
			console.log(body);
		});
		console.log("Server listening on: http://localhost:80");
	}).listen(8080);

	// motor1.forward(120);
	// //motor2.forward(120);
	// board.wait(10000, function() {
	// 	motor1.stop();
	// 	//motor2.stop();
	// });
});