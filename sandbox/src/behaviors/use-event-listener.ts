import { onCleanup, onMount } from 'solid-js'

export function useEventListener<T extends keyof WindowEventMap>(
  target: Window,
  event: T,
  listener: (this: Window, evt: WindowEventMap[T]) => void
): { start(): void, stop(): void }

export function useEventListener<T extends keyof DocumentEventMap>(
  target: DocumentOrShadowRoot,
  event: T,
  listener: (this: Document, evt: DocumentEventMap[T]) => void
): { start(): void, stop(): void }

export function useEventListener<T extends keyof HTMLElementEventMap>(
  target: HTMLElement,
  event: T,
  listener: (this: HTMLElement, evt: HTMLElementEventMap[T]) => any,
): { start(): void, stop(): void }

export function useEventListener(
  target: any,
  event: string,
  handler: (evt: Event) => void
) {
  const start = () => target.addEventListener(event, handler)
  const stop = () => target.removeEventListener(event, handler)

  onMount(start)
  onCleanup(stop)

  return { start, stop }
}
