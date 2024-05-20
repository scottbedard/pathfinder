import { onMount } from 'solid-js'
import { random, throttle } from 'lodash-es'
import { useRequestAnimationFrame } from '@/behaviors'
import { Vec } from '@/types'

type Props = {
  grid: unknown[][]
  screen: Vec<2>
}

let canvas: HTMLCanvasElement

export default function Maze(props: Props) {
  let ctx: CanvasRenderingContext2D

  const render = throttle(() => {
    const [width, height]: Vec<2> = [
      props.screen[0] / props.grid.length,
      props.screen[1] / props.grid[0].length,
    ]

    props.grid.forEach((row, i) => {
      row.forEach((_col, j) => {
        ctx.beginPath()
        ctx.strokeStyle = 'red'
        ctx.fillStyle = `rgba(${random(255)}, ${random(255)}, ${random(255)})`
        ctx.rect(i * width + i, j * height + j, width, height)
        ctx.fill()
        ctx.strokeRect(i * width + i, j * height + j, width, height)
      })
    })
  }, 1000)

  const onMousemove = () => {
    console.log('mousemove')
  }

  onMount(() => ctx = canvas.getContext('2d')!)

  useRequestAnimationFrame(render, { autostart: true })

  return <canvas
    class="h-screen w-screen"
    ref={canvas}
    height={props.screen[1]}
    width={props.screen[0]}
    onMouseMove={onMousemove}
  />
}