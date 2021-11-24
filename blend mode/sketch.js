var colors = [];
let testCircle1;
let testCircle2;
let rad = 20;
let button;
let currColor = 1;
let primary = { 0: [255, 0, 0, "red"], 1: [0, 255, 0, "green"], 2: [0, 0, 255, "blue"] };
let div;
let divRed;
let divGreen;
let divBlue;

// Create a class circle that takes in an x, y, radius, and color
class Circle {
    constructor(x, y, radius, r, g, b) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.r = r;
        this.g = g;
        this.b = b;
    }
    // Draw the circle
    draw() {
        fill(this.r, this.g, this.b, random(255));
        circle(this.x, this.y, this.radius);

    }
    // animate the circles. if the circles ever go off the screen,
    // reset them to the center of the screen
    move() {
        this.x = this.x + random(-7, 7);
        this.y = this.y + random(-7, 7);
        if (this.x > windowWidth || this.x < 0) {
            this.x = width / 2;
        }
        if (this.y > windowHeight || this.y < 0) {
            this.y = height / 2;
        }
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    // initializing two circles
    testCircle1 = new Circle(width / 2 + 50, height / 2, rad, 255, 0, 0);
    testCircle2 = new Circle(width / 2, height / 2, rad, 0, 0, 255);
    // push them into the aray to reduce code in the draw function
    colors.push(testCircle1);
    colors.push(testCircle2);
    // create a button to let the users select the color for next circle
    button = createButton('Change color');
    button.position(0, 0);
    // if the button is pressed, call the change color function
    button.mousePressed(changeColor);
    // create the div element to display the current color underneath the button
    div = createDiv('Current color: ');
    div.position(0, button.height);
    // give the text color of white
    div.style('color', 'white');
    // has width of 100
    div.style('width', '100px');

    // create the divRed element with the content red
    divRed = createDiv('red');
    // positioned on the right of div element
    divRed.position(div.width, button.height);
    // give the text color of white
    divRed.style('color', 'white');
    // default of divRed is hide
    divRed.hide();

    // create the divRed element with the content red
    divGreen = createDiv('green');
    // positioned on the right of div element
    divGreen.position(div.width, button.height);
    // give the text color of white
    divGreen.style('color', 'white');
    // default of divGreen is hide
    divGreen.hide();

    // create the divBlue element with the content red
    divBlue = createDiv('blue');
    // positioned on the right of div element
    divBlue.position(div.width, button.height);
    // give the text color of white
    divBlue.style('color', 'white');
    // default of divBlue is hide
    divBlue.hide();
}

function draw() {
    background(0);
    // set the blend mode to be screen
    blendMode(SCREEN);
    // draw the circles and animate them
    colors.forEach(function (circle) {
        circle.draw();
        circle.move();
    })
    // if the currColor is red, divRed should show, otherwise hide
    if (currColor % 3 == 0) {
        divRed.show();
        // hide the other two divs
        divGreen.hide();
        divBlue.hide();
    }
    // if the currColor is green, divGreen should show, otherwise hide
    else if (currColor % 3 == 1) {
        divGreen.show();
        // hide the other two divs
        divRed.hide();
        divBlue.hide();
    }
    // if the currColor is blue, divBlue should show, otherwise hide
    else {
        divBlue.show();
        // hide the other two divs
        divRed.hide();
        divGreen.hide();
    }
}

// implement the function so that every time the color is pressed, have the curColor increment by 1
function changeColor() {
    currColor++;
    // change the button text to show the current color
}

// if the mouse is ever pressed on the canvas, create a 
// new circle based on the color selection of the user
function mousePressed() {
    // if the mouse pressed position overlapped with the button, do nothing
    if (mouseX > 0 && mouseX < button.width && mouseY > 0 && mouseY < button.height) {
        return;
    }
    // choose the color based on the curColor
    let color = primary[currColor % 3].slice(0, 3);
    let a = new Circle(mouseX, mouseY, rad, ...color);
    colors.push(a);
}

