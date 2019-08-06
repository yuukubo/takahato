function easing(x) {
  return x;
}

class Plants extends Map {
  add(plant) {
    this.set(plant.id, plant);
    this.count();
  }
  remove(plant) {
    this.delete(plant.id);
    this.count();
  }
  // 近接生物数、自身を含む
  count() {
    for (const plant of this.values()) {
      plant.count = [...this.values()].filter((other) => {
        return plant.p.dist(other.p) < plant.size * 2;
      }).length;
    }
  }
  update() {
    for (const plant of this.values()) {
      if (plant.size < MIN) {
        this.remove(plant);
      } else if (plant.size > MAX) {
        const child = plant.create();
        this.add(child);
      }
      plant.update();
      plant.draw();
    }
  }
  draw() {
    for (const plant of this.values()) {
      plant.draw();
    }
  }
}

class Plant {
  constructor(p) {
    this.p = p;
    this.id = random(1000000);
    this.size = INIT;
    this.count = 1; // 近隣生物の数
  }
  create() {
    const q = p5.Vector.random2D().mult(random(RANGE)).add(this.p);
    const x = constrain(q.x, 0, windowWidth);
    const y = constrain(q.y, 0, windowHeight);
    return new Plant(createVector(x, y));
  }
  update() {
    // 十分なスペースで成長し、過密で衰弱する
    if (this.count < DENSITY) {
      this.size += 1;
    } else {
      this.size -= 2;
    }
  }
  draw() {
    fill('#56a764');
    circle(this.p.x, this.p.y, this.size);
  }
}
