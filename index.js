var raspi = require('raspi-io'),
	five = require('johnny-five'),
	board = new five.Board({
		io: new raspi()
	}),
	http = require('http'),
	interval = 3000,
	speed = 134;

board.on('ready', function() {
	var internet_gekkies = new five.Motor({pins:{pwm:26,dir:21}});
	var unexpectables = new five.Motor({pins:{pwm:23,dir:22}});

	internet_gekkies.stop();
	unexpectables.stop();

	http.createServer(function(request, response) {
		var headers = request.headers;
		var method = request.method;
		var url = request.url;
		var body = [];

		console.log('Ready to rumble!!');

		request.on('error', function(err) {
			console.error(err);
		}).on('data', function(chunk) {
			body.push(chunk);
		}).on('end', function() {
			// At this point, we have the headers, method, url and body, an$
			// do whatever we need to in order to respond to this request.
			body = Buffer.concat(body).toString();
			if (method == 'POST') {
				var msg = JSON.parse(body);
				if (msg.kill == true) {
					internet_gekkies.stop();
					unexpectables.stop();
				} else if (msg.hacktrack == true) {
					internet_gekkies.forward(speed + 12);
					unexpectables.forward(speed);
					interval = (msg.interval !== undefined) ? parse$
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
			}
			response.writeHead(200, {'Content-Type': 'application/json'});
			response.end();
		});
	}).listen(1337);
});