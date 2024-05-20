type Props = {
  cols: number
  onColsChange: (n: number) => void
  onRowsChange: (n: number) => void
  rows: number
}

export function Controls(props: Props) {
  const onSizeInput = (e: Event) => {
    const target = e.target as HTMLInputElement
    const value = Number(target.value)
    const rows = Math.floor(value * 9 / 16)
    const cols = value

    props.onColsChange(cols)
    props.onRowsChange(rows)
  }

  return <div class="bg-white drop-shadow-lg grid gap-2 fixed m-2 px-3 py-2 rounded-lg text-sm w-40">
    <div>
      <div>Size &bull; <span class="tabular-nums">{props.cols} &times; {props.rows}</span></div>
      <input
        class="w-full"
        max="300"
        min="1"
        onInput={onSizeInput}
        type="range" />
    </div>
  </div>
}
