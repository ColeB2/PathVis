export const CANVAS = document.getElementById("canvas");
export const CTX = CANVAS.getContext("2d");
export const CANVAS_LEFT = CANVAS.offsetLeft + CANVAS.clientLeft;
export const CANVAS_TOP = CANVAS.offsetTop + CANVAS.clientTop;
export const CANVAS_WIDTH = CANVAS.width;
export const CANVAS_HEIGHT = CANVAS.height;
export const DELAY = 100;
export const CELL_WIDTH = CANVAS_WIDTH / 20;
export const GRID_WIDTH = Math.floor(CANVAS_WIDTH / CELL_WIDTH);
export const GRID_HEIGHT = Math.floor(CANVAS_WIDTH / CELL_WIDTH);
export const DEFAULT_STARTEND_HEIGHT = Math.floor(GRID_WIDTH / 2) - 1;
export const DEFAULT_START = [1, DEFAULT_STARTEND_HEIGHT];
export const DEFAULT_END = [GRID_WIDTH - 2, DEFAULT_STARTEND_HEIGHT];
export const DFS_DIRS = [[-1, 0], [0, 1], [1, 0], [0, -1]];
export const BFS_DIRS = [[-1, 0], [0, 1], [1, 0], [0, -1]];
export const DIRS1 = [[-1, 0], [0, 1], [1, 0], [0, -1]];
export const DIRS2 = [[0, -1], [-1, 0], [0, 1], [1, 0]];
export const DIRS3 = [[1, 0], [0, -1], [-1, 0], [0, 1]];
export const DIRS4 = [[0, 1], [1, 0], [0, -1], [-1, 0]];
