const board_border = 'black';
const board_background = "white";
const snake_col = 'lightblue';
const snake_border = 'darkblue';
const snakeboard = document.getElementById("snakeboard");
const snakeboard_ctx = snakeboard.getContext("2d");
let snake = [
  {x: 200, y: 200},
  {x: 190, y: 200},
  {x: 180, y: 200},
  {x: 170, y: 200},
  {x: 160, y: 200}
]
let score = 0;
let food_x;
let food_y;
let changing_Direction = false;
let dx = 10;
let dy = 0;


function clearCanvas() {
      snakeboard_ctx.fillStyle = board_background;
      snakeboard_ctx.strokestyle = board_border;
      snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
      snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}

function drawSnakePart(snakePart) {
      snakeboard_ctx.fillStyle = snake_col;
      snakeboard_ctx.strokestyle = snake_border;
      snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
      snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function drawSnake() {
      snake.forEach(drawSnakePart);
}

function moveSnake() {
      const head = {x: snake[0].x + dx, y: snake[0].y + dy};
      snake.unshift(head);
      const hasEaten = snake[0].x === food_x && snake[0].y === food_y;
      if (hasEaten) {
            score += 10;
            document.getElementById('score').innerHTML = score;
            genFood();
      }
      else {
            snake.pop();
      }
}

function change_Direction() {
      const LEFT_KEY = 37;
      const RIGHT_KEY = 39;
      const UP_KEY = 38;
      const DOWN_KEY = 40;
      if (changing_Direction) return;
      changing_Direction = true;
      const keyPressed = event.keyCode;
      const goingUp = dy === -10;
      const goingDown = dy === 10;
      const goingRight = dx === 10;
      const goingLeft = dx === -10;
      if (keyPressed === LEFT_KEY && !goingRight) {
            dx = -10;
            dy = 0;
      }
      if (keyPressed === UP_KEY && !goingDown) {
            dx = 0;
            dy = -10;
      }
      if (keyPressed === RIGHT_KEY && !goingLeft) {
            dx = 10;
            dy = 0;
      }
      if (keyPressed === DOWN_KEY && !goingUp) {
            dx = 0;
            dy = 10;
      }
}

function hasGameEnded() {
      for (let i = 4; i < snake.length; i++) {
            if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
      }
      const hitLeftWall = snake[0].x < 0;
      const hitRightWall = snake[0].x > snakeboard.width - 10;
      const hitTopWall = snake[0].y < 0;
      const hitBottomWall = snake[0].y > snakeboard.height - 10;
      return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall
}

function randomFood(min, max) {
      return Math.round((Math.random() * (max - min) + min)/10) * 10;
}

function genFood() {
      food_x = randomFood(0, snakeboard.width - 10);
      food_y = randomFood(0, snakeboard.height - 10);
      snake.forEach(function hasSnakeEatenFood(part) {
            const hasEaten = part.x == food_x && part.y == food_y;
            if (hasEaten) genFood();
      });
}

function drawFood() {
      snakeboard_ctx.fillStyle = 'lightgreen';
      snakeboard_ctx.strokestyle = 'darkgreen';
      snakeboard_ctx.fillRect(food_x, food_y, 10, 10);
      snakeboard_ctx.strokeRect(food_x, food_y, 10, 10);
}

function main() {
      if (hasGameEnded()) return;
      changing_Direction = false;
      setTimeout(function onTick() {
      clearCanvas();
      drawFood();
      moveSnake();
      drawSnake();
      main();},
      100);
}

main();
genFood();
document.addEventListener("keydown", change_Direction);
