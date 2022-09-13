import * as cons from "./constants.js";
import {depthFirstSearch} from "./algorithms.js";
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
  for (let i = 0; i < cons.GRID_HEIGHT; i++) {
    let row = [];
    for (let j = 0; j < cons.GRID_WIDTH; j++) {
      console.log(i);
      if (j == myGlobal.start[0] && i == myGlobal.start[1]) {
        row.push(2);
      } else if (j == myGlobal.end[0] && i == myGlobal.end[1]) {
        row.push(3);
      } else {
        row.push(0);
      }
    }
    myGlobal.grid.push(row);
  }
}
function clearGrid() {
  myGlobal.grid.forEach((row, r) => {
    row.forEach((col, c) => {
      if (col === 2 || col === 3) {
      } else {
        myGlobal.grid[r][c] = 0;
      }
    });
  });
}
function reset() {
  clearGrid();
  myGlobal.isRunning = false;
  myGlobal.generatorAlgo = null;
  myGlobal.algoSelected = false;
  pauseButton.innerText = "Start";
  pauseButton.classList.remove("button-paused");
  updateCanvas(myGlobal.grid, cons.CTX);
}
const resetButton = document.getElementById("reset");
resetButton?.addEventListener("click", reset, false);
function pauseLoop() {
  if (myGlobal.isRunning) {
    pauseButton.innerText = "Start";
    pauseButton.classList.remove("button-paused");
  } else {
    pauseButton.innerText = "Pause";
    pauseButton.classList.add("button-paused");
    algorithmSelectFunction();
  }
  myGlobal.isRunning = !myGlobal.isRunning;
  mainLoop();
}
const pauseButton = document.getElementById("pause");
pauseButton?.addEventListener("click", pauseLoop, false);
function selectAlgo(algo, grid) {
  if (algo) {
    myGlobal.generatorAlgo = algo(grid, myGlobal.start);
  }
}
const algoDict = {
  depthFirstSearch
};
const algorithmSelectMenu = document.getElementById("algorithm-menu");
function algorithmSelectFunction() {
  let option = algoDict[algorithmSelectMenu.options[algorithmSelectMenu.selectedIndex].value];
  if (myGlobal.algoSelected === false || option != myGlobal.algoSelected) {
    myGlobal.algoSelected = option;
    selectAlgo(myGlobal.algoSelected, myGlobal.grid);
  }
}
function mainLoop() {
  function main() {
    if (myGlobal.isRunning) {
      if (myGlobal.generatorAlgo !== null) {
        let algoResults = myGlobal.generatorAlgo.next();
        let newGrid = algoResults["value"];
        console.log(algoResults);
        if (!algoResults.done) {
          updateCanvas(newGrid, cons.CTX);
          setTimeout(() => {
            window.requestAnimationFrame(main);
          }, 1e3);
        } else {
          myGlobal.generatorAlgo = null;
          myGlobal.algoSelected = false;
          pauseLoop();
        }
      }
    }
  }
  window.requestAnimationFrame(main);
}
var myGlobal = {};
myGlobal.grid = [];
myGlobal.start = cons.DEFAULT_START;
myGlobal.end = cons.DEFAULT_END;
myGlobal.isRunning = false;
myGlobal.generatorAlgo = null;
myGlobal.algoSelected = false;
createGrid();
updateCanvas(myGlobal.grid, cons.CTX);
mainLoop();
