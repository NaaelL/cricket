const Engine = Matter.Engine;
const Bodies = Matter.Bodies;
const World = Matter.World;
const Body = Matter.Body;

var ground, engine, world;
var bgImg, ball, radius = 40, bat, batImg, stumpsImg, ballImg, balls = [];
var ballsLeft = 10, score = 0;


function preload() {
bgImg = loadImage ("images/background.jpg");
stumpsImg = loadImage ("images/stumps.png");
batImg = loadImage ("images/bat.png");
}

function setup() {
  canvas = createCanvas(1600, 700);
  engine = Engine.create();
  world = engine.world;

  var opt = {
    density: 1.7
  }
  bat = Bodies.rectangle (300, 500, 10, 50, opt);
  World.add (world, bat);

  ground = new Ground(width / 2, height - 30, width, 20);

  // bat = createSprite (300, 600, 10, 10);
  // bat.addImage (batImg);
  // bat.scale = 0.75
  // console.log (ball.body.position)
  Engine.run(engine);
}

function draw() {
  background(bgImg);
  ellipseMode(CENTER);
  //ellipse (ball.position.x, ball.position.y, radius);
  ground.display();
  //ball.display();
  for (var i = 0; i < balls.length; i++) {
    if (balls [i] != undefined) {
      /*if (Matter.Collision.collides (balls [i].body, bat) != null) {
        console.log("collision");
      }*/
      
      balls [i].display();
      
      var collision = Matter.SAT.collides (bat, balls [i].body)
      if (collision.collided) {
        score += 1;
        Matter.Body.applyForce(balls [i].body, balls [i].body.position, {x:100, y:-200});
      }
      var posX = balls [i].body.position.x;
      var posY = balls [i].body.position.y;

      if (posX > width || posY > height) {
        if (!balls [i].isRemoved) {
          balls [i].remove(i)
        }
      }
    }
  }
  
  

  bat.position.y = mouseY;
  bat.position.x = mouseX;

  image (batImg, bat.position.x, bat.position.y);

  text ("Balls remaining: " + ballsLeft, 50, 50);
  text ("Score = " + score, 1000, 50);

  if (ballsLeft == 0) {
    textSize (40);
    text ("Game Over!", width/2, height/2);
  }

  //isTouching();
  drawSprites();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  if (ballsLeft >= 1) {
    if (keyCode === 32) {
    ball = new Ball (1400, 650, 30);
	  Matter.Body.applyForce(ball.body, ball.body.position, {x:-100, y: -75});
    balls.push(ball);
    ballsLeft -= 1;
	}
  }
}

function isTouching() {
  var collision = Matter.collision.collides (bat, ball.body)
  if (collision.collided) {
	  Matter.Body.applyForce(ball.body, ball.body.position, {x:100, y:-200});
    console.log("75");
    ball.remove();
  }
}

