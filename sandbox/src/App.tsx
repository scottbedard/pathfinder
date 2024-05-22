import { Controls, Maze } from '@/components'
import { createEffect, createMemo, createSignal } from 'solid-js'
import { euclidean, findPath } from '@bedard/pathfinder'
import { Tile } from '@/models'
import { useWindowSize } from '@/behaviors'

export default function App() {
  const [cols, setCols] = createSignal(100)
  const [grid, setGrid] = createSignal<Tile[][]>([])
  const [mouse, setMouse] = createSignal<{ x: number, y: number }>({ x: -1, y: -1 })
  const [rows, setRows] = createSignal(Math.round(cols() * (9 / 16)))
  const [screen] = useWindowSize()
  const [solution, setSolution] = createSignal(0)

  const update = (dimensions: { rows: number, cols: number }) => {
    setGrid(Tile.matrix(dimensions))
  }

  // track the current hover position
  const hover = createMemo(() => {
    const { x, y } = mouse()
    const { width, height } = screen()

    return {
      row: Math.floor((y / height) * rows()),
      col: Math.floor((x / width) * cols()),
    }
  }, { x: -1, y: -1 }, {
    equals: (a, b) => a.row === b.row && a.col === b.col,
  })

  // find a new solution when the hovered tile changes
  createEffect(() => {
    const { row, col } = hover()
    const flattened = grid().flat()

    // reset all hover states to false
    flattened.forEach(tile => {
      tile.hover = false
      tile.solution = false
    })

    // set the hovered tile and find a new path
    if (row > -1 && col > -1) {
      grid()[row][col].hover = true

      const center = flattened.find(cell => cell.center)

      if (center) {
        findPath({
          data: grid().map(row => row.map(t => t.obstacle)),
          from: { row, col },
          to: { row: center.y, col: center.x },
          heuristic(current, next) {
            // prevent diagonal movement
            if (current.row !== next.row && current.col !== next.col) {
              return Number.MAX_SAFE_INTEGER
            }
            
            return euclidean(next, { row: center.y, col: center.x })
          }
        })?.forEach((step: { row: number, col: number }) => {
          grid()[step.row][step.col].solution = true
        })

        setSolution(grid().flat().filter(t => t.solution).length)
      } else {
        setSolution(0)
      }
    }
  })

  // track mouse position
  const onMouseMove = (evt: MouseEvent) => setMouse({ x: evt.clientX, y: evt.clientY })
  
  // draw the initial grid and path, and redraw when dimensions change
  update({ rows: rows(), cols: cols() })

  createEffect(() => update({ rows: rows(), cols: cols() }))

  return <div>
    <Controls
      cols={cols()}
      onColsChange={setCols}
      onRowsChange={setRows}
      rows={rows()}
      solution={solution()} />

    <Maze
      grid={grid()}
      onMouseMove={onMouseMove}
      screen={screen()} />
  </div>
}
