function easing(x) {
  return x;
}

class Creature {
  constructor(r, p, creatures) {
    // 画面中央
    this.r = r;
    this.p = p;
    this.path = [];
    this.creatures = creatures;
  }
  update() {
    this.r++;
    // 5%の確率で分裂
    if (random() < 0.02) {
      this.r = R;
      this.creatures.push(new Creature(R, this.p, this.creatures));
      while (this.creatures.length > POPULATION) {
        this.creatures.shift();
      }
    }
  }
  move() {
    if (this.path.length > 0) {
      // １フレーム移動
      this.p = this.path.shift();
    } else {
      // 等速運動
      const x = random(R, windowWidth - R);
      const y = random(R, windowHeight - R);
      const q = createVector(x, y);
      const STEP = int(this.p.dist(q) / MOVE);
      for (let i = 1; i <= STEP; i++) {
        const x = i / STEP;
        this.path.push(p5.Vector.lerp(this.p, q, easing(x)));
      }
    }
  }
  draw() {
    fill('#56a764');
    circle(this.p.x, this.p.y, this.r);
  }
}
