import { describe, expect, it } from 'vitest'
import { findPath } from '../src/index'

describe('findPath', () => {
  it('calculate path with no heuristic (dijkstra\'s algorithm)', () => {
    const output = findPath({
      data: [
        [0, 1, 1],
        [1, 0, 1],
        [1, 1, 0],
      ],
      from: { row: 0, col: 0 },
      to: { row: 2, col: 2},
    })

    expect(output).toEqual([
      { col: 1, row: 1 },
      { col: 2, row: 2 },
    ])
  })
})
