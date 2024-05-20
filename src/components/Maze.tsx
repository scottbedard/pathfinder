import { onMount } from 'solid-js'
import { useRequestAnimationFrame } from '@/behaviors'
import { Vec } from '@/types'

type Props = {
  grid: unknown[][]
  onMouseMove: (evt: MouseEvent) => void
  screen: Vec<2>
}

let canvas: HTMLCanvasElement

export default function Maze(props: Props) {
  let ctx: CanvasRenderingContext2D | null = null

  const render = () => {
    if (!ctx) {
      return
    }
  
    const stroke = 5

    const [width, height]: Vec<2> = [
      props.screen[0] / props.grid.length,
      props.screen[1] / props.grid[0].length,
    ]

    for (let col = 0; col < props.grid.length; col++) {
      for (let row = 0; row < props.grid[col].length; row++) {
        const x = col * width + col
        const y = row * height + row
        ctx.beginPath()
        ctx.rect(x, y, width - stroke, height - stroke)
        ctx.strokeStyle = 'white'
        ctx.fillStyle = '#cbd5e1'
        ctx.fill()
      }
    }
  }

  onMount(() => {
    const _ctx = canvas.getContext('2d')

    if (!_ctx) {
      throw new Error('Could not get 2d canvas context')
    }
  
    ctx = _ctx
  })

  useRequestAnimationFrame(render, { autostart: true })

  return <canvas
    class="h-screen w-screen"
    height={props.screen[1]}
    onMouseMove={props.onMouseMove}
    ref={canvas}
    width={props.screen[0]}
  />
}