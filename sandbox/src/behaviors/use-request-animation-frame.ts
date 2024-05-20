import { onCleanup, onMount } from 'solid-js'

type Options = {
  autostart?: boolean
}

export function useRequestAnimationFrame(fn: () => void, options: Options = {}) {
  let raf: number

  function loop() {
    fn()
    raf = requestAnimationFrame(loop)
  }

  function start() {
    raf = requestAnimationFrame(loop)
  }

  function stop() {
    cancelAnimationFrame(raf)
  }

  if (options.autostart) {
    onMount(start)
  }

  onCleanup(stop)

  return { start, stop }
}
