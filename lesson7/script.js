/* eslint no-bitwise: 0 */
let interval;
// canvas
let canv;
// 2d context
let ctx;
// player X position
let px;
// player Y position
let py;

const explosion = new Image();
explosion.src = 'explosion.png';
const explosions = [];

const SNAKE_COLOR_ODD = 'blue';
const SNAKE_COLOR_EVEN = 'yellow';
const APPLE_COLOR = 'green';
const OBSTACLE_COLOR = '#884600';

// game started && first key pressed (initialization states)
const gs = false;
let fkp = false;
// snake movement speed
const baseSpeed = 3;
let speed = baseSpeed;
// velocity (x & y)
let xv = 0;
let yv = 0;

// player size
const pw = 20;
const ph = 20;
// apple size
const aw = 20;
const ah = 20;
// apples list
const apples = [];
const obstacles = [];
// tail elements list (aka tailPieces)
const tailPieces = [];
// tail size (1 for 10)
let tailSize = 20;
// self eating protection for head zone (aka safeZone)
const tailSizeMin = 20;
// is key in cooldown mode
const cooldown = false;
let score = 0; // current score

let hp = 3;

// функция рисования яблока
function spawnApple() {
    const
        newApple = {
            x: ~~(Math.random() * canv.width - 2 * aw) + aw,
            y: ~~(Math.random() * canv.height - 2 * ah) + ah,
            color: APPLE_COLOR,
        };

    // проверка что яблоко не попало на хвост
    for (let i = 0; i < tailSize.length; i++) {
        if (
            newApple.x < (tailPieces[i].x + pw)
            && newApple.x + aw > tailPieces[i].x
            && newApple.y < (tailPieces[i].y + ph)
            && newApple.y + ah > tailPieces[i].y
        ) {
            spawnApple();
            return;
        }
    }

    apples.push(newApple);
}

function spawnObstacle() {

    while (obstacles.length < 10) {
        let newObstacle = {
            x: ~~(Math.random() * canv.width - 2 * aw) + aw,
            y: ~~(Math.random() * canv.height - 2 * ah) + ah,
            color: OBSTACLE_COLOR,
        };

        for (let i = 0; i < tailSize.length; i++) {
            if (
                newObstacle.x < (tailPieces[i].x + pw)
                && newObstacle.x + aw > tailPieces[i].x
                && newObstacle.y < (tailPieces[i].y + ph)
                && newObstacle.y + ah > tailPieces[i].y
            ) {
                spawnObstacle();
                return;
            }
        }

        obstacles.push(newObstacle);

        setTimeout(function () {
            obstacles.splice(Math.random() * obstacles.length, 1);
            spawnObstacle();
        }, Math.random() * 20000 + 5000);
    }
}

// итерация рисования экрана
function loop() {
    // logic
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canv.width, canv.height);

    // force speed
    px += xv;
    py += yv;

    // teleports
    if (px > canv.width) {
        px = 0;
    }
    if (px + pw < 0) {
        px = canv.width;
    }
    if (py + ph < 0) {
        py = canv.height;
    }
    if (py > canv.height) {
        py = 0;
    }

    // paint the snake itself with the tail elements
    tailPieces.forEach((item, index) => {
        ctx.fillStyle = (index % 2) ? SNAKE_COLOR_EVEN : SNAKE_COLOR_ODD;
        ctx.fillRect(item.x, item.y, pw, ph);
    });

    // console.log(tailPieces.length);

    tailPieces.push({x: px, y: py});

    // limiter
    while (tailPieces.length > tailSize) {
        tailPieces.shift();
    }

    // проверка что врезались в себя
    for (let i = tailPieces.length - tailSizeMin; i >= 0; i--) {
        if (
            px < (tailPieces[i].x + pw)
            && px + pw > tailPieces[i].x
            && py < (tailPieces[i].y + ph)
            && py + ph > tailPieces[i].y
        ) {
            // got collision
            tailSize = tailSizeMin; // cut the tailSize
            speed = baseSpeed; // cut the speed (flash nomore lol xD)
            score = 0
        }
    }

    // paint apples
    for (let a = 0; a < apples.length; a++) {
        ctx.fillStyle = apples[a].color;
        ctx.fillRect(apples[a].x, apples[a].y, aw, ah);
    }

    // check for snake head collisions with apples
    for (let a = 0; a < apples.length; a++) {
        if (
            px < (apples[a].x + pw)
            && px + pw > apples[a].x
            && py < (apples[a].y + ph)
            && py + ph > apples[a].y
        ) {
            // got collision with apple
            apples.splice(a, 1); // remove this apple from the apples list
            tailSize += ~~(baseSpeed / 3); // add tailSize length
            speed += 0.3; // add some speed
            spawnApple(); // spawn another apple(-s)
            score++;
            break;
        }
    }

    for (let o = 0; o < obstacles.length; o++) {
        ctx.fillStyle = obstacles[o].color;
        ctx.fillRect(obstacles[o].x, obstacles[o].y, aw, ah);
    }

    for (let o = 0; o < obstacles.length; o++) {
        if (
            px < (obstacles[o].x + pw)
            && px + pw > obstacles[o].x
            && py < (obstacles[o].y + ph)
            && py + ph > obstacles[o].y
        ) {
            explosions.push({x: obstacles[o].x, y: obstacles[o].y, scaleX: 50, scaleY: 50, explosion: true});
            obstacles.splice(o, 1);
            hp--;
            if (hp === 0) gameOver();
            break;
        }
    }

    for (let e = 0; e < explosions.length; e++) {
        ctx.drawImage(
            explosion,
            explosions[e].x - explosions[e].scaleX / 2 + 10,
            explosions[e].y - explosions[e].scaleY / 2 + 10,
            explosions[e].scaleX,
            explosions[e].scaleY
        );

        if (explosions[e].explosion) {
            explosions[e].scaleX += 4;
            explosions[e].scaleY += 4;
            if (explosions[e].scaleX === 102) {
                explosions[e].explosion = false
            }
        } else {
            explosions[e].scaleX--;
            explosions[e].scaleY--;
        }

        if (explosions[e].scaleX === 0) {
            explosions.splice(e, 1);
        }
    }

    printScore();
}

function gameOver() {
    pause();
    ctx.fillStyle = "#FF2000";
    ctx.font = "50px Arial";
    ctx.fillText("GAME OVER", canv.width / 4, canv.height / 2);
}

function printScore() {
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "20px Arial";
    ctx.fillText(score, 5, 20);

    for (let i = 0; i < hp; i++) {
        ctx.fillStyle = "red";
        ctx.fillRect(25 * (i + 1), 2, aw, ah);
    }
}

function start() {
    interval = setInterval(loop, 1000 / 50); // 50 FPS
    spawnObstacle();
}

function pause() {
    if (interval) {
        clearInterval(interval);
        interval = null;
    }
}

// velocity changer (controls)
function changeDirection(evt) {
    if (!fkp && [37, 38, 39, 40].indexOf(evt.keyCode) > -1) {
        fkp = true;
        spawnApple();
    }

    if (evt.keyCode === 32) {
        if (interval) {
            pause();
        } else {
            start();
        }
    }

    if (evt.keyCode === 37 && !(xv > 0)) { // left arrow
        xv = -speed;
        yv = 0;
    }

    if (evt.keyCode === 38 && !(yv > 0)) { // top arrow
        xv = 0;
        yv = -speed;
    }

    if (evt.keyCode === 39 && !(xv < 0)) { // right arrow
        xv = speed;
        yv = 0;
    }

    if (evt.keyCode === 40 && !(yv < 0)) { // down arrow
        xv = 0;
        yv = speed;
    }
}

function init() {
    canv = document.getElementById('mc');
    ctx = canv.getContext('2d');
    px = ~~(canv.width) / 2;
    py = ~~(canv.height) / 2;
    document.addEventListener('keydown', changeDirection);
    start();
}

window.onload = init;