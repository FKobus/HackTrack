var Gpio = require('onoff').Gpio,
	track_1 = new Gpio(4, 'out'),
	track_2 = new Gpio(17, 'out'),
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
	var what = (laps === 0 || !!(laps && !(laps%2))) ? 1 : 0,
		the_interval = ((what == 1) ? on_interval : off_interval);
	track_1.writeSync(what);
	track_2.writeSync(what);
	console.log('running', laps, what);
	if (laps > 0) {
		laps--;
		setTimeout(run, the_interval);
	} else {
		track_1.writeSync(0);
		console.log('OK DOEI!');
	}
}