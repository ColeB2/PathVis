import * as cons from './constants';
import { Queue } from './queue';

function inBounds(x: number, y: number) {
    if (x >= 0 && x < cons.GRID_WIDTH && y >= 0 && y < cons.GRID_HEIGHT) {
        return true;
    }
    return false;
}

export function* depthFirstSearch(grid: number[][], start: number[]) {
    const stack: number[][] = [start]
    const DIRS: number[][] = [[-1,0], [0,1], [1,0], [0,-1]]

    while(stack.length !== 0) {
        const [cell_x, cell_y] = stack.pop() as number[]

        if (grid[cell_y][cell_x] === 3) {
            break
        }

        if (grid[cell_y][cell_x] === 2){
        } else {
            grid[cell_y][cell_x] = 1
        }

        
        
        yield grid;


        

        DIRS.forEach(([dir_x, dir_y]) => {
            const [new_x, new_y] = [cell_x+dir_x, cell_y+dir_y]

            if (inBounds(new_x, new_y) && (grid[new_y][new_x] === 0 || grid[new_y][new_x] === 3)) {
                stack.push([new_x,new_y])
            }
        })
    }
    yield grid  
}


export function* breadthFirstSearch(grid: number[][], start: number[]) {
    const q = new Queue([start])
    console.log('q', q)
    const DIRS: number[][] = [[-1,0], [0,1], [1,0], [0,-1]]

    while(!q.isEmpty) {
        const [cell_x, cell_y] = q.dequeue() as number[]
        // console.log(q.printQueue())

        if (grid[cell_y][cell_x] === 3) {
            break
        }

        if (grid[cell_y][cell_x] === 2){
        } else {
            grid[cell_y][cell_x] = 1
        }

        
        
        yield grid;


        

        DIRS.forEach(([dir_x, dir_y]) => {
            const [new_x, new_y] = [cell_x+dir_x, cell_y+dir_y]

            if (inBounds(new_x, new_y) && (grid[new_y][new_x] === 0 || grid[new_y][new_x] === 3)) {
                console.log(new_x, new_y)
                q.enqueue([new_x,new_y])
            }
        })
    }
    yield grid  
}