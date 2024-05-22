import { Controls, Maze } from '@/components'
import { createEffect, createMemo, createSignal } from 'solid-js'
import { findPath } from '@bedard/a-star'
import { Tile } from '@/models'
import { useWindowSize } from '@/behaviors'

export default function App() {
  const [cols, setCols] = createSignal(16)
  const [grid, setGrid] = createSignal<Tile[][]>([])
  const [mouse, setMouse] = createSignal<{ x: number, y: number }>({ x: -1, y: -1 })
  const [rows, setRows] = createSignal(9)
  const [screen] = useWindowSize()

  let i = 0

  const update = (dimensions: { rows: number, cols: number }) => {
    setGrid(Tile.matrix(dimensions))

    console.log('GRID UPDATE', {
      count: i++,
      dimensions,
      binary: grid().map(row => row.map(cell => cell.obstacle)),
    })
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

    // reset all hover states to false
    grid().flat().forEach(tile => {
      tile.hover = false
      tile.solution = false
    })

    // set the hovered tile and find a new path
    if (row > -1 && col > -1) {
      grid()[row][col].hover = true

      const center = grid().flat().find(cell => cell.center)

      if (center) {
        console.log(center)
        findPath({
          data: grid().map(row => row.map(cell => cell.obstacle)),
          from: { row, col },
          to: { row: center.y, col: center.x },
        })?.forEach((step: { row: number, col: number }) => {
          grid()[step.row][step.col].solution = true
        })
      }
    }
  })

  // draw a new grid when the dimensions change
  createEffect(() => update({ rows: rows(), cols: cols() }))

  const onMouseMove = (evt: MouseEvent) => setMouse({ x: evt.clientX, y: evt.clientY })
  
  // draw the initial grid and path
  update({ rows: rows(), cols: cols() })

  return <div>
    {/* <pre class="bg-white bottom-0 p-3 pointer-events-none fixed text-sm">{ JSON.stringify({
      rows: rows(),
      cols: cols(),
      mouse: mouse().join(' x '),
      screen: screen().join(' x '),
    }, null, 2)}</pre> */}

    <Controls
      cols={cols()}
      onColsChange={setCols}
      onRowsChange={setRows}
      rows={rows()} />

    <Maze
      grid={grid()}
      onMouseMove={onMouseMove}
      screen={screen()} />
  </div>
}
