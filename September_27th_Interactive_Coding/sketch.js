function setup() {
  createCanvas(windowWidth, windowHeight);
  background(50);
  //noLoop();
}

function draw() {

  // initializations
  let constraint = width / 10;
  let colorToggle = true;
  let color = [random(255), 10, frameCount % 255]

  // set the center
  translate(width / 2, height / 2);
  // change the center gradually
  translate(p5.Vector.fromAngle(millis() / 1000, 80));
  
  // draw the shapes
  drawShapes(constraint, color);
}



function drawShapes(constraint, color) {
  rectMode(CENTER)
  for (let radius = 0; radius < constraint; radius++) {

    noFill();
    strokeWeight(0.5);
    stroke(...decidedColor(mouseIsPressed, color)); // stroke of different shades

    ellipse(0, 0, radius * 10, radius * 10);
    
    // drawing a square based on the outter circle
    for (let side = 0; side < radius; side++) {
      
      noFill();
      strokeWeight(0.5);
      stroke(...decidedColor(mouseIsPressed, color)); // stroke of different shades

      rect(0, 0, side * 5, side * 5);
    }
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