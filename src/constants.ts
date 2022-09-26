export const CANVAS = document.getElementById("canvas") as HTMLCanvasElement;
export const CTX = CANVAS.getContext("2d") as CanvasRenderingContext2D;
export const CANVAS_LEFT: number = CANVAS.offsetLeft + CANVAS.clientLeft;
export const CANVAS_TOP: number = CANVAS.offsetTop + CANVAS.clientTop;
export const CANVAS_WIDTH: number = CANVAS.width;
export const CANVAS_HEIGHT: number = CANVAS.height;
export const DELAY: number = 100;

export const CELL_WIDTH: number = CANVAS_WIDTH/20

export const GRID_WIDTH: number = Math.floor(CANVAS_WIDTH / CELL_WIDTH);
export const GRID_HEIGHT: number = Math.floor(CANVAS_HEIGHT / CELL_WIDTH);

export const DEFAULT_STARTEND_HEIGHT: number = Math.floor(GRID_HEIGHT/2) - 1

export const DEFAULT_START: number[] = [1, DEFAULT_STARTEND_HEIGHT]
export const DEFAULT_END: number[] = [GRID_WIDTH-2, DEFAULT_STARTEND_HEIGHT]

export const DFS_DIRS: number[][] = [[-1,0], [0,1], [1,0], [0,-1]]
export const BFS_DIRS: number[][] = [[-1,0], [0,1], [1,0], [0,-1]]

//Clockwise Dirs
export const DIRS1: number[][] = [[-1,0], [0,1], [1,0], [0,-1]]
export const DIRS2: number[][] = [[0,-1], [-1,0], [0,1], [1,0]]
export const DIRS3: number[][] = [[1,0], [0,-1], [-1,0], [0,1]]
export const DIRS4: number[][] = [[0,1], [1,0], [0,-1], [-1,0]]
