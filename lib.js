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
        return plant.p.dist(other.p) < NEAR;
      }).length;
    }
  }
  update() {
    for (const plant of this.values()) {
      if (plant.size < MIN) {
        this.remove(plant);
      } else if (plant.size > MAX && random() < 0.1) {
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
    this.count = 0; // 近隣生物の数
  }
  create() {
    this.size /= 2;
    const q = createVector(random(windowWidth), random(windowHeight));
    q.sub(this.p).limit(RANGE);
    return new Plant(q.add(this.p));
  }
  update() {
    // 十分なスペースで成長し、過密で衰弱する
    if (this.count < 2) {
      this.size += 4;
    } else if (this.count < 4) {
      this.size += 2;
    } else if (this.count < 6) {
      this.size -= 2;
    } else {
      this.size -= 4;
    }
  }
  draw() {
    fill('#56a764');
    circle(this.p.x, this.p.y, this.size);
  }
}
