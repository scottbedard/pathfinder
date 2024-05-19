import { Vec } from '@/types'

type Props = {
  size: Vec<2>
}

export default function Maze(props: Props) {
  return <div>maze: {JSON.stringify(props)}</div>
}