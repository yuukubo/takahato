// 食物連鎖のシミュレータ
const R = 5;
const MOVE = 8;
const POPULATION = 100;
const RANGE = 200; // 種子が飛散する最大距離

let creatures = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  const p = createVector(windowWidth / 2, windowHeight / 2);
  creatures.push(new Plant(R * 10, p, creatures));
}

function draw() {
  background(0);
  for (const creature of creatures) {
    if (creature.r < R) {
      continue;
    }
    creature.update();
    creature.move();
    creature.draw();
  }
  while (creatures[0].r < R) {
    creatures.shift();
  }
  console.log(creatures.length);
}
