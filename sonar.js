var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  var proximity = new five.Proximity({
    controller: "HCSR04",
    pin: 7
  });

  proximity.on("data", function() {
    console.log(this.cm + "cm");
  });

  // proximity.on("change", function() {
  //   console.log("The obstruction has moved.");
  // });
});