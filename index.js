var raspi = require('raspi-io'),
	five = require('johnny-five'),
	board = new five.Board({
		io: new raspi()
	}),
	http = require('http'),
	interval = 5000;

board.on('ready', function() {
	var internet_gekkies = new five.Motor({pins:{pwm:26,dir:21}}),
		unexpectables = new five.Motor({pins:{pwm:23,dir:22}});

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
			console.log(method);
			var msg = JSON.parse(body);
			
			if (msg.highlight == 'accepted') {
				var project_id = parseInt(msg.project.id);
				if (project_id == 1435890) {
					internet_gekkies.forward(120);
					board.wait(interval, function() {
						internet_gekkies.stop();
					});
				} else if (project_id == 1547353) {
					unexpectables.forward(120);
					board.wait(interval, function() {
						unexpectables.stop();
					});
				}
			}
			response.writeHead(200, {'Content-Type': 'application/json'});
			response.end();
		});
	}).listen(80);
});