import { setGame } from "./setGame.js"

const updateSnakeTail = () => {
    // 
    snakeArray.unshift([snakePosRow, snakePosColumn])
    snakeArray = snakeArray.slice(0, pointsOfSnake+1)
    // console.log(snakeArray)

}

const redrawSnakeTail = () => {
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


const checkForCollision = () =>{
    // Check to see if the head of the snake is equal to any of the tail
    snakeArray.forEach((value, index) => {
        // console.log(index)
        if (index !== 0 && snakePosRow === value[0] && snakePosColumn === value[1] && !document.getElementById('game-over')){
            const gameOver = document.createElement("div");
            gameOver.classList.add('display-1')
            gameOver.setAttribute('id','game-over')
            gameOver.innerText = "GAME OVER"
            gameFrame.appendChild(gameOver)

            const gameReset = document.createElement("BUTTON")
            gameReset.classList.add('btn', 'btn-dark')
            gameReset.setAttribute('id','game-reset')
            gameReset.innerText = "Reset Game"
            gameReset.onclick = setGame
            gameFrame.appendChild(gameReset)

            collision = true
        }
    })
    return collision
}

const setSnakePos = (row, col) => {
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

const moveSnake = (moveSnake) => {
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

export { updateSnakeTail, redrawSnakeTail, checkForCollision, setSnakePos, moveSnake }