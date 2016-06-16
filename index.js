var Gpio = require('onoff').Gpio,
	track_1 = new Gpio(4, 'out'),
	i = 10;

while(i > 0) {
	track_1.writeSync(1);
	i--;
}