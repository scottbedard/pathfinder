import { useWindowSize } from '@/behaviors'
import Maze from '@/components/Maze'

export default function App() {
  const [screen] = useWindowSize()

  return <Maze size={screen()} />
}
