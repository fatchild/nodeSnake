// Game timing
let lastRenderTime = 0;
const SNAKE_SPEED = 8; // Per second
let collision = false

// Game elements
const game = document.getElementById('game');
const snake = document.getElementById('snake');
const food = document.getElementById('food');
const score = document.getElementById('score')
const gameFrame = document.getElementById('game-frame')

// Set initial position of snake and track
let snakePosRow;
let snakePosColumn;

// set initial food position
let foodPosRow;
let foodPosColumn;

let lastPressedDirection = undefined;
let pointsOfSnake;
let snakeArray;

function resetGame(){
    const gameOver = document.getElementById('game-over')
    const gameReset = document.getElementById('game-reset')
    if (gameOver){
        gameOver.remove()
    }
    if (gameReset){
        gameReset.remove()
    }

    collision = false

    // Set initial position of snake and track
    snakePosRow = Math.floor(Math.random() * 20 + 1)
    snakePosColumn = Math.floor(Math.random() * 20 + 1)

    // set initial food position
    foodPosRow = Math.floor(Math.random() * 20 + 1)
    foodPosColumn = Math.floor(Math.random() * 20 + 1)

    lastPressedDirection = undefined;

    pointsOfSnake = 0;
    score.innerText = pointsOfSnake;
    snakeArray = [[snakePosRow, snakePosColumn],];

    redrawSnakeTail()

    // Set the initial snake position
    setSnakePos(snakePosRow, snakePosColumn)

    // Set the initial food position
    setFoodPos(foodPosRow, foodPosColumn)
}

resetGame()

// function addSnakeLength(){
//     if (lastPressedDirection === "ArrowDown"){
//         snakeArray.push([snakePosRow+1, snakePosColumn])
//     } else if (lastPressedDirection === "ArrowUp"){
//         snakeArray.push([snakePosRow-1, snakePosColumn])
//     } else if (lastPressedDirection === "ArrowLeft"){
//         snakeArray.push([snakePosRow, snakePosColumn-1])
//     } else if (lastPressedDirection === "ArrowRight"){
//         snakeArray.push([snakePosRow, snakePosColumn+1])
//     }
// }

// 1. shift everything back one, dropping the last position off
// 2. shift everything back one, keeping the last position in
function redrawSnakeTail(){
    // remove all current tail squares
    const snakeTail = document.getElementsByClassName('snake-tail')

    if (snakeTail) {
        for (let i = 0; i < snakeTail.length; i++){
            // console.log("removing")
            snakeTail[i].remove()
        }
    }

    snakeArray.forEach((value, index) => {
        // console.log(value)
        if (index !== 0){
            // console.log("add tail")
            // Create a div as the tail
            const newDivTail = document.createElement("div");
            newDivTail.classList.add('snake-tail');
            newDivTail.style.gridColumnStart = value[1];
            newDivTail.style.gridColumnEnd = value[1];
            newDivTail.style.gridRowStart = value[0];
            newDivTail.style.gridRowEnd = value[0];
            game.appendChild(newDivTail)
            // <div class="snake" id="snake"></div>
        }
    })
}

function updateSnakeTail(){
    // 
    snakeArray.unshift([snakePosRow, snakePosColumn])
    snakeArray = snakeArray.slice(0, pointsOfSnake+1)
    // console.log(snakeArray)
}

function checkForCollision(){
    // Check to see if the head of the snake is equal to any of the tail
    snakeArray.forEach((value, index) => {
        // console.log(index)
        if (index !== 0 && snakePosRow === value[0] && snakePosColumn === value[1] && !document.getElementById('game-over')){
            console.log("GAME OVER")
            const gameOver = document.createElement("div");

            gameOver.classList.add('game-over', 'display-1');
            gameOver.setAttribute('id','game-over');
            gameOver.innerText = "GAME OVER"
            gameOver.style.position = "absolute";
            gameOver.style.top = "35%";

            const gameReset = document.createElement("BUTTON");
            gameReset.classList.add('btn', 'btn-dark');
            gameReset.setAttribute('id','game-reset');
            gameReset.innerText = "Reset Game"
            gameReset.style.position = "absolute";
            gameReset.style.top = "55%";
            gameReset.onclick = resetGame;

            gameFrame.appendChild(gameOver)
            gameFrame.appendChild(gameReset)
            collision = true
        }
    })
    return collision
}

// Set the score
score.innerText = pointsOfSnake;

// Set and update snake position
function setSnakePos(row, col){
    // Protect from over shooting
    if (row < 21 && row > 0 && col < 21 && col > 0) {
        snake.style.gridColumnStart = col;
        snake.style.gridColumnEnd = col;
        snake.style.gridRowStart = row;
        snake.style.gridRowEnd = row;
        snakePosRow = row;
        snakePosColumn = col;
        // console.log(snakePosRow, snakePosColumn)
    }
}

// Set and update food position
function setFoodPos(){
    foodPosRow = Math.floor(Math.random() * 20 + 1)
    foodPosColumn = Math.floor(Math.random() * 20 + 1)

    // Protect from over shooting
    food.style.gridColumnStart = foodPosColumn;
    food.style.gridColumnEnd = foodPosColumn;
    food.style.gridRowStart = foodPosRow;
    food.style.gridRowEnd = foodPosRow;
    // console.log(snakePosRow, snakePosColumn)
}

// Set the initial snake position
setSnakePos(snakePosRow, snakePosColumn)

// Set the initial food position
setFoodPos(foodPosRow, foodPosColumn)

// Listen for arrow key presses
document.addEventListener('keydown', (e) => {
    if (e.code === "ArrowDown" || e.code === "ArrowUp" || e.code === "ArrowLeft" || e.code === "ArrowRight"){
        // Cannot do opposite of last pressed
        if (lastPressedDirection === "ArrowDown" && e.code === "ArrowUp"){
            return
        } 
        else if (lastPressedDirection === "ArrowLeft" && e.code === "ArrowRight"){
            return
        } 
        else if (lastPressedDirection === "ArrowRight" && e.code === "ArrowLeft"){
            return
        } 
        else if (lastPressedDirection === "ArrowUp" && e.code === "ArrowDown"){
            return
        } 
        else {
            lastPressedDirection = e.code;
        }
        // console.log(e.code, "e.code")
    }
});

// Do something with those key presses 
function moveSnake(moveSnake) {
    // console.log(moveSnake)
    switch(moveSnake){
        case "ArrowDown":
            // console.log("Arrow Down");
            setSnakePos(snakePosRow+1, snakePosColumn)
            break;
        case "ArrowUp":
            // console.log("Arrow Up");
            setSnakePos(snakePosRow-1, snakePosColumn)
            break;
        case "ArrowLeft":
            // console.log("Arrow Left");
            setSnakePos(snakePosRow, snakePosColumn-1)
            break;
        case "ArrowRight":
            // console.log("Arrow Right");
            setSnakePos(snakePosRow, snakePosColumn+1)
            break;
    }
}


// Game loop
function main(currentTime) {
    window.requestAnimationFrame(main)
    const secondsSinceLastRender = ( currentTime - lastRenderTime ) / 1000;

    if (secondsSinceLastRender < ( 1 / SNAKE_SPEED ) || collision) return false

    moveSnake(lastPressedDirection);

    checkForCollision()

    if (snakePosRow === foodPosRow && snakePosColumn === foodPosColumn){
        pointsOfSnake += 1
        setFoodPos()
        // console.log(pointsOfSnake)
        // Set the score
        score.innerText = pointsOfSnake;
    }

    // Update the array
    updateSnakeTail()

    // Make the snake longer 
    redrawSnakeTail()

    // console.log("render", lastPressedDirection, snakeArray)
    lastRenderTime = currentTime
}

window.requestAnimationFrame(main)