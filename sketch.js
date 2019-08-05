// タカハトゲームのシミュレータ
const R = 5;
const MOVE = 2;
const POPULATION = 500;

let creatures = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  const p = createVector(windowWidth / 2, windowHeight / 2);
  creatures.push(new Creature(R, p, creatures));
}

function draw() {
  background(0);
  for (const creature of creatures) {
    creature.update();
    creature.move();
    creature.draw();
  }
}
