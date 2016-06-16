var Gpio = require('onoff').Gpio,
	track_1 = new Gpio(4, 'out'),
	i = 1000;

setTimeout(run, 10);


function run() {
	track_1.writeSync((i === 0 || !!(i && !(i%2))) ? 1 : 0);

	if (i > 0) {
		i--;
		setTimeout(run, 10);
	} else {
		track_1.writeSync(0);
		console.log('OK DOEI!');
	}
}

