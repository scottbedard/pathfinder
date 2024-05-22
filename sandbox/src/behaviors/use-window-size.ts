import { createSignal } from 'solid-js'
import { useEventListener } from './use-event-listener'

export function useWindowSize() {
  const signal = createSignal<{ width: number, height: number }>({
    height: window.innerHeight,
    width: window.innerWidth,
  })

  useEventListener(window, 'resize', () => signal[1]({
    height: window.innerHeight,
    width: window.innerWidth,
  }))

  return signal
}
