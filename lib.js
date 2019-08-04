function easing(x) {
  return 1 - (x - 1) ** 4;
}

class Creature {
  constructor() {
    this.p = createVector(windowWidth / 2, windowHeight / 2);
    this.path = [];
  }
  update() {
    if (this.path.length === 0 && random() < 0.03) {
      const q = createVector(random(windowWidth - 2 * R) + R, random(windowHeight - 2 * R) + R);
      for (let i = 0; i < STEP; i++) {
        const x = (i + 1) / STEP;
        this.path.push(p5.Vector.lerp(this.p, q, easing(x)));
      }
    }
  }
  move() {
    if (this.path.length > 0) {
      this.p = this.path.shift();
    }
  }
  draw() {
    circle(this.p.x, this.p.y, 100);
    line(0, 0, this.p.x, this.p.y);
  }
}
