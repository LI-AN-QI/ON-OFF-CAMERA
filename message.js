let boxes = [];
let circles = [];
let score = 60;
let draggingCircle = null;
let circleCount = 0;
const maxCircles = 60;
let sentences = [
    "hey baby",
    "I really like you",
    "can you stop streaming",
    "I can give you money",
    "I want to see you in person",
    "do you have a boyfriend",
    "can you show me your feet",
    "I miss you",
    "I want to see you",
    "when will you stream today",
    "can we do a video call",
    "why don't you reply to my messages",
    "I want to know you better",
    "can you be my girlfriend",
    " I can give you money",
    "I want to see you in person",
    "I can give you money",
];


let PMsound;
let matchsound;

function preload() {
    matchsound = loadSound('./music/PM1.MP3');
    PMsound = loadSound('./music/PM2.MP3');
}


function setup() {
    const myCanvas = createCanvas(1500, 650);
    myCanvas.parent('canvas-container');
    textAlign(CENTER, CENTER);  // 设置文本对齐方式为居中
    textFont('VT323');
    // Create four different color boxes

    boxes.push(new Box(180, 600, 280, 80, color(255, 40, 162)));
    boxes.push(new Box(560, 600, 280, 80, color(0, 240, 163)));
    boxes.push(new Box(950, 600, 280, 80, color(87, 0, 255)));
    boxes.push(new Box(1320, 600, 280, 80, color(255, 82, 247)));
}

function draw() {
    background(35, 28, 50);

    for (let box of boxes) {
        box.display();
    }

    for (let circle of circles) {
        circle.display();
    }
    fill(245, 165, 232);
    textSize(28);
    text('VIPs LOYALTY: ' + score, width / 2 + 10, 60);

    if (draggingCircle) {
        draggingCircle.x = mouseX;
        draggingCircle.y = mouseY;
    }

    checkScore();

    // Update new message count
    updateMessageNumber(circleCount);

}

//检查分数
function checkScore() {
    if (score <= 0) {
        document.getElementById('end1').style.display = 'block';
    }

    if (score >= 100) {
        document.getElementById('end2').style.display = 'block';
    }
}

//更新新消息数量
function updateMessageNumber(newCount) {
    const messageNumberElement = document.getElementById('newmessagenumber');
    messageNumberElement.innerText = ` ${newCount}`;
}


function mousePressed() {
    for (let circle of circles) {
        if (dist(mouseX, mouseY, circle.x, circle.y) < circle.r + 20) {
            draggingCircle = circle;
            break;
        }
    }
}

function mouseReleased() {
    if (draggingCircle) {
        for (let box of boxes) {
            if (box.contains(draggingCircle)) {
                // Only check the color match
                if (box.col.levels[0] === draggingCircle.col.levels[0] &&
                    box.col.levels[1] === draggingCircle.col.levels[1] &&
                    box.col.levels[2] === draggingCircle.col.levels[2]) {
                    circles.splice(circles.indexOf(draggingCircle), 1);
                    score += 5;
                    if (matchsound.isLoaded()) {
                        matchsound.play();
                    }
                    document.getElementById('scoreadd').style.display = 'block';
                    setTimeout(() => {
                        document.getElementById('scoreadd').style.display = 'none';
                    }, 1000);
                    circleCount--;

                    break;
                }
            }
        }
        draggingCircle = null;
    }
}

function reduceScore() {
    score -= 10;
    document.getElementById('scorereduce').style.display = 'block';
    setTimeout(() => {
        document.getElementById('scorereduce').style.display = 'none';
    }, 1000);
}

function generateCircle() {
    if (circleCount < maxCircles) {
        let colors = [color(255, 40, 162), color(0, 240, 163), color(87, 0, 255), color(255, 82, 247)];
        let col = random(colors);
        let sentence = random(sentences); // Randomly select a sentence
        circles.push(new Circle(random(190, 1300), random(110, 500), 25, col, sentence));
        //消息范围
        circleCount++;
        if (PMsound.isLoaded()) {
            PMsound.play();
        }



    }

}

class Box {
    constructor(x, y, w, h, col) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.col = col;
    }

    display() {
        fill(this.col);
        rect(this.x, this.y, this.w, this.h);
    }

    contains(circle) {
        let textWidthValue = textWidth(circle.text);
        let padding = 10;
        let rectWidth = textWidthValue + padding * 2;
        let rectHeight = 30;

        return (circle.x - rectWidth / 2 < this.x + this.w &&
            circle.x + rectWidth / 2 > this.x &&
            circle.y - rectHeight / 2 < this.y + this.h &&
            circle.y + rectHeight / 2 > this.y);
    }
}

class Circle {
    constructor(x, y, r, col, text) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.col = col;
        this.text = text;
    }

    display() {
        // Draw background for text
        fill(this.col); // 设置文本背景颜色为圆球的颜色
        let textWidthValue = textWidth(this.text); // 获取文本的宽度
        let padding = 10;
        rectMode(CENTER);
        rect(this.x, this.y, textWidthValue + padding * 2, 30);

        // Draw circle
        noFill();  // 设置圆球为透明
        noStroke();
        ellipse(this.x, this.y, this.r * 2, this.r * 2);

        // Draw text
        fill(255);  // 设置文本颜色为黑色
        textSize(16);  // 设置文本大小
        text(this.text, this.x, this.y); // Display text at the center of the circle
    }
}


//游戏提示
const messages = [
    "Congrats again VIKI👏👏, you have reached the second level of your streaming journey!",
    "These four guys are your TOP4️⃣ viewers on gift count list, your VIPs.",
    "Build a good relationship with them, and they will give you more🤗",
    "When they message you, reply them by ❕DRAGGING IT TO THE RIGHT COLOR BOX❕",

];
const messages2 = [
    "Don't care too much on what they said",
    "Remember, all you want is money, you are not finding love here",
    "Don't let your viewer loyalty drop",
]

let currentIndex = 0;
let currentIndex2 = 0;
const messageContainer = document.getElementById('message-container2');
const messageElement = document.getElementById('message2');

//初始提示
document.addEventListener('DOMContentLoaded', () => {
    showMessage();
    // resetNoSpeechTimeout();


});

function showMessage() {

    if (currentIndex < messages.length) {
        messageElement.textContent = messages[currentIndex];
        messageContainer.classList.remove('hidden');


        setTimeout(() => {
            messageContainer.classList.add('hidden');
            currentIndex++;
            setTimeout(showMessage, 500);

            setTimeout(() => {
                document.getElementById('names').classList.add('show');
                document.getElementById('names').style.display = 'block';
                document.getElementById('names2').classList.add('show');
                document.getElementById('names').style.display = 'block';
            }, 1000);


        }, 5000);
    }

    if (currentIndex >= messages.length) {
        console.log("show messages now")
        setTimeout(showMessage2, 6000);
        //生成新消息速度
        setInterval(generateCircle, 1000);

        //五秒后开始每1.5秒减少score(viewer loyalty value)
        setTimeout(() => {

            document.getElementById('mask_box').style.opacity = 0;
            document.getElementById('names').classList.add('shake');
            document.getElementById('names2').classList.add('shake');

            setTimeout(() => {
                setInterval(reduceScore, 3000);
            }, 2500);

        }, 1500);

    }
}

function showMessage2() {
    if (currentIndex2 < messages2.length) {
        messageElement.textContent = messages2[currentIndex2];
        messageContainer.classList.remove('hidden');

        setTimeout(() => {
            messageContainer.classList.add('hidden');
            setTimeout(() => {
                currentIndex2++;
            }, 2000);
            setTimeout(showMessage2, 500);
        }, 5000);
    }
}