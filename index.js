var Gpio = require('onoff').Gpio,
	track_1 = new Gpio(4, 'out'),
	laps = 50,
	off_interval = 1000,
	on_interval = 10;

console.log('OK HOI!');

process.argv.forEach(function (val, index, array) {
  if (index == 2 && val != '') {
  	laps = val;
  }
  if (index == 3 && val != '') {
  	on_interval = val;
  }
  if (index == 4 && val != '') {
  	off_interval = val;
  }
});

run();

function run() {
	var what = (i === 0 || !!(i && !(i%2))) ? 1 : 0,
		the_interval = ((what == 1) ? on_interval : off_interval);
	track_1.writeSync(what);
	console.log('running', i, what);
	if (i > 0) {
		i--;
		setTimeout(run, the_interval);
	} else {
		track_1.writeSync(0);
		console.log('OK DOEI!');
	}
}