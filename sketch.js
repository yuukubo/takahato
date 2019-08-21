// stg

let [x, y, vx, vy] = [10, 0, 2, 2];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
 if (windowHeight < y) { y = 0 , x = random( 0 , windowWidth ) }
  y += vy;
  fill(255, 255, 1);
  circle(x, y, 10);
}
