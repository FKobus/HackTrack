var raspi = require('raspi-io');
var five = require('johnny-five');
var board = new five.Board({
	io: new raspi()
});
var http = require('http');
var interval = 6000;
var speed = 134;
var offset = 16;

board.on('ready', function() {
	var internet_gekkies = new five.Motor({pins:{pwm:26,dir:21}});
	var unexpectables = new five.Motor({pins:{pwm:23,dir:22}});

	internet_gekkies.stop();
	unexpectables.stop();

	console.log('Ready to rumble!!');

	http.createServer(function(request, response) {
		var headers = request.headers;
		var method = request.method;
		var url = request.url;
		var body = [];

		

		request.on('error', function(err) {
			console.error(err);
		}).on('data', function(chunk) {
			body.push(chunk);
		}).on('end', function() {
			// At this point, we have the headers, method, url and body, and
			// do whatever we need to in order to respond to this request.
			body = Buffer.concat(body).toString();
			if (method == 'POST') {
				try {
					var msg = JSON.parse(body);
					if (msg.kill == true) {
						internet_gekkies.stop();
						unexpectables.stop();
					} else if (msg.hacktrack == true) {
						internet_gekkies.forward(speed + offset);
						// setTimeout(function () {
						// 	unexpectables.forward(speed + offset)
						// }, 300)
						unexpectables.forward(speed + offset)
						interval = (msg.interval !== undefined) ? parseInt(msg.interval) : 30000;
						board.wait(interval, function() {
							internet_gekkies.stop();
							unexpectables.stop();
						});
					} else if (msg.highlight == 'accepted') {
						var project_id = parseInt(msg.project.id);
						if (project_id == 1435890) {
							console.log('InternetGekkies!!');
							internet_gekkies.forward(speed);
							board.wait(interval, function() {
								internet_gekkies.stop();
							});
						} else if (project_id == 1547353) {
							console.log('Unexpectables');
							unexpectables.forward(speed);
							board.wait(interval, function() {
								unexpectables.stop();
							});
						}
					}
					response.writeHead(200, {'Content-Type': 'application/json'});
					response.end();
				} catch (e) {
					response.writeHead(200, {
						'Content-Type': 'text/plain'
					});
					response.write('<h1>NOOB</h1>')
					response.end();
				}
			}
		});
	}).listen(1337);
});