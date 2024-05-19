import { Vec } from '@/types'

type Props = {
  screen: Vec<2>
}

export default function Maze(props: Props) {
  const dimensions = () => [
    Math.floor(props.screen[0] / 20),
    Math.floor(props.screen[1] / 20),
  ]

  const canvas = <canvas class="border-4 border-dashed border-green-500 h-full w-full" />

  console.log({ canvas })

  return canvas
}