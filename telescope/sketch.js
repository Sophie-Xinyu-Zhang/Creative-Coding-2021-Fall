var scribble = new Scribble();              // global mode
var sizeOfCircle = 20;
// create a song
var song, amplitude;
shapeSetting = 0;
shapes = [];

function preload() {
  song = loadSound('./mrbluesky.mp4');
}

function setup() {
  createCanvas(800, 800);
  // Import in song

  scribble.bowing = 0.2;          // changes the bowing of lines
  scribble.roughness = 0.8;       // changes the roughness of lines
  scribble.maxOffset = 0.5;       // coordinates will get an offset, here you define the max offset
  scribble.numEllipseSteps = 0.5; // defines how much curves will be used to draw an ellipse
  amplitude = new p5.Amplitude();

  // Create 10 scribbles and append to the array
  for (let i = 0; i < 10; i++) {
    shapes.push(new ScribbleShape(random(width), random(height)));
  }
  song.play();
}

function draw() {
  background(255);
  // If the song is not playing play it
  if (!song.isPlaying()) {
    song.play();
  }
  strokeWeight( 3 );
  // If the mouse is on the top half of the screen, draw a circle
  if (mouseY < height/2) {
    scribble.scribbleEllipse(mouseX, mouseY, sizeOfCircle, sizeOfCircle);
  }
  // If the mouse is on the bottom half of the screen, draw a rectangle
  else {
    scribble.scribbleRect(mouseX, mouseY, sizeOfCircle, sizeOfCircle);
  }

  // If the mouse is on the top left quarter of the screen, set the color to be blue
  if (mouseX < width/2 && mouseY < height/2) {
    stroke(0, 0, 255);
  }
  // If the mouse is on the top right quarter of the screen, set the color to be red
  else if (mouseX > width/2 && mouseY < height/2) {
    stroke(255, 0, 0);
  }
  // If the mouse is on the bottom left quarter of the screen, set the color to be green
  else if (mouseX < width/2 && mouseY > height/2) {
    stroke(0, 255, 0);
  }
  // If the mouse is on the bottom right quarter of the screen, set the color to be yellow
  else if (mouseX > width/2 && mouseY > height/2) {
    stroke(255, 255, 0);
  }

  // Change the size of the circle depending how loud the song is
  let level = amplitude.getLevel();
  sizeOfCircle = map(level, 0, 1, 20, 500);

  scribble.scribbleRoundedRect(width/2, height/2, width, height,10);

  // Draw the shapes
  for (let i = 0; i < shapes.length; i++) {
    shapes[i].draw();
  }

}

function keyPressed() {
  // if the space bar is pressed add a new shape
  if (keyIsPressed && keyCode === 32) {
    if (shapes.length > 10) {
      // Pop off 9 times to make the array a size of 1
      for (let i = 0; i < 10; i++) {
        shapes.pop();
      }
    }
    else{
      shapes.push(new ScribbleShape(mouseX, mouseY));
    }
  }
}

// When the mouse is pressed, increase the size of the circle
function mousePressed() {
  if (!song.isPlaying()) {
    song.play();
  }
  // Loop through the shapes and randomize their x, y
  for (let i = 0; i < shapes.length; i++) {
    shapes[i].randomize();
  }
  shapeSetting++;
  if (shapeSetting >= 2) {
    shapeSetting = 0;
  }
}

// Create a class to draw scribble shapes
class ScribbleShape {
  // Constructor that takes in a random x, y
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.randomizer=random(1, 10)
  }
  // Draws an ellipse at the x, y coordinates
  draw(){
    // If the shape setting is 0, draw an ellipse
    if (shapeSetting === 0) {
    scribble.scribbleEllipse(this.x, this.y, sizeOfCircle*this.randomizer, sizeOfCircle*this.randomizer);
    }
    // If the shape setting is 1, draw a rectangle
    else if (shapeSetting === 1) {
    scribble.scribbleRect(this.x, this.y, sizeOfCircle*this.randomizer, sizeOfCircle*this.randomizer);
    }
  }
  randomize(){
    this.x = random(width);
    this.y = random(height);
    this.randomizer=random(1, 10)
  }
}