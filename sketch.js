let x = [];
let y = [];
let fourierX;
let fourierY;
let time = 0;
let path = [];
let circles, freq_slider;
function setup() {
  createCanvas(600, 400);
  //Sliders to interact with the sketch
  circles = createSlider(1, 15, 3, 1);
  freq_slider = createSlider(1, 10, 1, 1);
  let angle = 0;
  for (let i = 0; i < 500; i++) {
    angle = map(i,0,100,0,TWO_PI);
    y[i] = 150*noise(angle);
    x[i] = 150*noise(angle+100);
  }
  fourierX = dft(x);
  fourierY = dft(y);
  console.log(fourierY);
}
function epiCycles(x, y, rotation, fourier) {
  for (let i = 0; i < fourier.length; i++) {
    let prevx = x;
    let prevy = y;
    let freq = fourier[i].freq;
    let radius = fourier[i].amp;
    let phase = fourier[i].phase;
    x += radius * cos(freq * time + phase + rotation);
    y += radius * sin(freq * time + phase + rotation);

    stroke(255, 100);
    noFill();
    ellipse(prevx, prevy, radius * 2);
    stroke(255);
    line(prevx, prevy, x, y);
  }
  return createVector(x, y);

}
function draw() {
  background(0);

  let vx = epiCycles(400,50,0,fourierX);
  let vy = epiCycles(50,250,HALF_PI,fourierY);
  let v = createVector(vx.x,vy.y);

  path.unshift(v);
  line(vx.x, vx.y, v.x,v.y);
  line(vy.x, vy.y, v.x,v.y);
  //translate(200, 0);
  //line(x-200, y, 0, path[0]);

  beginShape();
  noFill();
  for (let i = 0; i < path.length; i++) {
    vertex(path[i].x,path[i].y);
  }
  endShape();

  const dt = TWO_PI / fourierY.length;
  time += dt;

  while (path.length > 300) {
    path.pop();
  }
}
