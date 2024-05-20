type Props = {
  cols: number
  onColsChange: (n: number) => void
  onRowsChange: (n: number) => void
  rows: number
}

export function Controls(props: Props) {
  return <div class="bg-white drop-shadow-lg grid gap-2 fixed m-2 px-3 py-2 rounded-lg text-sm w-40">
    <div>
      <div>Rows &bull; {props.rows}</div>
      <input
        class="w-full"
        max="50"
        min="1"
        onInput={e => props.onRowsChange(Number(e.target.value))}
        type="range"
        value={props.rows} />
    </div>

    <div>
      <div>Columns &bull; {props.cols}</div>
      <input
        class="w-full"
        max="50"
        min="1"
        onInput={e => props.onColsChange(Number(e.target.value))}
        type="range"
        value={props.cols} />
    </div>
  </div>
}
