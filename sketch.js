// stg

let [canvasx, canvasy] = [700, 700];
let [frameXfrom, frameYfrom, frameXto, frameYto] = [30, 30, 430, 640];
let [textAx, textAy, textSizeA] = [480, 80, 32];
let [textBx, textBy, textSizeB] = [490, 160, 24];
let [textB2x, textB2y, textSizeB2] = [490, 200, 24];
let [textB3x, textB3y, textSizeB3] = [490, 240, 24];
let [textCx, textCy, textSizeC] = [640, 690, 12];
let stgTitle = "* S T G *"
let dice = 0;
let [gradient_color1, gradient_color2] = [0, 0];
let fr = 0;
let game;

function setup() {
  createCanvas(canvasx, canvasy);
  fr = frameRate();
  game = new Game();
  [gradient_color1, gradient_color2] = [color(150), color(0)];
}

function draw() {
  game.scenectl();
}

class Game {
  constructor() {
    this.gamescenenow = "title";
    this.age = 0;
    this.stage1age = 0;
    this.needsetupflg = true;
    this.totalScore = 0;
    this.stage1score = 0;
    this.titlealpha = 0;
    this.endingalpha = 0;
  }

  update() {
    this.age++;
    if (this.age % 60 === 0) {
      fr = Math.floor(frameRate());
    }
  }

  draw() {
  }

  scenectl() {
    if (this.gamescenenow === "title") {
      this.scenetitle();
      this.update();
    }
    if (this.gamescenenow === "stage1") {
      this.scenestage1();
      this.update();
    }
    if (this.gamescenenow === "gameover") {
      this.gameover();
      this.update();
    }
  }

  scenetitle() {
    background(0);
    if (this.titlealpha < 255) {
      this.titlealpha++;
    }
    this.titlelogo();
    if ((this.titlealpha === 255) && keyIsDown(90)) {
      this.gamescenenow = "stage1";
      this.titlealpha = 0;
      }
  }

  titlelogo() {
    textSize(64);
    textFont("Comic Sans MS");
    fill(255, this.titlealpha);
    textAlign(CENTER);
    text(stgTitle, canvasx / 2, canvasy / 3);

    if (this.titlealpha === 255) {
      textSize(16);
      textFont("Comic Sans MS");
      fill(255);
      textAlign(LEFT);
      text("press Z to start!!", canvasx / 2, canvasy * 2 / 3);
    }
  }

  gameover() {
    background(20);
    if (this.endingalpha < 255) {
      this.endingalpha++;
    }
    this.ending();
    if ((this.endingalpha === 255) && keyIsDown(90)) {
      this.gamescenenow = "title";
      this.endingalpha = 0;
      }
  }

  ending() {
    textSize(64);
    textFont("Comic Sans MS");
    fill(255, this.endingalpha);
    textAlign(CENTER);
    text("Game Over", canvasx / 2, canvasy / 3);

    if (this.endingalpha === 255) {
      textSize(16);
      textFont("Comic Sans MS");
      fill(255, this.endingalpha);
      textAlign(LEFT);
      text("press Z to New game!!", canvasx / 2, canvasy * 2 / 3);
    }
  }

  scenestage1() {

    if (this.needsetupflg === true) {
      this.stage1setup();
      this.needsetupflg = false;
    }
    this.stage1age++;
    background(35, 25, 70);
    stgboard(this.stage1age);
    textinfo();

    if (this.jiki.zanki < 0) {
      this.stage1cleanup();
    }

    this.jiki.update();
    this.jiki.limitchk();
    this.jiki.draw();
    if (this.jiki.shooting) {
      if (this.jiki.cooltime <= 0) {
        this.bullets.push(new BulletFreindly((this.jiki.sprite_x + this.jiki.sprite_w / 2), this.jiki.sprite_y));
        this.jiki.cooltime = 6;
      }
      this.jiki.shooting = false;
    }

    if (0 < this.jiki.cooltime) {
      this.jiki.cooltime--;
    }

    if (0 < this.bullets.length) {
      for (var i = 0; i < this.bullets.length; i++) {
        this.bullets[i].update();
        this.bullets[i].limitchk();
        if (this.bullets[i].isFrameout) {
          this.bullets.splice(i, 1);
        } else if (!this.bullets[i].isArmorpiercing && this.bullets[i].hitflg) {
          this.bullets.splice(i, 1);
        } else {
        this.bullets[i].draw();
        }
      }
    }

    for (var i = 0; i < this.sakuras.length; i++) {
      this.sakuras[i].update();
      this.sakuras[i].limitchk();

      if (0 < this.bullets.length) {
        for (var k = 0; k < this.bullets.length; k++) {
          this.bullets[k].hitflg = this.sakuras[i].collisionchk(this.bullets[k].sprite_x, this.bullets[k].sprite_y, this.bullets[k].killingrange);
          if (this.bullets[k].hitflg) {
            return;
          }
        }
      }
      if (!this.jiki.isSuperarmor) {
        if (this.sakuras[i].collisionchk(this.jiki.sprite_x_core, this.jiki.sprite_y_core, this.jiki.killingrange)) {
          this.jiki.hit();
        }
      }
      if (this.sakuras[i].isFrameout || this.sakuras[i].hitflg) {
        if (this.sakuras[i].hitflg) {
          this.jiki.score += this.sakuras[i].reward;
        }
        this.sakuras.splice(i, 1);
      } else {
        this.sakuras[i].draw();
      }

      stgframe(this.stage1age);
    }
    diceroll()
    if (dice === 6) {
      diceroll();
      if (dice === 6) {
        this.sakuras.push(new Sakura());
      }
    }
    if (this.stage1age % 3600 === 0) {
      for (var i = 0; i < 50; i++) {
        this.sakuras.push(new Sakura());
      }
    }
    if (100 < this.sakuras.length) {
      for (var i = this.sakuras.length; 100 < i; i--) {
        this.sakuras.pop();
      }
    }
  }

  stage1setup() {
    this.jiki = new Jiki();
    this.jiki.SuperarmorTimer = 240;
    this.jiki.score =+ this.totalScore;
    this.jiki.zanki = 3;
    this.bullets = [];
    this.sakuras = new Array(Math.floor(random(4, 20)));
    for (var i = 0; i < this.sakuras.length; i++) {
      this.sakuras[i] = new Sakura();
    }
  }

  stage1cleanup() {
    this.needsetupflg = true
    this.jiki.SuperarmorTimer = 240;
    this.stage1score = this.jiki.score;
    this.jiki.score = 0;
    this.bullets = [];
    this.sakuras = [];
    this.gamescenenow = "gameover";
  }

  getsakuraslength() {
    return this.sakuras.length;
  }
  getjikiscore() {
    return this.jiki.score;
  }
  getjikizanki() {
    return this.jiki.zanki;
  }
}

function stgboard(gameage) {
  setGradient_Y(frameXfrom, frameYfrom, frameXto, frameYto, gradient_color1, gradient_color2);
  noStroke();
}

function stgframe(gameage) {
//  noStroke();
//  fill(35, 25, 70, 200);
//  rect(0, 0, frameXfrom, canvasy);  
//
//  noStroke();
//  fill(35, 25, 70, 200);
//  rect((frameXfrom + frameXto), 0, frameXfrom, canvasy);  
//
//  noStroke();
//  fill(15, 5, 50, 200);
//  rect(0, 0, canvasx, frameYfrom);
//
//  noStroke();
//  fill(55, 45, 90, 200);
//  rect(0, (frameYfrom + frameYto), canvasx, canvasy);  
}

function setGradient_Y(x, y, w, h, c1, c2) {
  noFill();
  // Top to bottom gradient
  for (let i = y; i <= y + h; i=i+10) {
    let inter = map(i, y, y + h, 0, 1);
    let c = lerpColor(c1, c2, inter);
    strokeWeight(10);
    stroke(c);
    line(x, i, x + w, i);
  }
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
  text("sakuras : " + game.getsakuraslength(), textBx, textBy);

  textSize(textSizeB2);
  textFont("Comic Sans MS");
  fill(255);
  textAlign(LEFT);
  text("scores : " + game.getjikiscore(), textB2x, textB2y);

  textSize(textSizeB3);
  textFont("Comic Sans MS");
  fill(255);
  textAlign(LEFT);
  text("zanki : " + game.getjikizanki(), textB3x, textB3y);

  textSize(textSizeC);
  textFont("Comic Sans MS");
  fill(255);
  textAlign(LEFT);
  text("FPS : " + fr, textCx, textCy);
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
    this.sprite_w = 0;
    this.sprite_h = 0;
    this.sprite_R = 0;
    this.sprite_G = 0;
    this.sprite_B = 0;
    this.sprite_Alpha = 255;
    this.isFrameout = false;
    this.dist = 0;
    this.killingrange = 0;
    this.hitflg = false;
    this.isFriend = false;
    this.isVisible = false;
    this.isSuperarmor = false;
    this.SuperarmorTimer = 0;
    this.age = 0
    this.sprite_x_core = this.sprite_x + (this.sprite_w / 2);
    this.sprite_y_core = this.sprite_y + (this.sprite_h / 2);
  }

  update() {
    this.sprite_x = this.sprite_x + 1 * this.xspd;
    this.sprite_y = this.sprite_y + 1 * this.yspd;
    this.age++
  }

  limitchk() {
    if (this.sprite_x < frameXfrom || (frameXfrom + frameXto) < this.sprite_x) { this.frameout() }
    if (this.sprite_y < frameYfrom || (frameYfrom + frameYto) < this.sprite_y) { this.frameout() }
  }

  draw() {
    noStroke();
    fill(this.sprite_R, this.sprite_G, this.sprite_B, this.sprite_Alpha);
  }

  frameout() {
    this.isFrameout = true;
  }

  collisionchk(opponent_x, opponent_y, opponent_killingrange) {
    this.dist = dist(this.sprite_x, this.sprite_y, opponent_x, opponent_y)
    if (this.dist <= this.killingrange + opponent_killingrange) {
      this.hit();
      return true;
    } else {
      return false;
    }
  }

  hit() {
    this.hitflg = true;
  }

  sparkle() {
  }
}

class Shooter extends Sprite {
  constructor() {
    super();
    this.bullets = [];
    this.shooter_x = 0;
    this.shooter_y = 0;
    this.shooting = false;
    this.cooltime = 0;
    this.score = 0;
  }

  update() {
    super.update();
  }

  limitchk() {
    super.limitchk();
  }

  draw() {
    super.draw();
  }

  hit() {
    super.hit();
  }

  shoot() {
    this.shooting = true;
  }
}

class Bullet extends Sprite {
  constructor(shooter_x, shooter_y) {
    super();
    this.sprite_x = shooter_x;
    this.sprite_y = shooter_y;
    this.isArmorpiercing = false;
  }

  update() {
    super.update();
  }

  limitchk() {
    super.limitchk();
  }

  draw() {
    super.draw();
  }

  hit() {
    super.hit();
  }
}

class BulletFreindly extends Bullet {
  constructor(shooter_x, shooter_y) {
    super(shooter_x, shooter_y);
    this.isFriend = true;
    this.xspd = 0;
    this.yspd = -6;
    this.sprite_R = 255;
    this.sprite_G = 200;
    this.sprite_B = 255;
    this.sprite_w = 10;
    this.sprite_h = 20;
    this.killingrange = 4;
    this.isVisible = true;
  }

  update() {
    super.update();
  }

  limitchk() {
    super.limitchk();
  }

  draw() {
    super.draw();
    ellipse(this.sprite_x, this.sprite_y, this.sprite_w, this.sprite_h);
  }

  hit() {
    super.hit();
  }
}

class Sakura extends Sprite {
  constructor() {
    super();
    this.xspd = random(0, 1);
    this.yspd = random(0.1, 1);
    this.sprite_x = random(frameXfrom, (frameXfrom + frameXto - 3) / 2);
    this.sprite_y = random(frameYfrom, (frameYfrom + frameYto - 3) / 2);
    this.sprite_R = random(224, 255);
    this.sprite_G = random(128, 192);
    this.sprite_B = random(192, 255);
    this.killingrange = 4;
    this.isVisible = true;
    this.reward = 100;
  }

  update() {
    super.update();
    this.swing();
  }

  limitchk() {
    super.limitchk();
  }

  draw() {
    if (this.isVisible) {
      super.draw();
      circle(this.sprite_x, this.sprite_y, 10);
    }
  }

  hit() {
    super.hit();
  }

  swing() {
    if (this.age % 120 === 0) {
      this.xspd = random(0, 1) - 0.5;
      this.yspd = random(0.1, 1);
    }
  }
}

class Jiki extends Shooter {
  constructor() {
    super();
    this.nomal_xspd = 3;
    this.nomal_yspd = 3;
    this.slow_xspd = this.nomal_xspd / 2;
    this.slow_yspd = this.nomal_yspd / 2;
    this.setup_xspd = this.slow_xspd / 2;
    this.setup_yspd = this.slow_yspd / 2;
    this.xspd = this.nomal_xspd;
    this.yspd = this.nomal_yspd;
    this.sprite_x = (frameXfrom + frameXto) / 2;
    this.sprite_y = (frameYfrom + frameYto) * 3 / 4;
    this.sprite_w = 10;
    this.sprite_h = 10;
    this.sprite_R = 255;
    this.sprite_G = 100;
    this.sprite_B = 200;
    this.killingrange = 2;
    this.isVisible = true;
    this.isSuperarmor = true;
    this.isPichuuun = false;
    this.zanki = 3;
    this.isMagiccircle = false;
  }

  update() {
    this.sprite_x_core = this.sprite_x + (this.sprite_w / 2);
    this.sprite_y_core = this.sprite_y + (this.sprite_h / 2);
    if (this.hitflg) {
      this.isSuperarmor = true;
      this.SuperarmorTimer = 240;
      this.isPichuuun = true;
      this.sprite_x = (frameXfrom + frameXto) / 2;
      this.sprite_y = (frameYfrom + frameYto - this.sprite_h);
      this.zanki--;
      this.hitflg = false;
    }
    if (this.isSuperarmor && this.isPichuuun && (60 < this.SuperarmorTimer)) {
      this.sprite_y -= this.setup_yspd;
    } else if (!this.isPichuuun) {
      if (keyIsDown(LEFT_ARROW)) {
        if (frameXfrom < this.sprite_x) {
          this.sprite_x -= this.xspd;
        }
      }
      if (keyIsDown(RIGHT_ARROW)) {
        if (this.sprite_x < (frameXfrom + frameXto)) {
          this.sprite_x += this.xspd;
        }
      }
      if (keyIsDown(UP_ARROW)) {
        if (frameYfrom < this.sprite_y) {
          this.sprite_y -= this.yspd;
        }
      }
      if (keyIsDown(DOWN_ARROW)) {
        if (this.sprite_y < (frameYfrom + frameYto)) {
          this.sprite_y += this.yspd;
        }
      }
      if (keyIsDown(SHIFT)) {
        this.xspd = this.slow_xspd;
        this.yspd = this.slow_yspd;
        this.isMagiccircle = true;
      } else {
        this.xspd = this.nomal_xspd;
        this.yspd = this.nomal_yspd;
        this.isMagiccircle = false;
      }
      if (keyIsDown(90)) {
        if (!this.isSuperarmor) {
          this.shoot();
        }
      }
    }

    if (0 < this.SuperarmorTimer) {
      this.SuperarmorTimer--;
      this.sprite_Alpha = 80;
    }
    if (this.SuperarmorTimer < 60) {
      this.isPichuuun = false;
    }
    if (0 === this.SuperarmorTimer) {
      this.isSuperarmor = false;
      this.isPichuuun = false;
      this.sprite_Alpha = 255;
    }
  }

  limitchk() {
    if ((frameXfrom + frameXto) <= this.sprite_x + this.sprite_w) { this.sprite_x = (frameXfrom + frameXto) - this.sprite_w }
    if (this.sprite_x <= frameXfrom) { this.sprite_x = frameXfrom }
    if ((frameYfrom + frameYto) <= this.sprite_y + this.sprite_h) { this.sprite_y = (frameYfrom + frameYto) - this.sprite_h }
    if (this.sprite_y <= frameYfrom) { this.sprite_y = frameYfrom }
  }

  draw() {
    super.draw();
    rect(this.sprite_x, this.sprite_y, this.sprite_w, this.sprite_h);
    fill((this.sprite_R / 4), (this.sprite_G / 4), (this.sprite_B / 4), (this.sprite_Alpha / 2));
    circle(this.sprite_x_core, this.sprite_y_core, this.killingrange);
    if (this.isMagiccircle) {
      strokeWeight(1);
      stroke((this.sprite_R / 4), (this.sprite_G / 4), (this.sprite_B / 4), (this.sprite_Alpha / 2));
      circle(this.sprite_x_core, this.sprite_y_core, (this.killingrange * 20));
    }
  }

  hit() {
    super.hit();
    this.isSuperarmor = true;
    this.isPichuuun = true;
  }

  shoot() {
    super.shoot();
  }
}
