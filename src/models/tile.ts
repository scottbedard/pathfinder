export class Tile {
  hover: boolean = false

  traversable: boolean

  x: number

  y: number

  constructor(x: number, y: number, traversable: boolean) {
    this.x = x

    this.y = y

    this.traversable = traversable
  }

  fill() {
    if (this.hover) {
      return '#3b82f6'
    }

    return '#cbd5e1'
  }
}
