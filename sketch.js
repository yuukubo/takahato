// 食物連鎖のシミュレータ
const INIT = 16; // 生物の初期サイズ
const MIN = 12; // 生存最小サイズ
const MAX = 128; // 成熟サイズ
const NEAR = 100; // 隣接判定距離
const DENSITY = 8; // 共存可能個体数
const RANGE = 300; // 種子が飛散する最大距離

let plants = new Plants();

function setup() {
  createCanvas(windowWidth, windowHeight);
  const p = createVector(windowWidth, windowHeight).div(2); // 画面中央
  const plant = new Plant(p);
  plants.add(plant);
}

function draw() {
  background(0);
  plants.update();
  plants.draw();
  textSize(32);
  fill(255);
  text(plants.size, 10, 50);
}
