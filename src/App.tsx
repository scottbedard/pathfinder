import { createSignal } from 'solid-js'
import { Controls, Maze } from '@/components'
import { Tile } from '@/models'
import { useWindowSize } from '@/behaviors'
import { Vec } from '@/types'

export default function App() {
  const [mouse, setMouse] = createSignal<Vec<2>>([0, 0])
  const [screen] = useWindowSize()
  const [cols, setCols] = createSignal(5)
  const [rows, setRows] = createSignal(5)

  const grid = () => {
    const matrix: Tile[][] = []
  
    for (let x = 0; x < cols(); x++) {
      matrix.push([])
  
      for (let y = 0; y < rows(); y++) {
        matrix[x].push(new Tile(x, y, false))
      }
    }

    return matrix
  }

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
