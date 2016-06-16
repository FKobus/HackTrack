var Gpio = require('onoff').Gpio,
	track_1 = new Gpio(4, 'out'),
	i = 1000;

while(i > 0) {
	track_1.writeSync((n === 0 || !!(n && !(n%2))) ? 1 : 0);	
	i--;
}
track_1.writeSync(0);