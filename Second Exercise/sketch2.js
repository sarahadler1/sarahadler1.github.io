let bx;
let by;
let boxSize = 150;
let overBox = false;
let locked = false;
let xOffset = 0.0;
let yOffset = 0.0;
let capture;

let captureX;
let captureY;


function setup() {
  createCanvas(windowWidth, windowHeight);
  bx = 100;
  by = 100;
  rectMode(RADIUS);
  strokeWeight(2);
  capture = createCapture(VIDEO);
  //capture.size(640, 480);
  capture.size(320, 240);
  capture.hide();
  imageMode(CENTER);
  rectMode(CENTER);
  captureX = width/2;
  captureY = height/2;

}

function draw() {
  background(0,0,0);
  image(capture, captureX+160, captureY+120);
  // Test if the cursor is over the box
  if (
    mouseX > bx - boxSize &&
    mouseX < bx + boxSize &&
    mouseY > by - boxSize &&
    mouseY < by + boxSize
  ) {
    overBox = true;
    if (!locked) {
      stroke(BLUR);
      fill(0,0,0,63);
    }
  } else {
    stroke(BLUR);
    fill(0,0,0,63);
    overBox = false;
  }

  // Draw the box
  rect(bx, by, boxSize, boxSize);
//  print(bx);
  if(dist(bx, by, captureX, captureY) < 50){
    captureX = random(160, width-160);
    captureY = random(120, height-120);

  }
  print(dist(bx, by, captureX, captureY));
}

function mousePressed() {
  if (overBox) {
    locked = true;
    fill(255, 255, 255);
  } else {
    locked = false;
  }
  xOffset = mouseX - bx;
  yOffset = mouseY - by;
}

function mouseDragged() {
  if (locked) {
    bx = mouseX - xOffset;
    by = mouseY - yOffset;
  }
}

function mouseReleased() {
  locked = false;
}
