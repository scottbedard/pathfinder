export type Coord = {
  col: number,
  row: number,
}

export type Cell = Coord & {
  g: number
  h: number
  obstructed: boolean
  parent: Cell | null
}

export type Options = {
  data: unknown[][]
  from: Coord
  heuristic?: (current: Coord, next: Coord) => number // @todo: manhattan, euclidean, taxicab, chebyshev
  to: Coord
}

/**
 * Find the shortest path between two points on a grid
 */
export function findPath(opts: Options) {
  const heuristic = opts.heuristic || (() => 0)

  // create a matrix of cells from input data
  const matrix: Cell[][] = opts.data.map((_row, rowIndex) =>
    _row.map((obstructed, colIndex) => ({
      col: colIndex,
      g: Infinity,
      h: 0, // heuristic({ row, col }),
      parent: null,
      row: rowIndex,
      obstructed: !!obstructed,
    })
  ))

  // start searching from starting position
  const initial = matrix[opts.from.row]?.[opts.from.col]

  if (initial) {
    initial.g = 0
  } else {
    return null
  }

  const toSearch: Cell[] = [initial]

  // positions that have been processed
  const processed: Cell[] = []

  // begin finding shortest path
  while (toSearch.length) {
    let current = toSearch[0]

    for (const next of toSearch) {
      if (
        (next.g + next.h) < (current.g + current.h) ||
        (next.g + next.h) === (current.g + current.h) &&
        next.h < current.h
      ) {
        current = next
      }
    }

    toSearch.splice(toSearch.indexOf(current), 1)
    processed.push(current)

    if (current.col === opts.to.col && current.row === opts.to.row) {
      const path = []
      
      while (current.parent) {
        path.unshift(current)
        current = current.parent
      }

      return path.map(x => ({ col: x.col, row: x.row }))
    }

    const neighbors = [
      matrix[current.row - 1]?.[current.col - 1],
      matrix[current.row - 1]?.[current.col],
      matrix[current.row - 1]?.[current.col + 1],
      matrix[current.row]?.[current.col - 1],
      matrix[current.row]?.[current.col + 1],
      matrix[current.row + 1]?.[current.col - 1],
      matrix[current.row + 1]?.[current.col],
      matrix[current.row + 1]?.[current.col + 1],
    ].filter(x => x && !x.obstructed && !processed.includes(x))
    
    for (const neighbor of neighbors) {
      const inSearch = toSearch.includes(neighbor)
      const costToNeighbor = current.g + heuristic(
        { row: current.row, col: current.col },
        { row: neighbor.row, col: neighbor.col },
      )

      if (!inSearch || costToNeighbor < neighbor.g) {
        neighbor.g = costToNeighbor
        neighbor.parent = current

        if (!inSearch) {
          neighbor.h = heuristic(
            { col: current.col, row: current.row },
            { col: neighbor.col, row: neighbor.row },
          )

          toSearch.push(neighbor)
        }
      }
    }
  }
  
  // no path found
  return null
}

// heuristic helpers
export function manhattan(current: Coord, next: Coord) {
  return Math.abs(current.col - next.col) + Math.abs(current.row - next.row)
}

export function euclidean(current: Coord, next: Coord) {
  return Math.sqrt(
    Math.pow(current.col - next.col, 2) + Math.pow(current.row - next.row, 2)
  )
}

// version watermark
export const version = 'x.y.z'