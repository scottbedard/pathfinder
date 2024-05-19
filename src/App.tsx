import { useWindowSize } from '@/behaviors'
import Maze from '@/components/Maze'

export default function App() {
  const [screen] = useWindowSize()

  return <div class="flex h-screen items-center justify-center w-screen">
    <Maze screen={screen()} />
  </div>
}
