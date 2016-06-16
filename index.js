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

	if (i > 0) {
		i--;
		if (what == 1) {
			setTimeout(run, interval/interval);
		} else {
			setTimeout(run, interval);
		}
	} else {
		track_1.writeSync(0);
		console.log('OK DOEI!');
	}
}

