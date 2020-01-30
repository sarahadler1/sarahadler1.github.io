//our custom variable
let pointX;
let mouseDist;
let triY;


function setup() {
  //create the canvas element
  createCanvas(1480, 1000);

  //giving pointX a value of 300
  pointX = 740;
  triY = 300;
  print(pointX);
}



function draw() {
  if(keyIsPressed){
  background(255,255,255);
  } else {
  background(0,0,0);
  }
 mouseDist = dist(mouseX, mouseY, pmouseX, pmouseY);
 print(mouseDist);
 smooth();
  //line and point styles
  strokeWeight(1000);
  //point expects an x and y coordinate
  point(pointX, 900);

  strokeWeight(20);
  //line expects two x, y coordinates
  //then conects the coordinates
  line(mouseX, mouseY, pmouseX, pmouseY);

  //ellipse styles
  noStroke();
  fill(190, 55, 12, 50);

  //ellipse expects an x, y coordinate
  //and width and Height
  //ellipse(mouseX, mouseY, 200, 100);

    stroke(random(600), random(600), random(600));

    //rect styles
    strokeWeight(10);

    //fills in shapes with color
    //affects shapes that come after

    //rect expecting an x, y coordinate
    //and width and Height
    triangle(width/2, height/2, mouseX, -700);
    triangle(width/2, height/2, mouseX, -800);
    triangle(width/2, height/2, mouseX, -900);
    triangle(width/2, height/2, mouseX, -1000);



    triangle(width/2, height/2, mouseX, -600);
    triangle(width/2, height/2, mouseX, -500);
    triangle(width/2, height/2, mouseX, -400);
    triangle(width/2, height/2, mouseX, -300);
    triangle(width/2, height/2, mouseX, -200);
    triangle(width/2, height/2, mouseX, -100);
    triangle(width/2, height/2, mouseX, 0);
    triangle(width/2, height/2, mouseX, 100);
    triangle(width/2, height/2, mouseX, 200);
    triangle(width/2, height/2, mouseX, 300);
    triangle(width/2, height/2, mouseX, 400);
    triangle(width/2, height/2, mouseX, 500);
    triangle(width/2, height/2, mouseX, 600);
    triangle(width/2, height/2, mouseX, 700);
    triangle(width/2, height/2, mouseX, 800);
    triangle(width/2, height/2, mouseX, 900);
    triangle(width/2, height/2, mouseX, 1000);
    triangle(width/2, height/2, mouseX, 1100);
    triangle(width/2, height/2, mouseX, 1200);
    triangle(width/2, height/2, mouseX, 1300);
    triangle(width/2, height/2, mouseX, 1400);







  //triangle syles

  //triagle expects three set of x, y
  //print(mouseX);

  if(mouseIsPressed){
    //when mouse is pressed reset pointx to 200
    pointX = -740;
  } else {
    //when mouse is released reset pointx to 600
    pointX = 740;

  }

  if(keyIsPressed){
    //when mouse is pressed reset pointx to 200
    triY= 800;
  } else {
    //when mouse is released reset pointx to 600
    triY = 300;

  }

}
