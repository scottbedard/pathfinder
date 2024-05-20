import { createEffect, createSignal } from 'solid-js'
import { Controls, Maze } from '@/components'
import { Tile } from '@/models'
import { useWindowSize } from '@/behaviors'
import { Vec } from '@/types'

export default function App() {
  const [cols, setCols] = createSignal(25)
  const [grid, setGrid] = createSignal<Tile[][]>([])
  const [mouse, setMouse] = createSignal<Vec<2>>([0, 0])
  const [rows, setRows] = createSignal(25)
  const [screen] = useWindowSize()

  let i = 0

  const updateGrid = (c: number, r: number) => {
    const matrix: Tile[][] = []
  
    for (let x = 0; x < c; x++) {
      matrix.push([])

      for (let y = 0; y < r; y++) {
        matrix[x].push(new Tile(x, y, false))
      }
    }

    console.log('GRID UPDATE', i++)
    
    setGrid(matrix)
  }

  createEffect(() => {
    updateGrid(cols(), rows())
  })

  createEffect(() => {
    const [x, y] = mouse()
    const [width, height] = screen()
    const [hoverX, hoverY] = [Math.floor(x / width * cols()), Math.floor(y / height * rows())]

    grid().forEach((col, x) => {
      col.forEach((tile, y) => {
        tile.hover = x === hoverX && y === hoverY
      })
    })
  })

  const onMouseMove = (evt: MouseEvent) => setMouse([evt.clientX, evt.clientY])

  return <div>
    <pre class="bottom-0 p-3 pointer-events-none fixed text-sm">{ JSON.stringify({
      rows: rows(),
      cols: cols(),
      mouse: mouse().join(' x '),
    }, null, 2)}</pre>

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
