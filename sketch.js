// タカハトゲームのシミュレータ
const STEP = 30;
const R = 50;
const MAX_WAIT = 30;

let creature;

function setup() {
  createCanvas(windowWidth, windowHeight);
  creature = new Creature();
}

function draw() {
  background(255);
  creature.move();
  creature.draw();
}
