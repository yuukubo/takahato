// stg

let [x, y, vx, vy, canvasx, canvasy] = [10, 0, 2, 2, 400, 500];

function setup() {
  createCanvas(canvasx, canvasy);
}

function draw() {
  background(0);
  if (x < 0) {x = 0}
  if (canvasx < x) {x = canvasx}
  if (canvasy < y) {y = 0 , x = random(0 , canvasx)}
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
 
  fallball();
}

function fallball() {
  let star_R = (100 + x) % 255
  let star_G = y % 255
  let star_B = (x + y) % 255
  fill(star_R, star_G, star_B);
  circle(x, y, 10);
}