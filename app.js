let faceMesh;
let video;
let faces = [];
let options = { maxFaces: 1, refineLandmarks: false, flipHorizontal: false };
let sentences = [
  "SAVE THE STREAMING WORLD",
  "POTENTIAL STREAMER DETECTED"
];
let currentSentenceIndex = 0;
let displaySentence = sentences[currentSentenceIndex];

const place1 = document.getElementById('place1');
const place2 = document.getElementById('place2');
const about = document.getElementById('about');
const hearthover = document.getElementById('hearthover');
const start = document.getElementById('start');

start.addEventListener('mouseover', () => {
  start.textContent = 'ONLINE';
});
start.addEventListener('mouseout', function () {
  start.textContent = 'OFFLINE';
});

place1.addEventListener('mouseover', () => {
  about.style.display = 'block';
});

place1.addEventListener('mouseout', () => {
  about.style.display = 'none';
});

place2.addEventListener('mouseover', () => {
  hearthover.style.display = 'block';
});

place2.addEventListener('mouseout', () => {
  hearthover.style.display = 'none';
});




let times = 1.8;
function preload() {
  faceMesh = ml5.faceMesh(options);
}

function setup() {
  createCanvas(640 * times, 480 * times);

  video = createCapture(VIDEO);
  video.size(640 * times, 480 * times);
  video.hide();

  faceMesh.detectStart(video, gotFaces);

  textSize(30);
  textAlign(CENTER, CENTER);
  textFont('VT323');

  // 每5秒更新一次句子
  setInterval(updateSentence, 3000);


}

function draw() {
  let r = 128 + 128 * sin(millis() / 1000);
  let g = 128 + 128 * sin(millis() / 1500);
  let b = 128 + 128 * sin(millis() / 2000);

  // tint(r, g, b);

  // draw the webcam video
  image(video, 0, 0, width, height);

  // draw the faces' bounding boxes
  for (let i = 0; i < faces.length; i++) {
    let face = faces[i];
    let x = face.box.xMin;
    let y = face.box.yMin;
    let w = face.box.width;
    let h = face.box.height;
    let centerX = (face.box.xMin + face.box.xMax) / 2; // average of xMin and xMax
    let centerY = (face.box.yMin + face.box.yMax) / 2; // average of yMin and yMax

    stroke(34, 206, 254)
    fill(226, 61, 142, 50);
    rect(x * times, y * times, w * times, h * times);



    noStroke();
    fill(255, 255, 255);
    text(displaySentence, centerX * times, centerY * times);
  }
}





function gotFaces(results) {
  faces = results;
}

function updateSentence() {
  currentSentenceIndex = (currentSentenceIndex + 1) % sentences.length;
  displaySentence = sentences[currentSentenceIndex];

}


document.addEventListener('keydown', function (event) {
  if (event.code === 'Space') {
    window.location.href = 'live.html';
  }
});

