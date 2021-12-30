import { generateRandomNumber } from "./helpers.js"
import { redrawSnakeTail, setSnakePos } from "./snakeUpdaters.js"
import { setFoodPos } from "./foodUpdaters.js"

const setGame = () => {
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
    snakePosRow = generateRandomNumber(20)
    snakePosColumn = generateRandomNumber(20)

    // set initial food position
    foodPosRow = generateRandomNumber(20)
    foodPosColumn = generateRandomNumber(20)

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

export { setGame }