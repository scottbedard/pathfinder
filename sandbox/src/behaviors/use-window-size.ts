import { createSignal } from 'solid-js'
import { useEventListener } from './use-event-listener'
import { Vec } from '@/types'

export function useWindowSize() {
  const signal = createSignal<Vec<2>>([window.innerWidth, window.innerHeight])

  useEventListener(window, 'resize', () => signal[1]([window.innerWidth, window.innerHeight]))

  return signal
}
