const Engine = Matter.Engine;
const Bodies = Matter.Bodies;
const World = Matter.World;
const Body = Matter.Body;

var ground, engine, world;
var bgImg, ball, radius = 40, bat, batImg, stumpsImg

function preload() {
bgImg = loadImage ("images/background.jpg");
stumpsImg = loadImage ("images/stumps.png");
batImg = loadImage ("images/bat.png");
}

function setup() {
  canvas = createCanvas(1600, 700);
  engine = Engine.create();
  world = engine.world;
  
  var options = {
		isStatic: false,
		restitution: 0.5,
		friction: 0,
		density: 0.5
	}
  ball = Bodies.circle (1400, 20, radius, options);
	World.add (world, ball);

  bat = Bodies.rectangle (300, 500, 10, 50);
  World.add (world, bat);
  
  ground = new Ground(width / 2, height - 30, width, 20);

  // bat = createSprite (300, 600, 10, 10);
  // bat.addImage (batImg);
  // bat.scale = 0.75
  
  Engine.run(engine);
}

function draw() {
  background(bgImg);
  ellipseMode(CENTER);
  ellipse (ball.position.x, ball.position.y, radius);
  ground.display();

  bat.position.y = mouseY;
  bat.position.x = mouseX;

  image (batImg, bat.position.x, bat.position.y);

  isTouching();
  drawSprites();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
	if (keyCode === 32) {
	  Matter.Body.applyForce(ball, ball.position, {x:-150, y:215});
	}
}

function isTouching() {
  var collision = Matter.SAT.collides (bat, ball)
  if (collision.collided) {
	  Matter.Body.applyForce(ball, ball.position, {x:100, y:-200});
    console.log("71");
  }
}