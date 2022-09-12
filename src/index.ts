import * as cons from './constants';
import { depthFirstSearch } from './algorithms';





const grid: number[][] = [];
const start: number[] = [1, cons.DEFAULT_STARTEND_HEIGHT]
const end: number[] = [cons.GRID_WIDTH-2, cons.DEFAULT_STARTEND_HEIGHT]


function updateCanvas(arr: number[][], context: CanvasRenderingContext2D) {
  context.clearRect(0,0,cons.CANVAS_WIDTH, cons.CANVAS_HEIGHT)
  console.log("updateCanvas")
  arr.forEach((row, r) => {
    console.log(row)
    row.forEach((col, c) => {
      if (arr[r][c] == 1) {
        context.fillStyle = "black"
      } else if (arr[r][c] == 2 || arr[r][c] == 3) {
        context.fillStyle = "red"
      } else {
        context.fillStyle = "white"
      }
      context.fillRect(c*cons.CELL_WIDTH, r*cons.CELL_WIDTH,
        cons.CELL_WIDTH-2, cons.CELL_WIDTH-2)
      context.strokeRect(c*cons.CELL_WIDTH, r*cons.CELL_WIDTH,
        cons.CELL_WIDTH-2, cons.CELL_WIDTH-2)
    })

  })
}


function createGrid() {
  for (let i=0; i < cons.GRID_HEIGHT; i++) {
    let row: number[] = []
    for (let j=0; j < cons.GRID_WIDTH; j++) {
      console.log(i)
      if (j == start[0] && i == start[1]){
        row.push(2)
      } else if (j == end[0] && i == end[1]) {
        row.push(3)
      } else {
        row.push(0)
      }
    }
    grid.push(row)
  }
}

function drawGrid() {

}


createGrid()
console.log(grid)
console.log(cons.CTX)
updateCanvas(grid, cons.CTX)
console.log("Grid", grid)

const gen = depthFirstSearch(grid, start)
let isRunning = true
console.log(gen)

while (isRunning) {
  let res = gen.next()
  let val = res.value
  let done = res.done

  if (done) {
    isRunning = false
  }
}


// for (let i=0; i <= 159; i++) {
//   const new_grid = gen.next()
//   console.log(new_grid)
//   // updateCanvas(new_grid, cons.CTX)
// }

updateCanvas(grid, cons.CTX)
console.log(gen)
