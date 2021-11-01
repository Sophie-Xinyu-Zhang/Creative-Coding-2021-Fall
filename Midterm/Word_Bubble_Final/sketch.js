let words = ['hi', 'hi', 'hello', 'hello', 'hello', 'hello', 'hello', 'hello', 'mm', 'hh', 'hh', 'hh', 'hh'];
// Create a list of censored words
const censoredWords = ['fuck', 'shit', 'ass', 'bitch'];

let wordMap = {};
let spring = 0.05;
let gravity = 0.07;
let friction = -0.9;
let bubbles = [];
let numBubbles = bubbles.length;

// define the bubble class
class Bubble {
  // create a bubble instance
  constructor(xin, yin, din, idin, oin, key) {
    this.x = xin;
    this.y = yin;
    this.vx = 0;
    this.vy = 0;
    this.diameter = din;
    this.id = idin;
    this.others = oin;
    this.word = key
    this.color = color(random(255), random(255), random(255));
  }
  
  // the collide function that make the bubbles bounce
  collide() {
    for (let i = 0; i < this.others.length; i++) {
      let dx = this.others[i].x - this.x;
      let dy = this.others[i].y - this.y;
      let distance = sqrt(dx * dx + dy * dy);
      let minDist = this.others[i].diameter / 2 + this.diameter / 2;
      if (distance < minDist) {
        //console.log("2");
        let angle = atan2(dy, dx);
        let targetX = this.x + cos(angle) * minDist;
        let targetY = this.y + sin(angle) * minDist;
        let ax = (targetX - this.others[i].x) * spring;
        let ay = (targetY - this.others[i].y) * spring;
        this.vx -= ax;
        this.vy -= ay;
        this.others[i].vx += ax;
        this.others[i].vy += ay;
      }

      // If the bubble overlap with the mouse send the bubble flying on mouse click
      if (mouseIsPressed) {
        let dx = this.x - mouseX;
        let dy = this.y - mouseY;
        let distance = sqrt(dx * dx + dy * dy);
        let minDist = this.diameter / 2;
        if (distance < minDist) {
          let angle = atan2(dy, dx);
          let targetX = this.x + cos(angle) * minDist;
          let targetY = this.y + sin(angle) * minDist;
          let ax = (targetX - this.x) * spring;
          let ay = (targetY - this.y) * spring;
          this.vx -= ax;
          this.vy -= ay;
        }
      }
    }

    // When mouse x y position overlap with bubbles turn the bubble a diff color

  }
  // have the bubbles move around
  move() {
    this.vy += gravity;
    this.x += this.vx;
    this.y += this.vy;
    if (this.x + this.diameter / 2 > width) {
      this.x = width - this.diameter / 2;
      this.vx *= friction;
    } else if (this.x - this.diameter / 2 < 0) {
      this.x = this.diameter / 2;
      this.vx *= friction;
    }
    if (this.y + this.diameter / 2 > height) {
      this.y = height - this.diameter / 2;
      this.vy *= friction;
    } else if (this.y - this.diameter / 2 < 0) {
      this.y = this.diameter / 2;
      this.vy *= friction;
    }
  }

  // Create a function to update this.diameter based off of the word frequency
  updateDiameter() {
    this.diameter = wordMap[this.word] * 10;
  }

  // display the bubble
  display() {
    // Color is white
    fill(this.color);
    ellipse(this.x, this.y, this.diameter, this.diameter);
    // Create text at x and y coordinate
    // Color text to be black
    fill(0);
    text(this.word, this.x, this.y);
    this.updateDiameter();
  }
}

// Function to initialize bubbles
function initBubbles() {
    fill(255, 204);
    // Create a bubble for each word
    for (let key in wordMap) {
      let word = key;
      let count = wordMap[key];
      // Create a random id
      let id = random(1, 100);
      let bubble = new Bubble(random(width), random(height), count * 10, id, bubbles, word);
      bubbles.push(bubble);
    }
  noStroke();
}

function inputBox() {
  // Create an input box at the top of the canvas
  let input = createInput();
  input.position(20, 20);
  input.size(200, 20);
  // Create a button to add the word to the array
  let button = createButton('Add Word');
  button.position(input.x + input.width, 20);
  button.mousePressed(() => {
    // Get the input value and strip it
    let word = input.value().toLowerCase().replace(/\s/g, '');
    // If the word exists in wordmap increment
    if (wordMap[word]) {
      wordMap[word]++;
    }
    // If the word doesn't exist in wordmap add it
    else {
      // If the word is in the censored list
      if (censoredWords.includes(word)) {
        // Make the word be "meow"
        word = 'meow';
      }
      wordMap[word] = 1;
      // Create a new bubble
      let bubble = new Bubble(random(width), random(height), wordMap[word] * 10, random(1, 100), bubbles, word);
      bubbles.push(bubble);
    }
  });
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Calculate word frequency
  for (let i = 0; i < words.length; i++) {
    if (wordMap[words[i]]) {
      wordMap[words[i]]++;
    } else {
      wordMap[words[i]] = 1;
    }
  }
  // Initialize bubbles
  initBubbles();
  inputBox();


}

function draw() {
  // Make the background baby blue color
  background(0, 153, 255);
  // Calculate bubble map
  bubbles.forEach(bubble => {
    bubble.collide();
    bubble.move();
    bubble.display();
  });
}