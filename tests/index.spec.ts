import { describe, expect, it } from 'vitest'
import { euclidean, findPath, manhattan } from '../src/index'

describe('findPath', () => {
  it('dijkstra (no heuristic)', () => {
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

  it('A*', () => {
    const output = findPath({
      data: [
        [0, 0, 0, 0, 1],
        [1, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [0, 1, 1, 1, 1],
        [1, 0, 0, 0, 0],
      ],
      from: { row: 0, col: 0 },
      to: { row: 4, col: 4},
      heuristic: (a, b) => Math.abs(a.row - b.row) + Math.abs(a.col - b.col), // manhattan distance
    })
    
    expect(output).toEqual([
      { col: 1, row: 0 },
      { col: 2, row: 0 },
      { col: 3, row: 0 },
      { col: 4, row: 1 },
      { col: 3, row: 2 },
      { col: 2, row: 2 },
      { col: 1, row: 2 },
      { col: 0, row: 3 },
      { col: 1, row: 4 },
      { col: 2, row: 4 },
      { col: 3, row: 4 },
      { col: 4, row: 4 }
    ])
  })

  it('no path', () => {
    const output = findPath({
      data: [
        [0, 1, 1],
        [1, 1, 1],
        [1, 1, 0],
      ],
      from: { row: 0, col: 0 },
      to: { row: 2, col: 2},
    })

    expect(output).toBeNull()
  })

  it('manhattan distance', () => {
    const output = manhattan({ row: 0, col: 0 }, { row: 2, col: 2 })
    expect(output).toBe(4)
  })

  it('euclidean distance', () => {
    const output = euclidean({ row: 0, col: 0 }, { row: 2, col: 2 })
    expect(output).toBeCloseTo(2.83)
  })
})
