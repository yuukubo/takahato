function easing(x) {
  return x;
}

class Creature {
  constructor(r, p, creatures) {
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
    circle(this.p.x, this.p.y, sqrt(this.r) * 4);
  }
}

class Plant extends Creature {
  constructor(r, p, creatures) {
    super(r, p, creatures);
    this.type = "PLANT";

    let v = p5.Vector.random2D().mult(random(RANGE));
    let q = p5.Vector.add(this.p, v);
    while (q.x < R || windowWidth - R < q.x || q.y < R || windowHeight - R < q.y) {
      v.rotate(random());
      q = p5.Vector.add(this.p, v);
    }
    this.p = q;
  }
  update() {
    // 十分なスペースで成長し、過密で衰弱する
    const neighbours = this.creatures.filter((c) => c.type === "PLANT" && this.p.dist(c.p) < 50).length;
    if (neighbours < 2) {
      this.r += 4;
    } else if (neighbours < 4) {
      this.r += 2;
    } else if (neighbours < 6) {
      this.r -= 2;
    } else {
      this.r -= 4;
    }

    // 十分に育つと分裂
    if (this.r > 400 && random() < 0.1) {
      this.creatures.push(new Plant(this.r / 4, this.p, this.creatures));
    }
  }
  move() {
  }
}
