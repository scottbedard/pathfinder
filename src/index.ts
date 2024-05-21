export type Cell = {
  col: number
  g: number
  h: number
  parent: Cell | null
  row: number
  obstructed: boolean
}

export type Options = {
  data: unknown[][]
  from: { row: number, col: number }
  heuristic?: (coord: { row: number, col: number }) => number
  to: { row: number, col: number }
}

/**
 * Find the shortest path between two points on a grid
 */
export function findPath(opts: Options) {
  const heuristic = opts.heuristic || (() => 0)

  // create a matrix of cells from input data
  const matrix: Cell[][] = opts.data.map((cols, row) =>
    cols.map((obstructed, col) => ({
      col,
      g: Infinity,
      h: 0, // heuristic({ row, col }),
      parent: null,
      row,
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
      const costToNeighbor = current.g + 0 // distance(current.col, current.row, neighbor.col, neighbor.row)

      if (!inSearch || costToNeighbor < neighbor.g) {
        neighbor.g = costToNeighbor
        neighbor.parent = current

        if (!inSearch) {
          neighbor.h = 0 // distance(neighbor.col, neighbor.row, toCol, toRow)
          toSearch.push(neighbor)
        }
      }
    }
  }
  
  // no path found
  return null
}
// export function findPath(opts: Options) {
//   const heuristic = opts.heuristic || (() => 0)

//   // create a matrix of cells from input data
//   const matrix: Cell[][] = opts.data.map((cols, row) =>
//     cols.map((obstructed, col) => ({
//       col,
//       g: Infinity,
//       h: 0, // heuristic({ row, col }),
//       parent: null,
//       row,
//       obstructed: !!obstructed,
//     })
//   ))

//   // start searching from starting position
//   const toSearch: Cell[] = [matrix[opts.from.row]?.[opts.from.col]]

//   console.log({ opts, toSearch, matrix })

//   // positions that have been processed
//   const processed: Cell[] = []

//   // begin finding shortest path
//   while (toSearch.length) {
//     let current = toSearch[0]

//     for (const next of toSearch) {
//       const nextF = next.g + next.h
//       const currentF = current.g + current.h

//       if (nextF < currentF || nextF === currentF && next.h < current.h) {
//         current = next
//       }
//     }

//     toSearch.splice(toSearch.indexOf(current), 1)
//     processed.push(current)

//     if (current.col === opts.to.col && current.row === opts.to.row) {
//       const path = []
      
//       while (current.parent) {
//         path.unshift(current)
//         current = current.parent
//       }

//       return path
//     }
    
//     const neighbors = [
//       matrix[current.row - 1]?.[current.col - 1],
//       matrix[current.row - 1]?.[current.col],
//       matrix[current.row - 1]?.[current.col + 1],
//       matrix[current.row]?.[current.col - 1],
//       matrix[current.row]?.[current.col + 1],
//       matrix[current.row + 1]?.[current.col - 1],
//       matrix[current.row + 1]?.[current.col],
//       matrix[current.row + 1]?.[current.col + 1],
//     ].filter(Boolean)
    
//     for (const neighbor of neighbors) {
//       const inSearch = toSearch.includes(neighbor)
//       const costToNeighbor = current.g + heuristic(neighbor)

//       if (!inSearch || costToNeighbor < neighbor.g) {
//         neighbor.g = costToNeighbor
//         neighbor.parent = current

//         if (!inSearch) {
//           neighbor.h = 0
//           // neighbor.h = Math.sqrt(
//           //   Math.pow(neighbor.col - opts.to.col, 2) + 
//           //   Math.pow(neighbor.row - opts.to.row, 2)
//           // )

//           toSearch.push(neighbor)
//         }
//       }
//     }
//   }
  
//   // no path found
//   return null
// }
