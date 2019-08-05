function easing(x) {
  return sqrt(1 - (x - 1) ** 2);
}

class Creature {
  constructor() {
    // 画面中央
    this.p = createVector(windowWidth / 2, windowHeight / 2);
    this.path = [];
    this.wait = 10;
  }
  move() {
    if (this.path.length > 0) {
      // １フレーム移動
      this.p = this.path.shift();
    } else if (this.wait > 0) {
      // その場で待つ
      this.wait--;
    } else {
      // STEPフレームの移動を決める
      const x = random(R, windowWidth - R);
      const y = random(R, windowHeight - R);
      const q = createVector(x, y);
      for (let i = 1; i <= STEP; i++) {
        const x = i / STEP;
        this.path.push(p5.Vector.lerp(this.p, q, easing(x)));
      }
      // 待ち時間を決める
      this.wait = random(MAX_WAIT);
    }
  }
  draw() {
    line(0, 0, this.p.x, this.p.y);
    circle(this.p.x, this.p.y, 100);
  }
}
