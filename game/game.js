import { setupDifficultyListener, setupArrowKeyListener } from "./eventListeners.js";
import { updateSnakeTail, redrawSnakeTail, checkForCollision, setSnakePos, moveSnake } from "./snakeUpdaters.js"
import { setGame } from "./setGame.js"
import { setFoodPos } from "./foodUpdaters.js"

// Game timing
window.LAST_RENDER_TIME     = 0;
window.SNAKE_SPEED          = 8; // Per second
window.collision            = false
window.directionChosen      = false
window.lastPressedDirection = undefined;
window.pointsOfSnake        = 1;
window.snakeArray           = [];

// Set initial position of snake and track
window.snakePosRow      = 0;
window.snakePosColumn   = 0;

// set initial food position
window.foodPosRow       = 0;
window.foodPosColumn    = 0;

// Game elements
window.game         = document.getElementById('game');
window.snake        = document.getElementById('snake');
window.food         = document.getElementById('food');
window.score        = document.getElementById('score')
window.gameFrame    = document.getElementById('game-frame')

// Setup listeners
setupDifficultyListener()
setupArrowKeyListener()

// Initialize game
setGame()

redrawSnakeTail()
updateSnakeTail()

// Set the initial snake & food position
setSnakePos(snakePosRow, snakePosColumn)
setFoodPos(foodPosRow, foodPosColumn)

// Game loop
function main(currentTime) {
    window.requestAnimationFrame(main)

    const secondsSinceLastRender = ( currentTime - LAST_RENDER_TIME ) / 1000;

    if (secondsSinceLastRender < ( 1 / SNAKE_SPEED ) || collision) return false

    moveSnake(lastPressedDirection);
    directionChosen = false

    checkForCollision()

    if (snakePosRow === foodPosRow && snakePosColumn === foodPosColumn){
        pointsOfSnake += 1
        setFoodPos()
        // Set the score
        score.innerText = pointsOfSnake;
    }

    // Update the array
    updateSnakeTail()

    // Make the snake longer 
    redrawSnakeTail()

    // console.log("render", lastPressedDirection, snakeArray)
    LAST_RENDER_TIME = currentTime
}

window.requestAnimationFrame(main)