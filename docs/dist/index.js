import * as cons from "./constants.js";
const grid = [];
function updateCanvas(arr, context) {
  context.clearRect(0, 0, cons.CANVAS_WIDTH, cons.CANVAS_HEIGHT);
  console.log("updateCanvas");
  arr.forEach((row, r) => {
    console.log(row);
    row.forEach((col, c) => {
      if (arr[r][c] == 1) {
        context.fillStyle = "black";
      } else if (arr[r][c] == 2 || arr[r][c] == 3) {
        context.fillStyle = "red";
      } else {
        context.fillStyle = "white";
      }
      context.fillRect(c * cons.CELL_WIDTH, r * cons.CELL_WIDTH, cons.CELL_WIDTH - 2, cons.CELL_WIDTH - 2);
      context.strokeRect(c * cons.CELL_WIDTH, r * cons.CELL_WIDTH, cons.CELL_WIDTH - 2, cons.CELL_WIDTH - 2);
    });
  });
}
function createGrid() {
  for (let i = 0; i < cons.CANVAS_HEIGHT; i += cons.CELL_WIDTH) {
    let row = [];
    for (let j = 0; j < cons.CANVAS_WIDTH; j += cons.CELL_WIDTH) {
      console.log(i);
      if (i === Math.floor(cons.CANVAS_HEIGHT / 2)) {
        if (j == cons.CELL_WIDTH) {
          row.push(2);
        } else if (j == Math.floor(cons.CANVAS_WIDTH - 2 * cons.CELL_WIDTH)) {
          row.push(3);
        } else {
          row.push(0);
        }
        console.log("YES");
      } else {
        row.push(0);
      }
    }
    grid.push(row);
  }
}
function drawGrid() {
}
createGrid();
console.log(grid);
console.log(cons.CTX);
updateCanvas(grid, cons.CTX);
console.log(grid);
