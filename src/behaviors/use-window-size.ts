import { createSignal, onMount, onCleanup } from 'solid-js'
import { Vec } from '@/types'

export function useWindowSize() {
  const signal = createSignal<Vec<2>>([window.innerWidth, window.innerHeight])

  const onResize = () => signal[1]([window.innerWidth, window.innerHeight])

  onMount(() => {
    window.addEventListener('resize', onResize)
  })

  onCleanup(() => {
    window.removeEventListener('resize', onResize)
  })

  return signal
}
