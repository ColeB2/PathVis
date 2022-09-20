import * as cons from './constants';
import { breadthFirstSearch, depthFirstSearch, dijkstrasAlgorithm } from './algorithms';








function updateCanvas(arr: number[][], context: CanvasRenderingContext2D) {
  context.clearRect(0,0,cons.CANVAS_WIDTH, cons.CANVAS_HEIGHT)
  arr.forEach((row, r) => {
    row.forEach((col, c) => {
      switch(arr[r][c]) {
        case 0: // Open Node
          context.fillStyle = "white"
          break
        case 1: // Searched Node
          context.fillStyle = "black"
          break
        case 2: // Start Node
          context.fillStyle = "green"
          break
        case 3: // Ending Node
          context.fillStyle = "red"
          break
        case 4: // Wall Node
          context.fillStyle = "blue"
          break
        case 5: // Final Path Node
          context.fillStyle = "yellow"
          break
      }
      context.fillRect(c*cons.CELL_WIDTH, r*cons.CELL_WIDTH,
        cons.CELL_WIDTH, cons.CELL_WIDTH)
      context.strokeRect(c*cons.CELL_WIDTH, r*cons.CELL_WIDTH,
        cons.CELL_WIDTH, cons.CELL_WIDTH)
    })

  })
}


// Mouse Controls
function mouseClick() {
  cons.CANVAS.addEventListener('click', (event: MouseEvent) => {
    const x = event.pageX - cons.CANVAS_LEFT;
    const y = event.pageY - cons.CANVAS_TOP;

    myGlobal.grid.forEach((row: [], r: number) => {
      row.forEach((col: number, c: number) => {
        if (
          y > r*cons.CELL_WIDTH && y < (r*cons.CELL_WIDTH)+cons.CELL_WIDTH-2 &&
          x > c*cons.CELL_WIDTH && x < (c*cons.CELL_WIDTH)+cons.CELL_WIDTH-2 &&
          myGlobal.grid[r][c] !== 2 && myGlobal.grid[r][c] !== 3)  {
            myGlobal.grid[r][c] = (myGlobal.grid[r][c] === 0 ? 4 : 0)
            updateCanvas(myGlobal.grid, cons.CTX)
        }
      })
    })
  })
}

function _shiftStart(event: MouseEvent) {
  const x = event.pageX - cons.CANVAS_LEFT;
  const y = event.pageY - cons.CANVAS_TOP;

  myGlobal.grid.forEach((row: [], r: number) => {
    row.forEach((col: number, c: number) => {
      if (
        y > r*cons.CELL_WIDTH && y < r*cons.CELL_WIDTH + cons.CELL_WIDTH && 
        x > c*cons.CELL_WIDTH && x < c*cons.CELL_WIDTH + cons.CELL_WIDTH &&
        myGlobal.grid[r][c] !== 3
        ) {
          myGlobal.grid[myGlobal.start[1]][myGlobal.start[0]] = 0
          myGlobal.grid[r][c] = 2
          myGlobal.start = [c,r]
          updateCanvas(myGlobal.grid, cons.CTX)
        }
    })
  })
}

function _shiftEnd(event: MouseEvent) {
  const x = event.pageX - cons.CANVAS_LEFT;
  const y = event.pageY - cons.CANVAS_TOP;

  myGlobal.grid.forEach((row: [], r: number) => {
    row.forEach((col: number, c: number) => {
      if (
        y > r*cons.CELL_WIDTH && y < r*cons.CELL_WIDTH + cons.CELL_WIDTH && 
        x > c*cons.CELL_WIDTH && x < c*cons.CELL_WIDTH + cons.CELL_WIDTH &&
        myGlobal.grid[r][c] !== 2
        ) {
          myGlobal.grid[myGlobal.end[1]][myGlobal.end[0]] = 0
          myGlobal.grid[r][c] = 3
          myGlobal.start = [c,r]
          updateCanvas(myGlobal.grid, cons.CTX)
        }
    })
  })
}


function shiftStart(whileMove: (event: MouseEvent) => void) {  
  var endMove = function() {
    cons.CANVAS.removeEventListener('mousemove', _shiftStart);
    cons.CANVAS.removeEventListener('mouseup', endMove);
  }

  var endMove2 = function() {
    cons.CANVAS.removeEventListener('mousemove', mouseMove);
    cons.CANVAS.removeEventListener('mouseup', endMove2);
  }

  var endMove3 = function() {
    cons.CANVAS.removeEventListener('mousemove', _shiftEnd)
    cons.CANVAS.removeEventListener('mouseup', endMove3)
  }
  
  cons.CANVAS.addEventListener('mousedown', (event: MouseEvent) => {
    console.log(event)
    const x = Math.floor((event.pageX - cons.CANVAS_LEFT) / cons.CELL_WIDTH)
    const y = Math.floor((event.pageY - cons.CANVAS_TOP)/ cons.CELL_WIDTH)
    if (x === myGlobal.start[0] && y === myGlobal.start[1]) {
      event.stopPropagation();
      cons.CANVAS.addEventListener('mousemove', _shiftStart);
      cons.CANVAS.addEventListener('mouseup', endMove);
    } else if (x === myGlobal.end[0] && y === myGlobal.end[1] ) {
      console.log('end')
      // event.stopPropagation();
      // cons.CANVAS.addEventListener('mousemove', _shiftEnd);
      // cons.CANVAS.addEventListener('mouseup', endMove3);
    } else {
      event.stopPropagation();
      cons.CANVAS.addEventListener('mousemove', mouseMove);
      cons.CANVAS.addEventListener('mouseup', endMove2);
    }
  })
}


function mouseMove(event: MouseEvent) {
  const x = event.pageX - cons.CANVAS_LEFT;
  const y = event.pageY - cons.CANVAS_TOP;

    myGlobal.grid.forEach((row: [], r: number) => {
      row.forEach((col: number, c: number) => {
        if (
          y > r*cons.CELL_WIDTH && y < r*cons.CELL_WIDTH + cons.CELL_WIDTH && 
          x > c*cons.CELL_WIDTH && x < c*cons.CELL_WIDTH + cons.CELL_WIDTH &&
          myGlobal.grid[r][c] !== 2 && myGlobal.grid[r][c] !== 3
          ) {
            myGlobal.grid[r][c] = 4
            updateCanvas(myGlobal.grid, cons.CTX)
          }
      })
    })
}

function mouseMoveWhileDown(whileMove: (event: MouseEvent) => void) {
  var endMove = function() {
    cons.CANVAS.removeEventListener('mousemove', whileMove);
    cons.CANVAS.removeEventListener('mouseup', endMove);
  }
  
  cons.CANVAS.addEventListener('mousedown', (event: MouseEvent) => {
    event.stopPropagation();
    cons.CANVAS.addEventListener('mousemove', whileMove);
    cons.CANVAS.addEventListener('mouseup', endMove);
  })
}



function createGrid() {
  for (let i=0; i < cons.GRID_HEIGHT; i++) {
    let row: number[] = []
    for (let j=0; j < cons.GRID_WIDTH; j++) {
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
  console.log(myGlobal.start)
	myGlobal.generatorAlgo = algo(grid, myGlobal.start)
	}
}

const algoDict:any = {
  "depthFirstSearch": depthFirstSearch,
  "breadthFirstSearch": breadthFirstSearch,
  "dijkstrasAlgorithm": dijkstrasAlgorithm,
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

        if (!algoResults.done) {
          let [newGrid, path] = algoResults['value']
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

//Mouse controls
mouseClick()
// mouseMoveWhileDown((event) => mouseMove(event))
shiftStart((event) => (_shiftStart(event)))

mainLoop();