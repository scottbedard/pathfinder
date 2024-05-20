import { onMount } from 'solid-js'
import { Tile } from '@/models'
import { useRequestAnimationFrame } from '@/behaviors'
import { Vec } from '@/types'

type Props = {
  grid: Tile[][]
  onMouseMove: (evt: MouseEvent) => void
  screen: Vec<2>
}

let canvas: HTMLCanvasElement

export function Maze(props: Props) {
  let ctx: CanvasRenderingContext2D | null = null

  const render = () => {
    if (!ctx) {
      return
    }
  
    const stroke = -1

    const [width, height]: Vec<2> = [
      props.screen[0] / props.grid.length,
      props.screen[1] / props.grid[0].length,
    ]

    ctx.clearRect(0, 0, props.screen[0], props.screen[1])

    for (let col = 0; col < props.grid.length; col++) {
      for (let row = 0; row < props.grid[col].length; row++) {
        const tile = props.grid[col][row]
        const x = col * width
        const y = row * height
        ctx.beginPath()
        ctx.rect(x, y, width - stroke, height - stroke)
        ctx.fillStyle = tile.fill()
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