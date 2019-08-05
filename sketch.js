// タカハトゲームのシミュレータ
const R = 50;
const MOVE = 4;

let creatures = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  creatures.push(new Creature());
  creatures.push(new Creature());
  creatures.push(new Creature());
}

function draw() {
  background(0);
  for (const creature of creatures) {
    creature.move();
    creature.draw();
  }
}
