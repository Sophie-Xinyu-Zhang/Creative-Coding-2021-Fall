function setup() {
  createCanvas(windowWidth, windowHeight);
  background(50);
  //noLoop();
}

function draw() {

  // initializations
  let x = width / 2;
  let y = height / 2;
  let constraint = width / 10;
  rectMode(CENTER)
  let colorToggle = true;
  let color = [random(255), 10, frameCount % 255]
  
  // decide if the shapes should change colors
  if (mouseIsPressed) {
    colorToggle = !colorToggle
  }
  if(!colorToggle) {
    // toggle colors here
    color[0] = 10;
    color[1] = random(255)
  } else {
    color[0] = random(255);
    color[1] = 10
  }

  // draw the circles
  for (let radius = 0; radius < constraint; radius++) {

    noFill();
    strokeWeight(0.5);
    stroke(...color); // stroke of different shades

    ellipse(x, y, radius * 10, radius * 10);
    
    // drawing a square based on the outter circle
    for (let side = 0; side < radius; side++) {
      
      noFill();
      strokeWeight(0.5);
      stroke(...color); // stroke of different shades

      rect(x, y, side * 5, side * 5);
    }
  }
}