import { range } from 'lodash-es'
import { useWindowSize } from '@/behaviors'
import Maze from '@/components/Maze'

export default function App() {
  const [screen] = useWindowSize()

  const rows = 10
  const cols = 10

  const grid = range(0, rows).map(() => range(0, cols))

  console.log({ grid })
  return <div>
    <Maze
      grid={grid}
      screen={screen()} />
  </div>
}
