export const CANVAS = document.getElementById("canvas") as HTMLCanvasElement;
export const CTX = CANVAS.getContext("2d") as CanvasRenderingContext2D;
export const CANVAS_LEFT = CANVAS.offsetLeft + CANVAS.clientLeft;
export const CANVAS_TOP = CANVAS.offsetTop + CANVAS.clientTop;
export const CANVAS_WIDTH = CANVAS.width;
export const CANVAS_HEIGHT = CANVAS.height;
export const DELAY = 100;

export const CELL_WIDTH = 40;