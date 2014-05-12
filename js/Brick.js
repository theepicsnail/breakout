define(["Kinetic", "pubsub"], function(Kinetic, pubsub) {
  var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];

  function getColor(points) {
      return colors[(points-1) % 6];
  }

  Kinetic.Brick = function(config) {
    this._initBrick(config);
  };
  Kinetic.Brick.prototype = {
    _initBrick: function(config) {
      this.points = config.points;
      config.fill=getColor(config.points);
      config.stroke='black';
      config.strokeWidth=4;
      Kinetic.Rect.call(this, config);
    },
    hit: function() {
      if (this.points>0) {
        this.points -= 1;
        this.setFill(getColor(this.points));

        pubsub.publish("points.add", {val:1});
        if (this.points === 0) {
          this.destroy();
          pubsub.publish("brick.destroy", {brick: this});
        }
      }
    }
  };
  Kinetic.Util.extend(Kinetic.Brick, Kinetic.Rect);

  return Kinetic.Brick;
});
