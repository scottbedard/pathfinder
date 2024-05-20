import { Vec } from '@/types'
import labyrinthos from 'labyrinthos'

export class Tile {
  hover: boolean = false

  traversable: boolean = true

  x: number

  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  /**
   * Grid fill color
   */
  fill() {
    if (this.hover && this.traversable) {
      return '#3b82f6'
    }

    if (this.traversable) {
      return '#cbd5e1'
    }

    return '#1e293b'
  }

  /**
   * Generate a matrix of tiles
   */
  static matrix(cols: number, rows: number): Tile[][] {
    const matrix: Tile[][] = []
    const _cols = cols % 2 === 0 ? cols + 1 : cols
    const _rows = rows % 2 === 0 ? rows + 1 : rows
  
    for (let x = 0; x < _cols; x++) {
      matrix.push([])

      for (let y = 0; y < _rows; y++) {
        matrix[x].push(new Tile(x, y))
      }
    }

    Tile.populate(matrix)

    console.log(matrix)

    return matrix
  }

  /**
   * Populate matrix of tiles with a solved maze
   */
  static populate(matrix: Tile[][]) {
    if (matrix.length < 1 || matrix[0].length < 1) {
      return
    }
  
    const width = matrix.length
    const height = matrix[0].length
  
    const maze = new labyrinthos.TileMap({ height, width })
  
    maze.fill(1)
  
    labyrinthos.mazes.BinaryTree(maze, {})

    maze.data.forEach((value: number, i: number) => {
      const x = i % width
      const y = Math.floor(i / width)
      matrix[x][y].traversable = value === 1
    })
  }
}