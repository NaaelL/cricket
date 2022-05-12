const Engine = Matter.Engine;
const Bodies = Matter.Bodies;
const World = Matter.World;
const Body = Matter.Body;

var ground, engine, world;
var bgImg, ball, radius = 40, bat, batImg, stumpsImg, ballImg
var ballsLeft = 10;


function preload() {
bgImg = loadImage ("images/background.jpg");
stumpsImg = loadImage ("images/stumps.png");
batImg = loadImage ("images/bat.png");
}

function setup() {
  canvas = createCanvas(1600, 700);
  engine = Engine.create();
  world = engine.world;

  bat = Bodies.rectangle (300, 500, 10, 50);
  World.add (world, bat);

  ball = new Ball (1400, 20, 30);  
  ground = new Ground(width / 2, height - 30, width, 20);

  // bat = createSprite (300, 600, 10, 10);
  // bat.addImage (batImg);
  // bat.scale = 0.75
  console.log (ball.body.position)
  Engine.run(engine);
}

function draw() {
  background(bgImg);
  ellipseMode(CENTER);
  //ellipse (ball.position.x, ball.position.y, radius);
  ground.display();
  ball.display();

  bat.position.y = mouseY;
  bat.position.x = mouseX;

  image (batImg, bat.position.x, bat.position.y);

  text ("Balls remaining: " + ballsLeft, 50, 50);

  if (ballsLeft == 0) {
    text ("Game Over!", width/2, height/2);
  }

  isTouching();
  drawSprites();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  if (ballsLeft >= 1) {
    if (keyCode === 32) {
	  Matter.Body.applyForce(ball.body, ball.body.position, {x:-100, y: -75});
    console.log ("working");
    ballsLeft -= 1;
	}
  }
}

function isTouching() {
  var collision = Matter.SAT.collides (bat, ball.body)
  if (collision.collided) {
	  Matter.Body.applyForce(ball.body, ball.body.position, {x:100, y:-200});
    console.log("75");
    //lifeTime = 100;
  }
}