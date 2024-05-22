# `@bedard/pathfinder`

This project is a simple javascript implementation of the A* search algorithm. It was mainly built to get my feet wet with Solid.js.

[View sandbox &rarr;](https://pathfinder.scottbedard.net)

[<img src="https://github.com/scottbedard/maze/assets/7980426/e4c3b0d8-9b4a-4ac1-a027-715270028f99" />]([https://example.org](https://pathfinder.scottbedard.net))

## Basic usage

Use `findPath` to find the shortest path between two points within a two-dimensional matrix.

```ts
import { findPath } from '@bedard/pathfinder'

const maze = [
  [0, 0, 0, 0, 0],
  [1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1],
  [0, 0, 0, 0, 0],
]

const solution = findPath({
  data: maze,
  from: { row: 0, col: 0 },
  to: { row: 4, col: 4 },
})

console.log(solution) // [{ row, col }, ...]
```

To optimize the solution, an optional heuristic function can be used. Included with this library are [`euclidean`](https://en.wikipedia.org/wiki/Euclidean_distance) and [`manhattan`](https://en.wikipedia.org/wiki/Taxicab_geometry) distance helpers. When no `heuristic` function is defined, it will use [Dijkstra's algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm).

```ts
import { euclidean, findPath } from '@bedard/pathfinder'

findPath({
  data,
  from,
  to,
  heuristic: euclidean,
})
```

## License

[MIT](https://github.com/scottbedard/pathfinder/tree/main?tab=MIT-1-ov-file#readme)

Copyright (c) 2024-present, Scott Bedard
