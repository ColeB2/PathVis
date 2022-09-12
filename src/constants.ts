export const CANVAS = document.getElementById("canvas") as HTMLCanvasElement;
export const CTX = CANVAS.getContext("2d") as CanvasRenderingContext2D;
export const CANVAS_LEFT: number = CANVAS.offsetLeft + CANVAS.clientLeft;
export const CANVAS_TOP: number = CANVAS.offsetTop + CANVAS.clientTop;
export const CANVAS_WIDTH: number = CANVAS.width;
export const CANVAS_HEIGHT: number = CANVAS.height;
export const DELAY: number = 100;

export const CELL_WIDTH: number = 40;

export const GRID_WIDTH: number = Math.floor(CANVAS_WIDTH / CELL_WIDTH);
export const GRID_HEIGHT: number = Math.floor(CANVAS_WIDTH / CELL_WIDTH);

export const DEFAULT_STARTEND_HEIGHT: number = Math.floor(GRID_WIDTH/2) - 1