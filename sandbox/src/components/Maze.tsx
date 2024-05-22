import { onMount } from 'solid-js'
import { Tile } from '@/models'
import { useRequestAnimationFrame } from '@/behaviors'
import { Vec } from '@/types'

type Props = {
  grid: Tile[][]
  onMouseMove: (evt: MouseEvent) => void
  screen: { height: number, width: number }
}

let canvas: HTMLCanvasElement

export function Maze(props: Props) {
  let ctx: CanvasRenderingContext2D | null = null

  const render = () => {
    if (!ctx) {
      return
    }
  
    const stroke = 1

    const height = props.screen.height / props.grid.length
    const width = props.screen.width / props.grid[0].length

    ctx.clearRect(0, 0, props.screen.width, props.screen.height)

    for (let row = 0; row < props.grid.length; row++) {
      for (let col = 0; col < props.grid[row].length; col++) {
        ctx.beginPath()
        ctx.rect(col * width, row * height, width - stroke, height - stroke)
        ctx.fillStyle = props.grid[row][col].fill()
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
    height={props.screen.height}
    onMouseMove={props.onMouseMove}
    ref={canvas}
    width={props.screen.width}
  />
}