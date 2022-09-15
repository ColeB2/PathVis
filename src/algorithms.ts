import * as cons from './constants';
import { Queue } from './queue';

function inBounds(x: number, y: number) {
    if (x >= 0 && x < cons.GRID_WIDTH && y >= 0 && y < cons.GRID_HEIGHT) {
        return true;
    }
    return false;
}

export function* depthFirstSearch(grid: number[][], start: number[]) {
    const initial_stack: any[] = [[]]
    initial_stack.push(start)

    const stack: number[][] = [initial_stack]
    let final_path: number[][] = []

    while(stack.length !== 0) {
        const [path, coords] = stack.pop()
        const [cell_x, cell_y] = coords

        if (grid[cell_y][cell_x] === 3) {
            final_path = path;
            break
        } else if (grid[cell_y][cell_x] !== 2 && grid[cell_y][cell_x] !== 4){
            grid[cell_y][cell_x] = 1
        }
        
        yield grid;

        cons.DFS_DIRS.forEach(([dir_x, dir_y]) => {
            const [new_x, new_y] = [cell_x+dir_x, cell_y+dir_y]
            const new_path = path.slice()

            if (inBounds(new_x, new_y) && (grid[new_y][new_x] === 0 || grid[new_y][new_x] === 3)) {
                new_path.push([new_x, new_y])
                stack.push([new_path,[new_x,new_y]])
            }
        })
    }
    yield grid, final_path;
}


export function* breadthFirstSearch(grid: number[][], start: number[]) {
    const initial_q: any[] = [[]]
    initial_q.push(start)

    const q = new Queue([initial_q])
    const visited = new Set<number>;
    let final_path = []

    while(!q.isEmpty) {
        const [path, coords] = q.dequeue()
        const [cell_x, cell_y] = coords

        if (grid[cell_y][cell_x] === 3) {
            final_path = path;
            break
        } else if (grid[cell_y][cell_x] !== 2 && grid[cell_y][cell_x] !== 4) {
            grid[cell_y][cell_x] = 1
        }
        
        yield grid;

        cons.BFS_DIRS.forEach(([dir_x, dir_y]) => {
            const [new_x, new_y] = [cell_x+dir_x, cell_y+dir_y]
            const new_cell_id = (new_y*cons.GRID_WIDTH) + new_x
            const new_path = path.slice()

            if (
                inBounds(new_x, new_y) && 
                (grid[new_y][new_x] === 0 || grid[new_y][new_x] === 3) &&
                !visited.has(new_cell_id)
                ) {
                visited.add(new_cell_id)
                new_path.push([new_x, new_y])
                q.enqueue([new_path, [new_x, new_y]])       
            }
        })
    }
    yield grid, final_path; 
}