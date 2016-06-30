var raspi = require('raspi-io');
var five = require('johnny-five');
var board = new five.Board({
  io: new raspi()
});

board.on('ready', function() {
  console.log('READY');

  var motor1 = new five.Motor({
    pins: {
      pwm: 12,
      dir: 5
    }
  });

  var motor2 = new five.Motor({
    pins: {
      pwm: 13,
      dir: 6
    }
  });

  motor1.forward(10);
  motor2.forward(10);
});