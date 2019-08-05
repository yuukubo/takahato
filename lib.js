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
  update(){
    // must be override
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

class Plant extends Creature {
  constructor(r, p, creatures) {
    super(r, p, creatures);

    let d = p5.Vector.random2D().mult(random(RANGE));
    let q = p5.Vector.add(this.p, d);
    while (q.x < R || windowWidth - R < q.x || q.y < R || windowHeight - R < q.y) {
      d.rotate(random());
      q = p5.Vector.add(this.p, d);
    }

    const STEP = int(this.p.dist(q) / MOVE);
    for (let i = 1; i <= STEP; i++) {
      const x = i / STEP;
      this.path.push(p5.Vector.lerp(this.p, q, easing(x)));
    }
  }
  update() {
    if (this.r < 50) {
      this.r++;
    }
    // 5%の確率で分裂
    if (random() < 0.005) {
      this.creatures.push(new Plant(R, this.p, this.creatures));
      while (this.creatures.length > POPULATION) {
        this.creatures.shift();
      }
    }
  }
  move() {
    if (this.path.length > 0) {
      this.p = this.path.shift();
    }
  }
}
