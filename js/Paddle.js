define(["Kinetic"], function(Kinetic) {
  Kinetic.Paddle = function(config) {
    this._initPaddle(config);
  };
  Kinetic.Paddle.prototype = {
    _initPaddle: function(config) {
      Kinetic.Rect.call(this, config);
    },
  };
  Kinetic.Util.extend(Kinetic.Paddle, Kinetic.Rect);

  return new Kinetic.Paddle({
    width:200,
    height:30,
    x:0, y:0,
    fill: 'red',
    stroke: 'black',
    strokeWidth:4,
    draggable: true
  });
});
