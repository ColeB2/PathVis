import { aStarSearch, breadthFirstSearch, depthFirstSearch, dijkstrasAlgorithm } from './algorithms';




function updateCanvas(arr: number[][], context: CanvasRenderingContext2D): void {
  context.clearRect(0,0, myGlobal.canvas.width, myGlobal.canvas.height)
  arr.forEach((row, r) => {
    row.forEach((col, c) => {
      switch(arr[r][c]) {
        case 0: // Open Node
          context.fillStyle = myGlobal.colors["openColor"]
          break
        case 1: // Searched Node
          context.fillStyle = myGlobal.colors["searchColor"]
          break
        case 2: // Start Node
          context.fillStyle = myGlobal.colors["startColor"]
          break
        case 3: // Ending Node
          context.fillStyle = myGlobal.colors["endColor"]
          break
        case 4: // Wall Node
          context.fillStyle = myGlobal.colors["wallColor"]
          break
        case 5: // Final Path Node
          context.fillStyle = myGlobal.colors["pathColor"]
          break
      }
      const CELL_WIDTH = myGlobal.cellWidth
      context.fillRect(c*CELL_WIDTH, r*CELL_WIDTH,
        CELL_WIDTH, CELL_WIDTH)
      context.strokeRect(c*CELL_WIDTH, r*CELL_WIDTH,
        CELL_WIDTH, CELL_WIDTH)
    })

  })
}


// Mouse Controls
function mouseClick(event: MouseEvent): void {
  const x = event.pageX - myGlobal.canvasLeft;
  const y = event.pageY - myGlobal.canvasTop;
  const CELL_WIDTH = myGlobal.cellWidth;

  myGlobal.grid.forEach((row: [], r: number) => {
    row.forEach((col: number, c: number) => {
      if (
        y > r*CELL_WIDTH && y < (r*CELL_WIDTH)+CELL_WIDTH-2 &&
        x > c*CELL_WIDTH && x < (c*CELL_WIDTH)+CELL_WIDTH-2 &&
        myGlobal.grid[r][c] !== 2 && myGlobal.grid[r][c] !== 3)  {
          myGlobal.grid[r][c] = (myGlobal.grid[r][c] === 0 ? 4 : 0)
          updateCanvas(myGlobal.grid, myGlobal.ctx)
      }
    })
  })
}

function _shiftStart(event: MouseEvent): void {
  const x = event.pageX - myGlobal.canvasLeft;
  const y = event.pageY - myGlobal.canvasTop;
  const CELL_WIDTH = myGlobal.cellWidth

  myGlobal.grid.forEach((row: [], r: number) => {
    row.forEach((col: number, c: number) => {
      if (
        y > r*CELL_WIDTH && y < r*CELL_WIDTH + CELL_WIDTH && 
        x > c*CELL_WIDTH && x < c*CELL_WIDTH + CELL_WIDTH &&
        myGlobal.grid[r][c] !== 3
        ) {

          myGlobal.grid[myGlobal.start[1]][myGlobal.start[0]] = 0
          myGlobal.grid[r][c] = 2
          myGlobal.start = [c,r]
          if (!myGlobal.isRunning && myGlobal.animation.length !== 0) {
            algorithmSelectFunction()
            myGlobal.i = myGlobal.animation.length - 1
            updateCanvas(myGlobal.animation[myGlobal.i], myGlobal.ctx)
          } else {
            updateCanvas(myGlobal.grid, myGlobal.ctx)
          }
        }
    })
  })
}

function _shiftEnd(event: MouseEvent): void {
  const x = event.pageX - myGlobal.canvasLeft;
  const y = event.pageY - myGlobal.canvasTop;
  const CELL_WIDTH = myGlobal.cellWidth

  myGlobal.grid.forEach((row: [], r: number) => {
    row.forEach((col: number, c: number) => {
      if (
        y > r*CELL_WIDTH && y < r*CELL_WIDTH + CELL_WIDTH && 
        x > c*CELL_WIDTH && x < c*CELL_WIDTH + CELL_WIDTH &&
        myGlobal.grid[r][c] !== 2
        ) {
          myGlobal.grid[myGlobal.end[1]][myGlobal.end[0]] = 0
          myGlobal.grid[r][c] = 3
          myGlobal.end = [c,r]
          if (!myGlobal.isRunning && myGlobal.animation.length !== 0) {
            algorithmSelectFunction()
            myGlobal.i = myGlobal.animation.length - 1
            updateCanvas(myGlobal.animation[myGlobal.i], myGlobal.ctx)
          } else {
            updateCanvas(myGlobal.grid, myGlobal.ctx)
          }
        }
    })
  })
}

function mouseMove(event: MouseEvent): void {
  const x = event.pageX - myGlobal.canvasLeft;
  const y = event.pageY - myGlobal.canvasTop;
  const CELL_WIDTH = myGlobal.cellWidth

  myGlobal.grid.forEach((row: [], r: number) => {
    row.forEach((col: number, c: number) => {
      if (
        y > r*CELL_WIDTH && y < r*CELL_WIDTH + CELL_WIDTH && 
        x > c*CELL_WIDTH && x < c*CELL_WIDTH + CELL_WIDTH &&
        myGlobal.grid[r][c] !== 2 && myGlobal.grid[r][c] !== 3
        ) {
          myGlobal.grid[r][c] = 4
          updateCanvas(myGlobal.grid, myGlobal.ctx)
        }
    })
  })
}


function endWallPlacement(): void {
  myGlobal.canvas.removeEventListener('mousemove', mouseMove)
  myGlobal.canvas.removeEventListener('mouseup', endWallPlacement)
}

function endShiftStart(): void {
  myGlobal.canvas.removeEventListener('mousemove', _shiftStart)
  myGlobal.canvas.removeEventListener('mouseup', endShiftStart)
}

function endShiftEnd(): void {
  myGlobal.canvas.removeEventListener('mousemove', _shiftEnd)
  myGlobal.canvas.removeEventListener('mouseup', endShiftEnd)
}

function handleMouseClickDrag(event: MouseEvent): void {
  const x = Math.floor((event.pageX - myGlobal.canvasLeft) / myGlobal.cellWidth)
  const y = Math.floor((event.pageY - myGlobal.canvasTop)/ myGlobal.cellWidth)
  event.stopPropagation();
  if (x === myGlobal.start[0] && y === myGlobal.start[1]) {
    myGlobal.canvas.addEventListener('mousemove', _shiftStart);
    myGlobal.canvas.addEventListener('mouseup', endShiftStart);
  } else if (x === myGlobal.end[0] && y === myGlobal.end[1] ) {
    myGlobal.canvas.addEventListener('mousemove', _shiftEnd);
    myGlobal.canvas.addEventListener('mouseup', endShiftEnd);
  } else {
    myGlobal.canvas.addEventListener('mousemove', mouseMove);
    myGlobal.canvas.addEventListener('mouseup', endWallPlacement);
  }
}

function removeMouseControls(): void {
  myGlobal.canvas.removeEventListener('mousedown', handleMouseClickDrag)
  myGlobal.canvas.removeEventListener('mouseUp', removeMouseControls)
  myGlobal.canvas.removeEventListener('click', mouseClick)
}

function mouseMovementControls(): void {    
  myGlobal.canvas.addEventListener('mousedown', handleMouseClickDrag, false)
  myGlobal.canvas.addEventListener('click', mouseClick)
}


function createGrid(height: number, width: number, start: number[], end: number[]): number[][] {
  const grid: number[][] = []
  for (let i=0; i < height; i++) {
    let row: number[] = []
    for (let j=0; j < width; j++) {
      if (j === start[0] && i === start[1]){
        row.push(2)
      } else if (j === end[0] && i === end[1]) {
        row.push(3)
      } else {
        row.push(0)
      }
    }
    grid.push(row)
  }
  return grid
}

function clearGrid(grid: number[][]): void {
  grid.forEach((row: number[], r: number) => {
    row.forEach((col: number, c: number) => {
      if (col === 2 || col === 3) {
      } else {
        grid[r][c] = 0
      }
    })
  })
}

function clearSearch(grid: number[][]): void {
  grid.forEach((row: number[], r: number) => {
    row.forEach((col: number, c: number) => {
      if (col === 2 || col === 3 || col === 4) {
      } else {
        grid[r][c] = 0
      }
    })
  })
}

function handleReset(): void {
  if (myGlobal.isRunning) {
    pauseButton.textContent = 'Start'
    pauseButton.classList.remove('button-paused')
    algorithmSelectMenu.disabled = false
    mouseMovementControls();
  }
  myGlobal.isRunning = false;
  myGlobal.i = 0
  myGlobal.animation = [];
  myGlobal.algoSelected = false;
  
}

function clearGame(): void {
  clearSearch(myGlobal.grid)
  handleReset()
  updateCanvas(myGlobal.grid, myGlobal.ctx)
}

function reset():void {
  clearGrid(myGlobal.grid)
  handleReset()
  updateCanvas(myGlobal.grid, myGlobal.ctx)
}

const resetButton: HTMLElement = document.getElementById('reset')!
resetButton?.addEventListener('click', reset, false)

const clearButton: HTMLElement = document.getElementById('clear')!
clearButton?.addEventListener('click', clearGame, false)

function pauseLoop() {
  if (myGlobal.isRunning) {
    pauseButton.textContent = 'Start';
    pauseButton.classList.remove('button-paused');
    algorithmSelectMenu.disabled = false
    mouseMovementControls();
  } else {
    pauseButton.textContent = 'Pause';
    pauseButton.classList.add('button-paused');
    algorithmSelectFunction();
    algorithmSelectMenu.disabled = true
    removeMouseControls()
  }
  myGlobal.isRunning = !myGlobal.isRunning;
  mainLoop();
}

const pauseButton: HTMLElement  = document.getElementById('pause')!
pauseButton?.addEventListener('click', pauseLoop, false)


function instantFunc() {
  if (myGlobal.animation.length != 0) {
    myGlobal.i = myGlobal.animation.length-1
    updateCanvas(myGlobal.animation[myGlobal.i], myGlobal.ctx)
  }
}

const instantButton: HTMLElement = document.getElementById('instant')!
instantButton?.addEventListener('click', instantFunc, false)


function changeSlider() {
  delaySliderOutput.innerHTML = delaySlider.value
  myGlobal.delay = delaySlider.value;
}

const delaySlider = document.getElementById("delayRange") as HTMLInputElement
const delaySliderOutput: HTMLElement = document.getElementById("delayValue")!
delaySliderOutput.innerHTML = delaySlider.value;
delaySlider.addEventListener('input', changeSlider, false)


//Color Selection Pickers
function colorChoice(this:HTMLInputElement, ev:Event) {
  const element = ev.target as HTMLInputElement
	myGlobal.colors[element.id.toString()] = element.value
  updateCanvas(myGlobal.grid, myGlobal.ctx)
}

const colorSelects = ["openColor", "searchColor", "startColor", "endColor", "pathColor", "wallColor"]
function createColorSelects() {
	colorSelects.forEach((color) => {
		let newSelect = document.getElementById(color) as HTMLInputElement
		newSelect.addEventListener('input', colorChoice, false)
		myGlobal.colors[color] = newSelect.value
    
	})
}


function selectAlgo(algo: Function, grid: number[][]) {
	if (algo) {
    clearGame()
    myGlobal.animation = algo(grid, myGlobal.start)
	}
}

const algoDict:any = {
  "depthFirstSearch": depthFirstSearch,
  "breadthFirstSearch": breadthFirstSearch,
  "dijkstrasAlgorithm": dijkstrasAlgorithm,
  "aStarSearch": aStarSearch,
}


const algorithmSelectMenu: any = document.getElementById('algorithm-menu') //any
function algorithmSelectFunction () {
  let option: any = algoDict[algorithmSelectMenu.options[algorithmSelectMenu.selectedIndex].value]
  if (option != myGlobal.algoSelected) {
    myGlobal.algoSelected = option
    selectAlgo(myGlobal.algoSelected, myGlobal.grid)
  }
}

function mainLoop() {
  function main(timestamp: DOMHighResTimeStamp) {
    if (myGlobal.isRunning) {
      if (myGlobal.animation.length !== 0) {
        const drawStart = (timestamp)
        const diff = drawStart - myGlobal.startTime

        if (myGlobal.i !== myGlobal.animation.length) {
          if (diff > myGlobal.delay) {
            let newGrid = myGlobal.animation[myGlobal.i]
            myGlobal.grid = newGrid
            updateCanvas(myGlobal.grid, myGlobal.ctx)
            myGlobal.i += 1
            myGlobal.startTime = performance.now()
          }
          window.requestAnimationFrame(main)
        } else {
          myGlobal.algoSelected = false;
          myGlobal.i = 0
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

//Functino used to when resizing the window
//After resize, recalculates the grid, so that mouse controls work
//As Expected.
function updateGlobalCanvas() {
  myGlobal.cellWidth = 25;
  myGlobal.canvas = document.getElementById("canvas") as HTMLCanvasElement;

  // const calcWidth = Math.floor((0.8 * window.innerWidth)/myGlobal.cellWidth)* myGlobal.cellWidth
  // myGlobal.canvas.width = 750
  // myGlobal.canvas.height = 550

  myGlobal.ctx = myGlobal.canvas.getContext("2d")
  myGlobal.canvasLeft = myGlobal.canvas.offsetLeft + myGlobal.canvas.clientLeft;
  myGlobal.canvasTop = myGlobal.canvas.offsetTop + myGlobal.canvas.clientTop;
  myGlobal.gridWidth = Math.floor(myGlobal.canvas.width / myGlobal.cellWidth)
  myGlobal.gridHeight = Math.floor(myGlobal.canvas.height / myGlobal.cellWidth)
}
updateGlobalCanvas()


myGlobal.colors = {}
myGlobal.defaultStartEndHeight = Math.floor(myGlobal.gridHeight/2) - 1
myGlobal.start = [1, myGlobal.defaultStartEndHeight]
myGlobal.end = [myGlobal.gridWidth-2, myGlobal.defaultStartEndHeight]
myGlobal.grid = createGrid(myGlobal.gridHeight, myGlobal.gridWidth, myGlobal.start, myGlobal.end);
myGlobal.startTime = performance.now()

window.addEventListener('resize', updateGlobalCanvas, false)

myGlobal.isRunning = false;
myGlobal.algoSelected = false;
myGlobal.delay = delaySlider.value;
myGlobal.i = 0
myGlobal.animation = []



//Initialize Mouse controls
mouseMovementControls();

// Initial Start Up
createColorSelects();
updateCanvas(myGlobal.grid, myGlobal.ctx)
mainLoop();