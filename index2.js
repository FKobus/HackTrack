var raspi = require('raspi-io');
var five = require('johnny-five');
var board = new five.Board({
  io: new raspi()
});

board.on('ready', function() {
  console.log('READY');

  var motor1 = new five.Motor({
    pins: {
      pwm: 26,
      dir: 21
    }
  });

  var motor2 = new five.Motor({
    pins: {
      pwm: 23,
      dir: 22
    }
  });

  motor1.forward(100);
  motor2.forward(100);
  board.wait(2000, function() {
    motor1.stop();
    motor2.stop();

  });
});