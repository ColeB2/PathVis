import * as cons from "./constants.js";
import {aStarSearch, breadthFirstSearch, depthFirstSearch, dijkstrasAlgorithm} from "./algorithms.js";
function updateCanvas(arr, context) {
  context.clearRect(0, 0, cons.CANVAS_WIDTH, cons.CANVAS_HEIGHT);
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
      context.fillRect(c * cons.CELL_WIDTH, r * cons.CELL_WIDTH, cons.CELL_WIDTH, cons.CELL_WIDTH);
      context.strokeRect(c * cons.CELL_WIDTH, r * cons.CELL_WIDTH, cons.CELL_WIDTH, cons.CELL_WIDTH);
    });
  });
}
function mouseClick() {
  cons.CANVAS.addEventListener("click", (event) => {
    const x = event.pageX - cons.CANVAS_LEFT;
    const y = event.pageY - cons.CANVAS_TOP;
    myGlobal.grid.forEach((row, r) => {
      row.forEach((col, c) => {
        if (y > r * cons.CELL_WIDTH && y < r * cons.CELL_WIDTH + cons.CELL_WIDTH - 2 && x > c * cons.CELL_WIDTH && x < c * cons.CELL_WIDTH + cons.CELL_WIDTH - 2 && myGlobal.grid[r][c] !== 2 && myGlobal.grid[r][c] !== 3) {
          myGlobal.grid[r][c] = myGlobal.grid[r][c] === 0 ? 4 : 0;
          updateCanvas(myGlobal.grid, cons.CTX);
        }
      });
    });
  });
}
function _shiftStart(event) {
  const x = event.pageX - cons.CANVAS_LEFT;
  const y = event.pageY - cons.CANVAS_TOP;
  myGlobal.grid.forEach((row, r) => {
    row.forEach((col, c) => {
      if (y > r * cons.CELL_WIDTH && y < r * cons.CELL_WIDTH + cons.CELL_WIDTH && x > c * cons.CELL_WIDTH && x < c * cons.CELL_WIDTH + cons.CELL_WIDTH && myGlobal.grid[r][c] !== 3) {
        myGlobal.grid[myGlobal.start[1]][myGlobal.start[0]] = 0;
        myGlobal.grid[r][c] = 2;
        myGlobal.start = [c, r];
        updateCanvas(myGlobal.grid, cons.CTX);
      }
    });
  });
}
function _shiftEnd(event) {
  const x = event.pageX - cons.CANVAS_LEFT;
  const y = event.pageY - cons.CANVAS_TOP;
  myGlobal.grid.forEach((row, r) => {
    row.forEach((col, c) => {
      if (y > r * cons.CELL_WIDTH && y < r * cons.CELL_WIDTH + cons.CELL_WIDTH && x > c * cons.CELL_WIDTH && x < c * cons.CELL_WIDTH + cons.CELL_WIDTH && myGlobal.grid[r][c] !== 2) {
        myGlobal.grid[myGlobal.end[1]][myGlobal.end[0]] = 0;
        myGlobal.grid[r][c] = 3;
        myGlobal.end = [c, r];
        updateCanvas(myGlobal.grid, cons.CTX);
      }
    });
  });
}
function mouseMove(event) {
  const x = event.pageX - cons.CANVAS_LEFT;
  const y = event.pageY - cons.CANVAS_TOP;
  myGlobal.grid.forEach((row, r) => {
    row.forEach((col, c) => {
      if (y > r * cons.CELL_WIDTH && y < r * cons.CELL_WIDTH + cons.CELL_WIDTH && x > c * cons.CELL_WIDTH && x < c * cons.CELL_WIDTH + cons.CELL_WIDTH && myGlobal.grid[r][c] !== 2 && myGlobal.grid[r][c] !== 3) {
        myGlobal.grid[r][c] = 4;
        updateCanvas(myGlobal.grid, cons.CTX);
      }
    });
  });
}
function endWallPlacement() {
  cons.CANVAS.removeEventListener("mousemove", mouseMove);
  cons.CANVAS.removeEventListener("mouseup", endWallPlacement);
}
function endShiftStart() {
  cons.CANVAS.removeEventListener("mousemove", _shiftStart);
  cons.CANVAS.removeEventListener("mouseup", endShiftStart);
}
function endShiftEnd() {
  cons.CANVAS.removeEventListener("mousemove", _shiftEnd);
  cons.CANVAS.removeEventListener("mouseup", endShiftEnd);
}
function mouseMovementControls() {
  cons.CANVAS.addEventListener("mousedown", (event) => {
    const x = Math.floor((event.pageX - cons.CANVAS_LEFT) / cons.CELL_WIDTH);
    const y = Math.floor((event.pageY - cons.CANVAS_TOP) / cons.CELL_WIDTH);
    event.stopPropagation();
    if (x === myGlobal.start[0] && y === myGlobal.start[1]) {
      cons.CANVAS.addEventListener("mousemove", _shiftStart);
      cons.CANVAS.addEventListener("mouseup", endShiftStart);
    } else if (x === myGlobal.end[0] && y === myGlobal.end[1]) {
      cons.CANVAS.addEventListener("mousemove", _shiftEnd);
      cons.CANVAS.addEventListener("mouseup", endShiftEnd);
    } else {
      cons.CANVAS.addEventListener("mousemove", mouseMove);
      cons.CANVAS.addEventListener("mouseup", endWallPlacement);
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
function reset() {
  clearGrid(myGlobal.grid);
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
          updateCanvas(newGrid, cons.CTX);
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
myGlobal.colors = {};
myGlobal.start = cons.DEFAULT_START;
myGlobal.end = cons.DEFAULT_END;
myGlobal.grid = createGrid(cons.GRID_HEIGHT, cons.GRID_WIDTH, myGlobal.start, myGlobal.end);
myGlobal.isRunning = false;
myGlobal.generatorAlgo = null;
myGlobal.algoSelected = false;
myGlobal.delay = delaySlider.value;
mouseClick();
mouseMovementControls();
createColorSelects();
updateCanvas(myGlobal.grid, cons.CTX);
console.log(cons.GRID_WIDTH, cons.GRID_HEIGHT, myGlobal.grid);
mainLoop();
