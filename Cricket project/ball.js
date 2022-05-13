class Ball {

    constructor (x, y, r) {
        var options = {
            isStatic: false,
            restitution: 0.5,
            friction: 0,
            density: 0.5
        }

        // this.x = x
        // this.y = y
        // this.r = r

        this.ballImg = loadImage ("images/ball.png");
    
        this.body = Bodies.circle (x, y, r, options);
        World.add (world, this.body);

    }
    display () {
        var pos = this.body.position
        push ();
        //translate (pos.x, pos.y)
        imageMode (CENTER);
        image (this.ballImg, pos.x, pos.y);
        pop ();

    }
    remove (index) {
        this.isRemoved = true;
        Matter.World.remove(world, this.body);
        delete balls[index];
    }

}


