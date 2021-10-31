let inconsolata;
let textArray;
let fontOptions;
let akronim;
let incon;
function preload() {
  inconsolata = loadFont('inconsolata.ttf');
  akronim = loadFont('Akronim.ttf');
  fontOptions = {
    inconsolata,
    akronim
  } // initializing the font object
}
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  textSize(width / 3);
  textAlign(CENTER, CENTER);
  textArray = [];
  incon = true;
}
function draw() {
  // check which font to use based on 
  // whether the mouse is pressed or not
  if (incon) {
    current = fontOptions.inconsolata
  } else {
    current = fontOptions.akronim
  }
  // setting the font
  textFont(current);
  background(218, 168, 155);
  fill(190, 237, 170);
  rotateText()
  text(textArray.join(''), 0, 0);
}

// functiont to rotate the text based on time
function rotateText() {
  let time = millis();
  rotateX(time / 1000);
  rotateZ(time / 1234);
}

// store the user input into the text array
// delete if backspace is triggered
function keyPressed() {
  if (key >= 'a' && key <= 'z') {
    textArray.push(key)
  } else if (key == 'Backspace') {
    textArray.splice(textArray.length - 1)
  }
}

// change the font based on mouse input
function mousePressed() {
  incon = !incon
}