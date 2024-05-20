export class Tile {
  traversable: boolean

  x: number

  y: number

  constructor(x: number, y: number, traversable: boolean) {
    this.x = x

    this.y = y

    this.traversable = traversable
  }
}
