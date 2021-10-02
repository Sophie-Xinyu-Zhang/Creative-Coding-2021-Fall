let img;

function preload() {
  img = loadImage('speaker.jpg')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(50);
  //noLoop();
}

function draw() {

  // initializations
  let constraint = width / 10;
  let colorToggle = true;
  let color = [random(255), 10, frameCount % 255];
  let speed = 1000;
  let vec_rad = 80;
  
  // animate the center
  motion(speed, vec_rad);
  
  // draw the shapes
  drawShapes(constraint, color, img);
}
function motion(speed, vec_rad) {
  // set the center
  translate(width / 2, height / 2);
  // change the center gradually
  translate(p5.Vector.fromAngle(millis() / speed, vec_rad));
}



function drawShapes(constraint, color, img) {
  imageMode(CENTER)
  for (let radius = 0; radius < constraint; radius++) {

    noFill();
    strokeWeight(0.5);
    stroke(...decidedColor(mouseIsPressed, color)); // stroke of different shades

    ellipse(0, 0, radius * 10, radius * 10);
    
    // position & rotate the image and resize the image
    rotate(PI / 16.0);
    image(img, 0, 0, 200, 200)
  }
}

function decidedColor(mousePressed, color) {
  if (!mousePressed) {
    // toggle colors here
    color[0] = 10;
    color[1] = random(255)
  } else {
    color[0] = random(255);
    color[1] = 10
  }
  return color
}