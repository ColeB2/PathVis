import * as cons from "./constants.js";
import {Queue} from "./queue.js";
function inBounds(x, y) {
  if (x >= 0 && x < cons.GRID_WIDTH && y >= 0 && y < cons.GRID_HEIGHT) {
    return true;
  }
  return false;
}
export function* depthFirstSearch(grid, start) {
  const stack = [start];
  while (stack.length !== 0) {
    const [cell_x, cell_y] = stack.pop();
    if (grid[cell_y][cell_x] === 3) {
      break;
    } else if (grid[cell_y][cell_x] !== 2 && grid[cell_y][cell_x] !== 4) {
      grid[cell_y][cell_x] = 1;
    }
    yield grid;
    cons.DFS_DIRS.forEach(([dir_x, dir_y]) => {
      const [new_x, new_y] = [cell_x + dir_x, cell_y + dir_y];
      if (inBounds(new_x, new_y) && (grid[new_y][new_x] === 0 || grid[new_y][new_x] === 3)) {
        stack.push([new_x, new_y]);
      }
    });
  }
  yield grid;
}
export function* breadthFirstSearch(grid, start) {
  const q = new Queue([start]);
  const visited = new Set();
  while (!q.isEmpty) {
    const [cell_x, cell_y] = q.dequeue();
    if (grid[cell_y][cell_x] === 3) {
      break;
    } else if (grid[cell_y][cell_x] !== 2 && grid[cell_y][cell_x] !== 4) {
      grid[cell_y][cell_x] = 1;
    }
    yield grid;
    cons.BFS_DIRS.forEach(([dir_x, dir_y]) => {
      const [new_x, new_y] = [cell_x + dir_x, cell_y + dir_y];
      const new_cell_id = new_y * cons.GRID_WIDTH + new_x;
      if (inBounds(new_x, new_y) && (grid[new_y][new_x] === 0 || grid[new_y][new_x] === 3) && !visited.has(new_cell_id)) {
        visited.add(new_cell_id);
        q.enqueue([new_x, new_y]);
      }
    });
  }
  yield grid;
}
