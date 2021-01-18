const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "./snake_canvas/img/ground.png";

const foodImg = new Image();
foodImg.src = "./snake_canvas/img/food.png";

const bombImg = new Image();
bombImg.src = "./snake_canvas/img/bomb.png";

let speed = 500;

let box = 32;

let score = 0;

let food = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box,
};

let bomb = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box,
};

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
}

let dir;

document.addEventListener("keydown", function direction(event) {
    const keyCode = event.keyCode;
    if (keyCode === 37 && dir !== "right") {
        dir = "left";
    } else if (keyCode === 38 && dir !== "down") {
        dir = "up";
    } else if (keyCode === 39 && dir !== "left") {
        dir = "right";
    } else if (keyCode === 40 && dir !== "up") {
        dir = "down";
    } else if (keyCode === 27) {
        if (game === null) {
            game = setInterval(drawGame, speed);
        } else {
            clearInterval(game)
            game = null
        }
    }
    console.log(dir);
});

function eatTail(head, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (head.x === arr[i].x && head.y === arr[i].y)
            clearInterval(game);
    }
}

function drawGame() {
    ctx.drawImage(ground, 0, 0);
    ctx.drawImage(foodImg, food.x, food.y)
    ctx.drawImage(bombImg, bomb.x, bomb.y)

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "green" : "red";
        ctx.fillRect(snake[i].x, snake[i].y, box, box)
    }

    ctx.fillStyle = "white";
    ctx.font = "50px Arial"
    ctx.fillText(score, box * 2.5, box * 1.7);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = {
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box,
        };
    } else {
        snake.pop();
    }

    if (snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > box * 17) {
        clearInterval(game);
    }

    if (dir === "left") {
        snakeX -= box;
    } else if (dir === "right") {
        snakeX += box;
    } else if (dir === "up") {
        snakeY -= box;
    } else if (dir === "down") {
        snakeY += box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    eatTail(newHead, snake)

    snake.unshift(newHead)
}

let game = setInterval(drawGame, speed);

