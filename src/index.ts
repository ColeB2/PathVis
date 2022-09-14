import * as cons from './constants';
import { breadthFirstSearch, depthFirstSearch } from './algorithms';








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
      if (j == myGlobal.start[0] && i == myGlobal.start[1]){
        row.push(2)
      } else if (j == myGlobal.end[0] && i == myGlobal.end[1]) {
        row.push(3)
      } else {
        row.push(0)
      }
    }
    myGlobal.grid.push(row)
  }
}

function clearGrid() {
  myGlobal.grid.forEach( (row : [], r : number) => {
    row.forEach( (col: number, c: number) => {
      if (col === 2 || col === 3) {
      } else {
        myGlobal.grid[r][c] = 0
      }
    })
  })
}

function reset() {
  clearGrid()
  myGlobal.isRunning = false;
  myGlobal.generatorAlgo = null;
  myGlobal.algoSelected = false;
  pauseButton.innerText = 'Start'
  pauseButton.classList.remove('button-paused')
  updateCanvas(myGlobal.grid, cons.CTX)
}

const resetButton: any = document.getElementById('reset') // any?
resetButton?.addEventListener('click', reset, false)

function pauseLoop() {
  if (myGlobal.isRunning) {
    pauseButton.innerText = 'Start';
    pauseButton.classList.remove('button-paused');
  } else {
    pauseButton.innerText = 'Pause';
    pauseButton.classList.add('button-paused');
    algorithmSelectFunction();
  }
  myGlobal.isRunning = !myGlobal.isRunning;
  mainLoop();
}

const pauseButton: any  = document.getElementById('pause') // any?
pauseButton?.addEventListener('click', pauseLoop, false)


function changeSlider() {
  delaySliderOutput.innerHTML = delaySlider.value
  myGlobal.delay = delaySlider.value;
}

const delaySlider: any = document.getElementById("delayRange")
const delaySliderOutput: any = document.getElementById("delayValue")
delaySliderOutput.innerHTML = delaySlider.value;
delaySlider.addEventListener('input', changeSlider, false)



function selectAlgo(algo: any, grid: number[][]) {
	if (algo) {
	myGlobal.generatorAlgo = algo(grid, myGlobal.start)
	}
}

const algoDict:any = {
  "depthFirstSearch": depthFirstSearch,
  "breadthFirstSearch": breadthFirstSearch,
}


const algorithmSelectMenu:any = document.getElementById('algorithm-menu') //any
function algorithmSelectFunction () {
  let option: any = algoDict[algorithmSelectMenu.options[algorithmSelectMenu.selectedIndex].value]
  if (myGlobal.algoSelected === false || option != myGlobal.algoSelected) {
    myGlobal.algoSelected = option
    selectAlgo(myGlobal.algoSelected, myGlobal.grid)
  }
}

function mainLoop() {
  function main() {
    if (myGlobal.isRunning) {
      if (myGlobal.generatorAlgo !== null) {
        let algoResults = myGlobal.generatorAlgo.next()
        let newGrid = algoResults['value']
        console.log(algoResults)

        if (!algoResults.done) {
          updateCanvas(newGrid, cons.CTX)
          setTimeout ( () => {
            window.requestAnimationFrame(main);
          }, myGlobal.delay)

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




//GLOBAL VARIABLES
interface myGlobalVariables {
  [key: string]: any
}
var myGlobal: myGlobalVariables = {};
myGlobal.grid = [];
myGlobal.start = cons.DEFAULT_START
myGlobal.end = cons.DEFAULT_END


myGlobal.isRunning = false;
myGlobal.generatorAlgo = null;
myGlobal.algoSelected = false;

myGlobal.delay = delaySlider.value;


createGrid()
updateCanvas(myGlobal.grid, cons.CTX)
mainLoop();