/*global define*/
"use strict";

/*
 * App serves as the hub that connects each of the pieces
 */
define(["Kinetic", "Stage",  "Paddle", "Brick", "Ball", "pubsub"],
  function (Kinetic, Stage, Paddle, Brick, Ball, pubsub) {

    var bricks = [];
    var player;
    var ball;
    var layer = new Kinetic.Layer();

    function load() {
      var cols = 36, rows = 8;
      var gap = 10;
      var width = (Stage.attrs.width-gap*(cols+1)) / (cols);
      var height = (Stage.attrs.height) / (rows*6);
      for(var i = 0 ; i < cols ; i ++)
      for(var j = 0 ; j < rows ; j ++) {
        var b = new Brick({
          x:(gap + width)*i + gap,
          y:(gap + height)*j + gap + Stage.attrs.height/6,
          width: width,
          height:height,
          points: (103-j)%6+1,
          name:"brick",
          id:i*rows + j
        });
        layer.add(b);
      }

      layer.add(new Ball({
        x:Stage.attrs.width/2,
        y:Stage.attrs.height*4/4,
        dx:0,
        dy:-1,
      }));
      // add the shape to the layer
      layer.add(Paddle);
      Stage.add(layer);
    }

    /*
     * starting the App adds each of the layers to the stage
     *
     */
    function start() {
      pubsub.subscribe("ball.moved", update);
      pubsub.subscribe("brick.destroy", update);
      pubsub.subscribe("ball.moved", check_collision);
    }

    function collides(rect, circle) {
      var dx = (circle.x - (rect.x + rect.width/2))*2/rect.width;
      var dy = (circle.y - (rect.y + rect.height/2))*2/rect.height;

      // ball is past the bounds of the rect
      if(Math.abs(dx) > 1)
        return false;

      if(Math.abs(dy) > 1)
        return false;
      // dx, dy = [-1, 1]
      //
      //  \ A  /
      //   \  /
      // D  \/ B
      //    /\
      //   /  \
      //  / C  \
      //
      var TL = (0<dy+dx);
      var TR = (0<dy-dx);
      //var A = TL & TR
      //var B = TL &~TR
      //var C =~TL &~TR
      //var D =~TL & TR

      // Vertical flips on A | C
      // TL == TR

      if (TL == TR)
        return {x:1, y:-1};
      else
        return {x:-1, y:1};
    }

    function check_collision(channel, args) {
      var found = false;
      layer.get(".brick").each(function(brick){
        if(found) return;

        var res = collides(brick.attrs, args.ball.attrs);
        if (res !== false)
        {
          args.ball.dx *= res.x;
          args.ball.dy *= res.y;
          // console.log(brick.attrs, args.ball.attrs);
          brick.hit();
          found = true;
        }
      });

      var res = collides(Paddle.attrs, args.ball.attrs);
      if (res !== false)
      {
        args.ball.dx *= res.x;
        args.ball.dy *= res.y;
      }


    }

    function update() {
      layer.draw();
    }

    /*
     * public exports
     */
    return {
      load: load,
      start: start
    };
  });
