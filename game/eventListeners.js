const setupDifficultyListener = () => {
    // Difficulty setting
    const speedInput = document.getElementById('speedInput')
    speedInput.addEventListener('input', () => SNAKE_SPEED = speedInput.value);
}

const setupArrowKeyListener = () => {
    // Arrow keys
    document.addEventListener('keydown', (e) => {
        if (e.code === "ArrowDown" || e.code === "ArrowUp" || e.code === "ArrowLeft" || e.code === "ArrowRight"){
            // The default distractingly operates the scroll
            e.preventDefault()
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
            else if (!directionChosen) {
                lastPressedDirection = e.code;
                directionChosen = true
            }
        }
    });
}

export { setupDifficultyListener, setupArrowKeyListener }