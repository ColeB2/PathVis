import { Queue } from './queue';
import { Heap } from './heap';

const DFS_DIRS: number[][] = [[-1,0], [0,1], [1,0], [0,-1]]
const BFS_DIRS: number[][] = [[-1,0], [0,1], [1,0], [0,-1]]
const DIRS1: number[][] = [[-1,0], [0,1], [1,0], [0,-1]]
const DIRS2: number[][] = [[0,-1], [-1,0], [0,1], [1,0]]
const DIRS3: number[][] = [[1,0], [0,-1], [-1,0], [0,1]]
const DIRS4: number[][] = [[0,1], [1,0], [0,-1], [-1,0]]

function inBounds(x: number, y: number, gridWidth:number, gridHeight: number) {
    if (x >= 0 && x < gridWidth && y >= 0 && y < gridHeight) {
        return true;
    }
    return false;
}

function copyGrid(grid: number[][]): number[][] {
    return grid.map((row) => {
        return row.map((cell) => {
            return cell
        })
    })
}


export function depthFirstSearch(grid: number[][], start: number[]) {
    const gridWidth = grid[0].length
    const gridHeight = grid.length

    const animation = []

    const stack: any[][] = [ [[],start] ]
    let final_path: number[][] = []

    while(stack.length > 0) {
        const [path, coords] = stack.pop()!
        const [cell_x, cell_y] = coords

        if (grid[cell_y][cell_x] === 3) {
            final_path = path;
            break
        } else if (grid[cell_y][cell_x] !== 2 && grid[cell_y][cell_x] !== 4){
            grid[cell_y][cell_x] = 1
        }
        
        animation.push(copyGrid(grid))

        DFS_DIRS.forEach(([dir_x, dir_y]) => {
            const [new_x, new_y] = [cell_x+dir_x, cell_y+dir_y]
            const new_path = path.slice()

            if (inBounds(new_x, new_y, gridWidth, gridHeight) && 
                (grid[new_y][new_x] === 0 || grid[new_y][new_x] === 3)
                ) {
                    new_path.push([new_x, new_y])
                    stack.push([new_path,[new_x,new_y]])
                }
        })
    }
    let g = animatePath(grid, final_path)
    animation.push(...g)
    return(animation)
}


export function breadthFirstSearch(grid: number[][], start: number[]) {
    const gridWidth = grid[0].length
    const gridHeight = grid.length

    const animation = []

    const q = new Queue([ [[],start] ])
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
        
        animation.push(copyGrid(grid))

        BFS_DIRS.forEach(([dir_x, dir_y]) => {
            const [new_x, new_y] = [cell_x+dir_x, cell_y+dir_y]
            const new_cell_id = (new_y*gridWidth) + new_x
            const new_path = path.slice()

            if (
                inBounds(new_x, new_y, gridWidth, gridHeight) && 
                (grid[new_y][new_x] === 0 || grid[new_y][new_x] === 3) &&
                !visited.has(new_cell_id)
                ) {
                visited.add(new_cell_id)
                new_path.push([new_x, new_y])
                q.enqueue([new_path, [new_x, new_y]])       
            }
        })
    }
    let g = animatePath(grid, final_path)
    animation.push(...g)
    return(animation)
}


function compareFunc(a: any[], b: any[]) {
    let ret = a[0] - b[0]
    return ret;
}

export function dijkstrasAlgorithm (grid: number[][], start: number[]) {
    const gridWidth = grid[0].length
    const gridHeight = grid.length

    const animation = []

    const data: any[] = createDijkstrasData(grid)
    const weightedGrid: number[][] = data[0]
    const unvisited: Set<number> = data[1]

    let final_path = []

    const h = new Heap(compareFunc)
    h.add([0,start, []])

    while (!h.isEmpty) {
        const [val, node, path] = h.pop()!
        const [cell_x, cell_y] = node
        const cell_id = (cell_y*gridWidth) + cell_x

        if (!unvisited.has(cell_id)) {continue}

        if (grid[cell_y][cell_x] === 3) {
            final_path = path;
            break
        } else if (grid[cell_y][cell_x] !== 2 && grid[cell_y][cell_x] !== 4) {
            grid[cell_y][cell_x] = 1
        }
        
        animation.push(copyGrid(grid))

        BFS_DIRS.forEach(([dir_x, dir_y]) => {
            const [new_x, new_y] = [cell_x+dir_x, cell_y+dir_y]
            const new_cell_id = (new_y*gridWidth) + new_x
            

            if (
                inBounds(new_x, new_y, gridWidth, gridHeight) && unvisited.has(new_cell_id) &&
                grid[new_y][new_x] !== 4
                ) {
                const weight = weightedGrid[new_y][new_x];
                const new_path = path.slice()
                new_path.push([new_x, new_y])
            
                weightedGrid[new_y][new_x] = Math.min(val+1, weight)
                h.add([weightedGrid[new_y][new_x], [new_x, new_y], new_path])
            }
        })
        unvisited.delete(cell_id)
    }
    let g = animatePath(grid, final_path)
    animation.push(...g)
    return(animation)
}

function createDijkstrasData(grid: number[][]) {
    const gridWidth = grid[0].length
    const gridHeight = grid.length
    
    let new_grid: number[][] = [];
    let unvisited: Set<number> = new Set()
    let end: number[] = []; 

    grid.forEach((row, r) => {
        let new_row: number[] = [];
        row.forEach((col, c) => {
            const cell_id = (r*gridWidth) + c
            unvisited.add(cell_id)

            if (grid[r][c] === 3) {
                end = [c,r]
            }

            if (grid[r][c] === 2) {
                new_row.push(0)
            } else {
                new_row.push(Infinity)
            }
        
        })
    new_grid.push(new_row)
    })
    return [new_grid, unvisited, end]
}


//A* Algorithm
export function aStarSearch(grid: number[][], start: number[]) {
    const gridWidth = grid[0].length
    const gridHeight = grid.length

    const animation = []

    const data: any[] = createDijkstrasData(grid)
    const weightedGrid: number[][] = data[0] //g(n)
    const unvisited: Set<number> = data[1]
    const end: number[] = data[2]

    let final_path = []

    const h = new Heap(compareFunc)
    h.add([0,start, []])

    while (!h.isEmpty) {
        const [val, node, path] = h.pop()!
        const [cell_x, cell_y] = node
        const cell_id = (cell_y*gridWidth) + cell_x
        const g_n = weightedGrid[cell_y][cell_x]

        if (!unvisited.has(cell_id)) {continue}

        if (grid[cell_y][cell_x] === 3) {
            final_path = path;
            break
        } else if (grid[cell_y][cell_x] !== 2 && grid[cell_y][cell_x] !== 4) {
            grid[cell_y][cell_x] = 1
        }
        
        animation.push(copyGrid(grid))

        BFS_DIRS.forEach(([dir_x, dir_y]) => {
            const [new_x, new_y] = [cell_x+dir_x, cell_y+dir_y]
            const new_cell_id = (new_y*gridWidth) + new_x
            
            if (
                inBounds(new_x, new_y, gridWidth, gridHeight) && unvisited.has(new_cell_id) &&
                grid[new_y][new_x] !== 4
                ) {

                const distanceFromEnd: number = (
                    Math.abs(new_x - end[0]) +
                    Math.abs(new_y - end[1])
                    )
                const h_n = distanceFromEnd * 2
                const cost = g_n + h_n
                
                
                const new_path = path.slice()
                new_path.push([new_x, new_y])

                const weight = weightedGrid[new_y][new_x];
                weightedGrid[new_y][new_x] = Math.min(g_n+1, weight)

                //Adding to OPEN heap.
                let heap_item = [cost, [new_x, new_y], new_path, new_cell_id]
                h.add(heap_item)
            }
        })
        unvisited.delete(cell_id)
    }
    let g = animatePath(grid, final_path)
    animation.push(...g)
    return(animation)
}


function animatePath(grid: number[][], path: number[][]) {
    let return_grid = []
    for(let i = 0; i < path.length; i++) {
        const [x, y] = path[i];
        if (grid[y][x] === 1) {
            grid[y][x] = 5
            return_grid.push(window.structuredClone(grid))
            
        }
    }
    return return_grid
  }

  function instantAnimatePath(grid: number[][], path: number[][]) {
    for(let i = 0; i < path.length; i++) {
        const [x, y] = path[i];
        if (grid[y][x] === 1) {
            grid[y][x] = 5
            
        }
    }
    return [window.structuredClone(grid)]
  }