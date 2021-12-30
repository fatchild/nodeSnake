import { generateRandomNumber } from "./helpers.js"

const setFoodPos = () => {
    foodPosRow = generateRandomNumber(20)
    foodPosColumn = generateRandomNumber(20)

    // Protect from over shooting
    food.style.gridColumnStart = foodPosColumn;
    food.style.gridColumnEnd = foodPosColumn;
    food.style.gridRowStart = foodPosRow;
    food.style.gridRowEnd = foodPosRow;
}

export { setFoodPos }