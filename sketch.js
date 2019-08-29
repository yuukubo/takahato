// stg

let [canvasx, canvasy] = [600, 700];
let [frameXfrom, frameYfrom, frameXto, frameYto] = [30, 30, 380, 640];
let [textAx, textAy, textSizeA] = [430, 80, 32];
let [textBx, textBy, textSizeB] = [440, 160, 24];
let stgTitle = "* S T G *"
let sakuras = new Array(4);
let dice = 0;

function setup() {
  createCanvas(canvasx, canvasy);
  for (var i = 0; i < sakuras.length; i++) {
    sakuras[i] = new Sakura();
  }
}

function draw() {
  background(35,25,70);
  stgframe();
  textinfo();

  for (var i = 0; i < sakuras.length; i++) {
    sakuras[i].update();
    sakuras[i].limitchk();
    sakuras[i].draw();
    if (sakuras[i].hitflg === 1) {
        sakuras.splice(i, 1);
    }
  }
  diceroll()
  if (dice === 6) {
    diceroll()
    if (dice === 6) {
        sakuras.push(new Sakura());
    }
  }
  if (100 < sakuras.length) {
    sakuras.pop();
  }
}

function stgframe() {
  fill(0);
  rect(frameXfrom, frameYfrom, frameXto, frameYto);
}

function textinfo() {
  textSize(textSizeA);
  textFont("Comic Sans MS");
  fill(255);
  textAlign(LEFT);
  text(stgTitle, textAx, textAy);

  textSize(textSizeB);
  textFont("Comic Sans MS");
  fill(255);
  textAlign(LEFT);
  text("sakuras : " + sakuras.length, textBx, textBy);
}

function diceroll() {
  dice = Math.floor(Math.random() * 6 + 1);
}

class Sprite {
  constructor() {
    this.xspd = 0;
    this.yspd = 0;
    this.sprite_x = 0;
    this.sprite_y = 0;
    this.sprite_R = 0;
    this.sprite_G = 0;
    this.sprite_B = 0;
    this.hitflg = false;
    this.age = 0
  }

  update() {
    this.sprite_x = this.sprite_x + 1 * this.xspd;
    this.sprite_y = this.sprite_y + 1 * this.yspd;
    this.age++
  }

  limitchk() {
    if (this.sprite_x < frameXfrom || (frameXfrom + frameXto) < this.sprite_x) {this.hit()}
    if (this.sprite_y < frameYfrom || (frameYfrom + frameYto) < this.sprite_y) {this.hit()}
  }
  
  draw() {
    fill(this.sprite_R, this.sprite_G, this.sprite_B);
  }

  hit() {
    this.hitflg = 1;
  }

}
class Sakura extends Sprite {
  constructor() {
    super();
    this.xspd = random(0,2);
    this.yspd = random(0.1,2);
    this.sprite_x = random(frameXfrom, (frameXfrom + frameXto - 3) / 2);
    this.sprite_y = random(frameYfrom, (frameYfrom + frameYto - 3) / 2);
    this.sprite_R = random(224,255);
    this.sprite_G = random(128,192);
    this.sprite_B = random(192,255);
  }

  update() {
    super.update();
    this.swing();
  }

  limitchk() {
    super.limitchk();
  }
  
  draw() {
    super.draw();
//    fill(this.sprite_R, this.sprite_G, this.sprite_B);
    circle(this.sprite_x, this.sprite_y, 10);
  }

  hit() {
    super.hit();
  }

  swing() {
    if(this.age % 120 === 0) {
      this.xspd = random(0,2);
      this.yspd = random(0.1,2);
    }
  }
}
