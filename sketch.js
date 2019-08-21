// stg

let [x, y, vx, vy, canvasx, canvasy] = [10, 0, 2, 2, 400, 500];

function setup() {
  createCanvas(canvasx, canvasy);
}

function draw() {
  background(0);
  if (x < 0) {x = 0}
  if (canvasx < x) {x = canvasx}
  if (canvasy < y) { y = 0 , x = random( 0 , canvasx ) }
  y += vy;
 
  if (keyIsDown(LEFT_ARROW)) {
    if (0 < x) {x -= 5}
  }

  if (keyIsDown(RIGHT_ARROW)) {
    if (x < canvasx) {x += 5}
  }

  if (keyIsDown(UP_ARROW)) {
　  if (0 < y) {y -= 5}
  }

  if (keyIsDown(DOWN_ARROW)) {
    if (y < canvasy) {y += 5}
  }
 
  fill(255, 255, 1);
  circle(x, y, 10);
}
