// stg

let [canvasx, canvasy] = [600, 700];
let [frameXfrom, frameYfrom, frameXto, frameYto] = [40, 40, 380, 620];
let stars = new Array(4);
let dice = 0;

function setup() {
  createCanvas(canvasx, canvasy);
  for (var i = 0; i < stars.length; i++) {
    stars[i] = new Star();
  }
}

function draw() {
  background(35,25,70);
  stgframe();

  for (var i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].limitchk();
    stars[i].shootingstar();
    if (stars[i].vanishing_starlight === 1) {
      if (stars[i].cointoss) {
        stars[i].resurrection()
      } else {
        stars.splice(i, 1);
      }
    }
  }
  diceroll()
  if (dice === 6) {
    diceroll()
    if (dice === 6) {
        stars.push(new Star());
    }
  }
}

function stgframe() {
  fill(0);
  rect(frameXfrom, frameYfrom, frameXto, frameYto);
}

function diceroll() {
  dice = Math.floor(Math.random() * 6 + 1);
}

class Star {
  constructor() {
    this.xspd = random(3,6);
    this.yspd = random(3,6);
    this.star_x = random(frameXfrom, (frameXfrom + frameXto + 3) / 2);
    this.star_y = random(frameYfrom, (frameYfrom + frameYto + 3) / 2);
    this.star_R = random(0,255);
    this.star_G = random(0,255);
    this.star_B = random(0,255);
    this.vanishing_starlight = 0;
    this.coin = false;
  }

  update() {
    this.star_x = this.star_x + 1 * this.xspd;
    this.star_y = this.star_y + 1 * this.yspd;
  }
  
  shootingstar() {
    fill(this.star_R, this.star_G, this.star_B);
    circle(this.star_x, this.star_y, 10);
  }

  limitchk() {
    if (this.star_x < frameXfrom || (frameXfrom + frameXto) < this.star_x) {this.vanishing()}
    if (this.star_y < frameYfrom || (frameYfrom + frameYto) < this.star_y) {this.vanishing()}
  }

  vanishing() {
    this.vanishing_starlight = 1;
  }

  resurrection() {
    this.xspd = random(3,6);
    this.yspd = random(3,6);
    this.star_x = random(frameXfrom, (frameXfrom + frameXto) / 2);
    this.star_y = random(frameYfrom, (frameYfrom + frameYto) / 2);
    this.star_R = random(0,255);
    this.star_G = random(0,255);
    this.star_B = random(0,255);
    this.vanishing_starlight = 0;
  }
  
  cointoss() {
    this.coin = Math.floor(Math.random() * 2) == 0;
  }
}
