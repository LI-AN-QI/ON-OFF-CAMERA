//Question: draw based on eye?
let faceMesh;
let eye;
let faces = [];
let options = {
    maxFaces: 20,
    refineLandmarks: false,
    flipHorizontal: true
};






const messages = [
    "Hey VIKI. Welcome to your first live!",
    "Yes, this is the nickname we designed for you!💕",
    "I will tell you everything about streaming,🤗",
    "And let you understand how to interact with your viewers.",
    "So always keep an eye for my messages.🧐",
    "Now let's start with the basics.👍",
    "Have you noticed the live comment on the left?",
    "Try to say ❕WELCOME + USERNAME❕ when viewers joined.",
];

const secondMessage = [
    "Nice job👍",
    "I think you got the talent to be a streamer.",
    "Now you need to retain your viewers.",
    "Say welcome, answer questions, just don't let your room get quiet.",
];


const thirdMessage = [
    "WOAH. Someone just sent you a gift that worth ￥500😯😯😯.",
    "You are doing well!",
    "I know I was right about you.",
    "You have already attracted those who are willing to spend money on your gifts.💴",
    "They are the important viewers for you.",
    "Forget about those who never spend money🙄",
    "Stop the live, let's do something more rewarding...😊",
]



const saysomething = [
    "Say something!!!",
    "Just answer the questions",
    "Don't be shy",
    "say [WELCOME + USERNAME]!!",
]

let currentIndex = 0;
const messageContainer = document.getElementById('message-container');
const messageElement = document.getElementById('message');
const endstream = document.getElementById('endstream');


//初始提示
document.addEventListener('DOMContentLoaded', () => {

    function showMessage() {
        if (currentIndex < messages.length) {
            messageElement.textContent = messages[currentIndex];
            messageContainer.classList.remove('hidden');

            setTimeout(() => {
                messageContainer.classList.add('hidden');
                currentIndex++;
                setTimeout(showMessage, 500);
            }, 5000);
        }
    }
    showMessage();
    // resetNoSpeechTimeout();
});


let secondIndex = 0;
function showSecondMessage() {

    if (secondIndex < secondMessage.length) {
        messageElement.textContent = secondMessage[secondIndex];
        messageContainer.classList.remove('hidden');

        setTimeout(() => {
            messageContainer.classList.add('hidden');
            secondIndex++;
            setTimeout(showSecondMessage, 500);
        }, 5000);
    }

    if (secondIndex >= secondMessage.length) {
        console.log("detect start")
        //resetNoSpeechTimeout()
        setTimeout(showMessageSaySomething, 6000);
    }

}


let thirdIndex = 0;
function showThirdMessage() {

    if (thirdIndex < thirdMessage.length) {
        messageElement.textContent = thirdMessage[thirdIndex];
        messageContainer.classList.remove('hidden');

        setTimeout(() => {
            messageContainer.classList.add('hidden');
            thirdIndex++;
            setTimeout(showThirdMessage, 500);
        }, 5000);
    }

}



let saysomethingIndex = 0;
function showMessageSaySomething() {

    if (saysomethingIndex < saysomething.length) {
        messageElement.textContent = saysomething[saysomethingIndex];
        messageContainer.classList.remove('hidden');

        setTimeout(() => {
            messageContainer.classList.add('hidden');
            saysomethingIndex++;
            setTimeout(showMessageSaySomething, 500);
        }, 3000);
    }
}

let bgm2; // 声明全局变量

window.addEventListener('load', function () {
    bgm2 = document.getElementById('bgm2'); // 在页面加载完成后获取音频元素
    bgm2.play(); // 播放音频
});


let commentsound;
let coinsound;

function preload() {
    commentsound = loadSound('./music/comment.mp3');
    coinsound = loadSound('./music/coin.MP3');
    faceMesh = ml5.faceMesh(options);
    eye = loadImage('img/eye.png');
    spot = loadImage('img/bkd_shape1.png');
}







//正确阅读后的积分
let points = 0;
//阅读正确后的爱心gif
const heartGif = document.getElementById('heartGif');

const coinGif = document.getElementById('coin');

//超过后恢复显示原instruction文字的时间(keep talking)
let listeningTimeout;


//语音识别
let speechRec;


//波浪
let xspacing = 5; // 每个水平位置之间的距离
let w; // 整个波浪的宽度
let theta = 0.0; // 初始角度为 0
let amplitude = 9.0; // 波浪的高度
let period = 100.0; // 波浪重复的周期
let dx; // 增量 x 值
let yvalues; // 用于存储波浪高度值的数组
let mic;
let resultText = '';







function setup() {
    // 创建语音识别对象
    speechRec = new p5.SpeechRec('en-US', gotSpeech);
    let continuous = true;
    let interimResults = false;
    speechRec.start(continuous, interimResults);


    // 初始化监听状态(文字placeholder)：TALK TO YOUR VIEWERS...
    document.getElementById('result').textContent = 'TALK TO YOUR VIEWERS...';

    //人像捕捉
    let videoContainer1 = document.getElementById('camera1');
    let canvas1 = createCanvas(1400, 670);
    canvas1.parent(videoContainer1);
    video1 = createCapture(VIDEO);
    // video1.size(480, 270);
    video1.hide();

    faceMesh.detect(video1, gotFaces);


    //绘制波浪的setup
    createCanvas(windowWidth, windowHeight);
    w = width + 16;
    dx = (TWO_PI / period) * xspacing;
    yvalues = new Array(floor(w / xspacing));
    mic = new p5.AudioIn();
    mic.start();


}






let wordCount = 0; // 用于计数每秒说的字数
let lastTime = 0; // 上一次计数的时间
let totalTime = 0;

//let currentTime = millis(); // 当前时间

function draw() {
    background(158, 226, 252);
    translate(width, 0);
    scale(-1, 1);//Mirroring the Video 
    //tint(255,0,150);
    image(spot, 0, 0, windowWidth, windowHeight);
    image(video1, width / 2 - video1.width / 2, height / 2 - video1.height / 2);





    // //draw eyes
    // for (let j = 0; j < faces.length; j++) {
    //     let face = faces[j];
    //     console.log(face);




    //     let lefteyepoint = face.leftEye;
    //     let lefteyex = lefteyepoint.x;
    //     let lefteyey = lefteyepoint.y;
    //     fill(0)
    //     rect(lefteyex, lefteyey, 500, 500)
    //     image(eye, lefteyex / 2, lefteyey / 2 - 10, 20, 30)

    //     let righteyepoint = face.rightEye;
    //     let righteyex = righteyepoint.x;
    //     let righteyey = righteyepoint.y;
    //     image(eye, righteyex / 2 - 2, righteyey / 2 - 10, 20, 30)

    // }

    //根据声音绘制波浪
    calcWave();
    renderWave();
}

function gotFaces(results) {
    faces = results;
}

// 辅助函数：计算输入文本中的单词数量
function countWords(text) {
    let words = text.split(' '); // 将文本按空格分割为单词数组
    return words.length; // 返回单词数量
}

// 监听语音识别结果
function gotSpeech() {
    if (speechRec.resultValue) {
        let transcript = speechRec.resultString.toLowerCase(); // 获取识别的文本并转换为小写
        console.log("you said: " + speechRec.resultString)


        wordCount += countWords(transcript);
        console.log(wordCount)//识别说的单词字数


        document.getElementById('result').textContent = transcript; // 在页面底部显示识别刚刚说的话



        // 检查识别结果是否包含目标句子，如果包含则增加积分
        if (targetSentences.includes(transcript)) {
            //When get score, 
            points += 20;
            document.getElementById('points').textContent = `${points}`;


            // Add animation to enlarge the size when points increase by 1
            document.getElementById('points').classList.add('enlarge');
            // Remove the enlarge class after 1 second
            setTimeout(() => {
                document.getElementById('points').classList.remove('enlarge');
            }, 600);


            //Add sound effect 
            if (coinsound.isLoaded()) {
                coinsound.play();
            }


            // 显示爱心 GIF + coin gif
            heartGif.style.display = 'block';

            coinGif.style.display = 'block';

            // 3秒后隐藏爱心 GIF + coin GIF
            setTimeout(() => {
                heartGif.style.display = 'none';

                coinGif.style.display = 'none';
            }, 1000);


        }



        // 设置定时器，在3秒后恢复显示 "KEEP TALKING..."
        clearTimeout(listeningTimeout);// 清除之前设置的定时器
        listeningTimeout = setTimeout(() => {
            document.getElementById('result').textContent = 'KEEP TALKING ...';
        }, 3000);


        /////////////////////////////////
        //利用语音输入控制波浪的形状
        resultText = speechRec.resultString;// Text to String（字符串）
        console.log(resultText);
        let newSpacing = parseFloat(resultText); // String to Float（浮点数）

        if (!isNaN(newSpacing) && newSpacing > 0) {
            xspacing = newSpacing;// 更新 xspacing （间距值）
            dx = (TWO_PI / period) * xspacing; // 更新 dx（波的每次前进）
            yvalues = new Array(floor(w / xspacing)); // 更新 yvalues（波的高度）
        }

    }



    if (points > 20) {
        showSecondMessage();
    }

    //大于100时，展示礼物
    if (points > 100) {
        console.log("show a giftcomment ")
        // 开始展示礼物
        showgift();
        //whenever a gitf comment show, a gift gif show

        //when you put on the right headware, you will get a gift
    }

    if (points > 200 || points == 200) {
        console.log("show third comment")
        showThirdMessage();
        setTimeout(() => {
            //显示结束直播的按钮
            endstream.style.display = 'block';
            //window.location.href = 'message.html';
        }, 36000);
    }



    console.log(points);
    // Reset the no-speech timer every time speech is detected
    //resetNoSpeechTimeout();

}

// const noSpeechDuration = 6000; // 6s seconds 
// //let noSpeechTimeout;

// function resetNoSpeechTimeout() {
//     //clearTimeout(noSpeechTimeout);
//     setTimeout(showMessageSaySomething, noSpeechDuration);
// }


function calcWave() {
    // 获取音频级别
    let vol = mic.getLevel();
    // 映射音频级别到波浪高度
    amplitude = map(vol, 0, 1, 5, 50);

    // 增量 theta
    theta += 0.08;

    // 计算波浪高度
    let x = theta;
    for (let i = 0; i < yvalues.length; i++) {
        yvalues[i] = sin(x) * amplitude;
        x += dx;
    }
}

function renderWave() {
    noStroke();
    // fill(87, 0, 255);
    fill(255, 147, 200)
    //波浪颜色

    beginShape();
    // 画波浪的顶端
    for (let x = 0; x < yvalues.length; x++) {
        vertex(x * xspacing, height - 100 + yvalues[x]);
    }
    // 画波浪的底部，封闭形状
    vertex(width, height);
    vertex(0, height);

    endShape(CLOSE);
}



////////////////////////////////////////////////////////////////////
//评论区
//可获得积分的句子
const targetSentences = [
    'hi',
    'hello',
    'thank you',
    'welcome bob',
    'welcome lily',
    'welcome yellowsnoeman',
    'welcome happy chatter',
    'welcome juju',
    'welcome john',
    'welcome pizza time king',
    'welcome kirby',
    'welcome google was my idea',
    'welcome bear X',
    'welcome duck simulator',
    'welcome everybody',
    'welcome hey you',
    'welcome almond milk',
    'welcome username copied',
    'welcome something',
    'welcome ja-hao',
    'welcome unfriend me',
    'welcome baby doodles',
    'welcome kim chi',
    'welcome i drink chocolatemilk',
    'welcome just a harmless potato',
    'welcome ima robot',
    'welcome susu',
    'welcome turkey sandwich',
    'welcome UFO believer',
    'welcome unnecessary',
    'welcome the failure',
    'welcome test name',
    'welcome definitely not an athlete',
    'welcome magic school',
    'thank you noah',
    'welcome everyone to my stream'];

//每隔1s生成一条弹幕
//其中夹杂 XXX joined (读出名字触发积分)
let comments = [
    "♦0 Anonymous user: hi",
    "♦0 Anonymous user: ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️",
    "♦0 Anonymous user: hey VIKI",
    "♦0 Anonymous user: 👋👋👋👋",
    "Happy_chatter joined",
    "♦0 Anonymous user: Hi beautiful",
    "♦2 Anonymous user: you r pretty❤️",
    "♦0 Anonymous user: hi👋",
    "Bob joined",
    "♦0 Anonymous user: Why live",
    "♦0 Anonymous user: you look disappointed",
    "♦4 Anonymous user: can you sing",
    "♦0 Anonymous user: 😙😙you are beautiful!!!!!",
    "♦2 Anonymous user: what did i see",
    "Lily joined",
    "♦14 Anonymous user: 6",
    "♦14 Anonymous user: 刷到熟人了😂",
    "♦0 Anonymous user: why didn't you welcome me",
    "♦0 Anonymous user: how old are you",
    "♦1 Anonymous user: Ew",
    "♦1 Anonymous user: what was on your face",
    "Lily left",
    "♦0 Anonymous user: when did you start",
    "Bob left",
    "Juju joined",
    "♦0 Anonymous user: VIKI what is your type?❤️",
    "♦0 Anonymous user: 😶😶can you take off your beauty filter",
    "Juju left",
    "♦4 Anonymous user: are you real person?",
    "♦0 Anonymous user: 666",
    "♦0 Anonymous user: it's so nice",
    "John joined",
    "♦0 Anonymous user: 😶😶can you take off your beauty filter",
    "♦1 Anonymous user: 么么",
    "♦1 Anonymous user: 又可爱了",
    "♦1 Anonymous user: I saw it",
    "Kirby joined",
    "♦2 Anonymous user: 主播平时什么时候直播",
    "♦0 Anonymous user: pretty girl 😻",
    "♦0 Anonymous user: 😇💝💖❤️❤️❤️❤️❤️❤️💙",
    "pizza_time_king joined",
    "♦3 Anonymous user: You look adorable in your outfit",
    "♦3 Anonymous user: how old are you",
    "Juju followed you",
    "duck.simulator joined",
    "♦13 Anonymous user: Am i your friend??",
    "♦13 Anonymous user: Am i your friend??",
    "♦2 Anonymous user: 666",
    "Everybody joined",
    "♦2 Anonymous user: 666",
    "♦2 Anonymous user: **！这不那谁吗",
    "♦0 Anonymous user: 👀WOAHHHHHH",
    "♦1 Anonymous user: May I ask whre you are from",
    "Ja-Hao joined",
    "♦8 Anonymous user: i know u see me bb girl",
    "♦8 Anonymous user: I will follow you then lol",
    "♦8 Anonymous user: I love you❤️",
    "unfriendme joined",
    "unfriendme followed you",
    "♦0 Anonymous user: nooooooo :（ ",
    "♦0 Anonymous user: VIKI是不是瘦了",
    "unfriendme left",
    "Magic.school joined",
    "♦2 Anonymous user: sleepy💤",
    "♦4 Anonymous user: do you go live every day VIKI?",
    "♦0 Anonymous user: can you turn around",
    "baby doodles joined",
    "♦0 Anonymous user: YOU ARE SO CUTE",
    "♦1 Anonymous user: 可以跳舞吗VIKIVIKIVIKIVIKI",
    "baby doodles left",
    "google_was_my_idea joined",
    "♦9 Anonymous user: VIKI❤️❤️❤️❤️❤️ ",
    "♦9 Anonymous user: You don't like my gift?😒 ",
    "Everybody left",
    "google_was_my_idea left",
    "♦2 Anonymous user: I am fine and you ",
    "♦2 Anonymous user: 好看",
    "♦2 Anonymous user: Ni Hao",
    "kim_chi joined",
    "kim_chi followed you",
    "♦0 Anonymous user: so 🔥 ",
    "♦0 Anonymous user: too 🔥",
    "Definitely_not_an_athlete joined",
    "♦14 Anonymous user: can you dance",
    "Magic.school followed you",
    "test_name joined",
    "♦0 Anonymous user: how old are you",
    "♦14 Anonymous user: Good luck in the live miss",
    "Bob left",
    "♦0 Anonymous user: can you take off your beauty filter",
    "♦0 Anonymous user: 榜一大哥真厉害",
    "bearX joined",
    "♦3 Anonymous user: why didn't you welcome me",
    "♦0 Anonymous user: SHE SAID SHE CANT",
    "hey_you joined",
    "♦0 Anonymous user:👀👀👀👀👀👀",
    "♦0 Anonymous user: did you have an awesome day VIKI",
    "♦0 Anonymous user: did you have an awesome day VIKI?",
    "AlmondMilk joined",
    "♦0 Anonymous user: can you show me your room",
    "♦0 Anonymous user: 666",
    "idrinkchocolatemilk joined",
    "♦2 Anonymous user: follow me back follow me back ",
    "♦0 Anonymous user: hope you are ok",
    "username_copied joined",
    "♦2 Anonymous user: follow me back follow me back ",
    "♦2 Anonymous user: follow me back follow me back ",
    "ima.robot joined",
    "♦0 Anonymous user: 666",
    "♦0 Anonymous user: I love you",
    "Something joined",
    "♦0 Anonymous user: relpy me",
    "♦0 Anonymous user: 🙏",
    "just-a-harmless-potato joined",
    "♦0 Anonymous user: 美女跳舞好看",
    "just-a-harmless-potato followed you",
    "♦0 Anonymous user: 换件衣服",
    "Susu joined",
    "♦0 Anonymous user: 宝瘦了",
    "♦0 Anonymous user: 是不是累了",
    "Something left",
    "♦0 Anonymous user: 怎么瘦的",
    "turkey_sandwich joined",
    "♦0 Anonymous user: 🔥🔥🔥🔥🔥",
    "♦2 Anonymous user: girllll",
    "UFO_believer joined",
    "Unnecessary joined",
    "The.Failure followed you",
    "YellowSnowman joined",

];

let currentCommentIndex = 0;

function displayComment() {
    if (currentCommentIndex < comments.length) {
        let commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.textContent = comments[currentCommentIndex];


        //评论出现音效
        if (commentsound.isLoaded()) {
            commentsound.play();
        }

        // 判断评论中是否包含 'joined'，如果包含则添加紫色背景
        if (comments[currentCommentIndex].toLowerCase().includes('joined')) {
            commentElement.style.background = 'rgb(255 86 204)';
            commentElement.style.color = 'rgb(255 255 255)';
        }


        document.getElementById('commentContainer').appendChild(commentElement);

        //获取评论元素的计算样式
        // let computedStyle = window.getComputedStyle(commentElement);
        // //获取评论元素的实际高度，包括边框和内边距
        //let commentHeight = parseFloat(computedStyle.height);

        let commentHeight = 65;//控制评论高度（间距）

        // // 设置新评论的初始位置在底部
        // commentElement.style.transform = `translateY(${commentHeight * currentCommentIndex}px)`;

        // 向上移动旧评论的位置
        let commentsList = document.querySelectorAll('.comment');
        commentsList.forEach((comment, index) => {
            comment.style.transform = `translateY(-${(commentHeight) * (commentsList.length - index - 1)}px)`;
        });

        currentCommentIndex++;

    }
}



//提示显示完后展示弹幕
setTimeout(() => {
    setInterval(displayComment, 1000); // Display a comment every random(0-5) seconds
}, 30000);
//now editing, 原来：30000

//礼物
const giftContainer = document.getElementById('giftContainer');
const supergift = document.getElementById('supergift');
// 定义需要展示的弹幕内容数组
const gifts = [
    "Qing Feng gifted a 🎁",
    "Hei Ye You Dang gifted a 🎁",
    "Jiang Yu gifted a 🎁",
    "cc Kafu gifted a 🎁"
];
let currentgiftIndex = 0; // 当前弹幕索引
// 定义函数展示弹幕
function showgift() {
    if (currentgiftIndex < gifts.length) {
        const gift = document.createElement('div');
        gift.classList.add('gift');
        gift.textContent = gifts[currentgiftIndex];
        giftContainer.appendChild(gift);
        supergift.style.display = 'block';



        //j加分，展示礼物
        points += 80;
        document.getElementById('points').textContent = `${points}`;
        // Add animation to enlarge the size when points increase
        document.getElementById('points').classList.add('enlarge');
        // Remove the enlarge class after 0.6 second
        setTimeout(() => {
            document.getElementById('points').classList.remove('enlarge');
        }, 600);


        // 显示爱心 GIF + coin gif
        heartGif.style.display = 'block';

        coinGif.style.display = 'block';

        if (coinsound.isLoaded()) {
            coinsound.play();
            setTimeout(() => {
                coinsound.play()
            }, 1500);
        }

        // 2秒后隐藏爱心 GIF + coin GIF
        setTimeout(() => {
            heartGif.style.display = 'none';

            coinGif.style.display = 'none';
        }, 2000);



        setTimeout(() => {
            gift.style.transform = 'translateX(-250%)'; // 设置弹幕开始位置
            setTimeout(() => {
                gift.style.opacity = '0'; // 弹幕逐渐消失
                supergift.style.display = 'none';
                currentgiftIndex++; // 更新索引
                setTimeout(() => {
                    giftContainer.removeChild(gift); // 移除弹幕元素
                    showgift(); // 继续展示下一条弹幕
                }, 10000); // 每隔10秒展示一条弹幕
            }, 8000); // 8秒后逐渐消失
        }, 100); // 100毫秒后开始展示弹幕
    }

    // else {
    //     currentgiftIndex = 0; // 如果已经展示完所有弹幕，则重置索引，重新开始展示
    //     setTimeout(showgift, 10000); // 10秒后重新开始展示
    // }
}




