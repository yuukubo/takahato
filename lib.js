function easing(x) {
  return x;
  // return 4 * (x - 0.5) ** 3 + 0.5;
}

class Creature {
  constructor() {
    // 画面中央
    this.p = createVector(windowWidth / 2, windowHeight / 2);
    this.path = [];
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
    circle(this.p.x, this.p.y, 100);
  }
}
