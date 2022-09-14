import * as cons from './constants';

function inBounds(x: number, y: number) {
    if (x >= 0 && x < cons.GRID_WIDTH && y >= 0 && y < cons.GRID_HEIGHT) {
        return true;
    }
    return false;
}

export function* depthFirstSearch(grid: number[][], start: number[]) {
    console.log("DFS START:", start)
    console.log("grid:", grid)
    const stack: number[][] = [start]
    // const DIRS: number[][] = [[1,0], [0,1], [-1,0], [0,-1]]
    const DIRS: number[][] = [[-1,0], [0,1], [1,0], [0,-1]]

    while(stack.length !== 0) {
        const [cell_x, cell_y] = stack.pop() as number[]

        if (grid[cell_y][cell_x] === 3) {
            console.log('BREAKBREAKBREAK')
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
    const stack: number[][] = [start]
    // const DIRS: number[][] = [[1,0], [0,1], [-1,0], [0,-1]]
    const DIRS: number[][] = [[-1,0], [0,1], [1,0], [0,-1]]

    while(stack.length !== 0) {
        const [cell_x, cell_y] = stack.shift() as number[]

        if (grid[cell_y][cell_x] === 3) {
            console.log('BREAKBREAKBREAK')
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