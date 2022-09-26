import * as cons from "./constants.js";
import {Queue} from "./queue.js";
import {Heap} from "./heap.js";
function inBounds(x, y) {
  if (x >= 0 && x < cons.GRID_WIDTH && y >= 0 && y < cons.GRID_HEIGHT) {
    return true;
  }
  return false;
}
export function* depthFirstSearch(grid, start) {
  const stack = [[[], start]];
  let final_path = [];
  while (stack.length > 0) {
    const [path, coords] = stack.pop();
    const [cell_x, cell_y] = coords;
    if (grid[cell_y][cell_x] === 3) {
      final_path = path;
      break;
    } else if (grid[cell_y][cell_x] !== 2 && grid[cell_y][cell_x] !== 4) {
      grid[cell_y][cell_x] = 1;
    }
    yield [grid, false];
    cons.DFS_DIRS.forEach(([dir_x, dir_y]) => {
      const [new_x, new_y] = [cell_x + dir_x, cell_y + dir_y];
      const new_path = path.slice();
      if (inBounds(new_x, new_y) && (grid[new_y][new_x] === 0 || grid[new_y][new_x] === 3)) {
        new_path.push([new_x, new_y]);
        stack.push([new_path, [new_x, new_y]]);
      }
    });
  }
  yield* animatePath(grid, final_path);
  yield [grid, final_path];
}
export function* breadthFirstSearch(grid, start) {
  const q = new Queue([[[], start]]);
  const visited = new Set();
  let final_path = [];
  while (!q.isEmpty) {
    const [path, coords] = q.dequeue();
    const [cell_x, cell_y] = coords;
    if (grid[cell_y][cell_x] === 3) {
      final_path = path;
      break;
    } else if (grid[cell_y][cell_x] !== 2 && grid[cell_y][cell_x] !== 4) {
      grid[cell_y][cell_x] = 1;
    }
    yield [grid, false];
    cons.BFS_DIRS.forEach(([dir_x, dir_y]) => {
      const [new_x, new_y] = [cell_x + dir_x, cell_y + dir_y];
      const new_cell_id = new_y * cons.GRID_WIDTH + new_x;
      const new_path = path.slice();
      if (inBounds(new_x, new_y) && (grid[new_y][new_x] === 0 || grid[new_y][new_x] === 3) && !visited.has(new_cell_id)) {
        visited.add(new_cell_id);
        new_path.push([new_x, new_y]);
        q.enqueue([new_path, [new_x, new_y]]);
      }
    });
  }
  yield* animatePath(grid, final_path);
  yield [grid, final_path];
}
function compareFunc(a, b) {
  let ret = a[0] - b[0];
  return ret;
}
export function* dijkstrasAlgorithm(grid, start) {
  const data = createDijkstrasData(grid);
  const weightedGrid = data[0];
  const unvisited = data[1];
  let final_path = [];
  const h = new Heap(compareFunc);
  h.add([0, start, []]);
  while (!h.isEmpty) {
    const [val, node, path] = h.pop();
    const [cell_x, cell_y] = node;
    const cell_id = cell_y * cons.GRID_WIDTH + cell_x;
    if (!unvisited.has(cell_id)) {
      continue;
    }
    if (grid[cell_y][cell_x] === 3) {
      final_path = path;
      break;
    } else if (grid[cell_y][cell_x] !== 2 && grid[cell_y][cell_x] !== 4) {
      grid[cell_y][cell_x] = 1;
    }
    yield [grid, false];
    cons.BFS_DIRS.forEach(([dir_x, dir_y]) => {
      const [new_x, new_y] = [cell_x + dir_x, cell_y + dir_y];
      const new_cell_id = new_y * cons.GRID_WIDTH + new_x;
      if (inBounds(new_x, new_y) && unvisited.has(new_cell_id) && grid[new_y][new_x] !== 4) {
        const weight = weightedGrid[new_y][new_x];
        const new_path = path.slice();
        new_path.push([new_x, new_y]);
        weightedGrid[new_y][new_x] = Math.min(val + 1, weight);
        h.add([weightedGrid[new_y][new_x], [new_x, new_y], new_path]);
      }
    });
    unvisited.delete(cell_id);
  }
  yield* animatePath(grid, final_path);
  yield [grid, final_path];
}
function createDijkstrasData(grid) {
  let new_grid = [];
  let unvisited = new Set();
  let end = [];
  grid.forEach((row, r) => {
    let new_row = [];
    row.forEach((col, c) => {
      const cell_id = r * cons.GRID_WIDTH + c;
      unvisited.add(cell_id);
      if (grid[r][c] === 3) {
        end = [c, r];
      }
      if (grid[r][c] === 2) {
        new_row.push(0);
      } else {
        new_row.push(Infinity);
      }
    });
    new_grid.push(new_row);
  });
  console.log(new_grid, unvisited, end);
  return [new_grid, unvisited, end];
}
export function* aStarSearch(grid, start) {
  const data = createDijkstrasData(grid);
  const weightedGrid = data[0];
  const unvisited = data[1];
  const end = data[2];
  let final_path = [];
  const h = new Heap(compareFunc);
  h.add([0, start, []]);
  console.log(grid, weightedGrid);
  while (!h.isEmpty) {
    const [val, node, path] = h.pop();
    const [cell_x, cell_y] = node;
    const cell_id = cell_y * cons.GRID_WIDTH + cell_x;
    const g_n = weightedGrid[cell_y][cell_x];
    if (!unvisited.has(cell_id)) {
      continue;
    }
    if (grid[cell_y][cell_x] === 3) {
      final_path = path;
      break;
    } else if (grid[cell_y][cell_x] !== 2 && grid[cell_y][cell_x] !== 4) {
      grid[cell_y][cell_x] = 1;
    }
    yield [grid, false];
    cons.BFS_DIRS.forEach(([dir_x, dir_y]) => {
      const [new_x, new_y] = [cell_x + dir_x, cell_y + dir_y];
      const new_cell_id = new_y * cons.GRID_WIDTH + new_x;
      if (inBounds(new_x, new_y) && unvisited.has(new_cell_id) && grid[new_y][new_x] !== 4) {
        const distanceFromEnd = Math.abs(new_x - end[0]) + Math.abs(new_y - end[1]);
        const h_n = distanceFromEnd * 2;
        const cost = g_n + h_n;
        const new_path = path.slice();
        new_path.push([new_x, new_y]);
        const weight = weightedGrid[new_y][new_x];
        weightedGrid[new_y][new_x] = Math.min(g_n + 1, weight);
        let heap_item = [cost, [new_x, new_y], new_path, new_cell_id];
        h.add(heap_item);
      }
    });
    unvisited.delete(cell_id);
  }
  yield* animatePath(grid, final_path);
  yield [grid, final_path];
}
function* animatePath(grid, path) {
  for (let i = 0; i < path.length; i++) {
    const [x, y] = path[i];
    if (grid[y][x] === 1) {
      grid[y][x] = 5;
      yield [grid, path];
    }
  }
}
