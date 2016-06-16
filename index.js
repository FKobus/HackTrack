var Gpio = require('onoff').Gpio,
	track_1 = new Gpio(4, 'out'),
	i = 1000;

while(i > 0) {
	track_1.writeSync((i === 0 || !!(i && !(i%2))) ? 1 : 0);	
	i--;
}
track_1.writeSync(0);