import labyrinthos from 'labyrinthos'

export class Tile {
  center: boolean = false

  hover: boolean = false

  obstacle: boolean = false

  solution: boolean = false

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
      return '#f43f5e'
    }

    if (this.obstacle) {
      return '#1e293b'
    }

    if (this.hover) {
      return '#10b981'
    }

    if (this.solution) {
      return '#eab308'
    }

    return '#d4d4d4'
  }

  /**
   * Generate a matrix of tiles
   */
  static matrix({ rows, cols }: { rows: number, cols: number }): Tile[][] {
    const matrix: Tile[][] = []

    for (let i = 0; i < rows; i++) {
      matrix.push([])

      for (let j = 0; j < cols; j++) {
        matrix[i].push(new Tile(j, i))
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
  
    const height = matrix.length
    const width = matrix[0].length
  
    const maze = new labyrinthos.TileMap({ height, width })

    maze.fill(1)
  
    labyrinthos.mazes.GrowingTree(maze, {})

    for (let i = 0; i < maze.data.length; i++) {
      const row = Math.floor(i / width)
      const col = i % width
      matrix[row][col].obstacle = maze.data[i] === 0
    }

    // highlight the center
    const centerCol = Math.floor(width / 2)
    const centerRow = Math.floor(height / 2)

    if (centerCol < 1 || centerRow < 1) {
      return
    }

    matrix[centerRow][centerCol].center = true
    matrix[centerRow][centerCol].obstacle = false
  }
}
