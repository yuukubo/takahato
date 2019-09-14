// stg

let [canvasx, canvasy] = [720, 700];
let [frameXfrom, frameYfrom, frameXto, frameYto] = [30, 30, 430, 640];
let [textAx, textAy, textSizeA] = [480, 80, 32];
let [textBx, textBy, textSizeB] = [490, 160, 24];
let [textB2x, textB2y, textSizeB2] = [490, 200, 24];
let [textB3x, textB3y, textSizeB3] = [490, 240, 24];
let [textCx, textCy, textSizeC] = [660, 690, 12];
let stgTitle = "* S T G * c41.1"
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
    this.isstage1clear = false;
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
    if (this.gamescenenow === "gameclear") {
      this.gameclear();
      this.update();
    }
  }

  scenetitle() {
    background(0);
    if (this.titlealpha < 255) {
      this.titlealpha++;
    }
    this.titlelogo();
    if ((this.titlealpha === 255) && (keyIsDown(90) || mouseIsPressed)) {
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
      if ((this.age % 60) <= 30) {
        text("press Z to start !!", canvasx * 2 / 3, canvasy * 2 / 3);
      }
    }
  }

  gameover() {
    background(20);
    if (this.endingalpha < 255) {
      this.endingalpha++;
    }
    this.ending1();
    if ((this.endingalpha === 255) && (keyIsDown(90) || mouseIsPressed)) {
      this.gamescenenow = "title";
      this.endingalpha = 0;
      this.totalScore = 0;
    }
  }

  ending1() {
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
      text("your score : " + nf(this.totalScore, 7), canvasx * 2 / 3, canvasy * 2 / 3);

      textSize(16);
      textFont("Comic Sans MS");
      fill(255, this.endingalpha);
      textAlign(LEFT);
      if ((this.age % 60) <= 30) {
        text("press Z to New Game !!", canvasx * 2 / 3, canvasy * 3 / 4);
      }
    }
  }

  gameclear() {
    background(100);
    if (this.endingalpha < 255) {
      this.endingalpha++;
    }
    this.ending2();
    if ((this.endingalpha === 255) && (keyIsDown(90) || mouseIsPressed)) {
      this.gamescenenow = "title";
      this.endingalpha = 0;
      this.totalScore = 0;
    }
  }

  ending2() {
    textSize(64);
    textFont("Comic Sans MS");
    fill(255, this.endingalpha);
    textAlign(CENTER);
    text("** Game Clear !! **", canvasx / 2, canvasy / 3);

    if (this.endingalpha === 255) {
      textSize(16);
      textFont("Comic Sans MS");
      fill(255, this.endingalpha);
      textAlign(LEFT);
      text("your score : " + nf(this.totalScore, 7), canvasx * 2 / 3, canvasy * 2 / 3);

      textSize(16);
      textFont("Comic Sans MS");
      fill(255, this.endingalpha);
      textAlign(LEFT);
      if ((this.age % 60) <= 30) {
        text("press Z to New Game !!", canvasx * 2 / 3, canvasy * 3 / 4);
      }
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
      if (!this.jiki.isLaser && this.jiki.cooltime <= 0) {
        this.bullets.push(new BulletFreindly((this.jiki.sprite_x + this.jiki.sprite_w / 2), this.jiki.sprite_y));
        this.jiki.cooltime = 6;
      }
      if (this.jiki.isLaser && this.jiki.cooltime <= 0) {
        this.bullets.push(new BulletFreindlyLaser((this.jiki.sprite_x + this.jiki.sprite_w / 2), this.jiki.sprite_y));
        this.jiki.cooltime = 12;
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

    if (600 <= this.stage1age && this.stage1age <= 960) {
      if ((this.stage1age % 30) === 0) {
        this.fairy01s.push(new Fairy01());
      }
    }

    if (1020 <= this.stage1age && this.stage1age <= 1380) {
      if ((this.stage1age % 30) === 0) {
        this.fairy02s.push(new Fairy02());
      }
    }

    if (1440 <= this.stage1age && this.stage1age <= 1800) {
      if ((this.stage1age % 30) === 0) {
        this.fairy01s.push(new Fairy01());
      }
    }

    if (1860 <= this.stage1age && this.stage1age <= 2220) {
      if ((this.stage1age % 30) === 0) {
        this.fairy02s.push(new Fairy02());
      }
    }

    if (2400 <= this.stage1age && this.stage1age <= 2760) {
      if ((this.stage1age % 10) === 0) {
        this.fairy01s.push(new Fairy01());
        this.fairy02s.push(new Fairy02());
      }
    }

    for (var s = 0; s < this.enemies.length; s++) {
      for (var i = 0; i < this.enemies[s].length; i++) {
        this.enemies[s][i].update();
        this.enemies[s][i].limitchk();

        if (180 <= this.enemies[s][i].age && this.enemies[s][i].age <= 300 && (this.enemies[s][i].age % 60 === 0)) {
          if (this.enemies[s][i] instanceof Fairy01) {
            for (var p = 1; p <= 6; p++) {
              this.enemybullets.push(new miniBulletofEnemy((this.enemies[s][i].sprite_x + this.enemies[s][i].sprite_w / 2), this.enemies[s][i].sprite_y));
              this.enemybullets[this.enemybullets.length - 1].xspd = cos(radians(60 * p));
              this.enemybullets[this.enemybullets.length - 1].yspd = sin(radians(60 * p));
            }
          }
          if (this.enemies[s][i].age % 120 === 0) {
            if (this.enemies[s][i] instanceof Fairy02) {
              this.enemybullets.push(new bigBulletofEnemy((this.enemies[s][i].sprite_x + this.enemies[s][i].sprite_w / 2), this.enemies[s][i].sprite_y));
              this.enemybullets[this.enemybullets.length - 1].xspd = cos(radians(30 * random(1, 10)));
              this.enemybullets[this.enemybullets.length - 1].yspd = sin(radians(30 * random(1, 10)));
            }
          }
        }

        if (this.enemies[s][i] instanceof bigFairy) {
          if (this.enemies[s][i].mode_now === this.enemies[s][i].mode_nomal1) {
            if (this.enemies[s][i].age % 10 === 0) {
              this.enemybullets.push(new bigBulletofEnemy((this.enemies[s][i].sprite_x + this.enemies[s][i].sprite_w / 2), this.enemies[s][i].sprite_y));
              this.enemybullets[this.enemybullets.length - 1].xspd = cos(radians(this.enemies[s][i].age % 360));
              this.enemybullets[this.enemybullets.length - 1].yspd = sin(radians(this.enemies[s][i].age % 360));
            }
          }
          if (this.enemies[s][i].mode_now === this.enemies[s][i].mode_spell1) {
            if (this.enemies[s][i].age % 10 === 0) {
              this.enemybullets.push(new bigBulletofEnemy((this.enemies[s][i].sprite_x + this.enemies[s][i].sprite_w / 2), this.enemies[s][i].sprite_y));
              this.enemybullets[this.enemybullets.length - 1].xspd = cos(radians(this.enemies[s][i].age % 360));
              this.enemybullets[this.enemybullets.length - 1].yspd = sin(radians(this.enemies[s][i].age % 360));
              this.enemybullets.push(new bigBulletofEnemy((this.enemies[s][i].sprite_x + this.enemies[s][i].sprite_w / 2), this.enemies[s][i].sprite_y));
              this.enemybullets[this.enemybullets.length - 1].xspd = cos(radians(this.enemies[s][i].age % 360 + 180));
              this.enemybullets[this.enemybullets.length - 1].yspd = sin(radians(this.enemies[s][i].age % 360 + 180));
            }
          }
        }

        if (0 < this.bullets.length) {
          for (var k = 0; k < this.bullets.length; k++) {
            this.bullets[k].hitflg = this.enemies[s][i].collisionchk(this.bullets[k].sprite_x, this.bullets[k].sprite_y, this.bullets[k].killingrange);
            if (this.bullets[k].hitflg) {
              return;
            }
          }
        }
        if (!this.jiki.hitflg && !this.jiki.isSuperarmor) {
          if (this.enemies[s][i].collisionchk(this.jiki.sprite_x_core, this.jiki.sprite_y_core, this.jiki.killingrange)) {
            if (!this.jiki.isSuperarmor) {
              this.jiki.hit();
            }
          }
        }
        if (this.enemies[s][i].isFrameout || this.enemies[s][i].hitflg) {
          if (this.enemies[s][i].hitflg) {
            this.jiki.score += this.enemies[s][i].reward;
            if (this.enemies[s][i] instanceof bigFairy) {
              this.isstage1clear = true;
            }
          }
          this.enemies[s].splice(i, 1);
        } else {
          this.enemies[s][i].draw();
        }
      }
    }

    if (0 < this.enemybullets.length) {
      for (var i = 0; i < this.enemybullets.length; i++) {
        if (!this.jiki.hitflg && !this.jiki.isSuperarmor) {
          this.enemybullets[i].hitflg = this.jiki.collisionchk(this.enemybullets[i].sprite_x, this.enemybullets[i].sprite_y, this.enemybullets[i].killingrange);
        }
        this.enemybullets[i].update();
        this.enemybullets[i].limitchk();
        if (this.enemybullets[i].isFrameout) {
          this.enemybullets.splice(i, 1);
        } else if (!this.enemybullets[i].isArmorpiercing && this.enemybullets[i].hitflg) {
          this.enemybullets.splice(i, 1);
        } else {
          this.enemybullets[i].draw();
        }
      }
    }

    diceroll();
    if (dice === 6) {
      diceroll();
      if (dice === 6) {
        this.sakuras.push(new Sakura());
      }
    }
    if (3600 <= this.stage1age && this.stage1age <= 4200 && (this.stage1age % 9 === 0)) {
      this.sakuras.push(new Sakura());
    }
    if (100 < this.sakuras.length) {
      for (var i = this.sakuras.length; 100 < i; i--) {
        this.sakuras.pop();
      }
    }
    if (5400 === this.stage1age) {
      this.bigfairy.push(new bigFairy());
    }
    if (this.isstage1clear) {
      //      this.stage1age = 0;
      this.stage1cleanup();
    }

    stgframe(this.stage1age);
  }

  stage1setup() {
    this.jiki = new Jiki();
    this.jiki.SuperarmorTimer = 240;
    this.jiki.score = + this.totalScore;
    this.jiki.zanki = 3;
    this.bullets = [];
    this.fairy01s = [];
    this.f01bullets = [];
    this.fairy02s = [];
    this.f02bullets = [];
    this.sakuras = new Array(Math.floor(random(4, 20)));
    for (var i = 0; i < this.sakuras.length; i++) {
      this.sakuras[i] = new Sakura();
    }
    this.bigfairy = [];
    this.bigfbullets = [];
    this.enemies = [this.fairy01s, this.fairy02s, this.sakuras, this.bigfairy];
    this.enemybullets = [];
  }

  stage1cleanup() {
    this.needsetupflg = true;
    this.stage1age = 0;
    this.jiki.SuperarmorTimer = 240;
    this.stage1score = this.jiki.score;
    this.totalScore = this.jiki.score;
    this.jiki.score = 0;
    this.bullets = [];
    this.sakuras = [];
    if (this.isstage1clear) {
      this.gamescenenow = "gameclear";
      this.isstage1clear = false;
    } else {
      this.gamescenenow = "gameover";
    }
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
  //  fill(55, 45, 90);
  //  rect(0, (frameYfrom + frameYto), (frameXfrom + frameXto), canvasy);  
}

function setGradient_Y(x, y, w, h, c1, c2) {
  noFill();
  // Top to bottom gradient
  for (let i = y; i <= y + h; i = i + 10) {
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
  text("scores : " + nf(game.getjikiscore(), 7), textB2x, textB2y);

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
    this.isMagiccircle = false;
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
    this.power = 1;
  }
}

class BulletFreindly extends Bullet {
  constructor(shooter_x, shooter_y) {
    super(shooter_x, shooter_y);
    this.isFriend = true;
    this.xspd = 0;
    this.yspd = -5;
    this.sprite_R = 255;
    this.sprite_G = 200;
    this.sprite_B = 255;
    this.sprite_w = 6;
    this.sprite_h = 20;
    this.killingrange = 4;
    this.isVisible = true;
  }

  draw() {
    super.draw();
    ellipse(this.sprite_x, this.sprite_y, this.sprite_w, this.sprite_h);
  }
}

class BulletFreindlyLaser extends Bullet {
  constructor(shooter_x, shooter_y) {
    super(shooter_x, shooter_y);
    this.isFriend = true;
    this.xspd = 0;
    this.yspd = -9;
    this.sprite_R = 255;
    this.sprite_G = 192;
    this.sprite_B = 10;
    this.sprite_w = 6;
    this.sprite_h = 60;
    this.killingrange = 4;
    this.isVisible = true;
//    this.power = 2;
    this.power = 20;
    this.isArmorpiercing = true;
  }

  draw() {
    super.draw();
    ellipse(this.sprite_x, this.sprite_y, this.sprite_w, this.sprite_h);
  }
}

class miniBulletofEnemy extends Bullet {
  constructor(shooter_x, shooter_y) {
    super(shooter_x, shooter_y);
    this.isFriend = false;
    this.xspd = 0;
    this.yspd = 3;
    this.sprite_R = 64;
    this.sprite_G = 192;
    this.sprite_B = 224;
    this.sprite_w = 4;
    this.sprite_h = 10;
    this.killingrange = 2;
    this.isVisible = true;
  }

  update() {
    super.update();
    this.fall();
  }

  draw() {
    super.draw();
    ellipse(this.sprite_x, this.sprite_y, this.sprite_w, this.sprite_h);
  }

  fall() {
    this.yspd += 0.01;
  }
}

class bigBulletofEnemy extends Bullet {
  constructor(shooter_x, shooter_y) {
    super(shooter_x, shooter_y);
    this.isFriend = false;
    this.xspd = 0;
    this.yspd = 3;
    this.sprite_R = 255;
    this.sprite_G = 1;
    this.sprite_B = 51;
    this.sprite_Alpha = 50;
    this.sprite_w = 60;
    this.sprite_h = 60;
    this.killingrange = 10;
    this.isVisible = true;
  }

  draw() {
    super.draw();
    ellipse(this.sprite_x, this.sprite_y, this.sprite_w, this.sprite_h);
    fill(this.sprite_R / 2, this.sprite_G / 2, this.sprite_B / 2);
    circle(this.sprite_x, this.sprite_y, this.killingrange);
  }
}

class Enemy extends Shooter {
  constructor() {
    super();
    this.hp = 1;
  }

  draw() {
    if (this.isVisible) {
      super.draw();
    }
  }

  hit() {
    this.hp--;
    if (this.hp <= 0) {
      this.hitflg = true;
    }
  }
}

class Sakura extends Enemy {
  constructor() {
    super();
    this.xspd = random(0, 1);
    this.yspd = random(0.1, 1);
    this.sprite_x = random(frameXfrom, (frameXfrom + frameXto - 3) / 2);
    this.sprite_y = random(frameYfrom, (frameYfrom + frameYto - 3) / 2);
    this.sprite_w = 9;
    this.sprite_h = 10;
    this.sprite_R = random(224, 255);
    this.sprite_G = random(128, 192);
    this.sprite_B = random(192, 255);
    this.killingrange = 4;
    this.isVisible = true;
    this.reward = 1000;
  }

  update() {
    super.update();
    this.swing();
    if (this.age === 60) {
      this.reward *= 0.1;
    }
  }

  draw() {
    if (this.isVisible) {
      super.draw();
      ellipse(this.sprite_x, this.sprite_y, this.sprite_w, this.sprite_h);
    }
  }

  swing() {
    if (this.age % 120 === 0) {
      this.xspd = random(0, 1) - 0.5;
      this.yspd = random(0.1, 1);
    }
  }
}

class Fairy01 extends Enemy {
  constructor() {
    super();
    this.xspd = 0;
    this.yspd = 1;
    this.sprite_x = ((frameXfrom + frameXto) / 2);
    this.sprite_y = frameYfrom;
    this.sprite_R = random(224, 255);
    this.sprite_G = random(192, 224);
    this.sprite_B = random(64, 96);
    this.killingrange = 4;
    this.isVisible = true;
    this.reward = 20000;
    this.hp = 4;
  }

  update() {
    super.update();
    this.toleft();
    if (this.age === 30) {
      this.reward *= 0.1;
    }
  }

  draw() {
    if (this.isVisible) {
      super.draw();
      ellipse(this.sprite_x, this.sprite_y, 5, 15);
      ellipse(this.sprite_x, this.sprite_y, 15, 5);
    }
  }

  toleft() {
    this.xspd -= 0.001;
  }
}

class Fairy02 extends Enemy {
  constructor() {
    super();
    this.xspd = 0;
    this.yspd = 1;
    this.sprite_x = ((frameXfrom + frameXto) / 2);
    this.sprite_y = frameYfrom;
    this.sprite_R = random(224, 255);
    this.sprite_G = random(64, 96);
    this.sprite_B = random(64, 96);
    this.killingrange = 4;
    this.isVisible = true;
    this.reward = 2500;
    this.hp = 8;
  }

  update() {
    super.update();
    this.toright();
  }

  draw() {
    if (this.isVisible) {
      super.draw();
      ellipse(this.sprite_x, this.sprite_y, 5, 20);
      ellipse(this.sprite_x, this.sprite_y, 20, 5);
    }
  }

  toright() {
    this.xspd += 0.002;
  }
}

class bigFairy extends Enemy {
  constructor() {
    super();
    this.xspd = 0;
    this.yspd = 1;
    this.sprite_x = ((frameXfrom + frameXto) / 2);
    this.sprite_y = frameYfrom;
    this.sprite_R = 255;
    this.sprite_G = 0;
    this.sprite_B = 255;
    this.killingrange = 4;
    this.isVisible = true;
    this.reward = 500000;
    this.hp1 = 80;
    //    this.spellhp1 = 800;
    this.spellhp1 = 80;
    this.hp2 = 80;
    //    this.spellhp2 = 1000;
    this.spellhp2 = 80;
    this.hp3 = 80;
    //    this.spellhp3 = 1200;
    this.spellhp3 = 80;
    this.hp = this.hp1;
    this.mode_nomal1 = "nomal1";
    this.mode_spell1 = "spell1";
    this.mode_nomal2 = "nomal2";
    this.mode_spell2 = "spell2";
    this.mode_nomal3 = "nomal3";
    this.mode_spell3 = "spell3";
    this.mode_now = "";
    this.spellBonus1 = 10000;
    this.spellBonus2 = 20000;
    this.spellBonus3 = 30000;
  }

  update() {
    super.update();
    if (this.age === 300) {
      this.stop();
      this.mode_now = this.mode_nomal1;
    }
    if (this.mode_now === this.mode_spell1 && this.hp === (this.spellhp1 / 2)) {
      this.toleft();
    }
    if (this.mode_now === this.mode_nomal2) {
      this.stop();
    }
  }

  draw() {
    if (this.isVisible) {
      super.draw();
      ellipse(this.sprite_x, this.sprite_y, 5, 35);
      ellipse(this.sprite_x, this.sprite_y - 5, 20, 5);
      fill(this.sprite_R, this.sprite_G, this.sprite_B, this.sprite_Alpha / 3);
      ellipse(this.sprite_x, canvasy - (frameYfrom / 2) , 40, 10);
      if (this.isMagiccircle) {
        strokeWeight(1);
        stroke((this.sprite_R), (this.sprite_G), (this.sprite_B), (this.sprite_Alpha / 2));
        fill(255, 255, 255, 0);
        circle(this.sprite_x, this.sprite_y, (this.killingrange * 25));
        circle(this.sprite_x, this.sprite_y, (this.killingrange * 30));
        triangle(this.sprite_x + (this.killingrange * 13.5), this.sprite_y + (this.killingrange * 7), this.sprite_x, this.sprite_y - (this.killingrange * 14), this.sprite_x - (this.killingrange * 13.5), this.sprite_y + (this.killingrange * 7));
        triangle(this.sprite_x + (this.killingrange * 13.5), this.sprite_y - (this.killingrange * 7), this.sprite_x, this.sprite_y + (this.killingrange * 14), this.sprite_x - (this.killingrange * 13.5), this.sprite_y - (this.killingrange * 7));
      }
    }
  }

  limitchk() {
    if ((frameXfrom + frameXto) <= this.sprite_x + this.sprite_w) { this.toleft() }
    if (this.sprite_x <= frameXfrom) { this.toright() }
    if ((frameYfrom + frameYto) <= this.sprite_y + this.sprite_h) { this.sprite_y = (frameYfrom + frameYto) - this.sprite_h }
    if (this.sprite_y <= frameYfrom) { this.sprite_y = frameYfrom }
  }

  hit() {
    this.hp--;
    if (this.hp <= 0) {
      if (this.mode_now === this.mode_nomal1) {
        this.hp = this.spellhp1;
        this.mode_now = this.mode_spell1;
        this.isMagiccircle = true;
        this.sprite_G += 50;
      } else if (this.mode_now === this.mode_spell1) {
        this.hp = this.hp2;
        this.mode_now = this.mode_nomal2;
        this.isMagiccircle = false;
      } else if (this.mode_now === this.mode_nomal2) {
        this.hp = this.spellhp2;
        this.mode_now = this.mode_spell2;
        this.isMagiccircle = true;
        this.sprite_G += 50;
      } else if (this.mode_now === this.mode_spell2) {
        this.hp = this.hp3;
        this.mode_now = this.mode_nomal3;
        this.isMagiccircle = false;
      } else if (this.mode_now === this.mode_nomal3) {
        this.hp = this.spellhp3;
        this.mode_now = this.mode_spell3;
        this.isMagiccircle = true;
        this.sprite_G += 50;
      } else if (this.mode_now === this.mode_spell3) {
        this.hitflg = true;
      }
    }
  }

  toright() {
    this.xspd = 1;
    this.yspd = 0;
  }
  toleft() {
    this.xspd = -1;
    this.yspd = 0;
  }
  stop() {
    this.xspd = 0;
    this.yspd = 0;
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
    this.sprite_y = (frameYfrom + frameYto) * 6 / 7;
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
    this.isLaser = false;
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
    if (this.isSuperarmor && this.isPichuuun && (120 < this.SuperarmorTimer)) {
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
        this.isLaser = true;
      } else {
        this.xspd = this.nomal_xspd;
        this.yspd = this.nomal_yspd;
        this.isMagiccircle = false;
        this.isLaser = false;
      }
      if (keyIsDown(90) || mouseIsPressed) {
        if (!this.isSuperarmor) {
          this.shoot();
        }
      }
    }

    if (0 < this.SuperarmorTimer) {
      this.SuperarmorTimer--;
      this.sprite_Alpha = 80;
    }
    if (this.SuperarmorTimer < 120) {
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
