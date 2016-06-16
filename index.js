var Gpio = require('onoff').Gpio,
	track_1 = new Gpio(4, 'out'),
	i = 20,
	interval = 20;

console.log('OK HOI!');

process.argv.forEach(function (val, index, array) {
  if (index == 2 && val != '') {
  	console.log(val);
  	interval = val;
  }
});

setTimeout(run, interval);


function run() {
	console.log(interval);
	var what = (i === 0 || !!(i && !(i%2))) ? 1 : 0,
		new_interval = (interval/(what*1000));
	track_1.writeSync(what);
	console.log(what, new_interval);

	if (i > 0) {
		i--;
		setTimeout(run, new_interval);
	} else {
		track_1.writeSync(0);
		console.log('OK DOEI!');
	}
}

