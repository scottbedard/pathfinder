type Props = {
  cols: number
  onColsChange: (n: number) => void
  onRowsChange: (n: number) => void
  rows: number
  solution: number
}

export function Controls(props: Props) {
  const onSizeInput = (e: Event) => {
    const target = e.target as HTMLInputElement
    const value = Number(target.value)
    const rows = Math.floor(value * 9 / 16)
    const cols = value

    props.onColsChange(Math.max(cols, 3))
    props.onRowsChange(Math.max(rows, 3))
  }

  return <div class="bg-gray-100 grid gap-1 fixed p-3 rounded-br shadow-2xl text-sm w-56">
    <div>
      <div>Size &bull; <span class="tabular-nums">{props.cols} &times; {props.rows}</span></div>
      <input
        class="w-full"
        max="320"
        min="1"
        onInput={onSizeInput}
        type="range" />
    </div>

    <div class="flex items-center gap-1">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-route"><circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/></svg>
      Solution: <span class="tabular-nums">{props.solution ? props.solution.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 'No solution'}</span>
    </div>

    <div>
      <a
        class="flex items-center gap-1 hover:text-blue-500"
        href="https://github.com/scottbedard/pathfinder">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
        View repository
      </a>
    </div>
  </div>
}
