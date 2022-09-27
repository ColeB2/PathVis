import * as cons from "./constants.js";
import {aStarSearch, breadthFirstSearch, depthFirstSearch, dijkstrasAlgorithm} from "./algorithms.js";
function updateCanvas(arr, context) {
  context.clearRect(0, 0, myGlobal.canvas.width, myGlobal.canvas.height);
  arr.forEach((row, r) => {
    row.forEach((col, c) => {
      switch (arr[r][c]) {
        case 0:
          context.fillStyle = myGlobal.colors["openColor"];
          break;
        case 1:
          context.fillStyle = myGlobal.colors["searchColor"];
          break;
        case 2:
          context.fillStyle = myGlobal.colors["startColor"];
          break;
        case 3:
          context.fillStyle = myGlobal.colors["endColor"];
          break;
        case 4:
          context.fillStyle = myGlobal.colors["wallColor"];
          break;
        case 5:
          context.fillStyle = myGlobal.colors["pathColor"];
          break;
      }
      const CELL_WIDTH = myGlobal.cellWidth;
      context.fillRect(c * CELL_WIDTH, r * CELL_WIDTH, CELL_WIDTH, CELL_WIDTH);
      context.strokeRect(c * CELL_WIDTH, r * CELL_WIDTH, CELL_WIDTH, CELL_WIDTH);
    });
  });
}
function mouseClick() {
  cons.CANVAS.addEventListener("click", (event) => {
    const x = event.pageX - myGlobal.canvasLeft;
    const y = event.pageY - myGlobal.canvasTop;
    const CELL_WIDTH = myGlobal.cellWidth;
    myGlobal.grid.forEach((row, r) => {
      row.forEach((col, c) => {
        if (y > r * CELL_WIDTH && y < r * CELL_WIDTH + CELL_WIDTH - 2 && x > c * CELL_WIDTH && x < c * CELL_WIDTH + CELL_WIDTH - 2 && myGlobal.grid[r][c] !== 2 && myGlobal.grid[r][c] !== 3) {
          myGlobal.grid[r][c] = myGlobal.grid[r][c] === 0 ? 4 : 0;
          updateCanvas(myGlobal.grid, myGlobal.ctx);
        }
      });
    });
  });
}
function _shiftStart(event) {
  const x = event.pageX - myGlobal.canvasLeft;
  const y = event.pageY - myGlobal.canvasTop;
  const CELL_WIDTH = myGlobal.cellWidth;
  myGlobal.grid.forEach((row, r) => {
    row.forEach((col, c) => {
      if (y > r * CELL_WIDTH && y < r * CELL_WIDTH + CELL_WIDTH && x > c * CELL_WIDTH && x < c * CELL_WIDTH + CELL_WIDTH && myGlobal.grid[r][c] !== 3) {
        myGlobal.grid[myGlobal.start[1]][myGlobal.start[0]] = 0;
        myGlobal.grid[r][c] = 2;
        myGlobal.start = [c, r];
        updateCanvas(myGlobal.grid, myGlobal.ctx);
      }
    });
  });
}
function _shiftEnd(event) {
  const x = event.pageX - myGlobal.canvasLeft;
  const y = event.pageY - myGlobal.canvasTop;
  const CELL_WIDTH = myGlobal.cellWidth;
  myGlobal.grid.forEach((row, r) => {
    row.forEach((col, c) => {
      if (y > r * CELL_WIDTH && y < r * CELL_WIDTH + CELL_WIDTH && x > c * CELL_WIDTH && x < c * CELL_WIDTH + CELL_WIDTH && myGlobal.grid[r][c] !== 2) {
        myGlobal.grid[myGlobal.end[1]][myGlobal.end[0]] = 0;
        myGlobal.grid[r][c] = 3;
        myGlobal.end = [c, r];
        updateCanvas(myGlobal.grid, myGlobal.ctx);
      }
    });
  });
}
function mouseMove(event) {
  const x = event.pageX - myGlobal.canvasLeft;
  const y = event.pageY - myGlobal.canvasTop;
  const CELL_WIDTH = myGlobal.cellWidth;
  myGlobal.grid.forEach((row, r) => {
    row.forEach((col, c) => {
      if (y > r * CELL_WIDTH && y < r * CELL_WIDTH + CELL_WIDTH && x > c * CELL_WIDTH && x < c * CELL_WIDTH + CELL_WIDTH && myGlobal.grid[r][c] !== 2 && myGlobal.grid[r][c] !== 3) {
        myGlobal.grid[r][c] = 4;
        updateCanvas(myGlobal.grid, myGlobal.ctx);
      }
    });
  });
}
function endWallPlacement() {
  myGlobal.canvas.removeEventListener("mousemove", mouseMove);
  myGlobal.canvas.removeEventListener("mouseup", endWallPlacement);
}
function endShiftStart() {
  myGlobal.canvas.removeEventListener("mousemove", _shiftStart);
  myGlobal.canvas.removeEventListener("mouseup", endShiftStart);
}
function endShiftEnd() {
  myGlobal.canvas.removeEventListener("mousemove", _shiftEnd);
  myGlobal.canvas.removeEventListener("mouseup", endShiftEnd);
}
function mouseMovementControls() {
  myGlobal.canvas.addEventListener("mousedown", (event) => {
    const x = Math.floor((event.pageX - myGlobal.canvasLeft) / myGlobal.cellWidth);
    const y = Math.floor((event.pageY - myGlobal.canvasTop) / myGlobal.cellWidth);
    event.stopPropagation();
    if (x === myGlobal.start[0] && y === myGlobal.start[1]) {
      myGlobal.canvas.addEventListener("mousemove", _shiftStart);
      myGlobal.canvas.addEventListener("mouseup", endShiftStart);
    } else if (x === myGlobal.end[0] && y === myGlobal.end[1]) {
      myGlobal.canvas.addEventListener("mousemove", _shiftEnd);
      myGlobal.canvas.addEventListener("mouseup", endShiftEnd);
    } else {
      myGlobal.canvas.addEventListener("mousemove", mouseMove);
      myGlobal.canvas.addEventListener("mouseup", endWallPlacement);
    }
  });
}
function createGrid(height, width, start, end) {
  const grid = [];
  for (let i = 0; i < height; i++) {
    let row = [];
    for (let j = 0; j < width; j++) {
      if (j === start[0] && i === start[1]) {
        row.push(2);
      } else if (j === end[0] && i === end[1]) {
        row.push(3);
      } else {
        row.push(0);
      }
    }
    grid.push(row);
  }
  return grid;
}
function clearGrid(grid) {
  grid.forEach((row, r) => {
    row.forEach((col, c) => {
      if (col === 2 || col === 3) {
      } else {
        grid[r][c] = 0;
      }
    });
  });
}
function clearSearch(grid) {
  grid.forEach((row, r) => {
    row.forEach((col, c) => {
      if (col === 2 || col === 3 || col === 4) {
      } else {
        grid[r][c] = 0;
      }
    });
  });
}
function handleReset() {
  myGlobal.isRunning = false;
  myGlobal.generatorAlgo = null;
  myGlobal.algoSelected = false;
  pauseButton.innerText = "Start";
  pauseButton.classList.remove("button-paused");
}
function clearGame() {
  clearSearch(myGlobal.grid);
  handleReset();
  updateCanvas(myGlobal.grid, myGlobal.ctx);
}
function reset() {
  clearGrid(myGlobal.grid);
  handleReset();
  updateCanvas(myGlobal.grid, myGlobal.ctx);
}
const resetButton = document.getElementById("reset");
resetButton?.addEventListener("click", reset, false);
const clearButton = document.getElementById("clear");
clearButton?.addEventListener("click", clearGame, false);
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
function changeSlider() {
  delaySliderOutput.innerHTML = delaySlider.value;
  myGlobal.delay = delaySlider.value;
}
const delaySlider = document.getElementById("delayRange");
const delaySliderOutput = document.getElementById("delayValue");
delaySliderOutput.innerHTML = delaySlider.value;
delaySlider.addEventListener("input", changeSlider, false);
function colorChoice(ev) {
  const element = ev.target;
  myGlobal.colors[element.id.toString()] = element.value;
  updateCanvas(myGlobal.grid, cons.CTX);
}
const colorSelects = ["openColor", "searchColor", "startColor", "endColor", "pathColor", "wallColor"];
function createColorSelects() {
  colorSelects.forEach((color) => {
    let newSelect = document.getElementById(color);
    newSelect.addEventListener("input", colorChoice, false);
    myGlobal.colors[color] = newSelect.value;
  });
}
function selectAlgo(algo, grid) {
  if (algo) {
    myGlobal.generatorAlgo = algo(grid, myGlobal.start);
  }
}
const algoDict = {
  depthFirstSearch,
  breadthFirstSearch,
  dijkstrasAlgorithm,
  aStarSearch
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
        if (!algoResults.done) {
          let [newGrid, path] = algoResults["value"];
          updateCanvas(newGrid, myGlobal.ctx);
          setTimeout(() => {
            window.requestAnimationFrame(main);
          }, myGlobal.delay);
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
function updateGlobalCanvas() {
  myGlobal.cellWidth = 25;
  myGlobal.canvas = document.getElementById("canvas");
  myGlobal.ctx = myGlobal.canvas.getContext("2d");
  myGlobal.canvasLeft = myGlobal.canvas.offsetLeft + myGlobal.canvas.clientLeft;
  myGlobal.canvasTop = myGlobal.canvas.offsetTop + myGlobal.canvas.clientTop;
  myGlobal.gridWidth = Math.floor(myGlobal.canvas.width / myGlobal.cellWidth);
  myGlobal.gridHeight = Math.floor(myGlobal.canvas.height / myGlobal.cellWidth);
}
updateGlobalCanvas();
myGlobal.colors = {};
myGlobal.defaultStartEndHeight = Math.floor(myGlobal.gridHeight / 2) - 1;
myGlobal.start = [1, myGlobal.defaultStartEndHeight];
myGlobal.end = [myGlobal.gridWidth - 2, myGlobal.defaultStartEndHeight];
myGlobal.grid = createGrid(myGlobal.gridHeight, myGlobal.gridWidth, myGlobal.start, myGlobal.end);
window.addEventListener("resize", updateGlobalCanvas, false);
myGlobal.isRunning = false;
myGlobal.generatorAlgo = null;
myGlobal.algoSelected = false;
myGlobal.delay = delaySlider.value;
mouseClick();
mouseMovementControls();
createColorSelects();
updateCanvas(myGlobal.grid, myGlobal.ctx);
mainLoop();
