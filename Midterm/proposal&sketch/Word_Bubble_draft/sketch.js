let words = ['hi', 'hi', 'hello', 'hello', 'hello', 'hello', 'hello', 'hello', 'mm', 'hh', 'hh', 'hh', 'hh'];
let wordMap = new Map();
let spring = 0.05;
let gravity = 0.07;
let friction = -0.9;
let bubbles = [];
let numBubbles = bubbles.length;

// define the bubble class
class Bubble {
  // create a bubble instance
  constructor(xin, yin, din, idin, oin) {
    this.x = xin;
    this.y = yin;
    this.vx = 0;
    this.vy = 0;
    this.diameter = din;
    this.id = idin;
    this.others = oin;
  }
  
  // the collide function that make the bubbles bounce
  collide() {
    for (let i = 0; i < this.others.length; i++) {
      let dx = this.others[i].x - this.x;
      let dy = this.others[i].y - this.y;
      let distance = sqrt(dx * dx + dy * dy);
      let minDist = this.others[i].diameter / 2 + this.diameter / 2;
      //   console.log(distance);
      //console.log(minDist);
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
    }
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

  // display the bubble
  display() {
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}

function setup() {
  createCanvas(400, 400);
  // we want to read in the file from here
  // and calculate word frequency
  for(let i = 0; i < words.length; i++){
    let word = words[i]
    wordMap.set(word, wordMap.get(word) == undefined ? 1 : wordMap.get(word) + 1)
  }
  
  fill(255, 204);
  // create the bubbles array
  // create each bubble based on the word frequency
  for (let [key, freq] of wordMap) {
    let bubble = new Bubble(
      random(width),
      random(height),
      freq * 10,
      random(1, 100),
      bubbles
    )
    // push the bubble instance into the bubbles array
    // to assist the collide method
    bubbles.push(bubble)
  }
  noStroke();
}

function draw() {
  background(0);
  bubbles.forEach(bubble => {
    bubble.collide();
    bubble.move();
    bubble.display();
  });
}