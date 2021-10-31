var option;
var optionAvaliable;
var textArray;
function setup() {
  createCanvas(800, 800);
  frameRate(9);
  option = 1;
  allOptions = 5;
  functions = {1: () => {option1()}, 2: () => {option2()}, 3: () => {option3()}, 4: () => {option4()}, 5: () => {option5()}}
  textArray = []
}

function draw() {
  background(90);
  
  functions[option]()
}

function option1() {
  for (let i = 0; i < 2000; i+=100) {
    for (let j = 0; j < 2000; j+=100) {
      let mapI = int(map(i, 0, 2000, 50, 200));
      let mapJ = int(map(j, 0, 2000, 50, 200));
      push();
      scale(0.5);
      star(0, mapI, mapJ, i, j);
      pop();
    }
  }
}

function option2() {
  for (let i = 0; i < 2000; i+=100) {
    rotate(PI/5);
    for (let j = 0; j < 2000; j+=30) {
      rotate(PI/5);
      let mapI = int(map(i, 0, 2000, 50, 200));
      let mapJ = int(map(j, 0, 2000, 50, 250));   
      push();
      scale(0.5);
      star(50, int(random(40, 100)), mapJ, i, j);
      pop();
    }
  }
}

function option3() {
  for (let i = 0; i < 2000; i+=random(100, 200)) {
    for (let j = 0; j < 2000; j+=random(100, 250)) {
      let mapI = int(map(i, 0, 2000, 20, 200));
      let mapJ = int(map(j, 0, 2000, 20, 250));   
      push();
      scale(0.5);
      star(100, int(random(40, 100)), mapJ, i, j);
      pop();
    }
  }
}

function option4() {
  for (let i = 0; i < 2000; i+=30) {
    rotate(PI/8);
    for (let j = 0; j < 2000; j+=45) {
        let mapI = int(map(i, 0, 2000, 50, 200));
        let mapJ = int(map(j, 0, 2000, 50, 250));
        push();
        scale(0.5);
        rotate(PI/8);
        star(150, int(random(40, 100)), mapJ, i, j);
        pop();
      
    }
  }
}

function option5() {
  for (let i = 0; i < 2000; i+=100) {
    rotate(PI/3);
    for (let j = 0; j < 2000; j+=50) {
      rotate(PI/random(1, 10));
      let mapI = int(map(i, 0, 2000, 50, 200));
      let mapJ = int(map(j, 0, 2000, 50, 200));
      push();
      scale(0.5);
      star(255, mapI, mapJ, i, j);
      pop();
    }
  }
}

function star(r, g, b, x, y) {
  fill(r, g, b);
  triangle(66+x, 10+y, 111+x, 84+y, 18+x, 84+y);
  stroke(0);
  strokeWeight(0);
  triangle(17+x, 32+y, 109+x, 32+y, 61+x, 107+y);
}

function mousePressed() {
  option += 1;
  print(option);
  if (option > allOptions) {
    option = 1;
  }
}
