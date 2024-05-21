import labyrinthos from 'labyrinthos'

export class Tile {
  center: boolean = false

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
    if (this.center) {
      return '#f87171'
    }

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

    for (let x = 0; x < cols; x++) {
      matrix.push([])

      for (let y = 0; y < rows; y++) {
        matrix[x].push(new Tile(x, y))
      }
    }

    Tile.populate(matrix)

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
  
    labyrinthos.mazes.GrowingTree(maze, {})

    maze.data.forEach((value: number, i: number) => {
      const x = i % width
      const y = Math.floor(i / width)
      matrix[x][y].traversable = value === 1
    })

    // open and highlight the center
    const [centerX, centerY] = [Math.floor(width / 2), Math.floor(height / 2)]

    if (centerX < 1 || centerY < 1) {
      return
    }

    matrix[centerX - 1][centerY - 1].traversable = true
    matrix[centerX][centerY - 1].traversable = true
    matrix[centerX + 1][centerY - 1].traversable = true

    matrix[centerX - 1][centerY].traversable = true
    matrix[centerX][centerY].center = true
    matrix[centerX][centerY].traversable = true
    matrix[centerX + 1][centerY].traversable = true

    matrix[centerX - 1][centerY + 1].traversable = true
    matrix[centerX][centerY + 1].traversable = true
    matrix[centerX + 1][centerY + 1].traversable = true
  }
}
