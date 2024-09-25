const cellSize = 100;
const colorR = 79;
const colorG = 38;
const colorB = 233;
const bgColor = 31;
const startingAlpha = 255;
const probOfNeighbour = 0.5;
const amtFadePerFrame = 5;

let colorWithAlpha;
let numRows;
let numCols;
let currRow = -1;
let currCol = -1;
let allNeighbours = [];

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    colorWithAlpha = color(colorR, colorG, colorB, startingAlpha);
    noFill();
    stroke(colorWithAlpha);
    strokeWeight(1);
    numRows = floor(windowHeight / cellSize);
    numCols = floor(windowWidth / cellSize);
}

function draw() {
    background(bgColor);
    let row = floor(mouseY / cellSize);
    let col = floor(mouseX / cellSize);

    if(row != currRow || col != currCol) {
        currRow = row;
        currCol = col;

        allNeighbours.push(...getRandomNeighbours(row, col));
    }

    let x = col * cellSize;
    let y = row * cellSize;

    stroke(colorWithAlpha);
    rect(x, y, cellSize, cellSize);
    for(let neighbour of allNeighbours) {
        let neighbourX = neighbour.col * cellSize;
        let neighbourY = neighbour.row * cellSize;  
        neighbour.opacity = max(0,neighbour.opacity - amtFadePerFrame);
        stroke(color(colorR, colorG, colorB, neighbour.opacity));
        rect(neighbourX, neighbourY, cellSize, cellSize);
    }
}

function getRandomNeighbours(row,col) {
    let neighnours = [];
    for(let drow = -1 ; drow <= 1 ; drow++) {
        for(let dcol = -1 ; dcol <= 1 ; dcol++) {
            let neighbour = [row + drow, col + dcol];

            let isCurrentCell = drow == 0 && dcol == 0;

            let isInBounds = 
                neighbour[0] >= 0 && neighbour[0] < numRows && 
                neighbour[1] >= 0 && neighbour[1] < numCols;


            if(!isCurrentCell && isInBounds && Math.random() < probOfNeighbour) {
                neighnours.push({
                    row: neighbour[0],
                    col: neighbour[1],
                    opacity: startingAlpha
                });
            }
        }
    }
    return neighnours;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);    
    numRows = floor(windowHeight / cellSize);
    numCols = floor(windowWidth / cellSize);
}