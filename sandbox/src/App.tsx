import { Controls, Maze } from '@/components'
import { createEffect, createSignal } from 'solid-js'
import { Tile } from '@/models'
import { useWindowSize } from '@/behaviors'
import { Vec } from '@/types'
import { search } from '@bedard/a-star'

export default function App() {
  const [cols, setCols] = createSignal(40)
  const [grid, setGrid] = createSignal<Tile[][]>([])
  const [mouse, setMouse] = createSignal<Vec<2>>([-1, -1])
  const [rows, setRows] = createSignal(25)
  const [screen] = useWindowSize()

  search()

  let i = 0

  const update = (x: number, y: number) => {
    console.log('GRID UPDATE:', i++, { x, y })
    setGrid(Tile.matrix(x, y))
  }

  createEffect(() => {
    update(cols(), rows())
  })

  createEffect(() => {
    const [x, y] = mouse()
    const [width, height] = screen()
    const [hoverX, hoverY] = [Math.floor((x / width) * cols()), Math.floor((y / height) * rows())]

    grid().forEach((col, x) => {
      col.forEach((tile, y) => {
        tile.hover = x === hoverX && y === hoverY
      })
    })
  })

  const onMouseMove = (evt: MouseEvent) => setMouse([evt.clientX, evt.clientY])

  return <div>
    <pre class="bg-white bottom-0 p-3 pointer-events-none fixed text-sm">{ JSON.stringify({
      rows: rows(),
      cols: cols(),
      mouse: mouse().join(' x '),
      screen: screen().join(' x '),
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
