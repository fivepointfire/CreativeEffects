function setup() {

}

function draw() {

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);    
    numRows = floor(windowHeight / cellSize);
    numCols = floor(windowWidth / cellSize);
}