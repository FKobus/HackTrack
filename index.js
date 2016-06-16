var Gpio = require('onoff').Gpio,
	track_1 = new Gpio(4, 'out'),
	i = 20,
	interval = 1000;

console.log('OK HOI!');

process.argv.forEach(function (val, index, array) {
  if (index == 2 && val != '') {
  	console.log(val);
  	interval = val;
  }
});

setTimeout(run, interval);


function run() {
	var what = (i === 0 || !!(i && !(i%2))) ? 1 : 0;
	track_1.writeSync(what);
	console.log('running', i, what);

	if (i > 0) {
		i--;
		if (what == 1) {
			var new_interval = interval/interval;
		} else {
			var new_interval = interval;
		}
		setTimeout(run, new_interval);
	} else {
		track_1.writeSync(0);
		console.log('OK DOEI!');
	}
}

