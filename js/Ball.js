define(["Kinetic", "pubsub"], function(Kinetic, pubsub) {
  Kinetic.Ball = function(config) {
    this.__init_ball(config);
  };
  Kinetic.Ball.prototype = {
    __init_ball: function(config) {
      config.fill='blue';
      config.stroke='black';
      config.strokeWidth=4;
      config.radius=15;
      Kinetic.Circle.call(this, config);
      this.className = "Ball";
      this.dx = -2;
      this.dy = -2;
      setInterval(this.move_ball.bind(this), 16);
    },
    move_ball: function() {
      this.move({x:this.dx, y:this.dy});
      pubsub.publish('ball.moved', {ball:this});
    },
  };
  Kinetic.Util.extend(Kinetic.Ball, Kinetic.Circle);

  return Kinetic.Ball;
});
