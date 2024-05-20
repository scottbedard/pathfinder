import { createSignal } from 'solid-js'
import { range } from 'lodash-es'
import { Vec } from '@/types'
import { useWindowSize } from '@/behaviors'
import Maze from '@/components/Maze'

export default function App() {
  const [mouse, setMouse] = createSignal<Vec<2>>([0, 0])
  const [screen] = useWindowSize()
  const [cols, setCols] = createSignal(5)
  const [rows, setRows] = createSignal(5)

  console.log(cols(), rows())

  const grid = () => range(0, cols()).map(() => range(0, rows()))

  const onMouseMove = (evt: MouseEvent) => setMouse([evt.clientX, evt.clientY])

  return <div>
    <Maze
      grid={grid()}
      onMouseMove={onMouseMove}
      screen={screen()} />
  </div>
}
