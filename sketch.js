// stg

let [canvasx, canvasy] = [400, 500];
let stars = new Array(4);

function setup() {
  createCanvas(canvasx, canvasy);
  background(0);
  for (var i = 0; i < stars.length; i++) {
    stars[i] = new Star();
  }
}

function draw() {
//  keychk();
  for (var i = 0; i < stars.length; i++) {
    stars[i].shootingstar();
//    stars[i].limitchk();
//    if (stars[i].vanishing_starlight === 1) {
//      stars[i].splice(index, i);
//      stars.push(new Star());
//    }
  }
}
/*
function keychk() {
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
}
*/

class Star {
  constructor() {
    this.spd = random(1,6);
    this.location = createVector(random(canvasx), random(canvasy));
    this.position = createVector(random(canvasx), random(canvasy));
    this.star_R = random(0,255);
    this.star_G = random(0,255);
    this.star_B = random(0,255);
    this.star_x = 0;
    this.star_y = 0;
    let vanishing_starlight = 0;
    }

  shootingstar() {
//    this.star_R = (this.star_R + this.location.x) % 255
//    this.star_G = (this.star_G + this.location.y) % 255
//    this.star_B = (this.star_B + this.location.x + this.location.y) % 255
//    this.star_x = this.location.x + 1 * this.spd;
//    this.star_y = this.location.y + 1 * this.spd;
    this.position.x = this.position.x + 1 * this.spd;
    this.position.y = this.position.y + 1 * this.spd;
//    this.location.add(this.star_x,this.star_y);
    fill(this.star_R, this.star_G, this.star_B);
    circle(this.position.x, this.position.y, 10);
  }

//  limitchk() {
//    if (this.location.x < 0 || canvasx < this.location.x) {this.vanishing_starlight = this.vanishing}
//    if (this.location.y < 0 || canvasy < this.location.y) {this.vanishing_starlight = this.vanishing}
//  }

//  vanishing() {
//    return 1;
//  }
}
