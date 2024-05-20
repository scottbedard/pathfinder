import { onMount } from 'solid-js'
import { Vec } from '@/types'

type Props = {
  screen: Vec<2>
}

let canvas: HTMLCanvasElement

export default function Maze(props: Props) {

  const dimensions = () => [
    Math.floor(props.screen[0] / 20),
    Math.floor(props.screen[1] / 20),
  ]

  onMount(() => {
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return
    }

    // ctx.fillRect(25, 25, 100, 100);
    // ctx.clearRect(45, 45, 60, 60);
    // ctx.strokeRect(50, 50, 50, 50);
  })

  return <div>
    <canvas
      class="border-4 border-dashed border-green-500 h-full w-full"
      ref={canvas}
    />
  </div>
}