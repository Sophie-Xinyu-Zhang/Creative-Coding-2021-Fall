
let color = 255;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220, 20, 20);
  fill(200, color, 10);
  noStroke()
  ellipse(width / 2, height / 2, 100, 100);
}

function mouseMoved() {
  color -= 4;
  if (color <= 20) {
    color = 255;
  }
}